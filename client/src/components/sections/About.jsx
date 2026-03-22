import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats, skills } from '../../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const StatCard = ({ number, label }) => (
  <motion.div
    variants={fadeUp}
    className="text-center p-6 rounded-2xl"
    style={{
      background: 'rgba(13,20,39,0.7)',
      border: '1px solid rgba(26,42,74,0.8)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <div className="text-3xl font-display font-bold mb-1"
      style={{ background: 'linear-gradient(135deg, #00d4ff, #b44ffd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      {number}
    </div>
    <div className="text-sm text-slate-500">{label}</div>
  </motion.div>
);

const SkillBar = ({ name, level, category }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const catColor = {
    Frontend: '#00d4ff', Backend: '#b44ffd', Database: '#00fff5',
    Language: '#ff2d78', 'API': '#f59e0b', '3D/Graphics': '#10b981',
    DevOps: '#6366f1',
  };
  const color = catColor[category] || '#00d4ff';

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
            {category}
          </span>
          <span className="text-sm font-mono text-slate-500">{level}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'rgba(26,42,74,0.8)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={inView ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative section-padding"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #080d1a 100%)' }}>

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#00d4ff' }}>01. About Me</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white section-title">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Bio */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed text-lg mb-6">
              {personalInfo.bio}
            </motion.p>
            <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-8">
              When I'm not writing code, I'm exploring the intersection of creative design and engineering — building 3D web experiences, contributing to open source, and constantly learning what's next in the tech landscape.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {[
                { label: 'Location', value: personalInfo.location },
                { label: 'Email', value: personalInfo.email },
                { label: 'Status', value: personalInfo.available ? '✅ Open to opportunities' : '🔴 Not available' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="text-slate-600 w-20">{label}</span>
                  <span className="text-slate-400 font-mono">{value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3 mt-8">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
            </div>

            {/* Visual element: code snippet */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#0d1427', border: '1px solid rgba(26,42,74,0.8)' }}
            >
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(5,8,22,0.5)', borderBottom: '1px solid rgba(26,42,74,0.5)' }}>
                <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                <span className="ml-4 text-xs text-slate-600 font-mono">developer.js</span>
              </div>
              <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
                <span style={{ color: '#6366f1' }}>const </span>
                <span style={{ color: '#00d4ff' }}>developer</span>
                <span style={{ color: '#e2e8f0' }}> = {'{'}</span>{'\n'}
                <span style={{ color: '#e2e8f0' }}>  </span>
                <span style={{ color: '#00fff5' }}>name</span>
                <span style={{ color: '#e2e8f0' }}>: </span>
                <span style={{ color: '#f59e0b' }}>{`'${personalInfo.name}'`}</span>
                <span style={{ color: '#e2e8f0' }}>,</span>{'\n'}
                <span style={{ color: '#e2e8f0' }}>  </span>
                <span style={{ color: '#00fff5' }}>stack</span>
                <span style={{ color: '#e2e8f0' }}>: [</span>
                <span style={{ color: '#f59e0b' }}>'MERN'</span>
                <span style={{ color: '#e2e8f0' }}>, </span>
                <span style={{ color: '#f59e0b' }}>'Three.js'</span>
                <span style={{ color: '#e2e8f0' }}>],</span>{'\n'}
                <span style={{ color: '#e2e8f0' }}>  </span>
                <span style={{ color: '#00fff5' }}>passion</span>
                <span style={{ color: '#e2e8f0' }}>: </span>
                <span style={{ color: '#f59e0b' }}>'Building magic 🚀'</span>{'\n'}
                <span style={{ color: '#e2e8f0' }}>{'}'}</span>
              </pre>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills section */}
        <motion.div
          id="skills"
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-sm font-mono mb-3" style={{ color: '#b44ffd' }}>02. Skills</p>
            <h3 className="text-3xl font-display font-bold text-white section-title">Technical Expertise</h3>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeUp}>
                <SkillBar {...skill} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
