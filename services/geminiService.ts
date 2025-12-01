
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Task, ModuleType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBreakdown = async (
  topic: string, 
  module: ModuleType
): Promise<{ title: string; duration: number }[]> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    I am a university student studying ${module}.
    Break down the topic "${topic}" into 3-5 specific, small, actionable study tasks.
    Estimate time in hours (0.5 to 2.5) for each.
    Return strictly JSON.
  `;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Actionable task name" },
        duration: { type: Type.NUMBER, description: "Hours (decimal)" },
      },
      required: ["title", "duration"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini breakdown error:", error);
    return [];
  }
};

export const suggestSchedule = async (
  tasks: Task[],
  availableDates: string[] // List of valid YYYY-MM-DD strings for the current view
): Promise<Task[]> => {
  const model = "gemini-2.5-flash";

  // Only schedule backlog tasks
  const backlogTasks = tasks.filter(t => !t.date);
  if (backlogTasks.length === 0) return tasks;

  // Existing schedule context
  const existingSchedule = tasks
    .filter(t => t.date && availableDates.includes(t.date))
    .map(t => ({ date: t.date, duration: t.duration, module: t.module }));

  const prompt = `
    I have study tasks to schedule for a university student.
    
    Tasks to Schedule:
    ${JSON.stringify(backlogTasks.map(t => ({ id: t.id, title: t.title, module: t.module, duration: t.duration, type: t.type })))}

    Available Dates: ${JSON.stringify(availableDates)}

    Current Workload on Dates:
    ${JSON.stringify(existingSchedule)}

    Rules:
    1. Distribute the tasks across the Available Dates.
    2. Avoid overloading a single day (max ~6-8 hours).
    3. Group similar modules if it makes sense, but allow variety.
    4. Prioritize exams and coursework earlier if implied, but spread evenly otherwise.
    5. Return a JSON array of objects with "id" and "date".
  `;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        date: { type: Type.STRING }, // YYYY-MM-DD
      },
      required: ["id", "date"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (response.text) {
      const assignments = JSON.parse(response.text) as { id: string; date: string }[];
      
      return tasks.map(t => {
        const assign = assignments.find(a => a.id === t.id);
        if (assign) {
          return { ...t, date: assign.date };
        }
        return t;
      });
    }
    return tasks;
  } catch (error) {
    console.error("Gemini schedule error:", error);
    return tasks;
  }
};