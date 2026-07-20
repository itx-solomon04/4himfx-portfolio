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

export default function Process() {
  const roadmapRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const el = roadmapRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    let target = 0;
    let current = 0;
    let rafId;

    function computeTarget() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.5;
      const total = rect.height + vh * 0.5;
      const traveled = start - rect.top;
      target = Math.min(1, Math.max(0, traveled / total));
    }

    function loop() {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      fill.style.height = current * 100 + '%';

      // Light each dot up the moment the glowing fill line reaches it,
      // so the roadmap itself feels driven by scroll, like the reference
      // sites, instead of a static line with static dots.
      const totalH = el.offsetHeight || 1;
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        const dotP = dot.offsetTop / totalH;
        dot.classList.toggle('is-lit', current >= dotP - 0.015);
      });

      rafId = requestAnimationFrame(loop);
    }

    function onScroll() {
      computeTarget();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    computeTarget();
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
            <Reveal
              key={s.n}
              as="div"
              className="roadmap-step"
              delay={i * 0.06}
              y={24}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}