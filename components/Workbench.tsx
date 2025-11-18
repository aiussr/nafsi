
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Objective, StickyNote, LayoutSide } from '../types';
import { Plus, CheckCircle2, Circle, Trash2, PenLine, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface WorkbenchProps {
  day: Date;
  objectives: Objective[];
  stickyNotes: StickyNote[];
  side: LayoutSide;
  onSelectObjective: (id: string) => void;
  onToggleObjective: (id: string) => void;
  onAddObjective: (title: string) => void;
  onDeleteObjective: (id: string) => void;
  onClose: () => void;
}

const Workbench: React.FC<WorkbenchProps> = ({ 
  day, 
  objectives, 
  stickyNotes,
  side,
  onSelectObjective, 
  onToggleObjective,
  onAddObjective,
  onDeleteObjective,
  onClose
}) => {
  const [newObjInput, setNewObjInput] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newObjInput.trim()) {
      onAddObjective(newObjInput);
      setNewObjInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50/90 dark:bg-slate-900/95 border-x border-slate-200 dark:border-slate-800 backdrop-blur-sm relative">
      
      {/* Close Button - Positioned based on Side */}
      <button 
        onClick={onClose}
        className={clsx(
            "absolute top-4 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors z-50",
            side === 'right' ? "left-4" : "right-4"
        )}
      >
          <X size={16} />
      </button>

      {/* Header */}
      <div className="p-6 pb-2 shrink-0 pt-16">
        <motion.h2 
          key={day.toString()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight"
        >
          {format(day, 'EEEE')}
        </motion.h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{format(day, 'MMMM do, yyyy')}</p>
      </div>

      {/* Daily Objectives */}
      <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Daily Objectives</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full font-mono">
              {objectives.filter(o => o.completed).length}/{objectives.length}
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
            {objectives.map(obj => (
              <motion.div 
                key={obj.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] relative"
                onClick={() => onSelectObjective(obj.id)}
              >
                <button 
                  className={clsx(
                    "mt-0.5 shrink-0 transition-colors",
                    obj.completed ? "text-green-500" : "text-slate-300 dark:text-slate-600 hover:text-blue-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleObjective(obj.id);
                  }}
                >
                  {obj.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                
                <div className="flex-1 min-w-0 mr-6">
                  <p className={clsx(
                    "text-sm font-medium truncate transition-all",
                    obj.completed ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200"
                  )}>
                    {obj.title}
                  </p>
                  {obj.history.length > 0 && (
                     <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                       {obj.history.length} updates
                     </p>
                  )}
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteObjective(obj.id); }}
                  className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                >
                    <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            </AnimatePresence>
            
            <form onSubmit={handleAdd} className="relative">
              <input 
                type="text" 
                placeholder="Add a new objective..."
                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 py-2 pl-1 pr-8 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors placeholder-slate-400 dark:placeholder-slate-600 text-slate-700 dark:text-slate-200"
                value={newObjInput}
                onChange={e => setNewObjInput(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-0 top-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Plus size={16} />
              </button>
            </form>
          </div>
        </section>

        {/* Free Conscious Flow / Scratchpad */}
        <section className="flex flex-col h-64">
          <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
            <PenLine size={12} /> Free Flow Thoughtpad
          </h3>
          <div className="flex-1 relative group">
            <textarea 
              className="w-full h-full resize-none bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 focus:outline-none shadow-sm leading-relaxed font-normal"
              placeholder="What's on your mind? Capture loose thoughts, ideas, or anxieties here..."
              defaultValue={stickyNotes[0]?.content || ''}
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-300 dark:text-slate-600 pointer-events-none">
                Markdown Supported
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workbench;
