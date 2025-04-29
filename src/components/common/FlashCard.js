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
      className={`cursor-pointer transform transition-all duration-300 h-48 border-2 rounded-lg shadow-lg overflow-hidden ${
        isFlipped ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'
      } ${containerClassName}`}
      onClick={onClick}
    >
      <div className="h-full p-6 flex flex-col justify-center">
        {!isFlipped ? (
          <div className="text-center">
            <p className={`text-xl mb-2 text-purple-800 ${frontClassName}`} style={{ direction: 'rtl' }}>
              {front}
            </p>
            <p className="text-sm text-slate-500 mt-2">Click to see back</p>
          </div>
        ) : (
          <div className="text-center">
            <p className={`text-lg mb-2 text-slate-700 ${backClassName}`}>
              {back}
            </p>
            <p className="text-sm text-purple-600 mt-2">{reference}</p>
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
  // Extract English and reference from answer (which is formatted as English\nReference)
  const [englishText, referenceText] = answer.split('\n');
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg p-8 mb-8 flex flex-col justify-center transition-all duration-300 ${
        showAnswer ? 'bg-teal-50 border-2 border-teal-200' : 'border-2 border-slate-200'
      }`}
      onClick={onClick}
      style={{ minHeight: '15rem' }}
    >
      {!showAnswer ? (
        <div className="text-center">
          <h3 className="text-2xl font-medium text-teal-800 mb-4 leading-relaxed" style={{ direction: 'rtl' }}>
            {question}
          </h3>
          <p className="text-slate-500 mt-6">Click to reveal translation</p>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-medium text-slate-600 mb-4 leading-relaxed" style={{ direction: 'rtl' }}>
            {question}
          </h3>
          <hr className="my-4 border-slate-200" />
          <div className="text-lg font-semibold text-teal-700 mb-2">{englishText}</div>
          <div className="text-md text-teal-600">{referenceText}</div>
        </div>
      )}
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
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-teal-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm font-medium text-gray-600">
        {percentage}%
      </span>
    </div>
  );
});

export default FlashCard;
