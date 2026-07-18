import { useEffect, useState } from 'react';

const FPS = 24;
const TOTAL_SECONDS = 17 * 60; // fictional 17:00 "master timeline" length

function formatTC(totalFrames) {
  const ff = Math.floor(totalFrames % FPS);
  let totalSec = Math.floor(totalFrames / FPS);
  const ss = totalSec % 60;
  totalSec = Math.floor(totalSec / 60);
  const mm = totalSec % 60;
  totalSec = Math.floor(totalSec / 60);
  const hh = totalSec;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress">
        <div className="scroll-progress-fill" style={{ width: `${pct * 100}%` }} />
      </div>
      <div className="scroll-timecode">{formatTC(pct * TOTAL_SECONDS * FPS)}</div>
    </>
  );
}
