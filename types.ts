
export type ModuleType = 'probability' | 'statistics' | 'gametheory' | 'general';
export type TaskType = 'study' | 'coursework' | 'exam';

export interface Task {
  id: string;
  title: string;
  module: ModuleType;
  type: TaskType;
  duration: number; // in hours (estimated)
  date: string | null; // ISO Date string 'YYYY-MM-DD' or null (backlog)
  notes?: string;
  isAiGenerated?: boolean;
}

export interface ModuleConfig {
  id: ModuleType;
  label: string;
  color: string;
  bg: string;
  border: string;
  hover: string;
  lightBg: string; // For calendar background
}

export const MODULES: Record<ModuleType, ModuleConfig> = {
  probability: {
    id: 'probability',
    label: 'Probability',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-50',
    lightBg: 'bg-blue-50/50',
  },
  statistics: {
    id: 'statistics',
    label: 'Statistics',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    border: 'border-emerald-200',
    hover: 'hover:bg-emerald-50',
    lightBg: 'bg-emerald-50/50',
  },
  gametheory: {
    id: 'gametheory',
    label: 'Game Theory',
    color: 'text-rose-700',
    bg: 'bg-rose-100',
    border: 'border-rose-200',
    hover: 'hover:bg-rose-50',
    lightBg: 'bg-rose-50/50',
  },
  general: {
    id: 'general',
    label: 'General',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    hover: 'hover:bg-slate-50',
    lightBg: 'bg-slate-50/50',
  },
};