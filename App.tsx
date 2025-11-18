
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { addHours, startOfDay, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import Calendar from './components/Calendar';
import Workbench from './components/Workbench';
import DeepDive from './components/DeepDive';
import { CalendarEvent, Objective, StickyNote, HistoryEntry, LayoutSide, WeeklyGoal } from './types';
import { Settings, Moon, Sun, Sidebar, Upload, User, Zap } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Initial Data
const INITIAL_DATE = new Date();
const INITIAL_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'Deep Work: Strategy', start: addHours(startOfDay(INITIAL_DATE), 9), end: addHours(startOfDay(INITIAL_DATE), 11), category: 'deep-work', completed: false },
  { id: '2', title: 'Team Sync', start: addHours(startOfDay(INITIAL_DATE), 13), end: addHours(startOfDay(INITIAL_DATE), 14), category: 'meeting', meetingLink: 'meet.google.com/abc-123', completed: false },
  { id: '3', title: 'Gym', start: addHours(startOfDay(INITIAL_DATE), 17), end: addHours(startOfDay(INITIAL_DATE), 18), category: 'personal', completed: true },
];

const INITIAL_OBJECTIVES: Objective[] = [
  { id: 'o1', date: INITIAL_DATE, title: 'Draft Q4 Roadmap', completed: false, history: [] },
  { id: 'o2', date: INITIAL_DATE, title: 'Review Candidate Portfolios', completed: true, history: [
    { id: 'h1', timestamp: addHours(INITIAL_DATE, -2), content: 'The second candidate has strong React skills but lacks design system experience.', type: 'note' }
  ] },
  { id: 'o3', date: addHours(INITIAL_DATE, 24), title: 'Prepare Board Deck', completed: false, history: [] },
];

const INITIAL_NOTES: StickyNote[] = [
  { id: 'n1', content: 'Idea: What if we used a fluid layout for the new dashboard?', color: 'bg-blue-50 dark:bg-slate-700 text-blue-900 dark:text-blue-100' },
];

const App: React.FC = () => {
  // State
  const [focusedDay, setFocusedDay] = useState(INITIAL_DATE);
  const [isWorkbenchOpen, setIsWorkbenchOpen] = useState(true);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null);
  const [workbenchSide, setWorkbenchSide] = useState<LayoutSide>('right');
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoExpandOnCreate, setAutoExpandOnCreate] = useState(true);
  
  // Event Edit State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Data State
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [history, setHistory] = useState<CalendarEvent[][]>([]); // History Stack for Undo

  const [objectives, setObjectives] = useState<Objective[]>(INITIAL_OBJECTIVES);
  const [notes, setNotes] = useState<StickyNote[]>(INITIAL_NOTES);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    { id: 'wg1', title: "Launch MVP", completed: false },
    { id: 'wg2', title: "Hire Senior Frontend", completed: true }
  ]);

  const activeObjective = useMemo(() => 
    objectives.find(o => o.id === selectedObjectiveId) || null
  , [selectedObjectiveId, objectives]);

  // Undo Logic
  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const previousEvents = newHistory.pop();
      if (previousEvents) {
        setEvents(previousEvents);
      }
      return newHistory;
    });
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Planner: Cmd+Shift+S
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 's') {
        e.preventDefault();
        setIsWorkbenchOpen(prev => !prev);
      }
      
      // Undo: Cmd+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

  // Apply Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleDayClick = (date: Date) => {
    if (isSameDay(date, focusedDay) && isWorkbenchOpen) {
      setIsWorkbenchOpen(false);
    } else {
      setFocusedDay(date);
      setIsWorkbenchOpen(true);
    }
  };

  const handleCreateEvent = (start: Date, end: Date) => {
    // Save history
    setHistory(prev => [...prev, events]);

    const newId = uuidv4();
    const newEvent: CalendarEvent = {
      id: newId,
      title: 'New Event',
      start,
      end,
      category: 'work',
      completed: false
    };
    setEvents(prev => [...prev, newEvent]);
    
    if (autoExpandOnCreate) {
      setEditingEventId(newId);
    }
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    // Save history
    setHistory(prev => [...prev, events]);
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (id: string) => {
    // Save history
    setHistory(prev => [...prev, events]);
    setEvents(prev => prev.filter(e => e.id !== id));
    if (editingEventId === id) setEditingEventId(null);
  };

  const handleAddObjective = (title: string) => {
    const newObj: Objective = {
      id: uuidv4(),
      date: focusedDay,
      title,
      completed: false,
      history: []
    };
    setObjectives(prev => [...prev, newObj]);
  };

  const handleToggleObjective = (id: string) => {
    setObjectives(prev => prev.map(o => 
      o.id === id ? { ...o, completed: !o.completed } : o
    ));
  };

  const handleDeleteObjective = (id: string) => {
    setObjectives(prev => prev.filter(o => o.id !== id));
    if (selectedObjectiveId === id) setSelectedObjectiveId(null);
  };

  const handleToggleWeeklyGoal = (id: string) => {
    setWeeklyGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  }

  const handleAddHistory = (id: string, content: string) => {
    const entry: HistoryEntry = {
      id: uuidv4(),
      timestamp: new Date(),
      content,
      type: 'note'
    };
    setObjectives(prev => prev.map(o => 
      o.id === id ? { ...o, history: [...o.history, entry] } : o
    ));
  };

  const toggleSide = () => setWorkbenchSide(prev => prev === 'left' ? 'right' : 'left');

  return (
    <div className={clsx(
      "h-screen w-screen flex overflow-hidden font-sans transition-colors duration-300",
      darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
    )}>
      
      {/* Settings / Account Trigger */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-12 right-0 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-200 dark:border-slate-700 p-3 w-72 flex flex-col gap-2"
            >
              <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors text-left">
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button onClick={toggleSide} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors text-left">
                <Sidebar size={16} />
                <span>Move Planner to {workbenchSide === 'left' ? 'Right' : 'Left'}</span>
              </button>
               <button onClick={() => setAutoExpandOnCreate(!autoExpandOnCreate)} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors text-left">
                <Zap size={16} className={autoExpandOnCreate ? "text-amber-500" : "text-slate-400"} />
                <span>{autoExpandOnCreate ? 'Auto-Edit New Events' : 'Quick Add Mode'}</span>
              </button>
               <button onClick={() => alert("Importing from Apple Calendar...")} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors text-left">
                <Upload size={16} />
                <span>Import Calendar</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:shadow-md transition-all"
        >
          <User size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      <LayoutGroup>
        <div className={clsx(
          "flex-1 flex w-full h-full",
          workbenchSide === 'left' ? "flex-row" : "flex-row-reverse"
        )}>
          
          {/* PANE B: Workbench (Sidebar) */}
          <AnimatePresence mode="popLayout">
            {isWorkbenchOpen && (
              <motion.div 
                layout
                key="workbench"
                className="w-[380px] h-full z-20 shadow-xl shadow-slate-200/50 dark:shadow-black/50 shrink-0 relative"
                initial={{ x: workbenchSide === 'left' ? -380 : 380, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: workbenchSide === 'left' ? -380 : 380, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Workbench 
                  day={focusedDay}
                  objectives={objectives.filter(o => isSameDay(o.date, focusedDay))}
                  stickyNotes={notes}
                  side={workbenchSide}
                  onSelectObjective={setSelectedObjectiveId}
                  onToggleObjective={handleToggleObjective}
                  onAddObjective={handleAddObjective}
                  onDeleteObjective={handleDeleteObjective}
                  onClose={() => setIsWorkbenchOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PANE A: Calendar (Dynamic Stage) */}
          <motion.div 
            layout
            key="calendar"
            className="flex-1 h-full z-10 min-w-[600px]"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Calendar 
              currentDate={INITIAL_DATE}
              events={events}
              objectives={objectives}
              focusedDay={focusedDay}
              weeklyGoals={weeklyGoals}
              editingEventId={editingEventId}
              onFocusDay={handleDayClick}
              onCreateEvent={handleCreateEvent}
              onEditEvent={setEditingEventId}
              onUpdateEvent={handleUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
              onToggleWeeklyGoal={handleToggleWeeklyGoal}
              onToggleObjective={handleToggleObjective}
            />
          </motion.div>

        </div>

        {/* PANE C: Deep Dive (Drawer) */}
        <AnimatePresence mode='wait'>
          {selectedObjectiveId && (
            <motion.div 
              key="deep-dive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none flex justify-end"
            >
               <div 
                 className="absolute inset-0 bg-black/20 dark:bg-black/60 pointer-events-auto" 
                 onClick={() => setSelectedObjectiveId(null)} 
               />
               <motion.div 
                 initial={{ x: '100%' }}
                 animate={{ x: 0 }}
                 exit={{ x: '100%' }}
                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                 className="h-full w-[450px] bg-white dark:bg-slate-900 shadow-2xl pointer-events-auto relative"
               >
                 <DeepDive 
                    objective={activeObjective}
                    onClose={() => setSelectedObjectiveId(null)}
                    onAddHistory={handleAddHistory}
                 />
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </LayoutGroup>
    </div>
  );
};

export default App;
