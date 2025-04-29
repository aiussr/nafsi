// src/components/LearningContent.js

import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudyContext } from '../context/StudyContext';
import FlashCard, { CompletionIndicator } from './common/FlashCard';
import { weekNames } from '../data/flashcards';

// Constants for pagination
const CARDS_PER_PAGE = 1000;

const LearningContent = ({ goBack }) => {
  const { 
    learningMode, 
    learningCards, 
    currentCategory, 
    setCurrentCategory,
    addCompletedCard,
    loading
  } = useStudyContext();
  
  // Component state
  const [flippedCards, setFlippedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completedInSession, setCompletedInSession] = useState([]);
  
  // Reset on category change
  useEffect(() => {
    setCurrentPage(0);
    setFlippedCards({});
  }, [currentCategory]);
  
  // Memoize to prevent unnecessary recalculations
  const weekCategories = useMemo(() => {
    return Object.keys(learningCards);
  }, [learningCards]);
  
  // Memoize the cards for the current category to prevent re-renders
  const categoryCards = useMemo(() => {
    return currentCategory && learningCards[currentCategory] 
      ? [...learningCards[currentCategory]] 
      : [];
  }, [currentCategory, learningCards]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(categoryCards.length / CARDS_PER_PAGE);
  }, [categoryCards.length]);
  
  // Get current cards with pagination
  const currentCards = useMemo(() => {
    return categoryCards.slice(
      currentPage * CARDS_PER_PAGE,
      (currentPage * CARDS_PER_PAGE) + CARDS_PER_PAGE
    );
  }, [categoryCards, currentPage]);
  
  // Calculate progress percentage
  const progress = useMemo(() => {
    if (categoryCards.length === 0) return 0;
    return (currentPage * CARDS_PER_PAGE + Math.min(currentCards.length, CARDS_PER_PAGE)) / categoryCards.length * 100;
  }, [categoryCards.length, currentCards.length, currentPage]);
  
  // Handle card flip
  const toggleFlip = useCallback((id) => {
    setFlippedCards(prev => {
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      
      // If flipped to back, mark as completed
      if (newState[id] && !completedInSession.includes(id)) {
        setCompletedInSession(prev => [...prev, id]);
        // Add to global completed cards
        addCompletedCard(id);
      }
      
      return newState;
    });
  }, [completedInSession, addCompletedCard]);
  
  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setFlippedCards({});
    } else {
      // Find index of current category
      const currentCategoryIndex = weekCategories.indexOf(currentCategory);
      
      // If not the last category, move to next category
      if (currentCategoryIndex < weekCategories.length - 1) {
        const nextCategory = weekCategories[currentCategoryIndex + 1];
        setCurrentCategory(nextCategory);
        setCurrentPage(0);
        setFlippedCards({});
      }
    }
  }, [currentPage, totalPages, weekCategories, currentCategory, setCurrentCategory]);
  
  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFlippedCards({});
    } else {
      // Find index of current category
      const currentCategoryIndex = weekCategories.indexOf(currentCategory);
      
      // If not the first category, move to previous category
      if (currentCategoryIndex > 0) {
        const prevCategory = weekCategories[currentCategoryIndex - 1];
        const prevCategoryCards = learningCards[prevCategory] || [];
        const prevCategoryTotalPages = Math.ceil(prevCategoryCards.length / CARDS_PER_PAGE);
        
        setCurrentCategory(prevCategory);
        setCurrentPage(prevCategoryTotalPages - 1);
        setFlippedCards({});
      }
    }
  }, [currentPage, weekCategories, currentCategory, learningCards, setCurrentCategory]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goToNextPage();
      } else if (event.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);
  
  // Show loading state
  if (loading || !currentCategory) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-48 w-full max-w-2xl bg-gray-200 rounded mb-4"></div>
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
        </div>
        <button 
          onClick={goBack}
          className="mt-12 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
        >
          Return to Weeks
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col bg-slate-50 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-700">
          Learning: Week {learningMode.replace('week', '')} ({weekNames[learningMode]})
        </h1>
        <button 
          onClick={goBack}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Return to Weeks
        </button>
      </div>

      {/* Navigation bar */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0 && weekCategories.indexOf(currentCategory) === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow-md ${
            currentPage === 0 && weekCategories.indexOf(currentCategory) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <span className="py-2 text-slate-600">
          {categoryCards.length > 0 ? (
            `${currentPage + 1} of ${totalPages}`
          ) : (
            `No cards`
          )}
        </span>
        
        <button 
          onClick={goToNextPage}
          disabled={
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
          }
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow-md ${
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Category selector */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-slate-700">Select Category:</label>
        <select 
          value={currentCategory}
          onChange={(e) => setCurrentCategory(e.target.value)}
          className="w-full p-2 border border-slate-300 rounded-md bg-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
        >
          {weekCategories.map((category) => (
            <option key={category} value={category}>
              {category} ({learningCards[category]?.length || 0} cards)
            </option>
          ))}
        </select>
      </div>

      // Add top navigation arrows:
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0 && weekCategories.indexOf(currentCategory) === 0}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow-md ${
            currentPage === 0 && weekCategories.indexOf(currentCategory) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <ChevronLeft size={14} />
          Previous
        </button>
        
        <button 
          onClick={goToNextPage}
          disabled={
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
          }
          className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow-md ${
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Category info */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-purple-600">{currentCategory}</h2>
        <p className="text-slate-600">
          {categoryCards.length > 0 ? (
            <>
              Showing {currentPage * CARDS_PER_PAGE + 1}-
              {Math.min((currentPage + 1) * CARDS_PER_PAGE, categoryCards.length)} of {categoryCards.length} cards
            </>
          ) : (
            "No cards available for this category yet"
          )}
        </p>
      </div>
      
      {/* Flashcards */}
      <div className="grid grid-cols-1 gap-4 mb-6 min-h-80">
        {currentCards.map((card) => (
          <FlashCard
            key={card.id}
            front={card.front}
            back={card.back}
            reference={card.reference}
            isFlipped={flippedCards[card.id]}
            onClick={() => toggleFlip(card.id)}
          />
        ))}
        
        {currentCards.length === 0 && (
          <div className="text-center p-12 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-purple-800">No cards available for this category yet.</p>
            <p className="text-purple-600 mt-2">Try selecting another category or adding cards to this category.</p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0 && weekCategories.indexOf(currentCategory) === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow-md ${
            currentPage === 0 && weekCategories.indexOf(currentCategory) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <span className="py-2 text-slate-600">
          {categoryCards.length > 0 ? (
            `Page ${currentPage + 1} of ${totalPages}`
          ) : (
            `No cards`
          )}
        </span>
        
        <button 
          onClick={goToNextPage}
          disabled={
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
          }
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow-md ${
            (currentPage >= totalPages - 1 || categoryCards.length === 0) && 
            weekCategories.indexOf(currentCategory) === 
            weekCategories.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
      
      {/* Category navigation */}
      <div className="flex justify-center gap-2 overflow-x-auto py-2 mb-2">
        {weekCategories.map((category, index) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
              category === currentCategory
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            {category.length > 15 ? `${category.substring(0, 15)}...` : category}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-600">
        Tap or click each card to flip between front and back. Use the arrow keys to navigate.
      </div>
      
      {/* Completion stats */}
      <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="text-md font-semibold text-purple-700 mb-2">Session Progress</h3>
        <p className="text-purple-800">
          Cards viewed this session: <span className="font-bold">{completedInSession.length}</span>
        </p>
      </div>
    </div>
  );
};

export default LearningContent;
