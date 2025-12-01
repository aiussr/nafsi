
import React, { useState, useEffect } from 'react';
import { Task, ModuleType, TaskType } from './types';
import { Sidebar } from './components/Sidebar';
import { CalendarCell } from './components/DayColumn';
import { generateBreakdown, suggestSchedule } from './services/geminiService';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  // Initialize tasks from local storage if available
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('uniflow-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load tasks from local storage", e);
      return [];
    }
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  // Persist tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('uniflow-tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks", e);
    }
  }, [tasks]);

  // --- Calendar Logic ---

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Fill previous month's days to start at Monday
    const firstDayIndex = (date.getDay() + 6) % 7; // Adjust so 0 = Monday
    const prevMonth = new Date(year, month, 0);
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false
      });
    }

    // Current month's days
    while (date.getMonth() === month) {
      days.push({
        date: new Date(date),
        isCurrentMonth: true
      });
      date.setDate(date.getDate() + 1);
    }

    // Fill next month's days to complete the grid (up to 42 cells usually)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    return days;
  };

  const calendarDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const isToday = (date: Date) => formatDate(date) === formatDate(new Date());

  // --- Task Handlers ---

  const handleAddTask = (title: string, module: ModuleType, duration: number, notes: string, type: TaskType) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      module,
      duration,
      type,
      date: null, // Start in backlog
      notes: notes.trim() || undefined
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Essential to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDateStr: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, date: targetDateStr };
      }
      return t;
    }));
  };

  // Allow dropping back to sidebar (backlog)
  const handleDropToBacklog = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(prev => prev.map(t => {
       if (t.id === taskId) return { ...t, date: null };
       return t;
    }));
  };

  // --- AI Handlers ---

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAiBreakdown = async (task: Task) => {
    setIsAiLoading(true);
    try {
      const subtasks = await generateBreakdown(task.title, task.module);
      if (subtasks.length > 0) {
        const newTasks: Task[] = subtasks.map(st => ({
          id: crypto.randomUUID(),
          title: st.title,
          duration: st.duration,
          module: task.module,
          type: 'study', // Default breakdowns to study tasks
          date: task.date, // Keep assigned date or null
          notes: task.notes ? `Derived from: ${task.title}` : undefined,
          isAiGenerated: true
        }));

        setTasks(prev => {
           const filtered = prev.filter(t => t.id !== task.id);
           return [...newTasks, ...filtered];
        });
        showNotification(`Broken down into ${subtasks.length} tasks`);
      } else {
        showNotification("Couldn't break this down further.", 'error');
      }
    } catch (e) {
      showNotification("AI Service Error", 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAutoSchedule = async () => {
    setIsAiLoading(true);
    try {
      // Get all dates currently visible in the grid to schedule against
      const visibleDates = calendarDays
        .filter(d => d.isCurrentMonth)
        .map(d => formatDate(d.date));

      const updatedTasks = await suggestSchedule(tasks, visibleDates);
      setTasks(updatedTasks);
      showNotification("Tasks distributed across the month!");
    } catch (e) {
      showNotification("Scheduling failed.", 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Navigation ---
  
  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };


  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      
      {/* Sidebar (Backlog) */}
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDropToBacklog}
        className="h-full flex-shrink-0"
      >
        <Sidebar 
          tasks={tasks}
          isAiLoading={isAiLoading}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onAiBreakdown={handleAiBreakdown}
          onAiAutoSchedule={handleAutoSchedule}
          onDragStart={handleDragStart}
        />
      </div>

      {/* Main Calendar Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 relative shadow-2xl">
        
        {/* Header */}
        <header className="h-20 border-b border-slate-200 bg-white px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-full border border-slate-200">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-500 transition-all">
                  <ChevronLeft size={18} />
                </button>
                <h2 className="text-lg font-bold text-slate-800 w-40 text-center select-none">{monthName}</h2>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-500 transition-all">
                  <ChevronRight size={18} />
                </button>
             </div>
             
             <div className="h-8 w-px bg-slate-200 mx-2"></div>

             <div className="flex gap-6 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div> Probability
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div> Statistics
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-200"></div> Game Theory
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
             <CalendarIcon size={14} />
             <span>Drag items to plan your month</span>
          </div>
        </header>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 shrink-0">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-7 min-h-full auto-rows-fr bg-slate-200 gap-[1px] border-b border-slate-200">
            {calendarDays.map((cell, idx) => {
              const dateStr = formatDate(cell.date);
              const cellTasks = tasks.filter(t => t.date === dateStr);
              
              return (
                <CalendarCell
                  key={`${dateStr}-${idx}`}
                  dateStr={dateStr}
                  dayNumber={cell.date.getDate()}
                  isCurrentMonth={cell.isCurrentMonth}
                  isToday={isToday(cell.date)}
                  tasks={cellTasks}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragStart={handleDragStart}
                  onDeleteTask={handleDeleteTask}
                  onAiBreakdown={handleAiBreakdown}
                />
              );
            })}
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 z-50 bg-white ${notification.type === 'error' ? 'border-red-100 text-red-600 bg-red-50' : 'border-emerald-100 text-emerald-700 bg-emerald-50'}`}>
            {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-semibold">{notification.message}</span>
          </div>
        )}

      </main>

      {/* Loading Overlay */}
      {isAiLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[60] flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pulse border border-indigo-100">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-5"></div>
            <p className="text-slate-800 font-semibold text-lg">Planning your schedule...</p>
            <p className="text-slate-500 text-sm mt-1">Calculating optimal times...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;