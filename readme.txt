# Quranic Arabic Study App

An interactive application for studying and reviewing Quranic Arabic phrases with spaced repetition learning and flashcards.

## Features

- **Two Learning Modes**:
  - **Revision Mode**: Test yourself with flashcards using a spaced repetition system
  - **Learning Mode**: Study new vocabulary at your own pace
  
- **Organized Content**:
  - Week 1: Logic - Verses about reasoning and critical thinking
  - Week 2: Physics - Verses about cosmology and natural phenomena 
  - Week 3: Ethics - Verses about morality and righteous conduct

- **Performance Optimized**:
  - Lazy loading for better performance with large datasets
  - Memoization to prevent unnecessary re-renders
  - Progressive loading of flashcards
  - Local storage for tracking progress

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quranic-arabic-study.git
   cd quranic-arabic-study
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

Build the app for production to the `build` folder:
```
npm run build
```

This optimizes the build for performance and prepares it for deployment.

## Deploying to Netlify

To deploy to Netlify:

1. Create a new site on Netlify
2. Connect to your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `build`

Alternatively, you can deploy directly from the command line using the Netlify CLI:

```
npm install -g netlify-cli
netlify deploy
```

## Adding More Flashcards

To add more flashcards, edit the `src/data/flashcards.js` file. Follow the existing pattern:

```javascript
{
  id: "w1-26",  // Keep IDs sequential
  week: "week1",
  category: "Encouragement to Use Reason",
  arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ",
  english: "Then do they not reflect upon the Qur'an?",
  reference: "Surat Muhammad, 47:24"
}
```

## Project Structure

- `/src/components` - React components
- `/src/context` - Context API for state management
- `/src/data` - Flashcard data
- `/src/utils` - Utility functions
- `/public` - Static assets

## Technologies Used

- React 18
- Tailwind CSS
- Context API for state management
- Local Storage for progress tracking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Quranic Arabic content compiled from various sources
- Icons from Lucide React
