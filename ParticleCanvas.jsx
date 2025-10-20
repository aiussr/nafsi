import React, { useRef } from 'react';
import { useParticleAnimation } from '../hooks/useParticleAnimation';

/**
 * Renders the canvas layer with gold particle animation
 */
export const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useParticleAnimation(canvasRef);

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Subtle pattern background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F0EDE7 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          zIndex: 0
        }}
      />
    </>
  );
};
