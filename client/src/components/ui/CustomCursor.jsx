import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
    };

    const moveRing = (e) => {
      const { clientX: x, clientY: y } = e;
      if (ringRef.current) {
        ringRef.current.animate(
          { left: `${x}px`, top: `${y}px` },
          { duration: 120, fill: 'forwards' }
        );
      }
    };

    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', moveRing);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', moveRing);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[99999] rounded-full"
        style={{
          width: isHovering ? '14px' : '8px',
          height: isHovering ? '14px' : '8px',
          background: isHovering ? '#b44ffd' : '#00d4ff',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          boxShadow: isHovering
            ? '0 0 15px #b44ffd, 0 0 30px rgba(180,79,253,0.5)'
            : '0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.5)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[99998] rounded-full"
        style={{
          width: isHovering ? '50px' : '36px',
          height: isHovering ? '50px' : '36px',
          border: `1.5px solid ${isHovering ? 'rgba(180,79,253,0.7)' : 'rgba(0,212,255,0.6)'}`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
};

export default CustomCursor;
