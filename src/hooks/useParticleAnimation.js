import { useEffect } from 'react';

/**
 * Manages canvas-based particle animation system
 * Creates gold dust particles with slow, natural movement
 */
export const useParticleAnimation = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class GoldParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.width = Math.random() * 3 + 2;
        this.height = Math.random() * 4 + 3;
        this.speedY = Math.random() * 0.15 + 0.05;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        this.opacity = Math.random() * 0.3 + 0.15;
        this.shimmer = Math.random() * 0.1;
        this.shimmerSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.shimmer += this.shimmerSpeed;
        
        if (this.y > canvas.height + 20) {
          this.reset();
        }
        if (this.x < -20 || this.x > canvas.width + 20) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const shimmerOpacity = this.opacity + Math.sin(this.shimmer) * 0.1;
        
        const gradient = ctx.createLinearGradient(
          -this.width/2, -this.height/2, 
          this.width/2, this.height/2
        );
        gradient.addColorStop(0, `rgba(218, 165, 32, ${shimmerOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${shimmerOpacity * 1.2})`);
        gradient.addColorStop(1, `rgba(184, 134, 11, ${shimmerOpacity * 0.8})`);
        
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(-this.width/2, 0);
        ctx.quadraticCurveTo(0, -this.height/2, this.width/2, -this.height/4);
        ctx.quadraticCurveTo(this.width/3, this.height/4, 0, this.height/2);
        ctx.quadraticCurveTo(-this.width/3, this.height/4, -this.width/2, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 30 }, () => new GoldParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef]);
};
