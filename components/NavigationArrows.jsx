import React from 'react';

/**
 * Navigation arrows for scrolling between sections
 * Visibility controlled by scroll position (hide at top/bottom)
 */
export const NavigationArrows = ({ isAtTop, isAtBottom, onNavigate }) => {
  return (
    <>
      {/* Up Arrow */}
      <button
        onClick={() => onNavigate('up')}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 group transition-all duration-300 hover:scale-110"
        style={{ 
          zIndex: 50,
          opacity: isAtTop ? 0 : 1,
          pointerEvents: isAtTop ? 'none' : 'auto'
        }}
        aria-label="Navigate up"
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-colors duration-150"
            style={{ color: '#666' }}
          >
            <polyline 
              points="18 15 12 9 6 15" 
              className="group-hover:stroke-black transition-colors duration-150"
            />
          </svg>
        </div>
      </button>

      {/* Down Arrow */}
      <button
        onClick={() => onNavigate('down')}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 group transition-all duration-300 hover:scale-110"
        style={{ 
          zIndex: 50,
          opacity: isAtBottom ? 0 : 1,
          pointerEvents: isAtBottom ? 'none' : 'auto'
        }}
        aria-label="Navigate down"
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-colors duration-150"
            style={{ color: '#666' }}
          >
            <polyline 
              points="6 9 12 15 18 9" 
              className="group-hover:stroke-black transition-colors duration-150"
            />
          </svg>
        </div>
      </button>
    </>
  );
};
