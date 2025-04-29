// src/App.js

import React, { lazy, Suspense } from 'react';
import { useStudyContext } from './context/StudyContext';
import { MainMenu, RevisionMenu, LearningMenu } from './components/Menus';

// Use lazy loading for better performance with large components
const RevisionGame = lazy(() => import('./components/RevisionGame'));
const LearningContent = lazy(() => import('./components/LearningContent'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
  </div>
);

// App Content Component - Uses context for state management
const AppContent = () => {
  const { 
    section, 
    revisionMode, 
    learningMode, 
    resetStudyState 
  } = useStudyContext();
  
  // Reset all states when returning to main menu
  const goToMainMenu = () => {
    resetStudyState();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-teal-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={goToMainMenu}>Quranic Arabic Materials</h1>
          {section && (
            <button 
              onClick={goToMainMenu}
              className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              Choose Study Mode
            </button>
          )}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Main Menu */}
        {!section && <MainMenu />}
        
        {/* Revision Section */}
        {section === 'revision' && !revisionMode && (
          <RevisionMenu />
        )}
        
        {/* Revision Game */}
        {section === 'revision' && revisionMode && (
          <Suspense fallback={<LoadingFallback />}>
            <RevisionGame 
              goBack={() => setRevisionMode(null)} // Changed from resetStudyState()
            />
          </Suspense>
        )}
        
        {/* Learning Section */}
        {section === 'learning' && !learningMode && (
          <LearningMenu />
        )}
        
        {/* Learning Content */}
        {section === 'learning' && learningMode && (
          <Suspense fallback={<LoadingFallback />}>
            <LearningContent 
              goBack={() => setLearningMode(null)} // Changed from resetStudyState()
            />
          </Suspense>
        )}
      
      <footer className="bg-teal-800 text-white p-4 text-center shadow-inner">
        <p>© 2025 Quranic Arabic Materials</p>
      </footer>
    </div>
  );
};

// Default export - no context here, will be wrapped by provider in index.js
const App = () => {
  return <AppContent />;
};

export default App;
