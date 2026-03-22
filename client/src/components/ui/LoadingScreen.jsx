import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 400);
          return 100;
        }
        // Ease the progress: fast at first, slow at end
        const increment = prev < 70 ? Math.random() * 12 + 8 : Math.random() * 4 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ background: '#050816' }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #b44ffd, transparent)' }} />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo / initials */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,79,253,0.2))',
                  border: '1px solid rgba(0,212,255,0.3)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.2)',
                }}>
                <span className="text-3xl font-bold font-display"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #b44ffd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  SD
                </span>
              </div>

              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-2xl border-t-2 border-r-2 border-transparent"
                style={{ borderTopColor: '#00d4ff', borderRightColor: '#b44ffd' }}
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-2xl font-display font-bold tracking-wider text-white mb-1">
                Portfolio
              </h1>
              <p className="text-sm text-slate-500 font-mono tracking-[0.3em]">
                LOADING EXPERIENCE
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-64"
            >
              <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00d4ff, #b44ffd, #00fff5)',
                    boxShadow: '0 0 8px rgba(0,212,255,0.8)',
                    transition: 'width 0.15s ease',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-600 font-mono">Initializing...</span>
                <span className="text-xs font-mono" style={{ color: '#00d4ff' }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00d4ff' }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
