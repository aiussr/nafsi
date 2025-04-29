// src/utils/dataUtils.js

/**
 * Shuffle an array using Fisher-Yates algorithm (optimized version)
 * This is more random and performant than sorting with Math.random()
 * @param {Array} array - array to shuffle
 * @returns {Array} shuffled array
 */
export const shuffleArray = (array) => {
  // Create a copy to avoid mutating the original array
  const newArray = [...array];
  let currentIndex = newArray.length;
  let randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element (destructuring swap)
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]
    ];
  }

  return newArray;
};

/**
 * Get flashcards by week from the flashcard dataset
 * @param {string} week - week identifier (week1, week2, week3, all)
 * @param {Array} cards - full set of flashcards
 * @returns {Array} filtered flashcards
 */
export const getCardsByWeek = (week, cards) => {
  if (!cards || !Array.isArray(cards)) return [];
  
  if (week === 'all') {
    return [...cards];
  }
  
  return cards.filter(card => card.week === week);
};

/**
 * Get flashcards by category from the flashcard dataset
 * @param {string} category - category name
 * @param {Array} cards - full set of flashcards
 * @returns {Array} filtered flashcards
 */
export const getCardsByCategory = (category, cards) => {
  if (!cards || !Array.isArray(cards) || !category) return [];
  
  return cards.filter(card => card.category === category);
};

/**
 * Get a random subset of flashcards
 * @param {Array} cards - array of flashcards
 * @param {number} count - number of cards to return
 * @returns {Array} random subset of cards
 */
export const getRandomCards = (cards, count) => {
  if (!cards || !Array.isArray(cards)) return [];
  
  if (count >= cards.length) {
    return shuffleArray(cards);
  }
  
  return shuffleArray(cards).slice(0, count);
};

/**
 * Format cards for revision mode
 * @param {Array} cards - array of flashcards
 * @returns {Array} formatted cards for revision
 */
export const formatForRevision = (cards) => {
  if (!cards || !Array.isArray(cards)) return [];
  
  return cards.map(card => ({
    id: card.id,
    question: card.arabic,
    answer: `${card.english}\n${card.reference}`,
    week: card.week,
    category: card.category
  }));
};

/**
 * Format cards for learning mode
 * @param {Array} cards - array of flashcards
 * @returns {Array} formatted cards for learning
 */
export const formatForLearning = (cards) => {
  if (!cards || !Array.isArray(cards)) return [];
  
  return cards.map(card => ({
    id: card.id,
    front: card.arabic,
    back: card.english,
    reference: card.reference,
    week: card.week,
    category: card.category
  }));
};

/**
 * Group flashcards by category
 * @param {Array} cards - array of flashcards
 * @returns {Object} cards grouped by category
 */
export const groupCardsByCategory = (cards) => {
  if (!cards || !Array.isArray(cards)) return {};
  
  const grouped = {};
  
  cards.forEach(card => {
    if (!grouped[card.category]) {
      grouped[card.category] = [];
    }
    
    grouped[card.category].push(card);
  });
  
  return grouped;
};

/**
 * Store user progress in localStorage
 * @param {Array} cardIds - IDs of cards to save
 * @param {string} key - localStorage key
 */
export const saveProgress = (cardIds, key = 'completedCardIds') => {
  if (!cardIds || !Array.isArray(cardIds)) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(cardIds));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

/**
 * Retrieve user progress from localStorage
 * @param {string} key - localStorage key
 * @returns {Array} array of card IDs or empty array if not found
 */
export const getProgress = (key = 'completedCardIds') => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error retrieving progress:', error);
    return [];
  }
};

/**
 * Get unique categories from a set of flashcards
 * @param {Array} cards - array of flashcards
 * @returns {Array} unique categories
 */
export const getUniqueCategories = (cards) => {
  if (!cards || !Array.isArray(cards)) return [];
  
  return [...new Set(cards.map(card => card.category))];
};

/**
 * Chunking utility to break large arrays into smaller pieces for rendering
 * Helps prevent UI freezing with large datasets
 * @param {Array} array - array to chunk
 * @param {number} size - size of each chunk
 * @returns {Array} array of chunks
 */
export const chunkArray = (array, size = 50) => {
  if (!array || !Array.isArray(array)) return [];
  
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Deep memoization function for expensive operations
 * @param {Function} fn - function to memoize
 * @returns {Function} memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Memoized versions of common functions for performance
export const memoizedGetCardsByWeek = memoize(getCardsByWeek);
export const memoizedGetCardsByCategory = memoize(getCardsByCategory);
export const memoizedGroupCardsByCategory = memoize(groupCardsByCategory);
