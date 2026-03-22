import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStack } from '../../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const TechCard = ({ name, icon, color, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group rounded-2xl p-6 cursor-pointer overflow-hidden"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${color}12, ${color}05)`
          : 'rgba(13,20,39,0.7)',
        border: hovered ? `1px solid ${color}40` : '1px solid rgba(26,42,74,0.6)',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.3s, border-color 0.3s',
        boxShadow: hovered ? `0 8px 30px ${color}20` : 'none',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Name */}
        <h3 className="font-display font-semibold text-white mb-2 group-hover:transition-colors"
          style={{ color: hovered ? color : 'white', transition: 'color 0.3s' }}>
          {name}
        </h3>

        {/* Description (reveals on hover) */}
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.25 }}
          className="text-xs text-slate-500 leading-relaxed overflow-hidden"
        >
          {description}
        </motion.p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tech" className="relative section-padding" style={{ background: '#050816' }}>
      {/* Radial gradient bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,79,253,0.04), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#00fff5' }}>03. Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Tools I Use
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A curated set of technologies I use to build modern, scalable web applications—from server to browser.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {techStack.map((tech) => (
            <TechCard key={tech.name} {...tech} />
          ))}
        </motion.div>

        {/* Floating decorative orbs */}
        <div className="absolute top-24 right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent)', filter: 'blur(30px)' }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(180,79,253,0.06), transparent)', filter: 'blur(40px)' }} />
      </div>
    </section>
  );
};

export default TechStack;
