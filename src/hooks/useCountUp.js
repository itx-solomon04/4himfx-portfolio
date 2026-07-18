import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Animates a number from 0 up to `target` once the element scrolls into
// view, easing out so it settles smoothly instead of ticking linearly.
export default function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      setValue(Math.round(easeOutQuint(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return [ref, value];
}
