import VideoStack from './VideoStack.jsx';
import Reveal from './Reveal.jsx';
import { showreel, youtubeEdits, shortFilms } from '../data/videos.js';

export default function Work() {
  const stackedVideos = [
    { ...showreel, category: 'Showreel' },
    ...youtubeEdits.map((v) => ({ ...v, category: 'YouTube Edits' })),
    ...shortFilms.map((v) => ({ ...v, category: 'Short Films' })),
  ];

  return (
    <section id="work">
      <div className="section-inner">
        <div className="eyebrow">Timecode 00:05:00:00 — Selected work</div>
        <Reveal as="h2">Watch the edits</Reveal>
        <Reveal as="p" className="lede" delay={0.08}>
          A mix of showreel highlights, YouTube edits, and short film work —
          each one starts playing the moment it scrolls into view. Keep
          scrolling to move from the reel into the full library.
        </Reveal>

        <div style={{ marginTop: 44 }}>
          <VideoStack videos={stackedVideos} />
        </div>
      </div>
    </section>
  );
}