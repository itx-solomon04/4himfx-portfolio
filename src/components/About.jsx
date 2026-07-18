import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx';

const waveformBars = Array.from({ length: 60 }, (_, i) =>
  Math.max(4, 6 + Math.round(Math.sin(i * 0.5) * 10 + Math.random() * 18))
);

export default function About() {
  const waveRef = useRef(null);
  const waveInView = useInView(waveRef, { once: true, amount: 0.3 });

  return (
    <section id="about">
      <div className="section-inner">
        <div className="eyebrow">Timecode 00:02:30:00 — About</div>
        <div className="about-grid">
          <Reveal as="div" className="about-visual" y={0} style={{ x: -20 }}>
            <video
              src="/videos/about.mp4"
              poster="/images/profile.jpg"
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div ref={waveRef} className={`waveform${waveInView ? ' in-view' : ''}`}>
              {waveformBars.map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} />
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal as="h2">Storytelling first. The grade is how it feels.</Reveal>
            <Reveal as="p" className="lede" delay={0.08}>
              Every cut starts with the story, not the software. I build
              pacing around emotion, then use color grading and sound design
              to make that emotion land — across short films, brand content,
              wedding films, and social edits.
            </Reveal>
            <RevealGroup as="div" className="stat-row">
              <motion.div variants={revealItem} className="stat">
                <b>5+</b>
                <span>Years editing</span>
              </motion.div>
              <motion.div variants={revealItem} className="stat">
                <b>2021</b>
                <span>Independent director since</span>
              </motion.div>
              <motion.div variants={revealItem} className="stat">
                <b>100%</b>
                <span>Storytelling-led grading</span>
              </motion.div>
            </RevealGroup>
            <RevealGroup as="div" className="chip-row">
              {['Color Grading', 'Sound Design', 'Short Films', 'Corporate Content', 'Wedding Films', 'Social Edits'].map(
                (c) => (
                  <motion.span variants={revealItem} className="chip" key={c}>
                    {c}
                  </motion.span>
                )
              )}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
