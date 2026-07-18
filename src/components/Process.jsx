import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal.jsx';

const steps = [
  {
    n: '01',
    title: 'Assembly',
    tag: 'CREATIVE SYSTEMS',
    desc: "Rough cut built around the story's emotional beats, not just the footage order. This is where pacing decisions get made.",
  },
  {
    n: '02',
    title: 'Fine Cut',
    tag: 'STRUCTURE',
    desc: 'Pacing, transitions, and rhythm tightened until every single cut earns its place in the timeline.',
  },
  {
    n: '03',
    title: 'Color Grade',
    tag: 'POST PRODUCTION',
    desc: 'A grade built for mood and tone — not a preset, a deliberate decision made scene by scene.',
  },
  {
    n: '04',
    title: 'Sound & Delivery',
    tag: 'FINISHING',
    desc: 'Sound design pass and final export, formatted and mastered for wherever the film is going.',
  },
];

export default function Process() {
  const wrapRef = useRef(null);
  const [fillPct, setFillPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setFillPct(progress);
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = steps[activeIdx];

  return (
    <section id="process">
      <div className="section-inner">
        <div className="eyebrow">Timecode 00:14:00:00 — Process</div>
        <Reveal as="h2">From footage to final grade</Reveal>

        <div className="breakdown-pin-wrap" ref={wrapRef}>
          <div className="breakdown-sticky">
            <div className="process-ruler">
              <div className="process-ruler-fill" style={{ width: `${fillPct * 100}%` }} />
            </div>

            <div className="breakdown-grid">
              <div className="breakdown-list">
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    className={`breakdown-row${i === activeIdx ? ' is-active' : ''}`}
                  >
                    <span className="breakdown-n">{s.n}</span>
                    <span className="breakdown-title">{s.title}</span>
                  </div>
                ))}
              </div>

              <div className="breakdown-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.n}
                    className="breakdown-panel-inner"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.5, ease: [0.16, 0.84, 0.44, 1] }}
                  >
                    <span className="breakdown-tag">{active.tag}</span>
                    <span className="breakdown-panel-n">{active.n} // 0{steps.length}</span>
                    <h3>{active.title}</h3>
                    <p>{active.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="process-hint">Keep scrolling — the breakdown steps through automatically</div>
          </div>
        </div>
      </div>
    </section>
  );
}
