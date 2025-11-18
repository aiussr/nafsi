import { startOfWeek, addDays, format, startOfDay, isSameDay, getHours, getMinutes, setHours, setMinutes } from 'date-fns';

export const getWeekDays = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
  return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
};

export const formatTime = (date: Date) => format(date, 'h:mm a');
export const formatDayHeader = (date: Date) => format(date, 'EEE');
export const formatDayNumber = (date: Date) => format(date, 'd');

export const roundToNearest5Minutes = (date: Date): Date => {
  const minutes = getMinutes(date);
  const rounded = Math.round(minutes / 5) * 5;
  return setMinutes(date, rounded);
};

export const getMinutesFromStartOfDay = (date: Date) => {
  return getHours(date) * 60 + getMinutes(date);
};
