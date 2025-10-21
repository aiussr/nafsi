import React from 'react';
import { ChapterNav } from './ChapterNav';

/**
 * Fixed left sidebar containing course title and chapter navigation
 * Responsive: slides in from left on mobile, always visible on desktop (lg+)
 */
export const Sidebar = ({
  chapters,
  activeSection,
  expandedChapters,
  onToggleChapter,
  onNavigate,
  subChapterTransition,
  justExpanded,
  isMobileMenuOpen
}) => {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen w-80 overflow-y-auto border-r
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        p-6 sm:p-8 lg:p-12
      `}
      style={{
        backgroundColor: '#FDFCF9',
        borderRightWidth: '1px',
        borderRightColor: '#1a1a1a',
        borderRightStyle: 'solid',
        zIndex: 50
      }}
    >
      <h1 className="text-xl sm:text-2xl font-light tracking-tight mb-2" style={{ color: '#1a1a1a' }}>
        Course Title
      </h1>
      <p className="text-xs sm:text-sm mb-8 sm:mb-12 lg:mb-16 font-light" style={{ color: '#666' }}>
        A journey through knowledge
      </p>

      <nav className="space-y-6 sm:space-y-8">
        {chapters.map(chapter => (
          <ChapterNav
            key={chapter.id}
            chapter={chapter}
            chapters={chapters}
            activeSection={activeSection}
            isExpanded={expandedChapters[chapter.id]}
            onToggle={onToggleChapter}
            onNavigate={onNavigate}
            subChapterTransition={subChapterTransition}
            justExpanded={justExpanded[chapter.id]}
          />
        ))}
      </nav>
    </aside>
  );
};
