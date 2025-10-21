export const chapters = [
  { 
    id: 'intro', 
    title: 'Introduction', 
    subtitle: 'Beginning the journey',
    subChapters: [
      { id: 'intro-welcome', title: 'Welcome', order: 0 },
      { id: 'intro-context', title: 'Setting Context', order: 1 },
      { id: 'intro-framework', title: 'Framework', order: 2 }
    ]
  },
  { 
    id: 'foundations', 
    title: 'Foundations', 
    subtitle: 'Core principles' 
  },
  { 
    id: 'practice', 
    title: 'Practice', 
    subtitle: 'Applied learning' 
  },
  { 
    id: 'mastery', 
    title: 'Mastery', 
    subtitle: 'Advanced concepts',
    subChapters: [
      { id: 'mastery-complexity', title: 'Complexity', order: 0 },
      { id: 'mastery-integration', title: 'Integration', order: 1 }
    ]
  },
  { 
    id: 'synthesis', 
    title: 'Synthesis', 
    subtitle: 'Integration',
    subChapters: [
      { id: 'synthesis-convergence', title: 'Convergence', order: 0 },
      { id: 'synthesis-application', title: 'Application', order: 1 }
    ]
  }
];

// Helper: Get all section IDs in order
export const getAllSectionIds = (chapters) => {
  const sections = [];
  chapters.forEach(chapter => {
    if (chapter.subChapters) {
      chapter.subChapters.forEach(sub => sections.push(sub.id));
    } else {
      sections.push(chapter.id);
    }
  });
  return sections;
};

// Helper: Get parent chapter ID from sub-chapter
export const getParentChapterId = (chapters, subChapterId) => {
  for (const chapter of chapters) {
    if (chapter.subChapters && chapter.subChapters.some(s => s.id === subChapterId)) {
      return chapter.id;
    }
  }
  return null;
};

// Helper: Get sub-chapter order
export const getSubChapterOrder = (chapters, subChapterId) => {
  for (const chapter of chapters) {
    if (chapter.subChapters) {
      const sub = chapter.subChapters.find(s => s.id === subChapterId);
      if (sub) return sub.order;
    }
  }
  return -1;
};
