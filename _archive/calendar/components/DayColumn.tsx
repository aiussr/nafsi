import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface CalendarCellProps {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
  onDrop: (e: React.DragEvent, date: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDeleteTask: (id: string) => void;
  onAiBreakdown: (task: Task) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  dateStr,
  dayNumber,
  isCurrentMonth,
  isToday,
  tasks,
  onDrop,
  onDragOver,
  onDragStart,
  onDeleteTask,
  onAiBreakdown
}) => {
  const totalHours = tasks.reduce((acc, t) => acc + t.duration, 0);
  
  // Visual load indicator
  let loadStyle = "hidden";
  if (totalHours > 0) loadStyle = "bg-emerald-100 text-emerald-700";
  if (totalHours > 4) loadStyle = "bg-amber-100 text-amber-700";
  if (totalHours > 7) loadStyle = "bg-rose-100 text-rose-700";

  return (
    <div 
      onDrop={(e) => onDrop(e, dateStr)}
      onDragOver={onDragOver}
      className={`
        min-h-[140px] border-b border-r border-slate-100 p-2 flex flex-col transition-colors relative group
        ${isCurrentMonth ? 'bg-white' : 'bg-slate-50'}
        ${isToday ? 'bg-indigo-50/20' : ''}
        hover:bg-slate-50
      `}
    >
      <div className="flex justify-between items-start mb-2 z-10">
        <span className={`
          text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all
          ${isToday 
            ? 'bg-indigo-600 text-white shadow-md scale-110' 
            : isCurrentMonth ? 'text-slate-700 group-hover:bg-slate-200' : 'text-slate-300'}
        `}>
          {dayNumber}
        </span>
        {totalHours > 0 && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${loadStyle}`}>
            {totalHours}h
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1 w-full relative z-0">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isCompact={true}
            onDragStart={onDragStart}
            onDelete={onDeleteTask}
            onAiBreakdown={onAiBreakdown}
          />
        ))}
        
        {/* Invisible target to make dropping easier in empty space */}
        <div className="flex-1 min-h-[40px] w-full" />
      </div>
    </div>
  );
};