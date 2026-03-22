import { useState } from 'react';
import CustomCursor from './components/ui/CustomCursor.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import LoadingScreen from './components/ui/LoadingScreen.jsx';
import Navbar from './components/ui/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import TechStack from './components/sections/TechStack.jsx';
import Projects from './components/sections/Projects.jsx';
import Experience from './components/sections/Experience.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="min-h-screen" style={{ background: '#050816' }}>
          {/* Global UI */}
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          {/* Page sections */}
          <main>
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
