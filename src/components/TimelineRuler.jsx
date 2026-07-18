import { useEffect, useRef } from 'react';

export default function TimelineRuler({ tc }) {
  const elRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = elRef.current;
      const head = headRef.current;
      if (!el || !head) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const traveled = vh - rect.top;
      const p = Math.min(1, Math.max(0, traveled / total));
      head.style.left = `${p * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="timeline-ruler" ref={elRef}>
      <div className="playhead" ref={headRef} />
      <div className="tc">{tc}</div>
    </div>
  );
}
