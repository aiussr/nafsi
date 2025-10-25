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

// ===== ASCII ART CONFIGURATION =====
const ASCII_CONFIG = {
    imageUrl: 'https://picsum.photos/800/600', // Default image
    charSet: ' .:-=+*#%@', // Characters from darkest to brightest
    fontSize: 10,
    charWidth: 6, // Approximate character width in pixels
    charHeight: 10, // Line height from CSS
    glowRadius: 100, // Radius for cursor interaction in pixels
    glowColor: '#00ff88', // Cyan-green glow color
    defaultColor: '#0f0' // Default green color
};

// ===== CURSOR TRACKING =====
const mouse = {
    x: -1000,
    y: -1000
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// ===== IMAGE LOADING AND PROCESSING =====
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

function imageToGrayscale(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Convert to grayscale
    for (let i = 0; i < pixels.length; i += 4) {
        const gray = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
    }

    return imageData;
}

// ===== FLOYD-STEINBERG DITHERING =====
function floydSteinbergDither(imageData, levels = 10) {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const oldPixel = pixels[idx];

            // Quantize to the nearest level
            const newPixel = Math.round(oldPixel / 255 * (levels - 1)) * (255 / (levels - 1));
            const error = oldPixel - newPixel;

            pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = newPixel;

            // Distribute error to neighboring pixels
            if (x + 1 < width) {
                const rightIdx = (y * width + (x + 1)) * 4;
                pixels[rightIdx] += error * 7 / 16;
            }

            if (y + 1 < height) {
                if (x > 0) {
                    const bottomLeftIdx = ((y + 1) * width + (x - 1)) * 4;
                    pixels[bottomLeftIdx] += error * 3 / 16;
                }

                const bottomIdx = ((y + 1) * width + x) * 4;
                pixels[bottomIdx] += error * 5 / 16;

                if (x + 1 < width) {
                    const bottomRightIdx = ((y + 1) * width + (x + 1)) * 4;
                    pixels[bottomRightIdx] += error * 1 / 16;
                }
            }
        }
    }

    return imageData;
}

// ===== ASCII ART GENERATION =====
function pixelToChar(brightness, charSet) {
    const index = Math.floor((brightness / 255) * (charSet.length - 1));
    return charSet[index];
}

async function generateASCIIArt(imageUrl, charSet) {
    try {
        // Load and process image
        const img = await loadImage(imageUrl);

        // Calculate dimensions based on screen size and character size
        const cols = Math.floor(window.innerWidth / ASCII_CONFIG.charWidth);
        const rows = Math.floor(window.innerHeight / ASCII_CONFIG.charHeight);

        // Create a smaller canvas for ASCII conversion
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = cols;
        canvas.height = rows;

        // Draw and scale image to fit
        ctx.drawImage(img, 0, 0, cols, rows);

        // Get grayscale data
        let imageData = ctx.getImageData(0, 0, cols, rows);

        // Convert to grayscale
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            const gray = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
        }

        // Apply Floyd-Steinberg dithering
        imageData = floydSteinbergDither(imageData, charSet.length);

        // Generate ASCII art with individual spans
        const spans = [];
        asciiBackground.innerHTML = ''; // Clear existing content

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const idx = (y * cols + x) * 4;
                const brightness = imageData.data[idx];
                const char = pixelToChar(brightness, charSet);

                // Create span for each character
                const span = document.createElement('span');
                span.textContent = char;
                span.style.position = 'absolute';
                span.style.left = `${x * ASCII_CONFIG.charWidth}px`;
                span.style.top = `${y * ASCII_CONFIG.charHeight}px`;
                span.style.color = ASCII_CONFIG.defaultColor;
                span.style.transition = 'none'; // We'll handle animation manually

                // Store position for proximity calculation
                span.dataset.x = x * ASCII_CONFIG.charWidth;
                span.dataset.y = y * ASCII_CONFIG.charHeight;

                asciiBackground.appendChild(span);
                spans.push(span);
            }
        }

        return spans;
    } catch (error) {
        console.error('Error generating ASCII art:', error);
        asciiBackground.textContent = 'Error loading image';
        return [];
    }
}

// ===== PROXIMITY-BASED GLOW EFFECT =====
let asciiSpans = [];

function updateGlowEffect() {
    const radiusSquared = ASCII_CONFIG.glowRadius * ASCII_CONFIG.glowRadius;

    asciiSpans.forEach(span => {
        const spanX = parseFloat(span.dataset.x);
        const spanY = parseFloat(span.dataset.y);

        // Calculate distance from cursor
        const dx = mouse.x - spanX;
        const dy = mouse.y - spanY;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < radiusSquared) {
            // Within glow radius
            const distance = Math.sqrt(distanceSquared);
            const intensity = 1 - (distance / ASCII_CONFIG.glowRadius);

            // Apply glow effect
            span.style.color = ASCII_CONFIG.glowColor;
            span.style.textShadow = `0 0 ${intensity * 10}px ${ASCII_CONFIG.glowColor}`;
        } else {
            // Outside glow radius - reset to default
            span.style.color = ASCII_CONFIG.defaultColor;
            span.style.textShadow = 'none';
        }
    });

    requestAnimationFrame(updateGlowEffect);
}

// ===== INITIALIZATION =====
async function initASCIIBackground() {
    console.log('Initializing ASCII background...');
    asciiSpans = await generateASCIIArt(ASCII_CONFIG.imageUrl, ASCII_CONFIG.charSet);
    console.log(`Generated ${asciiSpans.length} ASCII characters`);

    // Start animation loop
    updateGlowEffect();
}

// Start ASCII art generation
initASCIIBackground();

// Placeholder: Fluid simulation will go here
