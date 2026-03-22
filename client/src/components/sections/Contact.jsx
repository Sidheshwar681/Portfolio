import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const CONTACT_EMAIL = 'kalgesidheshwar45@gmail.com';

const getContactEndpoint = () => {
  const configuredUrl = import.meta.env.VITE_CONTACT_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return '/api/contact';
  }

  return null;
};

const InputField = ({ label, type = 'text', name, value, onChange, rows }) => {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label className="block text-xs font-medium mb-2 transition-colors duration-200"
        style={{ color: focused ? '#00d4ff' : '#64748b' }}>
        {label}
      </label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-input"
        style={{
          borderColor: focused ? '#00d4ff' : 'rgba(26,42,74,0.8)',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.1), 0 0 15px rgba(0,212,255,0.08)' : 'none',
          resize: rows ? 'none' : undefined,
          minHeight: rows ? `${rows * 1.6}rem` : undefined,
        }}
      />
    </div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const contactEndpoint = getContactEndpoint();

  const handleChange = (e) => setForm((currentForm) => ({ ...currentForm, [e.target.name]: e.target.value }));

  const openMailClient = () => {
    const params = new URLSearchParams({
      subject: form.subject || `Portfolio message from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    });

    window.location.href = `mailto:${CONTACT_EMAIL}?${params.toString()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!contactEndpoint) {
        openMailClient();
        toast.success('Opening your email app so you can send this message directly.', {
          style: { background: '#0d1427', color: '#e2e8f0', border: '1px solid rgba(0,212,255,0.3)' },
        });
        return;
      }

      await axios.post(contactEndpoint, form);
      toast.success('Message sent! I will get back to you soon.', {
        style: { background: '#0d1427', color: '#e2e8f0', border: '1px solid rgba(0,212,255,0.3)' },
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send. Please try direct email instead.', {
        style: { background: '#0d1427', color: '#e2e8f0', border: '1px solid rgba(255,45,120,0.3)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding"
      style={{ background: 'linear-gradient(180deg, #080d1a 0%, #050816 100%)' }}>
      <Toaster position="top-right" />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(180,79,253,0.05), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className="text-center mb-16">
          <p className="text-sm font-mono mb-3" style={{ color: '#ff2d78' }}>06. Contact</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {[
              { icon: '📍', label: 'Location', value: 'Pune, Maharashtra', color: '#00d4ff' },
              { icon: '📧', label: 'Email', value: CONTACT_EMAIL, color: '#b44ffd' },
              { icon: '💼', label: 'Status', value: 'Open to Opportunities', color: '#00fff5' },
              { icon: '⚡', label: 'Response Time', value: 'Within 24 hours', color: '#f59e0b' },
            ].map(({ icon, label, value, color }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(13,20,39,0.7)', border: '1px solid rgba(26,42,74,0.6)', backdropFilter: 'blur(10px)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-slate-600">{label}</p>
                  <p className="text-sm text-slate-300 font-medium">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(13,20,39,0.7)',
                border: '1px solid rgba(26,42,74,0.7)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <InputField label="Your Name" name="name" value={form.name} onChange={handleChange} />
                <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-5">
                <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} />
              </div>
              <div className="mb-7">
                <InputField label="Message" name="message" value={form.message} onChange={handleChange} rows={6} />
              </div>

              {!contactEndpoint && (
                <p className="text-sm text-slate-500 mb-6">
                  On the GitHub Pages version, this opens your email app instead of calling the backend server.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 relative overflow-hidden"
                style={{
                  background: loading
                    ? 'rgba(26,42,74,0.6)'
                    : 'linear-gradient(135deg, #00d4ff, #b44ffd)',
                  transition: 'all 0.3s',
                  boxShadow: loading ? 'none' : '0 4px 25px rgba(0,212,255,0.3)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
