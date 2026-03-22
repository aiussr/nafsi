
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Task, MODULES } from '../types';
import { Sparkles, Trash2, GripHorizontal, Clock, AlignLeft, FileText, GraduationCap, AlertTriangle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isCompact?: boolean; // For calendar view
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDelete: (id: string) => void;
  onAiBreakdown: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isCompact = false,
  onDragStart, 
  onDelete,
  onAiBreakdown 
}) => {
  const moduleConfig = MODULES[task.module];
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setShowTooltip(false);
    onDragStart(e, task.id);
  };

  const handleMouseEnter = () => {
    if (!isCompact || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = rect.right + 10;
    const y = rect.top;
    const isRightEdge = x + 250 > window.innerWidth;
    
    setTooltipPos({ 
      x: isRightEdge ? rect.left - 260 : x, 
      y: Math.min(y, window.innerHeight - 200)
    });
    setShowTooltip(true);
  };

  // Type-specific styles
  const getTaskTypeIcon = () => {
    switch (task.type) {
      case 'coursework': return <FileText size={10} className="text-indigo-600" />;
      case 'exam': return <AlertTriangle size={10} className="text-rose-600" />;
      default: return null;
    }
  };

  const getBorderStyle = () => {
    if (task.type === 'coursework') return 'border-dashed border-2';
    if (task.type === 'exam') return 'border-2 ring-1 ring-offset-0 ring-rose-100';
    return 'border-l-4'; // Default study style (only left border colored)
  };

  const Tooltip = () => {
    if (!showTooltip) return null;
    
    return createPortal(
      <div 
        className="fixed z-50 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
        style={{ left: tooltipPos.x, top: tooltipPos.y }}
      >
        <div className={`absolute top-4 left-0 w-1 h-8 rounded-r-full ${moduleConfig.bg.replace('bg-', 'bg-').replace('100', '500')}`}></div>
        
        <div className="flex items-center gap-2 mb-2">
           <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${moduleConfig.bg} ${moduleConfig.color}`}>
              {moduleConfig.label}
           </span>
           {task.type !== 'study' && (
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${task.type === 'exam' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
               {task.type}
             </span>
           )}
           <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-auto">
              <Clock size={10} />
              {task.duration}h
           </span>
        </div>
        
        <h4 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
          {task.title}
        </h4>

        {task.notes && (
          <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "{task.notes}"
            </p>
          </div>
        )}

        {!task.notes && (
           <p className="text-xs text-slate-400 italic">No additional notes.</p>
        )}
      </div>,
      document.body
    );
  };

  if (isCompact) {
    // Calendar View
    const borderClass = task.type === 'study' 
      ? `${moduleConfig.border.replace('border', 'border-l')} border-y-slate-100 border-r-slate-100` 
      : `${moduleConfig.border}`;

    return (
      <>
        <div
          ref={cardRef}
          draggable
          onDragStart={handleDragStart}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
          className={`
            group relative p-2 rounded-md border cursor-grab active:cursor-grabbing shadow-sm mb-1.5
            bg-white hover:shadow-md transition-all duration-200
            ${getBorderStyle()}
            ${borderClass}
          `}
        >
          <div className="flex justify-between items-start gap-2">
            <span className="text-xs font-medium text-slate-700 truncate leading-tight flex-1 flex items-center gap-1">
              {getTaskTypeIcon()}
              {task.title}
            </span>
            {task.notes && <AlignLeft size={10} className="text-slate-300 shrink-0 mt-0.5" />}
          </div>
          
          <div className="flex items-center justify-between mt-1">
             <span className={`text-[10px] font-bold ${moduleConfig.color} opacity-80`}>
                {task.duration}h
             </span>
             <button 
               onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
               className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-opacity"
             >
               <Trash2 size={10} />
             </button>
          </div>
        </div>
        <Tooltip />
      </>
    );
  }

  // Sidebar (Backlog) View - Detailed
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        group relative p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing 
        transition-all duration-200 bg-white hover:border-indigo-300 hover:shadow-md
        ${task.type === 'exam' ? 'border-l-4 border-l-rose-400' : ''}
        ${task.type === 'coursework' ? 'border-l-4 border-l-indigo-400' : ''}
      `}
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${moduleConfig.bg} ${moduleConfig.color}`}>
            {moduleConfig.label}
          </span>
          {task.type !== 'study' && (
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${task.type === 'exam' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
               {task.type === 'exam' ? <GraduationCap size={10} /> : <FileText size={10} />}
               {task.type}
             </span>
          )}
          {task.isAiGenerated && (
            <Sparkles size={12} className="text-amber-500" />
          )}
        </div>
        <GripHorizontal className="text-slate-300 shrink-0 group-hover:text-indigo-400" size={16} />
      </div>

      <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-2">
        {task.title}
      </h4>

      {task.notes && (
        <div className="mb-3 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
          {task.notes}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <Clock size={12} />
          {task.duration} hours
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={() => onAiBreakdown(task)}
            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
            title="AI Breakdown"
          >
            <Sparkles size={14} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};