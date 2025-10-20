# Quick Start Guide

## Installation & Setup

### 1. Copy the refactored folder to your project

```bash
cp -r elegant-course-refactored/ your-project/src/components/
```

### 2. Import and use

```jsx
// In your App.jsx or main component
import ElegantCourse from './components/elegant-course-refactored';

function App() {
  return <ElegantCourse />;
}
```

### 3. Ensure CSS is imported

The main `index.jsx` already imports `./styles/animations.css`. Make sure your build system supports CSS imports, or manually include the CSS file.

---

## Customization Examples

### Change Course Content

Edit `data/chapters.js`:

```javascript
export const chapters = [
  { 
    id: 'intro', 
    title: 'Your Chapter Title',  // ← Change this
    subtitle: 'Your subtitle',     // ← And this
    subChapters: [
      { id: 'intro-1', title: 'Section 1', order: 0 },
      // Add/remove sections
    ]
  },
  // More chapters...
];
```

Then update the corresponding sections in `components/MainContent.jsx`.

---

### Modify Particle Effect

Edit `hooks/useParticleAnimation.js`:

```javascript
// Change particle count
const particles = Array.from({ length: 50 }, () => new GoldParticle()); // Was 30

// Change particle speed
this.speedY = Math.random() * 0.3 + 0.1; // Faster
```

---

### Adjust Scroll Speed

Edit `hooks/useSmoothScroll.js`:

```javascript
// Change momentum timing
const duration = (isRapid && isSameDirection) ? 300 : 600; // Faster
```

---

### Change Color Scheme

**Background color** (in `index.jsx`):
```javascript
style={{ backgroundColor: '#FFFFFF' }} // Was #FDFCF9
```

**Border colors** (in `components/Sidebar.jsx` and `MainContent.jsx`):
```javascript
borderLeftColor: '#333333' // Was #1a1a1a
```

**Text colors** (search and replace):
- `#1a1a1a` → Your dark color
- `#666` → Your medium gray
- `#999` → Your light gray

---

## Debugging Tips

### Active Section Not Updating?

Check `useScrollSpy`:
```javascript
// Add console.log to see what's being observed
console.log('Observing sections:', allSectionIds);
console.log('Active section changed to:', entry.target.id);
```

### Animations Not Working?

Verify `animations.css` is imported and loaded:
```javascript
// In index.jsx, make sure this line exists:
import './styles/animations.css';
```

### Particles Not Showing?

Check canvas rendering:
```javascript
// In useParticleAnimation, add:
console.log('Canvas dimensions:', canvas.width, canvas.height);
console.log('Particle count:', particles.length);
```

---

## Adding New Features

### Add a Progress Bar

1. Create `components/ProgressBar.jsx`
2. Create `hooks/useReadingProgress.js` to track scroll percentage
3. Import and add to `index.jsx`

```jsx
// hooks/useReadingProgress.js
export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.pageYOffset;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
};
```

### Add Dark Mode

1. Create `hooks/useDarkMode.js`
2. Pass theme to components via context or props
3. Update colors conditionally

---

## Performance Optimization

### Lazy Load Content Sections

```jsx
// In MainContent.jsx
import { lazy, Suspense } from 'react';

const IntroSection = lazy(() => import('./sections/IntroSection'));

<Suspense fallback={<div>Loading...</div>}>
  <IntroSection />
</Suspense>
```

### Reduce Particle Count on Mobile

```javascript
// In useParticleAnimation.js
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 15 : 30;
const particles = Array.from({ length: particleCount }, () => new GoldParticle());
```

---

## Testing Examples

### Test a Hook

```javascript
// __tests__/useScrollSpy.test.js
import { renderHook } from '@testing-library/react-hooks';
import { useScrollSpy } from '../hooks/useScrollSpy';

test('returns first section by default', () => {
  const { result } = renderHook(() => useScrollSpy(mockChapters));
  expect(result.current).toBe('intro-welcome');
});
```

### Test a Component

```javascript
// __tests__/ChapterNav.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterNav } from '../components/ChapterNav';

test('expands on click', () => {
  const onToggle = jest.fn();
  render(<ChapterNav chapter={mockChapter} onToggle={onToggle} />);
  
  fireEvent.click(screen.getByText('Introduction'));
  expect(onToggle).toHaveBeenCalledWith('intro');
});
```

---

## Common Issues & Solutions

### Issue: Smooth scroll not working in Safari
**Solution:** Ensure `scroll-behavior: smooth` is supported or use the custom `smoothScrollTo` function.

### Issue: Particles laggy on low-end devices
**Solution:** Reduce particle count or disable on mobile.

### Issue: Section IDs not found
**Solution:** Verify section `id` attributes in `MainContent.jsx` match those in `data/chapters.js`.

---

## Support & Documentation

- **README.md** - Architecture overview
- **COMPARISON.md** - Before/after comparison
- **This file** - Quick start guide

For questions or issues, refer to inline comments in each file.
