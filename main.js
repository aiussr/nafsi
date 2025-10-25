// Get DOM elements
const asciiBackground = document.getElementById('ascii-background');
const fluidCanvas = document.getElementById('fluid-canvas');
const mainLink = document.getElementById('main-link');

// Initialize canvas size
function resizeCanvas() {
    fluidCanvas.width = window.innerWidth;
    fluidCanvas.height = window.innerHeight;
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();

console.log('Homepage initialized');
console.log('ASCII Background:', asciiBackground);
console.log('Fluid Canvas:', fluidCanvas);
console.log('Main Link:', mainLink);

// Placeholder: ASCII art generation will go here
// Placeholder: Fluid simulation will go here
