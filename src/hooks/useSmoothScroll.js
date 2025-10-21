import { useRef } from 'react';

/**
 * Provides smooth scrolling functionality using native browser APIs
 * NO state management - just scrolling actions
 * IntersectionObserver (in useScrollSpy) is the ONLY source of truth for activeSection
 * Momentum feature: rapid clicks scroll further (using refs to avoid re-renders)
 */
export const useSmoothScroll = () => {
  const lastArrowClick = useRef({ direction: null, time: 0 });

  // Scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 40;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Use native smooth scroll - respects user preferences and browser optimizations
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Navigate with arrows - with momentum (rapid clicks scroll further)
  const navigateWithArrow = (direction, allSectionIds, currentSectionId) => {
    const currentIndex = allSectionIds.indexOf(currentSectionId);
    const now = Date.now();
    const timeSinceLastClick = now - lastArrowClick.current.time;
    const isSameDirection = lastArrowClick.current.direction === direction;
    
    // Momentum: if rapid click in same direction (< 500ms), skip a section
    const skipCount = (timeSinceLastClick < 500 && isSameDirection) ? 2 : 1;
    
    let targetIndex;
    if (direction === 'down') {
      targetIndex = Math.min(currentIndex + skipCount, allSectionIds.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - skipCount, 0);
    }
    
    lastArrowClick.current = { direction, time: now };
    
    if (targetIndex === currentIndex) return;
    
    const targetElement = document.getElementById(allSectionIds[targetIndex]);
    if (targetElement) {
      const offset = 40;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      // Just scroll - let IntersectionObserver update activeSection
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { scrollToSection, navigateWithArrow };
};
