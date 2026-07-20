import { useEffect } from 'react';
import { initLenis, destroyLenis, bindSmoothAnchors } from './lib/smoothScroll.js';
import Nav from './components/Nav.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import TimelineRuler from './components/TimelineRuler.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Stats from './components/Stats.jsx';
import Process from './components/Process.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import GlobalParticles from './components/GlobalParticles.jsx';

export default function App() {
  useEffect(() => {
    initLenis();
    const unbind = bindSmoothAnchors(-88);
    return () => {
      unbind();
      destroyLenis();
    };
  }, []);

  return (
    <>
      <GlobalParticles />
      <div className="noise" />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <TimelineRuler tc="00:04:36:19" />
      <Stats />
      <About />
      <TimelineRuler tc="00:12:50:11" />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
