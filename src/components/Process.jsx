import { useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';

const steps = [
  {
    n: '01',
    title: 'Assembly',
    tag: 'CREATIVE SYSTEMS',
    desc: "Rough cut built around the story's emotional beats, not just the footage order. This is where pacing decisions get made.",
    tc: '00:14:12:00',
  },
  {
    n: '02',
    title: 'Fine Cut',
    tag: 'STRUCTURE',
    desc: 'Pacing, transitions, and rhythm tightened until every single cut earns its place in the timeline.',
    tc: '00:16:04:18',
  },
  {
    n: '03',
    title: 'Color Grade',
    tag: 'POST PRODUCTION',
    desc: 'A grade built for mood and tone — not a preset, a deliberate decision made scene by scene.',
    tc: '00:18:22:07',
  },
  {
    n: '04',
    title: 'Sound & Delivery',
    tag: 'FINISHING',
    desc: 'Sound design pass and final export, formatted and mastered for wherever the film is going.',
    tc: '00:20:55:14',
  },
];

const TRIGGER_LINE = 0.5;
const CATCH_UP_SPEED = 10;

export default function Process() {
  const roadmapRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);
  const stepRefs = useRef([]);

  useEffect(() => {
    const el = roadmapRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    let current = 0;
    let lastTime = null;
    let rafId;

    function loop(time) {
      if (lastTime === null) lastTime = time;
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const roadmapRect = el.getBoundingClientRect();
      const totalH = el.offsetHeight || 1;
      const vh = window.innerHeight;
      const triggerY = vh * TRIGGER_LINE;

      let target = 0;

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;

        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;
        const reached = dotCenter <= triggerY;

        dot.classList.toggle('is-lit', reached);

        const step = stepRefs.current[i];
        if (step) {
          step.classList.toggle('is-revealed', reached);
        }

        if (reached) {
          const dotFraction = (dotRect.top - roadmapRect.top) / totalH;
          target = Math.max(target, dotFraction);
        }
      });

      const factor = 1 - Math.exp(-CATCH_UP_SPEED * dt);
      current += (target - current) * factor;
      fill.style.height = current * 100 + '%';

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="process">
      <div className="section-inner">
        <div className="eyebrow">Timecode 00:14:00:00 — Process</div>
        <Reveal as="h2">From footage to final grade</Reveal>

        <div className="roadmap" ref={roadmapRef}>
          <div className="roadmap-track" aria-hidden="true">
            <div className="roadmap-track-fill" ref={fillRef} />
          </div>

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="roadmap-step"
              ref={(el) => (stepRefs.current[i] = el)}
            >
              <div className="roadmap-dot" aria-hidden="true">
                <span
                  className="roadmap-dot-inner"
                  ref={(el) => (dotRefs.current[i] = el)}
                />
              </div>

              <div className="roadmap-content">
                <span className="roadmap-tc">{s.tc}</span>

                <div className="roadmap-heading">
                  <span className="roadmap-n">{s.n}</span>
                  <h3 className="roadmap-title">{s.title}</h3>
                </div>

                <span className="roadmap-tag">{s.tag}</span>
                <p className="roadmap-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}