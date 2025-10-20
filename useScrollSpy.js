import { useState, useEffect } from 'react';
import { getAllSectionIds } from '../data/chapters';

/**
 * Tracks which section is currently visible using IntersectionObserver
 * This is the SINGLE SOURCE OF TRUTH for activeSection
 * Improved to track intersection ratios and pick the MOST visible section
 * This prevents the bug where scrolling back doesn't update the active section
 */
export const useScrollSpy = (chapters) => {
  const [activeSection, setActiveSection] = useState(() => {
    const allIds = getAllSectionIds(chapters);
    return allIds[0] || null;
  });

  useEffect(() => {
    const allSectionIds = getAllSectionIds(chapters);
    const intersectionRatios = new Map(); // Track which sections are visible and how much

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectionRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            intersectionRatios.delete(entry.target.id);
          }
        });
        
        // Pick the section with the HIGHEST intersection ratio (most visible)
        if (intersectionRatios.size > 0) {
          let mostVisible = null;
          let highestRatio = 0;
          
          intersectionRatios.forEach((ratio, id) => {
            if (ratio > highestRatio) {
              highestRatio = ratio;
              mostVisible = id;
            }
          });
          
          if (mostVisible) {
            setActiveSection(mostVisible);
          }
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-40px' 
      }
    );

    allSectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [chapters]);

  return activeSection;
};
