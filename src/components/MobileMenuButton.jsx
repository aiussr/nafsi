import React from 'react';

/**
 * Hamburger menu button for mobile navigation
 * Only visible on mobile screens (hidden on lg and above)
 * Auto-hides on scroll down, reappears on scroll up
 */
export const MobileMenuButton = ({ isOpen, onToggle, isVisible }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-6 left-6 z-50 lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <span
        className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
};
