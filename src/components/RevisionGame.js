// src/components/RevisionGame.js

import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { X, Check, Clock, ArrowLeft } from 'lucide-react';
import { useStudyContext } from '../context/StudyContext';
import { shuffleArray, chunkArray, getRandomCards } from '../utils/dataUtils';
import { RevisionCard, CompletionIndicator } from './common/FlashCard';
import { weekNames } from '../data/flashcards';

// Constants for game
const MAX_CARDS_PER_SESSION = 20; // Maximum cards to show in one session
const CARDS_TO_LOAD_IMMEDIATELY = 10; // Load first chunk immediately
const SLOW_THRESHOLD = 10000; // Time in ms to consider a response slow (auto-classification)
const AUTO_SAVE_INTERVAL = 30000; // Save progress every 30 seconds

const RevisionGame = ({ goBack }) => {
  const { 
    revisionMode, 
    revisionCards, 
    addCompletedCard, 
    completedCardIds,
    loading
  } = useStudyContext();
  
  // Game state
  const [currentCards, setCurrentCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [round, setRound] = useState(1);
  const [slowCards, setSlowCards] = useState([]);
  const [wrongCards, setWrongCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);
  const [roundComplete, setRoundComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [responseTime, setResponseTime] = useState(null);
  const [cardStartTime, setCardStartTime] = useState(null);
  
  // For lazy loading card chunks
  const [loadedCardChunks, setLoadedCardChunks] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Prepare cards in chunks for large datasets (to prevent UI freezing)
  const cardChunks = useMemo(() => {
    // If in 'all' mode, limit to MAX_CARDS_PER_SESSION per session
    const cardsToUse = revisionMode === 'all' && revisionCards.length > MAX_CARDS_PER_SESSION
      ? getRandomCards(revisionCards, MAX_CARDS_PER_SESSION)
      : [...revisionCards];
    
    // Split into chunks for lazy loading
    return chunkArray(cardsToUse, CARDS_TO_LOAD_IMMEDIATELY);
  }, [revisionMode, revisionCards]);
  -------------------
  // Initialize first chunk of cards immediately
// Also fix the initial loading to show the exact card count from the start
// Find the useEffect that loads cardChunks and replace with:
  useEffect(() => {
    if (cardChunks.length > 0) {
      // For "all" mode, take exactly MAX_CARDS_PER_SESSION cards
      if (revisionMode === 'all') {
        const allCards = cardChunks.flat();
        const initialCards = allCards.length > MAX_CARDS_PER_SESSION ? 
          allCards.slice(0, MAX_CARDS_PER_SESSION) : allCards;
        setCurrentCards(initialCards);
      } else {
        // For specific weeks, take all cards at once
        setCurrentCards(cardChunks.flat());
      }
      resetGameState();
    }
  }, [cardChunks, resetGameState, revisionMode]);
  ----------------
  // Load more card chunks as user progresses
  useEffect(() => {
    const loadNextChunk = () => {
      if (loadedCardChunks < cardChunks.length) {
        setIsLoadingMore(true);
        
        // Simulate a slight delay to avoid UI freezing
        setTimeout(() => {
          setCurrentCards(prev => {
            const nextChunk = cardChunks[loadedCardChunks];
            return [...prev, ...nextChunk];
          });
          
          setLoadedCardChunks(prev => prev + 1);
          setIsLoadingMore(false);
        }, 100);
      }
    };
    
    // Calculate when to load next chunk (when 70% through the current chunk)
    const chunkSize = CARDS_TO_LOAD_IMMEDIATELY;
    const loadThreshold = Math.floor(loadedCardChunks * chunkSize * 0.7);
    
    if (currentCardIndex >= loadThreshold && !isLoadingMore) {
      loadNextChunk();
    }
  }, [currentCardIndex, loadedCardChunks, cardChunks, isLoadingMore]);
  
  // Auto-save progress periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      const allCorrect = [...correctCards];
      allCorrect.forEach(card => {
        addCompletedCard(card.id);
      });
    }, AUTO_SAVE_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, [correctCards, addCompletedCard]);
  
  // Reset game state
  const resetGameState = useCallback(() => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setRound(1);
    setSlowCards([]);
    setWrongCards([]);
    setCorrectCards([]);
    setRoundComplete(false);
    setGameComplete(false);
    setProgress(0);
    setCardStartTime(Date.now());
  }, []);
  
  // Update progress when card changes
  useEffect(() => {
    if (currentCards.length > 0) {
      setProgress((currentCardIndex / currentCards.length) * 100);
    }
  }, [currentCardIndex, currentCards.length]);
  
  // Set timer when card is shown
  useEffect(() => {
    if (!showAnswer) {
      setCardStartTime(Date.now());
    }
  }, [currentCardIndex, showAnswer]);
  
  // Handle showing the answer
  const handleShowAnswer = useCallback(() => {
    if (!showAnswer) {
      const endTime = Date.now();
      const timeToAnswer = endTime - cardStartTime;
      setResponseTime(timeToAnswer);
      setShowAnswer(true);
    }
  }, [showAnswer, cardStartTime]);
  
  // Handle card response classification
  const handleResponse = useCallback((response) => {
    if (currentCards.length === 0) return;
    
    const currentCard = currentCards[currentCardIndex];
    
    // Auto-classify as "slow" if response time exceeds threshold
    const effectiveResponse = 
      response === 'correct' && responseTime > SLOW_THRESHOLD ? 'slow' : response;
    
    switch(effectiveResponse) {
      case 'correct':
        setCorrectCards(prev => [...prev, currentCard]);
        addCompletedCard(currentCard.id);
        break;
      case 'slow':
        setSlowCards(prev => [...prev, currentCard]);
        break;
      case 'wrong':
        setWrongCards(prev => [...prev, currentCard]);
        break;
      default:
        break;
    }
    
    // Move to next card or complete the round
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      setRoundComplete(true);
      setProgress(100);
    }
  }, [currentCardIndex, currentCards, addCompletedCard, responseTime]);
  
  // Start next round with cards that weren't fully learned
  const startNextRound = useCallback(() => {
    if (slowCards.length > 0 || wrongCards.length > 0) {
      const nextRoundCards = shuffleArray([...slowCards, ...wrongCards]);
      
      setCurrentCards(nextRoundCards);
      setCurrentCardIndex(0);
      setShowAnswer(false);
      setRound(round + 1);
      setSlowCards([]);
      setWrongCards([]);
      setCorrectCards([]);
      setRoundComplete(false);
      setProgress(0);
    } else {
      setGameComplete(true);
    }
  }, [slowCards, wrongCards, round]);
  
  // Start a new game with a fresh set of cards
// Replace the startNewGame function with this version:
const startNewGame = useCallback(() => {
  if (revisionMode === 'all') {
    // Get cards not yet completed
    const excludeIds = [...completedCardIds];
    const availableCards = revisionCards.filter(card => !excludeIds.includes(card.id));
    
    if (availableCards.length > 0) {
      // Exactly 20 cards for "All Content" mode
      const newCards = availableCards.length > MAX_CARDS_PER_SESSION ? 
        getRandomCards(availableCards, MAX_CARDS_PER_SESSION) : 
        shuffleArray(availableCards);
      setCurrentCards(newCards);
    } else {
      alert("Congratulations! You've completed all available cards!");
      goBack();
      return;
    }
  } else {
    // For week-specific modes, use all cards for that week
    setCurrentCards(shuffleArray(revisionCards));
  }
  
  resetGameState();
}, [revisionMode, revisionCards, completedCardIds, resetGameState, goBack]);
  
  // Show loading state
  if (loading || currentCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-48 w-full max-w-2xl bg-gray-200 rounded mb-4"></div>
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
        </div>
        <button 
          onClick={goBack}
          className="mt-12 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
        >
          Return to Weeks
        </button>
      </div>
    );
  }
  
  // Show completion screen
  if (gameComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">Congratulations!</h2>
        <p className="text-xl text-gray-700 mb-6">You've completed all rounds successfully.</p>
        
        {/* Show stats */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 w-full max-w-lg mb-6">
          <h3 className="text-xl font-semibold text-teal-700 mb-3">Session Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-teal-600">Cards Reviewed</p>
              <p className="text-2xl font-bold text-teal-800">
                {correctCards.length + slowCards.length + wrongCards.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-teal-600">Rounds Completed</p>
              <p className="text-2xl font-bold text-teal-800">{round}</p>
            </div>
            <div>
              <p className="text-sm text-teal-600">Mastery Rate</p>
              <p className="text-2xl font-bold text-teal-800">
                {correctCards.length > 0 
                  ? Math.round((correctCards.length / (correctCards.length + slowCards.length + wrongCards.length)) * 100)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-teal-600">Cards Mastered</p>
              <p className="text-2xl font-bold text-teal-800">{correctCards.length}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button 
            onClick={startNewGame}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            Start New Game
          </button>
          <button 
            onClick={goBack}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            Return to Weeks
          </button>
        </div>
      </div>
    );
  }
  
  // Show round completion screen
  if (roundComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">Round {round} Complete!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 w-full max-w-4xl">
          <div className="bg-green-100 p-6 rounded-lg border border-green-300 shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Correct</h3>
            <div className="text-4xl font-bold text-green-600">{correctCards.length}</div>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-300 shadow-md">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Slow</h3>
            <div className="text-4xl font-bold text-yellow-600">{slowCards.length}</div>
          </div>
          <div className="bg-red-100 p-6 rounded-lg border border-red-300 shadow-md">
            <h3 className="text-xl font-semibold text-red-800 mb-3">Did Not Know</h3>
            <div className="text-4xl font-bold text-red-600">{wrongCards.length}</div>
          </div>
        </div>
        
        {(slowCards.length > 0 || wrongCards.length > 0) ? (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Round {round + 1} will include {slowCards.length + wrongCards.length} verses 
              that you marked as Slow or Did Not Know.
            </p>
            <button 
              onClick={startNextRound}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Start Round {round + 1}
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-lg text-green-700 mb-4">
              Great job! You got all verses correct!
            </p>
            <button 
              onClick={() => setGameComplete(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Complete Game
            </button>
          </div>
        )}
        
        <button 
          onClick={goBack}
          className="mt-8 underline text-teal-600 hover:text-teal-800"
        >
          Return to Weeks
        </button>
      </div>
    );
  }
  
  // Main game screen
  const currentCard = currentCards[currentCardIndex];
  
  return (
    <div className="flex flex-col items-center h-full py-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-teal-700">
            Revision: {revisionMode === 'all' ? 'All Content' : `Week ${revisionMode.replace('week', '')} (${weekNames[revisionMode]})`}
          </h2>
          <button 
            onClick={goBack}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Return to Weeks
          </button>
        </div>
        
        {/* Progress bar */}
        <CompletionIndicator 
          current={currentCardIndex} 
          total={currentCards.length} 
          className="mb-6"
        />
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-slate-700">
            <span className="font-semibold">Round {round}</span> • 
            Verse {currentCardIndex + 1} of {currentCards.length}
          </div>
        </div>
        
        {/* Score display */}
        <div className="flex justify-between mb-4">
          <div className="text-green-600 font-semibold">Correct: {correctCards.length}</div>
          <div className="text-yellow-600 font-semibold">Slow: {slowCards.length}</div>
          <div className="text-red-600 font-semibold">Incorrect: {wrongCards.length}</div>
          <div className="text-gray-600 font-semibold">Remaining: {currentCards.length - currentCardIndex}</div>
        </div>
        
        {/* Flashcard */}
        <RevisionCard
          question={currentCard.question}
          answer={currentCard.answer}
          showAnswer={showAnswer}
          onClick={handleShowAnswer}
        />
        
        {/* Response Buttons */}
        {showAnswer && (
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleResponse('correct')}
              className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 py-6 px-4 rounded-lg border-2 border-green-300 transition-colors shadow-md"
            >
              <Check size={32} className="mb-2" />
              <span className="font-semibold">I Knew This ✓</span>
            </button>
            <button 
              onClick={() => handleResponse('slow')}
              className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-6 px-4 rounded-lg border-2 border-yellow-300 transition-colors shadow-md"
            >
              <Clock size={32} className="mb-2" />
              <span className="font-semibold">Knew Slowly ⏱</span>
            </button>
            <button 
              onClick={() => handleResponse('wrong')}
              className="flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 text-red-800 py-6 px-4 rounded-lg border-2 border-red-300 transition-colors shadow-md"
            >
              <X size={32} className="mb-2" />
              <span className="font-semibold">Didn't Know ✗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevisionGame;
