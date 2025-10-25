// Get DOM elements
const asciiBackground = document.getElementById('ascii-background');
const fluidCanvas = document.getElementById('fluid-canvas');
const mainLink = document.getElementById('main-link');
const leftColumn = document.querySelector('.left-column');
const rightColumn = document.querySelector('.right-column');

// Initialize canvas size
function resizeCanvas() {
    // Canvas takes up the left column (50% of screen)
    const rect = leftColumn.getBoundingClientRect();
    fluidCanvas.width = rect.width;
    fluidCanvas.height = rect.height;
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    // Regenerate ASCII art with new dimensions
    initASCIIBackground();
});

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

// Track mouse position relative to the right column (for ASCII glow effect)
window.addEventListener('mousemove', (e) => {
    const rect = rightColumn.getBoundingClientRect();
    // Only update if mouse is over the right column
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    } else {
        // Move cursor out of range when not over right column
        mouse.x = -1000;
        mouse.y = -1000;
    }
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

        // Calculate dimensions based on right column size and character size
        const rect = rightColumn.getBoundingClientRect();
        const cols = Math.floor(rect.width / ASCII_CONFIG.charWidth);
        const rows = Math.floor(rect.height / ASCII_CONFIG.charHeight);

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
let asciiGlowIntensity = 10; // Configurable glow intensity

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
            span.style.textShadow = `0 0 ${intensity * asciiGlowIntensity}px ${ASCII_CONFIG.glowColor}`;
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

// ===== WEBGL FLUID SIMULATION =====

// GLSL Shader Sources
const SHADERS = {
    // Vertex shader - simple pass-through
    vertex: `
        attribute vec2 a_position;
        varying vec2 v_texCoord;

        void main() {
            v_texCoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `,

    // Advection shader - moves quantities through velocity field
    advection: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform sampler2D u_source;
        uniform vec2 u_texelSize;
        uniform float u_dt;
        uniform float u_dissipation;

        void main() {
            // Backtrace along velocity field
            vec2 coord = v_texCoord - u_dt * texture2D(u_velocity, v_texCoord).xy * u_texelSize;
            gl_FragColor = u_dissipation * texture2D(u_source, coord);
        }
    `,

    // Divergence shader - computes divergence of velocity field
    divergence: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform vec2 u_texelSize;

        void main() {
            float L = texture2D(u_velocity, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_velocity, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float T = texture2D(u_velocity, v_texCoord + vec2(0.0, u_texelSize.y)).y;
            float B = texture2D(u_velocity, v_texCoord - vec2(0.0, u_texelSize.y)).y;

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `,

    // Pressure solver - Jacobi iteration for pressure
    pressure: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_pressure;
        uniform sampler2D u_divergence;
        uniform vec2 u_texelSize;

        void main() {
            float L = texture2D(u_pressure, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_pressure, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float T = texture2D(u_pressure, v_texCoord + vec2(0.0, u_texelSize.y)).x;
            float B = texture2D(u_pressure, v_texCoord - vec2(0.0, u_texelSize.y)).x;
            float C = texture2D(u_divergence, v_texCoord).x;

            float pressure = (L + R + T + B - C) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
    `,

    // Gradient subtraction - makes velocity field incompressible
    gradientSubtract: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_pressure;
        uniform sampler2D u_velocity;
        uniform vec2 u_texelSize;

        void main() {
            float L = texture2D(u_pressure, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_pressure, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float T = texture2D(u_pressure, v_texCoord + vec2(0.0, u_texelSize.y)).x;
            float B = texture2D(u_pressure, v_texCoord - vec2(0.0, u_texelSize.y)).x;

            vec2 velocity = texture2D(u_velocity, v_texCoord).xy;
            velocity -= 0.5 * vec2(R - L, T - B);

            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `,

    // Splat shader - adds force/color at mouse position
    splat: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_target;
        uniform vec2 u_point;
        uniform vec3 u_color;
        uniform float u_radius;

        void main() {
            vec2 p = v_texCoord - u_point;
            float splat = exp(-dot(p, p) / u_radius);
            vec3 base = texture2D(u_target, v_texCoord).xyz;
            gl_FragColor = vec4(base + u_color * splat, 1.0);
        }
    `,

    // Display shader - renders fluid with color based on velocity
    display: `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform float u_brightness;

        void main() {
            vec2 vel = texture2D(u_velocity, v_texCoord).xy;
            float speed = length(vel);

            // Color based on velocity magnitude and direction
            vec3 color = vec3(
                0.5 + 0.5 * vel.x * 10.0,
                0.5 + 0.5 * vel.y * 10.0,
                0.5 + speed * 2.0
            );

            color *= u_brightness;
            gl_FragColor = vec4(color, 0.3); // Semi-transparent
        }
    `
};

// WebGL Utility Functions
class FluidSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: false
        });

        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        // Simulation parameters
        this.config = {
            simResolution: 128,
            dyeResolution: 512,
            densityDissipation: 0.98,
            velocityDissipation: 0.99,
            pressureIterations: 20,
            splatRadius: 0.005,
            brightness: 0.8
        };

        this.pointers = [];
        this.init();
    }

    init() {
        const gl = this.gl;

        // Create programs
        this.programs = {
            advection: this.createProgram(SHADERS.vertex, SHADERS.advection),
            divergence: this.createProgram(SHADERS.vertex, SHADERS.divergence),
            pressure: this.createProgram(SHADERS.vertex, SHADERS.pressure),
            gradientSubtract: this.createProgram(SHADERS.vertex, SHADERS.gradientSubtract),
            splat: this.createProgram(SHADERS.vertex, SHADERS.splat),
            display: this.createProgram(SHADERS.vertex, SHADERS.display)
        };

        // Create full-screen quad
        const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        this.quadBuffer = buffer;

        // Create framebuffers
        this.initFramebuffers();

        // Setup mouse/touch interaction
        this.setupPointerEvents();

        console.log('Fluid simulation initialized');
    }

    createProgram(vertexSource, fragmentSource) {
        const gl = this.gl;

        const vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    createTexture(width, height) {
        const gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, null);
        return texture;
    }

    createDoubleFBO(width, height) {
        const gl = this.gl;

        // Check for floating point texture support
        const ext = gl.getExtension('OES_texture_float');
        if (!ext) {
            console.warn('OES_texture_float not supported, using UNSIGNED_BYTE');
        }

        const fbo1 = this.createFBO(width, height);
        const fbo2 = this.createFBO(width, height);

        return {
            width,
            height,
            read: fbo1,
            write: fbo2,
            swap() {
                const temp = this.read;
                this.read = this.write;
                this.write = temp;
            }
        };
    }

    createFBO(width, height) {
        const gl = this.gl;

        const texture = this.createTexture(width, height);
        const fbo = gl.createFramebuffer();

        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
            framebuffer: fbo,
            texture: texture,
            width: width,
            height: height
        };
    }

    initFramebuffers() {
        const simRes = this.config.simResolution;
        const dyeRes = this.config.dyeResolution;

        // Enable floating point textures extension
        this.gl.getExtension('OES_texture_float');
        this.gl.getExtension('OES_texture_float_linear');

        this.velocity = this.createDoubleFBO(simRes, simRes);
        this.divergence = this.createFBO(simRes, simRes);
        this.pressure = this.createDoubleFBO(simRes, simRes);
    }

    setupPointerEvents() {
        const canvas = this.canvas;

        const updatePointer = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;

            const pointer = this.pointers[0] || { x: 0, y: 0, dx: 0, dy: 0, down: false };

            pointer.dx = (x - pointer.x) * 10.0;
            pointer.dy = (y - pointer.y) * 10.0;
            pointer.x = x;
            pointer.y = y;

            this.pointers[0] = pointer;
        };

        canvas.addEventListener('mousemove', (e) => {
            updatePointer(e);
            if (!this.pointers[0]) this.pointers[0] = { down: false };
            this.pointers[0].down = e.buttons === 1;
        });

        canvas.addEventListener('mousedown', (e) => {
            updatePointer(e);
            this.pointers[0].down = true;
        });

        canvas.addEventListener('mouseup', () => {
            if (this.pointers[0]) this.pointers[0].down = false;
        });
    }

    step(deltaTime) {
        const gl = this.gl;
        const dt = Math.min(deltaTime, 0.016);

        // Apply mouse splat
        if (this.pointers[0] && this.pointers[0].down) {
            const pointer = this.pointers[0];
            const force = { x: pointer.dx, y: pointer.dy };

            if (Math.abs(force.x) > 0.01 || Math.abs(force.y) > 0.01) {
                this.splat(pointer.x, pointer.y, force.x, force.y);
            }
        }

        // Advect velocity
        this.advect(this.velocity, this.velocity, this.config.velocityDissipation, dt);

        // Compute divergence
        this.computeDivergence(this.velocity, this.divergence);

        // Solve pressure (Jacobi iterations)
        this.clearFBO(this.pressure.read);
        for (let i = 0; i < this.config.pressureIterations; i++) {
            this.solvePressure(this.pressure, this.divergence);
            this.pressure.swap();
        }

        // Subtract pressure gradient
        this.subtractGradient(this.velocity, this.pressure.read);

        // Render to screen
        this.render();
    }

    splat(x, y, dx, dy) {
        const gl = this.gl;
        const program = this.programs.splat;

        gl.useProgram(program);

        // Splat velocity
        this.bindFBO(this.velocity.write);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_target'), 0);
        gl.uniform2f(gl.getUniformLocation(program, 'u_point'), x, y);
        gl.uniform3f(gl.getUniformLocation(program, 'u_color'), dx, dy, 0.0);
        gl.uniform1f(gl.getUniformLocation(program, 'u_radius'), this.config.splatRadius);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        this.velocity.swap();
    }

    advect(target, source, dissipation, dt) {
        const gl = this.gl;
        const program = this.programs.advection;

        gl.useProgram(program);
        this.bindFBO(target.write);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_velocity'), 0);
        gl.uniform1i(gl.getUniformLocation(program, 'u_source'), 1);
        gl.uniform2f(gl.getUniformLocation(program, 'u_texelSize'), 1.0 / target.width, 1.0 / target.height);
        gl.uniform1f(gl.getUniformLocation(program, 'u_dt'), dt);
        gl.uniform1f(gl.getUniformLocation(program, 'u_dissipation'), dissipation);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, source.read.texture);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        target.swap();
    }

    computeDivergence(velocity, divergence) {
        const gl = this.gl;
        const program = this.programs.divergence;

        gl.useProgram(program);
        this.bindFBO(divergence);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_velocity'), 0);
        gl.uniform2f(gl.getUniformLocation(program, 'u_texelSize'), 1.0 / velocity.width, 1.0 / velocity.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    solvePressure(pressure, divergence) {
        const gl = this.gl;
        const program = this.programs.pressure;

        gl.useProgram(program);
        this.bindFBO(pressure.write);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_pressure'), 0);
        gl.uniform1i(gl.getUniformLocation(program, 'u_divergence'), 1);
        gl.uniform2f(gl.getUniformLocation(program, 'u_texelSize'), 1.0 / pressure.width, 1.0 / pressure.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, divergence.texture);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    subtractGradient(velocity, pressure) {
        const gl = this.gl;
        const program = this.programs.gradientSubtract;

        gl.useProgram(program);
        this.bindFBO(velocity.write);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_pressure'), 0);
        gl.uniform1i(gl.getUniformLocation(program, 'u_velocity'), 1);
        gl.uniform2f(gl.getUniformLocation(program, 'u_texelSize'), 1.0 / velocity.width, 1.0 / velocity.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        velocity.swap();
    }

    render() {
        const gl = this.gl;
        const program = this.programs.display;

        gl.useProgram(program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'u_velocity'), 0);
        gl.uniform1f(gl.getUniformLocation(program, 'u_brightness'), this.config.brightness);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);

        // Enable blending for transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        gl.disable(gl.BLEND);
    }

    bindFBO(fbo) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
        gl.viewport(0, 0, fbo.width, fbo.height);
    }

    clearFBO(fbo) {
        const gl = this.gl;
        this.bindFBO(fbo);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}

// Initialize fluid simulation
let fluidSim;
let lastTime = 0;

function initFluidSimulation() {
    fluidSim = new FluidSimulation(fluidCanvas);

    if (fluidSim.gl) {
        requestAnimationFrame(updateFluid);
        console.log('Fluid simulation started');
    }
}

function updateFluid(time) {
    const deltaTime = (time - lastTime) / 1000.0;
    lastTime = time;

    if (fluidSim && fluidSim.gl) {
        fluidSim.step(deltaTime);
    }

    requestAnimationFrame(updateFluid);
}

// Start fluid simulation
initFluidSimulation();

// ===== UI CONTROLS =====

// Color palette options
const COLOR_PALETTES = {
    velocity: `
        vec2 vel = texture2D(u_velocity, v_texCoord).xy;
        float speed = length(vel);
        vec3 color = vec3(
            0.5 + 0.5 * vel.x * 10.0,
            0.5 + 0.5 * vel.y * 10.0,
            0.5 + speed * 2.0
        );
    `,
    rainbow: `
        vec2 vel = texture2D(u_velocity, v_texCoord).xy;
        float speed = length(vel);
        float hue = atan(vel.y, vel.x) / 3.14159 * 0.5 + 0.5;
        vec3 color = vec3(
            0.5 + 0.5 * cos(6.28318 * (hue + 0.0)),
            0.5 + 0.5 * cos(6.28318 * (hue + 0.33)),
            0.5 + 0.5 * cos(6.28318 * (hue + 0.67))
        ) * (0.5 + speed * 2.0);
    `,
    fire: `
        vec2 vel = texture2D(u_velocity, v_texCoord).xy;
        float speed = length(vel);
        vec3 color = vec3(
            1.0,
            0.5 + speed * 2.0,
            speed * 1.5
        ) * (0.3 + speed * 3.0);
    `,
    ocean: `
        vec2 vel = texture2D(u_velocity, v_texCoord).xy;
        float speed = length(vel);
        vec3 color = vec3(
            speed * 1.5,
            0.5 + speed * 2.0,
            0.8 + speed * 1.0
        ) * (0.4 + speed * 2.0);
    `,
    neon: `
        vec2 vel = texture2D(u_velocity, v_texCoord).xy;
        float speed = length(vel);
        vec3 color = vec3(
            0.0 + speed * 3.0,
            0.8 + speed * 2.0,
            1.0
        ) * (0.3 + speed * 4.0);
    `
};

let currentPalette = 'velocity';

function updateDisplayShader() {
    const paletteCode = COLOR_PALETTES[currentPalette];
    const newShader = `
        precision highp float;

        varying vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform float u_brightness;

        void main() {
            ${paletteCode}
            color *= u_brightness;
            gl_FragColor = vec4(color, 0.3);
        }
    `;

    // Recompile shader
    if (fluidSim && fluidSim.gl) {
        fluidSim.programs.display = fluidSim.createProgram(SHADERS.vertex, newShader);
    }
}

// Initialize controls
function initControls() {
    const toggleBtn = document.getElementById('toggle-controls');
    const controlsPanel = document.getElementById('controls');

    // Toggle controls visibility
    toggleBtn.addEventListener('click', () => {
        controlsPanel.classList.toggle('hidden');
        toggleBtn.textContent = controlsPanel.classList.contains('hidden') ? 'Settings' : 'Close';
    });

    // Velocity dissipation slider
    const dissipationSlider = document.getElementById('dissipation-slider');
    const dissipationValue = document.getElementById('dissipation-value');
    dissipationSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        dissipationValue.textContent = value.toFixed(3);
        if (fluidSim) {
            fluidSim.config.velocityDissipation = value;
        }
    });

    // Pressure iterations slider
    const iterationsSlider = document.getElementById('iterations-slider');
    const iterationsValue = document.getElementById('iterations-value');
    iterationsSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        iterationsValue.textContent = value;
        if (fluidSim) {
            fluidSim.config.pressureIterations = value;
        }
    });

    // Splat radius slider
    const radiusSlider = document.getElementById('radius-slider');
    const radiusValue = document.getElementById('radius-value');
    radiusSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        radiusValue.textContent = value.toFixed(3);
        if (fluidSim) {
            fluidSim.config.splatRadius = value;
        }
    });

    // Color palette selector
    const paletteSelect = document.getElementById('color-palette');
    paletteSelect.addEventListener('change', (e) => {
        currentPalette = e.target.value;
        updateDisplayShader();
    });

    // ASCII glow radius slider
    const glowRadiusSlider = document.getElementById('glow-radius-slider');
    const glowRadiusValue = document.getElementById('glow-radius-value');
    glowRadiusSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        glowRadiusValue.textContent = value + 'px';
        ASCII_CONFIG.glowRadius = value;
    });

    // ASCII glow intensity slider
    const glowIntensitySlider = document.getElementById('glow-intensity-slider');
    const glowIntensityValue = document.getElementById('glow-intensity-value');
    glowIntensitySlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        glowIntensityValue.textContent = value + 'px';
        asciiGlowIntensity = value;
    });

    console.log('Controls initialized');
}

// Initialize controls after page loads
initControls();
