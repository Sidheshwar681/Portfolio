import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../../data/index.js';
import HeroScene from '../three/HeroScene.jsx';

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-24 md:pt-28 md:pb-28">
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,8,22,0.7) 100%)'
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #050816)' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          className="font-display font-bold leading-none mb-4"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          <span className="text-white">Hi, I'm </span>
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #b44ffd 50%, #00fff5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-6 h-10 flex items-center justify-center"
        >
          <span className="text-xl md:text-2xl font-mono text-slate-400">
            I'm a{' '}
            <span style={{ color: '#00d4ff' }}>
              <TypeAnimation
                sequence={personalInfo.subtitles.flatMap(s => [s, 2000])}
                wrapper="span"
                repeat={Infinity}
                speed={50}
              />
            </span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('projects')}
            className="btn-primary"
          >
            <span>View Projects</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('contact')}
            className="btn-outline"
          >
            <span>Contact Me</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Floating tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-3 mt-12 flex-wrap"
        >
          {['React', 'Node.js', 'MongoDB', 'Express', 'Three.js'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="tech-tag text-xs"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2.5 rounded-full"
            style={{ background: 'linear-gradient(180deg, #00d4ff, transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
