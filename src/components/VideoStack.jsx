import { useEffect, useRef, useState } from 'react';
import VideoCard from './VideoCard.jsx';

/*
  VideoStack
  ----------
  Reference: outline.global/academy — one video sits fully "locked" in the
  viewport, then the next one rises up from below and layers directly over
  it, like a stacked deck of cards.

  The lock itself comes from plain position:sticky (native, GPU-composited,
  perfectly smooth at any scroll speed, identical up or down): each video
  lives in its own tall wrapper in normal document flow, and its sticky
  inner pins to the top of the viewport for the wrapper's full height. Later
  wrappers are later in the DOM, so their sticky content naturally paints
  OVER earlier ones as the page scrolls — that's the "layering".

  On top of that native lock, a single persistent rAF loop drives a
  continuous, GPU-friendly transform per card (translateY/scale/opacity/
  brightness) so:
    - each card rises + settles into place as it scrolls in (entrance),
    - and gently scales down + dims as the *next* card begins covering it
      (recede) — this is what actually reads as "layers of video" rather
      than an abrupt swap.
  It writes directly to refs (no React state), so it never re-renders and
  stays smooth even while a dozen video/iframe elements are playing.
*/

const pad2 = (n) => String(n).padStart(2, '0');

export default function VideoStack({ videos }) {
  const wrapRefs = useRef([]);
  const stickyRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Which card is "current" — purely for autoplay + the counter badge.
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

  // Continuous layered enter/recede transform, independent of React.
  useEffect(() => {
    let rafId;
    const n = videos.length;
    const progress = new Array(n).fill(0);

    function measure() {
      const vh = window.innerHeight || 1;
      for (let i = 0; i < n; i++) {
        const wrap = wrapRefs.current[i];
        if (!wrap) {
          progress[i] = 0;
          continue;
        }
        const rect = wrap.getBoundingClientRect();
        // 0 -> just entering from the bottom of the viewport.
        // 1 -> reached the top / fully locked into its pinned position.
        progress[i] = Math.min(1, Math.max(0, (vh - rect.top) / vh));
      }
    }

    function apply() {
      for (let i = 0; i < n; i++) {
        const sticky = stickyRefs.current[i];
        if (!sticky) continue;

        const enter = progress[i];
        const nextEnter = i + 1 < n ? progress[i + 1] : 0;

        // Entrance: rises + fades/scales up to full size as it locks in.
        const translateIn = (1 - enter) * 6; // vh, subtle rise
        const scaleIn = 0.95 + enter * 0.05;
        const opacityIn = 0.5 + enter * 0.5;

        // Recede: once the next card starts entering, this one eases back
        // slightly and dims, like a layer being covered from below.
        const scaleOut = 1 - nextEnter * 0.05;
        const translateOut = -nextEnter * 1.4;
        const brightness = 1 - nextEnter * 0.24;

        const scale = Math.min(scaleIn, scaleOut);
        const translateY = translateIn + translateOut;

        sticky.style.transform = `translateY(${translateY.toFixed(3)}vh) scale(${scale.toFixed(4)})`;
        sticky.style.opacity = opacityIn.toFixed(3);
        sticky.style.filter = `brightness(${brightness.toFixed(3)})`;
      }
    }

    function tick() {
      measure();
      apply();
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
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
              <VideoCard video={video} forceActive={i === activeIndex} />
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
