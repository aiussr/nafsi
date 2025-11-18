
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addMinutes, isSameDay, setHours, setMinutes, differenceInMinutes, startOfDay, addDays } from 'date-fns';
import { CalendarEvent, Objective, WeeklyGoal } from '../types';
import { getWeekDays, formatDayHeader, formatDayNumber, getMinutesFromStartOfDay } from '../utils/dateUtils';
import { clsx } from 'clsx';
import { Target, Plus, Trash2, Check, Video, Users, CheckCircle2, Circle, Copy } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  events: CalendarEvent[];
  objectives: Objective[];
  focusedDay: Date;
  weeklyGoals: WeeklyGoal[];
  editingEventId: string | null;
  onFocusDay: (date: Date) => void;
  onCreateEvent: (start: Date, end: Date) => void;
  onEditEvent: (id: string | null) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onToggleWeeklyGoal: (id: string) => void;
  onToggleObjective: (id: string) => void;
}

const HOURS = Array.from({ length: 24 }).map((_, i) => i);
const PIXELS_PER_HOUR = 90;
const SNAP_MINUTES = 15;

type InteractionType = 'create' | 'move' | 'resize-start' | 'resize-end';

interface InteractionState {
  type: InteractionType;
  startPoint: { x: number; y: number };
  // For 'create'
  startTime?: Date;
  colIndex?: number;
  // For 'move'/'resize'
  originalEvent?: CalendarEvent;
  hasMoved: boolean; // To distinguish click from drag
}

const Calendar: React.FC<CalendarProps> = ({ 
  currentDate, 
  events, 
  objectives, 
  focusedDay, 
  weeklyGoals, 
  editingEventId,
  onFocusDay, 
  onCreateEvent,
  onEditEvent,
  onUpdateEvent,
  onDeleteEvent,
  onToggleWeeklyGoal,
  onToggleObjective
}) => {
  const weekDays = getWeekDays(currentDate);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Unified Interaction State
  const [interaction, setInteraction] = useState<InteractionState | null>(null);
  
  // Visual Overrides during interaction
  const [ghostEvent, setGhostEvent] = useState<{ start: Date; end: Date; colIndex: number } | null>(null);
  const [temporaryEvent, setTemporaryEvent] = useState<CalendarEvent | null>(null);
  
  // Expanded Header State
  const [expandedHeaderDate, setExpandedHeaderDate] = useState<Date | null>(null);

  // -- Helper Functions --

  const getTimeFromY = (y: number) => {
    if (!gridRef.current) return new Date();
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = y - rect.top + gridRef.current.scrollTop;
    // Clamp within 24 hours
    const clampedY = Math.max(0, Math.min(relativeY, 24 * PIXELS_PER_HOUR));
    const totalMinutes = (clampedY / (24 * PIXELS_PER_HOUR)) * (24 * 60);
    const date = setMinutes(setHours(new Date(), 0), totalMinutes);
    return date;
  };

  const getColumnFromX = (x: number) => {
    if (!gridRef.current) return 0;
    const rect = gridRef.current.getBoundingClientRect();
    // Account for sidebar width (w-16 = 64px)
    const relativeX = x - rect.left - 64; 
    const colWidth = (rect.width - 64) / 7;
    const colIndex = Math.floor(relativeX / colWidth);
    return Math.max(0, Math.min(colIndex, 6));
  };

  const roundDate = (date: Date) => {
    const minutes = getMinutesFromStartOfDay(date);
    const roundedMinutes = Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
    return addMinutes(startOfDay(date), roundedMinutes);
  };

  // -- Event Handlers --

  const handleGridMouseDown = (e: React.MouseEvent, day: Date, colIndex: number) => {
    if (e.button !== 0) return;

    // Priority: Close expanded UI elements first
    if (expandedHeaderDate || editingEventId) {
       e.preventDefault();
       e.stopPropagation();
       setExpandedHeaderDate(null);
       onEditEvent(null);
       return;
    }

    e.preventDefault();
    const time = getTimeFromY(e.clientY);
    
    setInteraction({
      type: 'create',
      startPoint: { x: e.clientX, y: e.clientY },
      startTime: time,
      colIndex,
      hasMoved: false
    });
  };

  const handleEventMouseDown = (e: React.MouseEvent, event: CalendarEvent, type: InteractionType = 'move') => {
    e.stopPropagation(); // Stop grid creation logic
    e.preventDefault(); // Prevent text selection

    if (expandedHeaderDate) setExpandedHeaderDate(null);
    // If we are editing THIS event, don't drag it, just let the input focus work (or handled by Card)
    if (editingEventId === event.id) return;
    // If we are editing ANOTHER event, close it
    if (editingEventId && editingEventId !== event.id) onEditEvent(null);

    setInteraction({
      type,
      startPoint: { x: e.clientX, y: e.clientY },
      originalEvent: event,
      hasMoved: false
    });
    
    // Initialize temp event for visual feedback immediately
    setTemporaryEvent(event);
  };

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!interaction) return;

    const dist = Math.sqrt(Math.pow(e.clientX - interaction.startPoint.x, 2) + Math.pow(e.clientY - interaction.startPoint.y, 2));

    // Threshold Check
    if (!interaction.hasMoved && dist > 5) {
      setInteraction(prev => prev ? { ...prev, hasMoved: true } : null);
    }

    // Logic based on type
    if (interaction.type === 'create') {
       if (dist > 5) {
         const currentTime = getTimeFromY(e.clientY);
         let start = interaction.startTime!;
         let end = currentTime;
         
         if (differenceInMinutes(end, start) < 0) {
           end = start;
           start = currentTime;
         }
         
         const startRound = roundDate(start);
         const endRound = roundDate(end);
         
         // Allow dynamic resizing during creation, but enforce minimum 15 mins
         let finalEnd = endRound;
         if (differenceInMinutes(finalEnd, startRound) < SNAP_MINUTES) {
            finalEnd = addMinutes(startRound, SNAP_MINUTES);
         }

         // Correct logic: Apply the calculated time to the specific day of the column
         const targetDay = weekDays[interaction.colIndex!];
         const startMinutes = getMinutesFromStartOfDay(startRound);
         const endMinutes = getMinutesFromStartOfDay(finalEnd);
         
         const realStart = addMinutes(startOfDay(targetDay), startMinutes);
         const realEnd = addMinutes(startOfDay(targetDay), endMinutes);
         
         setGhostEvent({ 
           start: realStart, 
           end: realEnd, 
           colIndex: interaction.colIndex!
         });
       }
    } 
    else if (interaction.originalEvent && (interaction.hasMoved || dist > 5)) {
        // Move or Resize logic
        const currentYTime = getTimeFromY(e.clientY);
        const minutesFromTop = getMinutesFromStartOfDay(currentYTime);
        
        if (interaction.type === 'move') {
            const newColIndex = getColumnFromX(e.clientX);
            const timeDiff = differenceInMinutes(currentYTime, getTimeFromY(interaction.startPoint.y));
            
            const newStart = roundDate(addMinutes(interaction.originalEvent.start, timeDiff));
            const duration = differenceInMinutes(interaction.originalEvent.end, interaction.originalEvent.start);
            
            const targetDay = weekDays[newColIndex];
            const startOfDayDate = startOfDay(targetDay);
            const minutes = getMinutesFromStartOfDay(newStart);
            
            const safeStart = addMinutes(startOfDayDate, minutes);
            const safeEnd = addMinutes(safeStart, duration);

            setTemporaryEvent({
                ...interaction.originalEvent,
                start: safeStart,
                end: safeEnd
            });
        }

        // For resizing, we must ensure we keep the Original Event's Day, 
        // but apply the new time from the vertical position.
        if (interaction.type === 'resize-start') {
            const eventDay = startOfDay(interaction.originalEvent.start);
            const newStartUnrounded = addMinutes(eventDay, minutesFromTop);
            const newStart = roundDate(newStartUnrounded);
            const originalEnd = interaction.originalEvent.end;
            
            if (differenceInMinutes(originalEnd, newStart) >= SNAP_MINUTES) {
                setTemporaryEvent({
                    ...interaction.originalEvent,
                    start: newStart,
                    end: originalEnd
                });
            }
        }

        if (interaction.type === 'resize-end') {
            const eventDay = startOfDay(interaction.originalEvent.start);
            const newEndUnrounded = addMinutes(eventDay, minutesFromTop);
            const newEnd = roundDate(newEndUnrounded);
            const originalStart = interaction.originalEvent.start;
            
            if (differenceInMinutes(newEnd, originalStart) >= SNAP_MINUTES) {
                setTemporaryEvent({
                    ...interaction.originalEvent,
                    start: originalStart,
                    end: newEnd
                });
            }
        }
    }
  };

  const handleGlobalMouseUp = (e: React.MouseEvent) => {
    if (!interaction) return;

    if (interaction.type === 'create') {
        if (interaction.hasMoved && ghostEvent) {
            onCreateEvent(ghostEvent.start, ghostEvent.end);
        } else {
            // Is a Click
            onFocusDay(weekDays[interaction.colIndex!]);
        }
    } else if (interaction.type === 'move' || interaction.type === 'resize-start' || interaction.type === 'resize-end') {
        if (interaction.hasMoved && temporaryEvent) {
            onUpdateEvent(temporaryEvent);
        } else if (!interaction.hasMoved && interaction.type === 'move') {
             // It was a click on event -> Edit
             onEditEvent(interaction.originalEvent!.id);
        }
    }

    // Reset
    setInteraction(null);
    setGhostEvent(null);
    setTemporaryEvent(null);
  };

  return (
    <div 
      className="flex-1 h-full flex flex-col bg-white dark:bg-slate-900 relative overflow-hidden select-none"
      onMouseMove={handleGlobalMouseMove}
      onMouseUp={handleGlobalMouseUp}
      onMouseLeave={handleGlobalMouseUp}
    >
       {/* Weekly Objectives Banner */}
       <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center gap-4 shrink-0 z-20 relative">
         <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
           <Target size={14} /> Weekly Goals
         </div>
         <div className="flex gap-3 flex-wrap">
            {weeklyGoals.map((goal) => (
              <div 
                key={goal.id} 
                onClick={() => onToggleWeeklyGoal(goal.id)}
                className={clsx(
                  "text-xs font-medium px-2 py-1 rounded-md shadow-sm cursor-pointer transition-all select-none border flex items-center gap-1.5",
                  goal.completed
                    ? "bg-slate-100 text-slate-400 border-slate-100 line-through dark:bg-slate-800 dark:text-slate-500 dark:border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                )}
              >
                {goal.completed ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                {goal.title}
              </div>
            ))}
            <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
               <Plus size={14} />
            </button>
         </div>
       </div>

      {/* Days Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 shrink-0 relative z-20">
        <div className="w-16 shrink-0 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900" /> 
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((day, i) => {
            const isFocused = isSameDay(day, focusedDay);
            const isToday = isSameDay(day, new Date());
            const dayObjectives = objectives.filter(o => isSameDay(o.date, day));
            const pendingCount = dayObjectives.filter(o => !o.completed).length;
            const isHeaderExpanded = expandedHeaderDate && isSameDay(day, expandedHeaderDate);

            return (
              <div 
                key={i} 
                className={clsx(
                  "flex flex-col py-3 border-r border-slate-100 dark:border-slate-800 transition-colors duration-200 group relative",
                  isFocused ? "bg-blue-50/30 dark:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
                onClick={() => {
                    if (editingEventId) { onEditEvent(null); return; }
                    if (expandedHeaderDate) { setExpandedHeaderDate(null); return; }
                    onFocusDay(day);
                }}
              >
                 {/* Date Number & Name */}
                <div className="flex flex-col items-center justify-center mb-2 cursor-pointer">
                  <span className={clsx("text-xs font-medium mb-1", isToday ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")}>
                    {formatDayHeader(day)}
                  </span>
                  <div className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all",
                    isToday ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none" : "text-slate-700 dark:text-slate-200",
                    isFocused && !isToday && "bg-slate-200 dark:bg-slate-700"
                  )}>
                    {formatDayNumber(day)}
                  </div>
                </div>

                {/* Daily Objectives Preview */}
                <div className="px-2 space-y-1 min-h-[24px]">
                  {dayObjectives.length > 0 && (
                     <div 
                       onClick={(e) => {
                           e.stopPropagation(); 
                           if (isHeaderExpanded) setExpandedHeaderDate(null);
                           else setExpandedHeaderDate(day);
                       }}
                       className={clsx(
                       "text-[10px] font-medium text-center py-0.5 rounded-sm truncate transition-colors cursor-pointer hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600",
                       pendingCount === 0 ? "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" : "text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400"
                     )}>
                        {pendingCount === 0 ? 'All Done' : `${pendingCount} Goals`}
                     </div>
                  )}
                  {!isHeaderExpanded && dayObjectives.slice(0, 2).map(obj => (
                    <div 
                      key={obj.id} 
                      onClick={(e) => { e.stopPropagation(); onToggleObjective(obj.id); }}
                      className={clsx(
                        "text-[9px] truncate px-1 border-l-2 cursor-pointer hover:opacity-80 transition-opacity select-none",
                        obj.completed ? "text-slate-300 border-slate-300 line-through dark:text-slate-600 dark:border-slate-700" : "text-slate-600 border-blue-400 dark:text-slate-400"
                      )}
                    >
                      {obj.title}
                    </div>
                  ))}
                </div>

                {/* Expanded Header Popover */}
                <AnimatePresence>
                    {isHeaderExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -5, height: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 shadow-xl border-b border-x border-slate-200 dark:border-slate-700 rounded-b-lg z-50 p-2 flex flex-col gap-2 min-h-[100px]"
                        >
                             <div className="text-[10px] font-bold uppercase text-slate-400 px-1">
                                {dayObjectives.length} Objectives
                             </div>
                             {dayObjectives.map(obj => (
                                 <div 
                                    key={obj.id}
                                    onClick={() => onToggleObjective(obj.id)}
                                    className="flex items-start gap-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer group"
                                 >
                                     <div className={clsx("mt-0.5", obj.completed ? "text-green-500" : "text-slate-300 dark:text-slate-600 group-hover:text-blue-400")}>
                                         {obj.completed ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                     </div>
                                     <span className={clsx("text-xs leading-tight", obj.completed ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200")}>
                                         {obj.title}
                                     </span>
                                 </div>
                             ))}
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white dark:bg-slate-900 z-0" ref={gridRef}>
        <div className="flex relative min-h-[1920px]" style={{ height: 24 * PIXELS_PER_HOUR }}>
            
            {/* Time Axis */}
            <div className="w-16 shrink-0 border-r border-slate-100 dark:border-slate-800 flex flex-col text-xs text-slate-400 dark:text-slate-600 font-medium select-none bg-white dark:bg-slate-900 sticky left-0 z-10">
              {HOURS.map(h => (
                <div key={h} className="h-[90px] border-b border-transparent relative">
                  <span className="absolute -top-2.5 w-full text-center block">
                    {h === 0 ? '' : `${h}:00`}
                  </span>
                </div>
              ))}
            </div>

            {/* Days Columns */}
            <div className="flex-1 grid grid-cols-7 relative">
              
              {HOURS.map(h => (
                 <div key={`line-${h}`} className="absolute w-full border-b border-slate-50 dark:border-slate-800 pointer-events-none" style={{ top: h * PIXELS_PER_HOUR }} />
              ))}

              <CurrentTimeLine pixelsPerHour={PIXELS_PER_HOUR} weekDays={weekDays} />

              {weekDays.map((day, colIndex) => {
                 // Merge events for layout: exclude the one being moved, include the temp one
                 const relevantEvents = events.filter(e => e.id !== temporaryEvent?.id);
                 if (temporaryEvent) relevantEvents.push(temporaryEvent);
                 
                 const dayEvents = relevantEvents.filter(e => isSameDay(e.start, day));
                 const layoutEvents = calculateEventLayout(dayEvents);

                 return (
                    <div 
                    key={colIndex} 
                    className={clsx(
                        "relative border-r border-slate-50 dark:border-slate-800 h-full transition-colors duration-300",
                        isSameDay(day, focusedDay) ? "bg-blue-50/10 dark:bg-blue-900/5" : ""
                    )}
                    onMouseDown={(e) => handleGridMouseDown(e, day, colIndex)}
                    >
                    {layoutEvents.map(({ event, style }) => {
                        // Check if this is the temp event
                        const isBeingInteracted = temporaryEvent && temporaryEvent.id === event.id;
                        
                        return (
                            <EventCard 
                            key={event.id} 
                            event={event} 
                            style={style}
                            pixelsPerHour={PIXELS_PER_HOUR}
                            isEditing={editingEventId === event.id}
                            onMouseDown={(e, type) => handleEventMouseDown(e, event, type)}
                            onCloseEdit={() => onEditEvent(null)}
                            onUpdate={onUpdateEvent}
                            onDelete={onDeleteEvent}
                            isDragging={isBeingInteracted}
                            />
                        );
                    })}

                    {/* Ghost Event (New Creation) */}
                    {ghostEvent && ghostEvent.colIndex === colIndex && (
                        <div 
                        className="absolute left-1 right-1 rounded bg-blue-500/20 border border-blue-500/50 z-30 pointer-events-none transition-all duration-75"
                        style={{
                        top: (getMinutesFromStartOfDay(ghostEvent.start) / 60) * PIXELS_PER_HOUR,
                        height: (differenceInMinutes(ghostEvent.end, ghostEvent.start) / 60) * PIXELS_PER_HOUR
                        }}
                    >
                        <div className="p-1 text-xs font-semibold text-blue-700 dark:text-blue-300">New Plan</div>
                    </div>
                    )}
                    </div>
                );
              })}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Layout Algorithm ---
const calculateEventLayout = (events: CalendarEvent[]) => {
    if (events.length === 0) return [];
    
    // 1. Sort events
    const sorted = [...events].sort((a, b) => {
        const startDiff = a.start.getTime() - b.start.getTime();
        if (startDiff !== 0) return startDiff;
        return b.end.getTime() - a.end.getTime();
    });

    // 2. Group into connected clusters
    const clusters: CalendarEvent[][] = [];
    let currentCluster: CalendarEvent[] = [];
    let clusterEnd = -1;

    for (const event of sorted) {
        const start = event.start.getTime();
        const end = event.end.getTime();

        if (currentCluster.length === 0) {
            currentCluster.push(event);
            clusterEnd = end;
        } else if (start < clusterEnd) {
            currentCluster.push(event);
            clusterEnd = Math.max(clusterEnd, end);
        } else {
            clusters.push(currentCluster);
            currentCluster = [event];
            clusterEnd = end;
        }
    }
    if (currentCluster.length > 0) clusters.push(currentCluster);

    // 3. Assign lanes within clusters
    const result: { event: CalendarEvent; style: { left: string; width: string } }[] = [];

    for (const cluster of clusters) {
        const columns: CalendarEvent[][] = [];
        const eventColMap = new Map<string, number>();

        for (const event of cluster) {
            let placed = false;
            for (let i = 0; i < columns.length; i++) {
                const lastInCol = columns[i][columns[i].length - 1];
                // If no overlap with last event in this column, place here
                if (lastInCol.end.getTime() <= event.start.getTime()) {
                    columns[i].push(event);
                    eventColMap.set(event.id, i);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                columns.push([event]);
                eventColMap.set(event.id, columns.length - 1);
            }
        }

        const numCols = columns.length;
        const colWidth = 100 / numCols;

        for (const event of cluster) {
            const colIndex = eventColMap.get(event.id) || 0;
            result.push({
                event,
                style: {
                    left: `${colIndex * colWidth}%`,
                    width: `${colWidth}%`
                }
            });
        }
    }

    return result;
};

const CurrentTimeLine: React.FC<{ pixelsPerHour: number, weekDays: Date[] }> = ({ pixelsPerHour, weekDays }) => {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const top = (getMinutesFromStartOfDay(now) / 60) * pixelsPerHour;
  const todayIndex = weekDays.findIndex(d => isSameDay(d, now));

  return (
    <div 
      className="absolute left-0 w-full z-20 pointer-events-none"
      style={{ top }}
    >
      <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-600" />
      {todayIndex !== -1 && (
        <div 
            className="absolute h-[2px] bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.6)] flex items-center"
            style={{ 
                left: `${(todayIndex / 7) * 100}%`, 
                width: `${100 / 7}%`,
                marginTop: '-1px'
            }}
        >
             <div className="absolute -left-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>
      )}
    </div>
  );
};

const formatTime = (d: Date) => d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

interface EventCardProps {
  event: CalendarEvent;
  style?: { left: string; width: string };
  pixelsPerHour: number;
  isEditing: boolean;
  isDragging?: boolean;
  onMouseDown: (e: React.MouseEvent, type: InteractionType) => void;
  onCloseEdit: () => void;
  onUpdate: (e: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, style, pixelsPerHour, isEditing, isDragging, onMouseDown, onCloseEdit, onUpdate, onDelete }) => {
  const top = (getMinutesFromStartOfDay(event.start) / 60) * pixelsPerHour;
  const duration = differenceInMinutes(event.end, event.start);
  const height = Math.max((duration / 60) * pixelsPerHour, 24);

  const getCategoryStyles = (cat: string) => {
      switch(cat) {
          case 'deep-work': return "bg-purple-50 border-purple-500 text-purple-900 dark:bg-purple-900/30 dark:border-purple-400 dark:text-purple-100";
          case 'meeting': return "bg-amber-50 border-amber-500 text-amber-900 dark:bg-amber-900/30 dark:border-amber-400 dark:text-amber-100";
          case 'personal': return "bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-900/30 dark:border-emerald-400 dark:text-emerald-100";
          default: return "bg-white border-blue-500 text-slate-700 dark:bg-slate-800 dark:border-blue-400 dark:text-slate-200";
      }
  }
  
  const baseStyles = getCategoryStyles(event.category);
  const springConfig = { type: 'spring', stiffness: 250, damping: 25 };

  if (!isEditing) {
    return (
      <motion.div
        layoutId={`event-${event.id}`}
        transition={springConfig}
        className={clsx(
          "absolute rounded-md px-2 py-1 text-xs shadow-sm hover:shadow-md hover:z-40 border-l-4 overflow-hidden group z-10 select-none",
          baseStyles,
          event.completed && "opacity-60 grayscale",
          isDragging && "opacity-80 shadow-xl z-50 cursor-grabbing scale-[1.02]"
        )}
        style={{ 
            top, 
            height, 
            left: style?.left || '0%', 
            width: style?.width || '100%' 
        }}
        onMouseDown={(e) => onMouseDown(e, 'move')}
      >
        {/* Resize Handles */}
        <div className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize z-20" onMouseDown={(e) => onMouseDown(e, 'resize-start')} />
        <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-20" onMouseDown={(e) => onMouseDown(e, 'resize-end')} />

        {/* Check Button (Left) */}
        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/50 dark:bg-black/20 rounded backdrop-blur-[2px] z-30">
            <button 
                className="p-1 rounded-sm hover:bg-green-500 hover:text-white text-current transition-colors"
                onClick={(e) => { e.stopPropagation(); onUpdate({...event, completed: !event.completed}); }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {event.completed ? <CheckCircle2 size={12} /> : <Check size={12} />}
            </button>
        </div>

        {/* Delete Button (Right) */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/50 dark:bg-black/20 rounded backdrop-blur-[2px] z-30">
            <button 
                className="p-1 rounded-sm hover:bg-red-500 hover:text-white text-current transition-colors"
                onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <Trash2 size={12} />
            </button>
        </div>

        <div className="font-semibold truncate pointer-events-none transition-transform duration-200 relative z-10 group-hover:translate-x-5">
           {event.completed && <span className="mr-1 line-through opacity-50">✓</span>}
           <span className={event.completed ? "line-through" : ""}>{event.title}</span>
        </div>
        
        {height > 40 && (
          <div className="opacity-70 text-[10px] flex flex-col mt-0.5 pointer-events-none group-hover:opacity-40 transition-opacity">
            <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
            {event.meetingLink && <span className="flex items-center gap-1 mt-1"><Video size={10}/> Join Meet</span>}
          </div>
        )}
      </motion.div>
    );
  }

  // Expanded Edit View
  return (
    <motion.div
      layoutId={`event-${event.id}`}
      transition={springConfig}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="absolute left-1 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden flex flex-col z-50"
      style={{ 
        top: Math.max(top - 20, 10), 
        height: 'auto', 
        minHeight: Math.max(height + 100, 250),
        width: '280px'
      }}
    >
        <div className={clsx("h-2 w-full", baseStyles.split(' ')[0], baseStyles.split(' ')[1].replace('border', 'bg'))} />

        <div className="p-4 flex flex-col gap-4 h-full relative">
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors z-50"
            >
                <Trash2 size={16} />
            </button>

            <div className="mt-2">
               <input 
                 autoFocus
                 className={clsx(
                     "w-full text-lg font-bold bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors text-slate-800 dark:text-white pb-1",
                     event.completed && "line-through text-slate-400"
                 )}
                 value={event.title}
                 onChange={(e) => onUpdate({...event, title: e.target.value})}
               />
            </div>

            <div className="flex gap-2">
                {(['work', 'meeting', 'deep-work', 'personal'] as const).map(cat => (
                    <button 
                      key={cat}
                      onClick={() => onUpdate({...event, category: cat})}
                      className={clsx(
                          "w-6 h-6 rounded-full border-2 transition-all",
                          event.category === cat ? "scale-110 ring-2 ring-offset-1 ring-slate-400 border-transparent" : "border-transparent opacity-50 hover:opacity-100",
                          cat === 'work' ? "bg-blue-500" : cat === 'meeting' ? "bg-amber-500" : cat === 'deep-work' ? "bg-purple-500" : "bg-emerald-500"
                      )}
                    />
                ))}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">{formatTime(event.start)}</span>
                    <span>-</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">{formatTime(event.end)}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
               <Users size={14} className="text-slate-400" />
               <input 
                  className="flex-1 bg-transparent text-xs focus:outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400"
                  placeholder="Add invitees (comma separated)"
                  value={event.invitees?.join(', ') || ''}
                  onChange={(e) => onUpdate({...event, invitees: e.target.value.split(',').map(s => s.trim())})}
               />
            </div>

            <button 
               onClick={() => {
                   if (event.meetingLink) {
                        navigator.clipboard.writeText(event.meetingLink);
                        // Could add toast here
                   } else {
                       onUpdate({...event, meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`});
                   }
               }}
               className={clsx(
                   "flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all group",
                   event.meetingLink ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300" : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-400"
               )}
            >
               {event.meetingLink ? <Copy size={14} /> : <Video size={14} />}
               {event.meetingLink ? "Copy Meeting Link" : "Add Google Meet"}
            </button>

            <div className="flex items-center justify-end mt-auto pt-2">
                 <button 
                   onClick={() => {
                       onUpdate({...event, completed: !event.completed});
                       onCloseEdit();
                   }}
                   className={clsx(
                       "flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold transition-colors",
                       event.completed 
                         ? "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                         : "bg-blue-600 text-white hover:bg-blue-700"
                   )}
                 >
                    {event.completed ? "Mark Incomplete" : "Complete Task"}
                    <Check size={14} />
                 </button>
            </div>
        </div>
    </motion.div>
  );
};

export default Calendar;
