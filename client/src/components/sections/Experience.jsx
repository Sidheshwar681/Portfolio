import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../../data/index.js';

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative section-padding"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #080d1a 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,212,255,0.03), transparent)' }} />

      <div className="relative z-10 max-w-4xl mx-auto" ref={ref}>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeRight} className="mb-16">
          <p className="text-sm font-mono mb-3" style={{ color: '#00d4ff' }}>05. Experience</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white section-title">
            My Journey
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(180deg, #00d4ff, #b44ffd, rgba(180,79,253,0.1))' }} />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeRight}
                className="group relative pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono z-10 relative"
                    style={{
                      background: exp.isCurrent
                        ? 'linear-gradient(135deg, #00d4ff, #b44ffd)'
                        : 'rgba(13,20,39,0.9)',
                      border: `2px solid ${exp.isCurrent ? '#00d4ff' : 'rgba(26,42,74,0.8)'}`,
                      boxShadow: exp.isCurrent ? '0 0 20px rgba(0,212,255,0.4)' : 'none',
                    }}
                  >
                    {exp.isCurrent ? '★' : i + 1}
                  </div>
                  {exp.isCurrent && (
                    <div className="absolute w-9 h-9 rounded-full animate-ping"
                      style={{ background: 'rgba(0,212,255,0.15)' }} />
                  )}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-6 group-hover:border-blue-500/30 transition-all duration-300"
                  style={{
                    background: 'rgba(13,20,39,0.7)',
                    border: '1px solid rgba(26,42,74,0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,212,255,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,42,74,0.7)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                      <p className="font-medium" style={{ color: '#00d4ff' }}>{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      {exp.isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
                          Current
                        </span>
                      )}
                      <span className="text-sm text-slate-500 font-mono">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed my-3">{exp.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map(t => (
                      <span key={t} className="tech-tag text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
