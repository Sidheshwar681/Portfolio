import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent pointer-events-none">
      <div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00d4ff, #b44ffd, #00fff5)',
          boxShadow: '0 0 10px rgba(0,212,255,0.8)',
          transition: 'width 0.05s ease-out',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
