// src/components/common/FlashCard.js

import React, { useState, memo } from 'react';

// FlashCard component optimized with memo to prevent unnecessary re-renders
const FlashCard = memo(({ 
  front, 
  back, 
  reference, 
  isFlipped, 
  onClick, 
  frontClassName = "", 
  backClassName = "",
  containerClassName = ""
}) => {
  return (
    <div 
      className={
        `cursor-pointer transform transition-all duration-300 border-2 rounded-lg shadow-lg overflow-hidden flex flex-col ` +
        (isFlipped ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200') +
        ` ${containerClassName}`
      }
      onClick={onClick}
      // allow the card to expand and scroll if content is long
      style={{ minHeight: '12rem', maxHeight: '60vh' }}
    >
      <div className="flex-grow p-4 overflow-auto flex flex-col justify-center">
        {!isFlipped ? (
          <div className="text-center">
            <p 
              className={
                `mb-2 text-purple-800 break-words leading-relaxed ` + frontClassName
              }
              style={{ direction: 'rtl', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
            >
              {front}
            </p>
            <p className="text-sm text-slate-500 mt-2">Click to see back</p>
          </div>
        ) : (
          <div className="text-center">
            <p 
              className={
                `mb-2 text-slate-700 break-words leading-relaxed ` + backClassName
              }
              style={{ direction: 'rtl', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
            >
              {back}
            </p>
            {reference && (
              <p className="text-sm text-purple-600 mt-1 truncate">{reference}</p>
            )}
            <p className="text-sm text-slate-500 mt-1">Click to see front</p>
          </div>
        )}
      </div>
    </div>
  );
});

// Revision card component - specialized for revision mode
export const RevisionCard = memo(({ 
  question, 
  answer, 
  showAnswer, 
  onClick 
}) => {
  // Extract English and reference from answer
  const [englishText, referenceText] = answer.split('\n');
  return (
    <div 
      className={`rounded-lg shadow-lg mb-8 flex flex-col transition-all duration-300 ` +
        (showAnswer ? 'bg-teal-50 border-2 border-teal-200' : 'bg-white border-2 border-slate-200')
      }
      onClick={onClick}
      style={{ minHeight: '15rem', maxHeight: '70vh', cursor: 'pointer', overflow: 'hidden' }}
    >
      <div className="flex-grow p-6 overflow-auto flex flex-col justify-center">
        {!showAnswer ? (
          <div className="text-center">
            <h3 
              className="mb-4 leading-relaxed break-words"
              style={{ direction: 'rtl', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
            >{question}</h3>
            <p className="text-slate-500 mt-6">Click to reveal translation</p>
          </div>
        ) : (
          <div className="text-center">
            <h3 
              className="mb-4 leading-relaxed break-words text-slate-600"
              style={{ direction: 'rtl', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
            >{question}</h3>
            <hr className="my-4 border-slate-200" />
            <div className="text-lg font-semibold text-teal-700 mb-2 break-words">
              {englishText}
            </div>
            {referenceText && (
              <div className="text-md text-teal-600 break-words">
                {referenceText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

// Progress indicator showing completion progress
export const CompletionIndicator = memo(({ 
  current, 
  total, 
  className = "" 
}) => {
  const percentage = total > 0 ? Math.floor((current / total) * 100) : 0;
  return (
    <div className={`flex items-center ${className}`}>  
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="ml-2 text-sm font-medium text-gray-600">{percentage}%</span>
    </div>
  );
});

export default FlashCard;
