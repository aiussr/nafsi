import { Task, ModuleType } from "../types";

export const generateBreakdown = async (
  topic: string,
  module: ModuleType
): Promise<{ title: string; duration: number }[]> => {

  // Simulate async for UI consistency
  await new Promise(resolve => setTimeout(resolve, 800));

  const subtasks: { title: string; duration: number }[] = [];

  const phases = [
    "Review fundamentals",
    "Work through examples",
    "Practice problems",
    "Review and consolidate"
  ];

  const numTasks = 3 + Math.floor(Math.random() * 2);
  const baseDuration = 1.5;

  for (let i = 0; i < numTasks; i++) {
    const phase = phases[i % phases.length];
    subtasks.push({
      title: `${phase}: ${topic}`,
      duration: baseDuration + (Math.random() * 0.5 - 0.25)
    });
  }

  return subtasks;
};

export const suggestSchedule = async (
  tasks: Task[],
  availableDates: string[]
): Promise<Task[]> => {

  await new Promise(resolve => setTimeout(resolve, 1000));

  const backlogTasks = tasks.filter(t => !t.date);
  if (backlogTasks.length === 0) return tasks;

  const dateLoads = new Map<string, number>();
  availableDates.forEach(date => dateLoads.set(date, 0));

  tasks
    .filter(t => t.date && availableDates.includes(t.date))
    .forEach(t => {
      const current = dateLoads.get(t.date!) || 0;
      dateLoads.set(t.date!, current + t.duration);
    });

  const sortedTasks = [...backlogTasks].sort((a, b) => {
    if (a.type === 'exam' && b.type !== 'exam') return -1;
    if (b.type === 'exam' && a.type !== 'exam') return 1;
    if (a.type === 'coursework' && b.type === 'study') return -1;
    if (b.type === 'coursework' && a.type === 'study') return 1;
    return b.duration - a.duration;
  });

  const MAX_DAILY_HOURS = 7;
  const assignments = new Map<string, string>();

  sortedTasks.forEach(task => {
    let bestDate: string | null = null;
    let minLoad = Infinity;

    for (const date of availableDates) {
      const currentLoad = dateLoads.get(date) || 0;
      if (currentLoad + task.duration <= MAX_DAILY_HOURS && currentLoad < minLoad) {
        minLoad = currentLoad;
        bestDate = date;
      }
    }

    if (!bestDate) {
      bestDate = Array.from(dateLoads.entries())
        .sort((a, b) => a[1] - b[1])[0][0];
    }

    assignments.set(task.id, bestDate);
    dateLoads.set(bestDate, (dateLoads.get(bestDate) || 0) + task.duration);
  });

  return tasks.map(t => {
    const assignedDate = assignments.get(t.id);
    if (assignedDate) {
      return { ...t, date: assignedDate };
    }
    return t;
  });
};