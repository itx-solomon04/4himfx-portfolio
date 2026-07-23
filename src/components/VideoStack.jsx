import { useEffect, useRef, useState } from 'react';
import VideoCard from './VideoCard.jsx';

const pad2 = (n) => String(n).padStart(2, '0');

export default function VideoStack({ videos }) {
  const wrapRefs = useRef([]);
  const stickyRefs = useRef([]);
  const scrimRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0, rootMargin: '-49% 0px -49% 0px' }
    );

    wrapRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [videos.length]);

  useEffect(() => {
    let rafId;
    const n = videos.length;
    const progress = new Array(n).fill(0);
    const offsets = new Array(n).fill(0);

    function measureOffsets() {
      for (let i = 0; i < n; i++) {
        const wrap = wrapRefs.current[i];
        offsets[i] = wrap ? wrap.offsetTop : 0;
      }
    }

    function computeProgress() {
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // A card used to only count as fully "entered" (progress = 1) once
      // its wrap scrolled all the way up to the very top of the browser
      // (top: 0) — which is partly under the fixed nav. That meant the
      // card only looked fully locked-in right as it was scrolling out of
      // comfortable view, reading as "it slides up and disappears."
      // Settling at the vertical center of the viewport instead means the
      // card is fully visible/locked while it's still sitting in the
      // middle of the screen, matching the outline.global feel.
      const settlePoint = vh * 0.5;
      for (let i = 0; i < n; i++) {
        const top = offsets[i] - scrollY;
        progress[i] = Math.min(1, Math.max(0, (vh - top) / (vh - settlePoint)));
      }
    }

    function apply() {
      for (let i = 0; i < n; i++) {
        const sticky = stickyRefs.current[i];
        if (!sticky) continue;

        const enter = progress[i];
        const nextEnter = i + 1 < n ? progress[i + 1] : 0;

        const translateIn = (1 - enter) * 6;
        const scaleIn = 0.95 + enter * 0.05;
        const opacityIn = 0.5 + enter * 0.5;

        const scaleOut = 1 - nextEnter * 0.07;
        const translateOut = -nextEnter * 2.2;

        const scale = Math.min(scaleIn, scaleOut);
        const translateY = translateIn + translateOut;

        sticky.style.transform = `translateY(${translateY.toFixed(3)}vh) scale(${scale.toFixed(4)})`;
        sticky.style.opacity = opacityIn.toFixed(3);

        const scrim = scrimRefs.current[i];
        if (scrim) {
          scrim.style.opacity = (nextEnter * 0.4).toFixed(3);
        }
      }
    }

    function tick() {
      computeProgress();
      apply();
      rafId = requestAnimationFrame(tick);
    }

    measureOffsets();
    window.addEventListener('resize', measureOffsets);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measureOffsets);
    };
  }, [videos.length]);

  return (
    <div className="video-stack">
      {videos.map((video, i) => (
        <div
          className="video-stack-wrap"
          data-index={i}
          ref={(el) => (wrapRefs.current[i] = el)}
          key={i}
        >
          <div
            className="video-stack-sticky"
            ref={(el) => (stickyRefs.current[i] = el)}
          >
            <div className="video-stack-card">
              {video.category && (
                <span className="video-stack-category">{video.category}</span>
              )}
              <VideoCard
                video={video}
                forceActive={i === activeIndex}
                keepMounted={Math.abs(i - activeIndex) <= 1}
              />
              <div
                className="video-stack-scrim"
                ref={(el) => (scrimRefs.current[i] = el)}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="video-stack-counter-rail">
        <div className="video-stack-counter" aria-live="polite" aria-atomic="true">
          {pad2(activeIndex + 1)}&nbsp;//&nbsp;{pad2(videos.length)}
        </div>
      </div>
    </div>
  );
}