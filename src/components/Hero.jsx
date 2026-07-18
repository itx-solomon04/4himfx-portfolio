import Hero3D from './Hero3D.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Hero3D />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-eyebrow">TIMECODE 00:00:00:00 — SHOWREEL LIVE</div>
        <h1 className="hero-brand">
          <span className="line"><span>4him<em>.fx</em></span></span>
        </h1>
        <p className="hero-tagline">Cinematic edits, graded with intent.</p>
        <p>
          I'm Solomon — known online as 4him.fx. I cut, color, and sound-design
          stories that hold attention: short films, brand content, wedding
          films, and social edits.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            Watch the reel
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a project
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <span className="line-bar" />
        SCROLL
      </div>
    </section>
  );
}
