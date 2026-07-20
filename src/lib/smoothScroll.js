import Lenis from 'lenis';

/*
  Site-wide smooth scrolling, modeled on the buttery, momentum-based feel
  of the reference sites (Outline Academy / Ausdauer Groups). Lenis takes
  over the page's native scroll physics with an eased, inertial curve —
  every component that already reads window.scrollY / listens for the
  native "scroll" event (Nav, ScrollProgress, Hero3D, Process, TimelineRuler,
  VideoStack) keeps working unmodified, because Lenis drives the *real*
  document scroll position rather than a virtual/transformed one.

  This module is a tiny singleton so any component can trigger a smooth
  jump (nav links, the hero CTAs, footer links) without prop-drilling an
  instance around.
*/

let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.15,
    normalizeWheel: true,
  });

  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  lenis._rafId = rafId;

  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  cancelAnimationFrame(lenis._rafId);
  lenis.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export function smoothScrollTo(target, opts = {}) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      ...opts,
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Intercepts every in-page `<a href="#id">` click site-wide and routes it
// through Lenis instead of the browser's instant/jump anchor scroll, so
// nav links, hero CTAs, and footer links all share the same smooth,
// nav-height-aware scroll.
export function bindSmoothAnchors(offset = -88) {
  function onClick(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;
    const el = document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    smoothScrollTo(el, { offset });
    if (history.pushState) history.pushState(null, '', hash);
  }
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
