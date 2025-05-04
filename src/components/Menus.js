// src/components/Menus.js

import React, { memo, useMemo } from 'react';
import { Clock, Book } from 'lucide-react';
import { useStudyContext } from '../context/StudyContext';
import { weekNames } from '../data/flashcards';

// Build a sorted array of all week keys, e.g. ['week1','week2',…]
const weeks = Object.keys(weekNames).sort((a, b) =>
  parseInt(a.replace('week', ''), 10) - parseInt(b.replace('week', ''), 10)
);

// ────────────────────────────────────────────────────────────────────────────────
// Reusable sub-components
// ────────────────────────────────────────────────────────────────────────────────
const ModeButton = ({ color, icon, label, sublabel, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-600 hover:bg-${color}-700 text-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 text-xl font-bold border-2 border-${color}-500 flex flex-col items-center justify-center gap-4 w-full md:w-64 h-64`}
  >
    <div className={`p-4 bg-${color}-500 rounded-full shadow-md`}>{icon}</div>
    <span>{label}</span>
    <span className={`text-sm font-normal text-${color}-100`}>{sublabel}</span>
  </button>
);

const WeekButton = ({ weekKey, color, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-100 hover:bg-${color}-200 text-${color}-800 border-2 border-${color}-300 p-6 rounded-lg shadow-md transition-colors text-xl font-bold flex flex-col items-center`}
  >
    <span>{`Week ${weekKey.replace('week', '')}`}</span>
    <span className="text-sm font-normal mt-2">{weekNames[weekKey]}</span>
  </button>
);

const RevisionInfoCard = () => (
  <div className="mt-8 bg-teal-50 p-6 rounded-lg border border-teal-200 max-w-2xl text-center">
    <h3 className="text-lg font-semibold text-teal-700 mb-2">How Revision Works</h3>
    <p className="text-teal-800 mb-4">
      Test your knowledge with our spaced repetition system. Cards you know well will appear less frequently, while those you struggle with will be shown more often.
    </p>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="bg-green-100 p-3 rounded">
        <span className="font-semibold block text-green-800">I Knew This</span>
        <span className="text-green-700">Instant recall</span>
      </div>
      <div className="bg-yellow-100 p-3 rounded">
        <span className="font-semibold block text-yellow-800">Knew Slowly</span>
        <span className="text-yellow-700">Recall with effort</span>
      </div>
      <div className="bg-red-100 p-3 rounded">
        <span className="font-semibold block text-red-800">Didn't Know</span>
        <span className="text-red-700">Needs more study</span>
      </div>
    </div>
  </div>
);

const LearningInfoCard = () => (
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
);

// ────────────────────────────────────────────────────────────────────────────────
// Main Menu Component
// ────────────────────────────────────────────────────────────────────────────────
export const MainMenu = memo(() => {
  const { setSection } = useStudyContext();

  // Calculate days until the next Eid al-Adha
  const daysUntilEid = useMemo(() => {
    const today = new Date();
    const eidDates = [
      new Date('2025-06-06'),
      new Date('2026-05-26'),
      new Date('2027-05-16')
    ];
    const nextEid = eidDates.find(date => date > today) || eidDates[0];
    const diffTime = nextEid - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-4">Quranic Arabic Study</h2>

      {/* Countdown Card */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-8 text-center">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">Days until Eid al-Adha</h3>
        <p className="text-4xl font-extrabold text-teal-800">{daysUntilEid}</p>
      </div>

      {/* Study Mode Buttons */}
      <h3 className="text-2xl font-semibold text-teal-700 mb-4">Choose Your Study Mode</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl">
        <ModeButton
          color="teal"
          icon={<Clock size={48} />}
          label="Revision"
          sublabel="Test yourself with flashcards"
          onClick={() => setSection('revision')}
        />
        <ModeButton
          color="purple"
          icon={<Book size={48} />}
          label="Learning"
          sublabel="Study new vocabulary"
          onClick={() => setSection('learning')}
        />
      </div>

      {/* Content Overview */}
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

// ────────────────────────────────────────────────────────────────────────────────
// Revision Menu Component
// ────────────────────────────────────────────────────────────────────────────────
export const RevisionMenu = memo(() => {
  const { setRevisionMode } = useStudyContext();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-teal-700 mb-8">Choose Revision Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {weeks.map(wk => (
          <WeekButton
            key={wk}
            weekKey={wk}
            color="teal"
            onClick={() => setRevisionMode(wk)}
          />
        ))}
        <button
          onClick={() => setRevisionMode('all')}
          className="bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-lg shadow-md text-xl font-bold"
        >
          All Content
        </button>
      </div>
      <RevisionInfoCard />
    </div>
  );
});

// ────────────────────────────────────────────────────────────────────────────────
// Learning Menu Component (no "All Content")
// ────────────────────────────────────────────────────────────────────────────────
export const LearningMenu = memo(() => {
  const { setLearningMode } = useStudyContext();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
      <h2 className="text-3xl font-bold text-purple-700 mb-8">Choose Learning Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {weeks.map(wk => (
          <WeekButton
            key={wk}
            weekKey={wk}
            color="purple"
            onClick={() => setLearningMode(wk)}
          />
        ))}
      </div>
      <LearningInfoCard />
    </div>
  );
});
