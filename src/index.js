// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This will contain the Tailwind imports
import App from './App';
import { StudyProvider } from './context/StudyContext';

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudyProvider>
      <App />
    </StudyProvider>
  </React.StrictMode>
);
