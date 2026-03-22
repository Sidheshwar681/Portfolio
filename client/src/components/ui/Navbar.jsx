import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/index.js';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Tech', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[1000]"
        style={{
          background: scrolled ? 'rgba(5,8,22,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,42,74,0.6)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-display"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,79,253,0.2))',
                border: '1px solid rgba(0,212,255,0.3)',
                boxShadow: '0 0 20px rgba(0,212,255,0.15)',
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #b44ffd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>SD</span>
            </div>
            <span className="hidden sm:block font-display font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">
              Sid Dev
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg group"
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,212,255,0.06)' }}
                />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href={personalInfo.resume}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="btn-outline text-xs py-2 px-5"
              style={{ padding: '8px 20px', fontSize: '0.8rem' }}
            >
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 rounded-full"
                style={{ background: '#00d4ff', width: i === 1 ? '20px' : '24px' }}
                animate={{
                  rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[999] w-72"
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(26,42,74,0.6)',
            }}
          >
            <div className="flex flex-col gap-2 pt-24 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 px-4 text-slate-300 hover:text-white rounded-lg text-lg font-medium transition-colors"
                  style={{ borderLeft: '2px solid transparent' }}
                  onMouseEnter={e => { e.target.style.borderLeftColor = '#00d4ff'; e.target.style.color = 'white'; e.target.style.background = 'rgba(0,212,255,0.05)'; }}
                  onMouseLeave={e => { e.target.style.borderLeftColor = 'transparent'; e.target.style.color = ''; e.target.style.background = 'transparent'; }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
