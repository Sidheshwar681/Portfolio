import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const categories = ['All', 'Full-Stack', 'React', 'Node.js', 'MongoDB'];

const ProjectCard = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
      }}
      className="group rounded-2xl overflow-hidden h-full"
    >
      <div className="h-full flex flex-col"
        style={{
          background: 'rgba(13,20,39,0.8)',
          border: '1px solid rgba(26,42,74,0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
        }}>

        {/* Gradient header */}
        <div className={`h-44 relative overflow-hidden flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
          style={{ opacity: 0.85 }}>
          <div className="absolute inset-0 bg-black/30" />
          {/* Project title overlay */}
          <div className="relative z-10 text-center px-4">
            <div className="text-4xl mb-2">
              {project.category === 'Full-Stack' ? '🌐' : project.category === 'React' ? '⚛️' : '🟢'}
            </div>
            <span className="text-white font-display font-bold text-sm opacity-90">{project.category}</span>
          </div>
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)' }} />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-display font-bold text-white mb-2 text-lg leading-tight group-hover:text-transparent transition-all duration-300"
            style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff, #b44ffd)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            {project.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="tech-tag text-xs">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="tech-tag text-xs">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors"
              style={{ background: 'rgba(26,42,74,0.6)', border: '1px solid rgba(26,42,74,0.8)' }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #00d4ff22, #b44ffd22)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative section-padding"
      style={{ background: 'linear-gradient(180deg, #080d1a 0%, #050816 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.03), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className="text-center mb-12">
          <p className="text-sm font-mono mb-3" style={{ color: '#b44ffd' }}>04. Projects</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            What I've Built
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A selection of projects that showcase my skills across the full stack, from concept to deployment.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeFilter === cat
                  ? 'linear-gradient(135deg, #00d4ff, #b44ffd)'
                  : 'rgba(13,20,39,0.7)',
                color: activeFilter === cat ? 'white' : '#94a3b8',
                border: activeFilter === cat ? 'none' : '1px solid rgba(26,42,74,0.6)',
                boxShadow: activeFilter === cat ? '0 4px 20px rgba(0,212,255,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
