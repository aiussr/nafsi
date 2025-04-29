// src/context/StudyContext.js

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { 
  shuffleArray, 
  formatForRevision, 
  formatForLearning,
  groupCardsByCategory,
  getCardsByWeek,
  saveProgress,
  getProgress,
  memoizedGetCardsByWeek,
  memoizedGroupCardsByCategory
} from '../utils/dataUtils';
import { flashcardsData, categories } from '../data/flashcards';

// Initial state
const initialState = {
  section: null, // 'revision' or 'learning'
  revisionMode: null, // 'week1', 'week2', 'week3', 'all'
  learningMode: null, // 'week1', 'week2', 'week3'
  revisionCards: [],
  learningCards: {},
  currentCategory: null,
  loading: false,
  error: null,
  completedCardIds: [], // For tracking progress
  stats: {
    totalCards: flashcardsData.length,
    completedCards: 0,
    mastered: 0,
    needReview: 0
  }
};

// Action types
const SET_SECTION = 'SET_SECTION';
const SET_REVISION_MODE = 'SET_REVISION_MODE';
const SET_LEARNING_MODE = 'SET_LEARNING_MODE';
const SET_REVISION_CARDS = 'SET_REVISION_CARDS';
const SET_LEARNING_CARDS = 'SET_LEARNING_CARDS';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_COMPLETED_CARDS = 'SET_COMPLETED_CARDS';
const ADD_COMPLETED_CARD = 'ADD_COMPLETED_CARD';
const UPDATE_STATS = 'UPDATE_STATS';
const RESET_STATE = 'RESET_STATE';

// Reducer function
const studyReducer = (state, action) => {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };
      
    case SET_REVISION_MODE:
      return { ...state, revisionMode: action.payload };
      
    case SET_LEARNING_MODE:
      return { ...state, learningMode: action.payload };
      
    case SET_REVISION_CARDS:
      return { ...state, revisionCards: action.payload };
      
    case SET_LEARNING_CARDS:
      return { ...state, learningCards: action.payload };
      
    case SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
      
    case SET_LOADING:
      return { ...state, loading: action.payload };
      
    case SET_ERROR:
      return { ...state, error: action.payload };
      
    case SET_COMPLETED_CARDS:
      return { ...state, completedCardIds: action.payload };
      
    case ADD_COMPLETED_CARD:
      // Only add if not already in the array
      if (state.completedCardIds.includes(action.payload)) {
        return state;
      }
      return { 
        ...state, 
        completedCardIds: [...state.completedCardIds, action.payload]
      };
      
    case UPDATE_STATS:
      return { ...state, stats: action.payload };
      
    case RESET_STATE:
      // Keep completed cards and stats when resetting other state
      return { 
        ...initialState,
        completedCardIds: state.completedCardIds,
        stats: state.stats
      };
      
    default:
      return state;
  }
};

// Create context
const StudyContext = createContext();

// Context provider
export const StudyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studyReducer, initialState);

  // Load completed cards from localStorage on initial load
  useEffect(() => {
    const savedCompletedCards = getProgress('completedCardIds');
    if (savedCompletedCards.length > 0) {
      dispatch({ type: SET_COMPLETED_CARDS, payload: savedCompletedCards });
    }
  }, []);

  // Update stats whenever completedCardIds changes
  useEffect(() => {
    const { completedCardIds } = state;
    
    // Update stats
    const totalCards = flashcardsData.length;
    const completedCards = completedCardIds.length;
    
    // Simple algorithm to track mastery (70% of cards)
    const mastered = Math.floor(completedCards * 0.7);
    const needReview = completedCards - mastered;
    
    dispatch({
      type: UPDATE_STATS,
      payload: {
        totalCards,
        completedCards,
        mastered,
        needReview
      }
    });
    
    // Save progress to localStorage
    saveProgress(completedCardIds, 'completedCardIds');
  }, [state.completedCardIds]);

  // Helper actions
  const setSection = (section) => {
    dispatch({ type: SET_SECTION, payload: section });
  };

  const setRevisionMode = (mode) => {
    dispatch({ type: SET_REVISION_MODE, payload: mode });
    
    // Load cards for revision
    if (mode) {
      dispatch({ type: SET_LOADING, payload: true });
      
      // Use setTimeout to prevent UI blocking with large datasets
      setTimeout(() => {
        try {
          // Get cards for the selected week or all weeks
          const filteredCards = memoizedGetCardsByWeek(mode, flashcardsData);
          
          // Format cards for revision
          const formattedCards = formatForRevision(filteredCards);
          
          // Shuffle cards and set state
          dispatch({ 
            type: SET_REVISION_CARDS, 
            payload: shuffleArray(formattedCards) 
          });
        } catch (error) {
          dispatch({ 
            type: SET_ERROR, 
            payload: 'Failed to load revision cards' 
          });
          console.error('Error loading revision cards:', error);
        } finally {
          dispatch({ type: SET_LOADING, payload: false });
        }
      }, 0);
    }
  };

  const setLearningMode = (mode) => {
    dispatch({ type: SET_LEARNING_MODE, payload: mode });
    
    // Load cards for learning
    if (mode) {
      dispatch({ type: SET_LOADING, payload: true });
      
      // Use setTimeout to prevent UI blocking with large datasets
      setTimeout(() => {
        try {
          // Get cards for the selected week
          const weekCards = memoizedGetCardsByWeek(mode, flashcardsData);
          
          // Format cards for learning
          const formattedCards = formatForLearning(weekCards);
          
          // Group by category
          const cardsByCategory = memoizedGroupCardsByCategory(formattedCards);
          
          dispatch({ type: SET_LEARNING_CARDS, payload: cardsByCategory });
          
          // Initialize categories if not in grouped results
          // This ensures all categories are available even if no cards exist for them yet
          const allCategories = {...cardsByCategory};
          categories[mode].forEach(category => {
            if (!allCategories[category]) {
              allCategories[category] = [];
            }
          });
          
          dispatch({ type: SET_LEARNING_CARDS, payload: allCategories });
          
          // Set initial category (first one in this week's categories)
          if (categories[mode].length > 0) {
            dispatch({ 
              type: SET_CURRENT_CATEGORY, 
              payload: categories[mode][0] 
            });
          }
        } catch (error) {
          dispatch({ 
            type: SET_ERROR, 
            payload: 'Failed to load learning cards' 
          });
          console.error('Error loading learning cards:', error);
        } finally {
          dispatch({ type: SET_LOADING, payload: false });
        }
      }, 0);
    }
  };
  
  const setCurrentCategory = (category) => {
    dispatch({ type: SET_CURRENT_CATEGORY, payload: category });
  };

  const addCompletedCard = (cardId) => {
    dispatch({ type: ADD_COMPLETED_CARD, payload: cardId });
  };

  const resetStudyState = () => {
    dispatch({ type: RESET_STATE });
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    setSection,
    setRevisionMode,
    setLearningMode,
    setCurrentCategory,
    addCompletedCard,
    resetStudyState
  }), [state]);

  // Provide context
  return (
    <StudyContext.Provider value={contextValue}>
      {children}
    </StudyContext.Provider>
  );
};

// Custom hook
export const useStudyContext = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudyContext must be used within a StudyProvider');
  }
  return context;
};
