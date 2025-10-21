import { useState, useEffect } from 'react';
import { getSubChapterOrder } from '../data/chapters';

/**
 * Manages chapter navigation state including:
 * - Which chapters are expanded
 * - Sub-chapter transition animations
 * - Tracking when chapters were just expanded (for animation control)
 */
export const useChapterNavigation = (chapters, activeSection) => {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [previousSubChapter, setPreviousSubChapter] = useState(null);
  const [subChapterTransition, setSubChapterTransition] = useState({ 
    direction: null, 
    isTransitioning: false 
  });
  const [justExpanded, setJustExpanded] = useState({});

  // Handle sub-chapter transition animation
  useEffect(() => {
    if (previousSubChapter && previousSubChapter !== activeSection) {
      const prevOrder = getSubChapterOrder(chapters, previousSubChapter);
      const currOrder = getSubChapterOrder(chapters, activeSection);
      
      if (prevOrder !== -1 && currOrder !== -1) {
        const direction = currOrder > prevOrder ? 'up' : 'down';
        setSubChapterTransition({ direction, isTransitioning: true });
        
        setTimeout(() => {
          setSubChapterTransition({ direction: null, isTransitioning: false });
        }, 180);
      }
    }
    setPreviousSubChapter(activeSection);
  }, [activeSection, chapters, previousSubChapter]);

  // Toggle chapter expansion
  const toggleChapter = (chapterId) => {
    const willBeExpanded = !expandedChapters[chapterId];
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
    
    // Track that we just expanded to trigger animation
    if (willBeExpanded) {
      setJustExpanded(prev => ({ ...prev, [chapterId]: true }));
      setTimeout(() => {
        setJustExpanded(prev => ({ ...prev, [chapterId]: false }));
      }, 300);
    }
  };

  return {
    expandedChapters,
    toggleChapter,
    subChapterTransition,
    justExpanded
  };
};
