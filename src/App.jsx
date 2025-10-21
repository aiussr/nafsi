import React, { useState, useEffect } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { NavigationArrows } from './components/NavigationArrows';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { MobileMenuButton } from './components/MobileMenuButton';
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
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hamburger visibility state (hide on scroll down, show on scroll up)
  const [showHamburger, setShowHamburger] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Handler for navigation click - close mobile menu after navigation
  const handleNavigate = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Scroll detection for hamburger visibility (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show at top of page
        setShowHamburger(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show hamburger
        setShowHamburger(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide hamburger
        setShowHamburger(false);
        setIsMobileMenuOpen(false); // Also close menu if open
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

      {/* Mobile menu button - hides on scroll down, shows on scroll up */}
      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isVisible={showHamburger}
      />

      {/* Navigation arrows - hidden on mobile, visible on desktop only */}
      <div className="hidden lg:block">
        <NavigationArrows
          isAtTop={isAtTop}
          isAtBottom={isAtBottom}
          onNavigate={handleArrowNavigation}
        />
      </div>

      {/* Main layout */}
      <div className="relative flex" style={{ zIndex: 2 }}>
        <Sidebar
          chapters={chapters}
          activeSection={activeSection}
          expandedChapters={expandedChapters}
          onToggleChapter={toggleChapter}
          onNavigate={handleNavigate}
          subChapterTransition={subChapterTransition}
          justExpanded={justExpanded}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <MainContent />
      </div>
    </div>
  );
};

export default ElegantCourse;
