import React from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { NavigationArrows } from './components/NavigationArrows';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useChapterNavigation } from './hooks/useChapterNavigation';
import { chapters } from './data/chapters';
import { getAllSectionIds } from './data/chapters';
import './styles/animations.css';

/**
 * Main orchestrator component
 * Composing hooks and components without implementation details
 */
const ElegantCourse = () => {
  // Single source of truth for active section (via IntersectionObserver)
  const activeSection = useScrollSpy(chapters);
  
  // Track scroll position for arrow visibility
  const { isAtTop, isAtBottom } = useScrollPosition();
  
  // Scroll functionality (no state management, just actions)
  const { scrollToSection, navigateWithArrow } = useSmoothScroll();
  
  // Sidebar navigation state
  const {
    expandedChapters,
    toggleChapter,
    subChapterTransition,
    justExpanded
  } = useChapterNavigation(chapters, activeSection);

  // Handler for arrow navigation
  const handleArrowNavigation = (direction) => {
    const allSectionIds = getAllSectionIds(chapters);
    navigateWithArrow(direction, allSectionIds, activeSection);
  };

  return (
    <div 
      className="relative min-h-screen" 
      style={{ 
        backgroundColor: '#FDFCF9', 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' 
      }}
    >
      {/* Background layers */}
      <ParticleCanvas />
      
      {/* Navigation arrows */}
      <NavigationArrows 
        isAtTop={isAtTop} 
        isAtBottom={isAtBottom}
        onNavigate={handleArrowNavigation}
      />

      {/* Main layout */}
      <div className="relative flex" style={{ zIndex: 2 }}>
        <Sidebar 
          chapters={chapters}
          activeSection={activeSection}
          expandedChapters={expandedChapters}
          onToggleChapter={toggleChapter}
          onNavigate={scrollToSection}
          subChapterTransition={subChapterTransition}
          justExpanded={justExpanded}
        />
        <MainContent />
      </div>
    </div>
  );
};

export default ElegantCourse;
