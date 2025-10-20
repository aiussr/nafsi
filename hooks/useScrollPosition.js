import { useState, useEffect } from 'react';

/**
 * Tracks whether the user is at the top or bottom of the page
 * Used to show/hide navigation arrows
 */
export const useScrollPosition = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      setIsAtTop(scrollTop < 10);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };
    
    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  return { isAtTop, isAtBottom };
};
