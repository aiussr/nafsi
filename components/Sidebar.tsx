
import React, { useState } from 'react';
import { Task, ModuleType, MODULES, TaskType } from '../types';
import { TaskCard } from './TaskCard';
import { Plus, BrainCircuit, Loader2, Sparkles, BookOpen, FileText, GraduationCap } from 'lucide-react';

interface SidebarProps {
  tasks: Task[];
  isAiLoading: boolean;
  onAddTask: (title: string, module: ModuleType, duration: number, notes: string, type: TaskType) => void;
  onDeleteTask: (id: string) => void;
  onAiBreakdown: (task: Task) => void;
  onAiAutoSchedule: () => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tasks,
  isAiLoading,
  onAddTask,
  onDeleteTask,
  onAiBreakdown,
  onAiAutoSchedule,
  onDragStart
}) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputNotes, setInputNotes] = useState('');
  const [selectedModule, setSelectedModule] = useState<ModuleType>('probability');
  const [selectedType, setSelectedType] = useState<TaskType>('study');
  const [estimatedDuration, setEstimatedDuration] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow empty title, default to module label
    const finalTitle = inputTitle.trim() ? inputTitle.trim() : MODULES[selectedModule].label;
    
    onAddTask(finalTitle, selectedModule, estimatedDuration, inputNotes, selectedType);
    
    // Reset inputs but keep module/duration/type for rapid entry
    setInputTitle('');
    setInputNotes('');
  };

  const backlogTasks = tasks.filter(t => !t.date);

  return (
    <div className="w-80 md:w-96 flex flex-col h-full bg-slate-50 border-r border-slate-200 shrink-0 z-20 shadow-xl">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BrainCircuit className="text-indigo-600" size={24} />
          Brain Dump
        </h1>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Capture your study backlog here. Drag tasks to the calendar to plan your week.
        </p>
      </div>

      {/* Quick Add Form */}
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="What do you need to study? (Optional)"
              className="w-full px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 bg-white text-black shadow-sm"
            />
          </div>

          {/* Module & Duration */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value as ModuleType)}
              className="w-full text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-indigo-500/50 outline-none cursor-pointer hover:border-slate-400 shadow-sm"
            >
              {Object.values(MODULES).map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            
            <div className="flex items-center border border-slate-300 rounded-lg px-2 bg-white hover:border-slate-400 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all shadow-sm">
              <input
                 type="number"
                 min="0.5"
                 max="10"
                 step="0.5"
                 value={estimatedDuration}
                 onChange={(e) => setEstimatedDuration(parseFloat(e.target.value))}
                 className="w-full text-xs py-2 text-center bg-white text-black focus:outline-none font-medium"
              />
              <span className="text-xs text-slate-500 font-medium pr-1">hr</span>
            </div>
          </div>

          {/* Task Type Selection */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedType('study')}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                selectedType === 'study' 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen size={12} /> Study
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('coursework')}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                selectedType === 'coursework' 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <FileText size={12} /> Coursework
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('exam')}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                selectedType === 'exam' 
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <GraduationCap size={12} /> Exam
            </button>
          </div>

          <textarea
            value={inputNotes}
            onChange={(e) => setInputNotes(e.target.value)}
            placeholder="Notes (e.g. 'Chapters 1-2')..."
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none bg-white text-black shadow-sm"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium p-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 mt-1 active:scale-[0.98]"
          >
            <Plus size={16} />
            Add to List
          </button>
        </form>
      </div>

      {/* AI Controls */}
      <div className="px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Backlog ({backlogTasks.length})
        </span>
        <button
          onClick={onAiAutoSchedule}
          disabled={isAiLoading || backlogTasks.length === 0}
          className={`
            text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all shadow-sm
            ${isAiLoading 
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
              : 'bg-white text-indigo-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700 font-medium hover:shadow-md'}
          `}
        >
          {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          Auto-Plan Month
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/50 custom-scrollbar">
        {backlogTasks.length === 0 && (
          <div className="text-center py-16 flex flex-col items-center opacity-40 select-none">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <BrainCircuit size={28} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Your mind is clear</p>
            <p className="text-xs text-slate-400 mt-1">Start adding study topics above</p>
          </div>
        )}
        
        {backlogTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isCompact={false}
            onDragStart={onDragStart}
            onDelete={onDeleteTask}
            onAiBreakdown={onAiBreakdown}
          />
        ))}
        
        {/* Spacer for bottom scrolling */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};