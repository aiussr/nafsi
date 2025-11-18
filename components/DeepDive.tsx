import React, { useState, useEffect, useRef } from 'react';
import { Objective, HistoryEntry } from '../types';
import { X, Send, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface DeepDiveProps {
  objective: Objective | null;
  onClose: () => void;
  onAddHistory: (id: string, content: string) => void;
}

const DeepDive: React.FC<DeepDiveProps> = ({ objective, onClose, onAddHistory }) => {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [objective?.history]);

  if (!objective) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddHistory(objective.id, inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-xl shadow-slate-200/50">
      
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
          <Clock size={14} />
          <span>Deep Dive History</span>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-8 pb-4 shrink-0">
           <h2 className="text-xl font-bold text-slate-800 leading-tight">
             {objective.title}
           </h2>
           <div className="mt-4 flex items-center gap-2">
              <span className={clsx(
                "px-2 py-1 rounded text-xs font-medium",
                objective.completed ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              )}>
                {objective.completed ? "Completed" : "In Progress"}
              </span>
              <span className="text-xs text-slate-400">Created {format(objective.date, 'MMM d')}</span>
           </div>
        </div>

        {/* Timeline / History */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-8 relative" ref={scrollRef}>
           {/* Connecting Line */}
           <div className="absolute left-[43px] top-4 bottom-0 w-px bg-slate-100 -z-10" />

           {objective.history.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm italic opacity-60">
                No thoughts recorded yet. <br/> Make a mark on your progress.
             </div>
           ) : (
             objective.history.map((entry) => (
               <motion.div 
                 key={entry.id}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex gap-4 group"
               >
                 <div className="mt-1 w-3 h-3 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100 shrink-0 group-hover:bg-blue-400 group-hover:ring-blue-100 transition-all" />
                 <div className="flex-1">
                    <div className="bg-slate-50 p-4 rounded-lg rounded-tl-none shadow-sm border border-slate-100">
                      <p className="text-sm text-slate-700 leading-relaxed">{entry.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-300 mt-1 block ml-1">
                      {format(entry.timestamp, 'h:mm a')}
                    </span>
                 </div>
               </motion.div>
             ))
           )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <form onSubmit={handleSend} className="relative">
             <input 
               type="text" 
               className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:outline-none transition-all"
               placeholder="Log a thought, blocker, or breakthrough..."
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
             />
             <button 
               type="submit"
               disabled={!inputValue.trim()}
               className="absolute right-2 top-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors"
             >
                {inputValue.trim().length > 0 ? <Send size={14} /> : <ChevronRight size={14} />}
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeepDive;
