import { useEffect, useRef, useState } from 'react';

const MuteIcon = ({ muted }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    {muted ? (
      <line x1="23" y1="9" x2="17" y2="15" />
    ) : (
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    )}
    {muted && <line x1="17" y1="9" x2="23" y2="15" />}
  </svg>
);

/*
  VideoCard: plays automatically the instant it scrolls into the viewport,
  pauses when it scrolls out, and never requires a click to start.
  Works for both YouTube embeds and local <video> files.

  Important: once a YouTube iframe is mounted it stays mounted for the
  life of the card. Play/pause/mute are all sent as postMessage commands
  to the existing player instead of swapping the iframe's src or key,
  which is what previously caused the video to restart every time it
  scrolled back into view.
*/
// How long to keep the UI (title, mute button) hidden after a video
// starts playing, so nothing overlaps the first few seconds of footage.
const CLEAN_START_MS = 5000;

export default function VideoCard({ video, className = '' }) {
  const wrapRef = useRef(null);
  const videoElRef = useRef(null);
  const iframeRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [everInView, setEverInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setEverInView(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keep the overlay/mute icon hidden for the first CLEAN_START_MS of
  // playback each time the card enters view, and hide them again the
  // moment it scrolls out (so re-entry is clean too).
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (inView) {
      setShowControls(false);
      timerRef.current = setTimeout(() => setShowControls(true), CLEAN_START_MS);
    } else {
      setShowControls(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [inView]);

  // Native <video> autoplay/pause based on visibility. Same element the
  // whole time, so play() just resumes where it left off, never restarts.
  useEffect(() => {
    if (video.type !== 'local' || !videoElRef.current) return;
    if (inView) {
      videoElRef.current.play().catch(() => {});
    } else {
      videoElRef.current.pause();
    }
  }, [inView, video.type]);

  const postYoutubeCommand = (func, args = []) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  };

  // Play/pause the already-mounted YouTube iframe as it enters/leaves
  // view, instead of unmounting it (which reloaded the video from 0:00).
  useEffect(() => {
    if (video.type !== 'youtube' || !everInView) return;
    postYoutubeCommand(inView ? 'playVideo' : 'pauseVideo');
  }, [inView, everInView, video.type]);

  const toggleMute = () => {
    if (video.type === 'local' && videoElRef.current) {
      videoElRef.current.muted = !videoElRef.current.muted;
      setMuted(videoElRef.current.muted);
    } else if (video.type === 'youtube') {
      const next = !muted;
      setMuted(next);
      postYoutubeCommand(next ? 'mute' : 'unMute');
    } else {
      setMuted((m) => !m);
    }
  };

  const youtubeSrc = (id) =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&mute=1&enablejsapi=1`;

  return (
    <div className={`card ${className}`} ref={wrapRef}>
      {video.tc && (
        <span className={`tc-label${showControls ? ' is-visible' : ''}`}>{video.tc}</span>
      )}

      {video.type === 'youtube' ? (
        <>
          {/* Mount the iframe once it's first seen, then leave it mounted
              permanently -- play/pause/mute are handled via postMessage so
              it never reloads from the start again. */}
          {everInView && (
            <iframe
              ref={iframeRef}
              src={youtubeSrc(video.id)}
              title={video.title || 'Video'}
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          )}
          {!everInView && (
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title || 'Video thumbnail'}
            />
          )}
        </>
      ) : (
        <video
          ref={videoElRef}
          src={video.src}
          poster={video.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
        />
      )}

      <div className={`card-overlay${showControls ? ' is-visible' : ''}`}>
        {video.title && <span className="card-title">{video.title}</span>}
      </div>

      <button
        className={`mute-btn${showControls ? ' is-visible' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        tabIndex={showControls ? 0 : -1}
      >
        <MuteIcon muted={muted} />
      </button>
    </div>
  );
}
