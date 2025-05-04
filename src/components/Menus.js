// src/components/Menus.js

import React, { memo } from 'react';
import { Clock, Book } from 'lucide-react';
import { useStudyContext } from '../context/StudyContext';
import { weekNames } from '../data/flashcards';

// Derive a sorted array of all week keys (e.g. ['week1','week2',...])
const weeks = Object
  .keys(weekNames)
  .sort((a, b) =>
    parseInt(a.replace('week', ''), 10) - parseInt(b.replace('week', ''), 10)
  );

// Main Menu Component - Optimized with memo to prevent unnecessary re-renders
export const MainMenu = memo(() => {
  const { setSection, stats } = useStudyContext();
  
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-4">Quranic Arabic Study</h2>
      
      {/* Stats Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl mb-8">
        <h3 className="text-xl font-semibold text-teal-700 mb-4">Your Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-600">Total Cards</p>
            <p className="text-2xl font-bold text-teal-800">{stats.totalCards}</p>
          </div>
          <div className="text-center p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-600">Cards Viewed</p>
            <p className="text-2xl font-bold text-teal-800">{stats.completedCards}</p>
          </div>
          <div className="text-center p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-600">Mastered</p>
            <p className="text-2xl font-bold text-teal-800">{stats.mastered}</p>
          </div>
          <div className="text-center p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-600">To Review</p>
            <p className="text-2xl font-bold text-teal-800">{stats.needReview}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-4 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-teal-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.floor((stats.completedCards / stats.totalCards) * 100)}%` }}
            ></div>
          </div>
          <div className="text-right mt-1 text-sm text-gray-600">
            {Math.floor((stats.completedCards / stats.totalCards) * 100)}% Complete
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-teal-700 mb-4">Choose Your Study Mode</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl">
        <button 
          onClick={() => setSection('revision')}
          className="bg-teal-600 hover:bg-teal-700 
                    text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-xl font-bold 
                    border-2 border-teal-500 flex flex-col items-center justify-center gap-4 w-full md:w-64 h-64"
        >
          <div className="p-4 bg-teal-500 rounded-full shadow-md">
            <Clock size={48} />
          </div>
          <span>Revision</span>
          <span className="text-sm font-normal text-teal-100">Test yourself with flashcards</span>
        </button>
        <button 
          onClick={() => setSection('learning')}
          className="bg-purple-600 hover:bg-purple-700 
                    text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-xl font-bold 
                    border-2 border-purple-500 flex flex-col items-center justify-center gap-4 w-full md:w-64 h-64"
        >
          <div className="p-4 bg-purple-500 rounded-full shadow-md">
            <Book size={48} />
          </div>
          <span>Learning</span>
          <span className="text-sm font-normal text-purple-100">Study new vocabulary</span>
        </button>
      </div>
      
      {/* Week Overview */}
      <div className="mt-8 w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Content Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map(wk => (
            <div key={wk} className="bg-white rounded-lg shadow p-4">
              <h4 className="text-lg font-semibold text-teal-700">
                {`Week ${wk.replace('week', '')}: ${weekNames[wk]}`}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Revision Menu Component
export const RevisionMenu = memo(() => {
  const { setRevisionMode } = useStudyContext();
  
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-8">Choose Revision Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {weeks.map(wk => (
          <button 
            key={wk}
            onClick={() => setRevisionMode(wk)}
            className="bg-teal-100 hover:bg-teal-200 
                      text-teal-800 border-2 border-teal-300 p-6 rounded-lg shadow-md 
                      transition-colors text-xl font-bold flex flex-col items-center"
          >
            <span>{`Week ${wk.replace('week','')}`}</span>
            <span className="text-sm font-normal mt-2">{weekNames[wk]}</span>
          </button>
        ))}
        <button 
          onClick={() => setRevisionMode('all')}
          className="bg-teal-600 hover:bg-teal-700 
                    text-white p-6 rounded-lg shadow-md transition-colors text-xl font-bold"
        >
          All Content
        </button>
      </div>
      
      {/* Additional information */}
      <div className="mt-8 bg-teal-50 p-6 rounded-lg border border-teal-200 max-w-2xl text-center">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">How Revision Works</h3>
        <p className="text-teal-800 mb-4">
          Test your knowledge with our spaced repetition system. Cards you know well will appear less frequently, 
          while those you struggle with will be shown more often.
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-green-100 p-3 rounded">
            <span className="font-semibold block text-green-800">I Knew This</span>
            <span className="text-green-700">For cards you recognize immediately</span>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <span className="font-semibold block text-yellow-800">Knew Slowly</span>
            <span className="text-yellow-700">For cards you remember with effort</span>
          </div>
          <div className="bg-red-100 p-3 rounded">
            <span className="font-semibold block text-red-800">Didn't Know</span>
            <span className="text-red-700">For cards you need to study more</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Learning Menu Component
export const LearningMenu = memo(() => {
  const { setLearningMode } = useStudyContext();
  
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-purple-700 mb-8">Choose Learning Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {weeks.map(wk => (
          <button 
            key={wk}
            onClick={() => setLearningMode(wk)}
            className="bg-purple-100 hover:bg-purple-200 
                      text-purple-800 border-2 border-purple-300 p-6 rounded-lg shadow-md 
                      transition-colors text-xl font-bold flex flex-col items-center"
          >
            <span>{`Week ${wk.replace('week','')}`}</span>
            <span className="text-sm font-normal mt-2">{weekNames[wk]}</span>
          </button>
        ))}
        <button 
          onClick={() => setLearningMode('all')}
          className="bg-purple-600 hover:bg-purple-700 
                    text-white p-6 rounded-lg shadow-md transition-colors text-xl font-bold"
        >
          All Content
        </button>
      </div>
      
      {/* Additional information */}
      <div className="mt-8 bg-purple-50 p-6 rounded-lg border border-purple-200 max-w-2xl text-center">
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Learning Mode Features</h3>
        <p className="text-purple-800 mb-4">
          Browse through categories and study at your own pace. Flip cards to see translations and references.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-purple-100 p-3 rounded">
            <span className="font-semibold block text-purple-800">Category Browsing</span>
            <span className="text-purple-700">Explore verses by topic</span>
          </div>
          <div className="bg-purple-100 p-3 rounded">
            <span className="font-semibold block text-purple-800">Self-Paced Study</span>
            <span className="text-purple-700">Take your time with each verse</span>
          </div>
        </div>
      </div>
    </div>
  );
});
