import React, { memo } from 'react';
import { getParentChapterId } from '../data/chapters';
import '../styles/animations.css';

/**
 * Individual chapter navigation item
 * Handles both simple chapters and chapters with sub-chapters
 * Memoized to prevent unnecessary re-renders
 */
const ChapterNavComponent = ({ 
  chapter, 
  chapters,
  activeSection, 
  isExpanded, 
  onToggle, 
  onNavigate,
  subChapterTransition,
  justExpanded
}) => {
  const hasSubChapters = chapter.subChapters && chapter.subChapters.length > 0;
  const isParentActive = hasSubChapters 
    ? getParentChapterId(chapters, activeSection) === chapter.id 
    : activeSection === chapter.id;
  
  if (hasSubChapters) {
    const activeSubChapter = chapter.subChapters.find(sub => sub.id === activeSection);
    
    return (
      <div className="w-full">
        <button
          onClick={() => onToggle(chapter.id)}
          className="block w-full text-left group transition-all duration-150"
          aria-expanded={isExpanded}
        >
          <div className={`pb-3 border-b transition-all duration-150 ${
            isParentActive ? 'border-black' : 'border-transparent group-hover:border-gray-300'
          }`} style={{
            borderBottomWidth: isParentActive ? '2px' : '1px'
          }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`text-base font-light tracking-wide transition-colors duration-150 ${
                  isParentActive ? 'text-black' : 'text-gray-600 group-hover:text-black'
                }`}>
                  {chapter.title}
                </div>
                <div className="text-xs mt-1 font-light" style={{ color: '#999' }}>
                  {chapter.subtitle}
                </div>
              </div>
              <div className={`text-xs ml-2 transition-transform duration-250 ease-out ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`} style={{ color: '#999' }}>
                ▼
              </div>
            </div>
          </div>
        </button>
        
        {/* Sub-chapters container */}
        <div 
          className="overflow-hidden transition-all duration-250 ease-out"
          style={{
            maxHeight: isExpanded ? '400px' : (isParentActive ? '52px' : '0px')
          }}
        >
          <div className="pt-3">
            {isExpanded ? (
              // Expanded view - show all sub-chapters
              <div className="space-y-2">
                {chapter.subChapters.map((sub, index) => (
                  <button
                    key={sub.id}
                    onClick={() => onNavigate(sub.id)}
                    className="block w-full text-left pl-4 py-1.5 group transition-all duration-150"
                    style={justExpanded ? {
                      opacity: 0,
                      animation: `fadeIn 200ms ease-out ${index * 40}ms forwards`
                    } : {}}
                  >
                    <div className={`text-sm font-light transition-colors duration-150 ${
                      activeSection === sub.id ? 'text-black' : 'text-gray-500 group-hover:text-gray-800'
                    }`}>
                      {sub.title}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Compact view - show only active with animation
              <div className="relative overflow-hidden" style={{ height: '40px' }}>
                {activeSubChapter && (
                  <div
                    key={activeSection}
                    className="absolute inset-0 flex items-center"
                    style={{
                      animation: subChapterTransition.isTransitioning
                        ? `slideIn${subChapterTransition.direction === 'up' ? 'Up' : 'Down'} 180ms ease-out`
                        : 'none'
                    }}
                  >
                    <button
                      onClick={() => onNavigate(activeSubChapter.id)}
                      className="w-full text-left pl-4 py-2"
                    >
                      <span className="text-sm font-light text-black">
                        {activeSubChapter.title}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Regular chapter without sub-chapters
  return (
    <button
      onClick={() => onNavigate(chapter.id)}
      className="block w-full text-left group transition-all duration-150"
    >
      <div className={`pb-3 border-b transition-all duration-150 ${
        isParentActive ? 'border-black' : 'border-transparent group-hover:border-gray-300'
      }`} style={{
        borderBottomWidth: isParentActive ? '2px' : '1px'
      }}>
        <div className={`text-base font-light tracking-wide transition-colors duration-150 ${
          isParentActive ? 'text-black' : 'text-gray-600 group-hover:text-black'
        }`}>
          {chapter.title}
        </div>
        <div className="text-xs mt-1 font-light" style={{ color: '#999' }}>
          {chapter.subtitle}
        </div>
      </div>
    </button>
  );
};

// Memoize to prevent unnecessary re-renders
export const ChapterNav = memo(ChapterNavComponent);
