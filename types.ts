
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  category: 'work' | 'personal' | 'deep-work' | 'meeting';
  invitees?: string[];
  meetingLink?: string;
  completed?: boolean;
}

export interface Objective {
  id: string;
  date: Date; // The day this objective belongs to
  title: string;
  completed: boolean;
  history: HistoryEntry[];
}

export interface WeeklyGoal {
  id: string;
  title: string;
  completed: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  content: string;
  type: 'note' | 'update';
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
}

export type PaneState = {
  isWorkbenchOpen: boolean;
  isDeepDiveOpen: boolean;
};

export type LayoutSide = 'left' | 'right';

export type DragState = {
  isDragging: boolean;
  startPos: { x: number; y: number } | null;
  startTime: Date | null;
  currentEndTime: Date | null;
};
