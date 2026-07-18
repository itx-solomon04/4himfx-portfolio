import VideoCard from './VideoCard.jsx';
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx';
import { motion } from 'framer-motion';
import { showreel, youtubeEdits, shortFilms } from '../data/videos.js';

export default function Work() {
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

        {/* Showreel */}
        <div className="work-panel single" style={{ marginTop: 44 }}>
          <Reveal>
            <VideoCard video={showreel} />
          </Reveal>
        </div>

        {/* YouTube Edits */}
        <Reveal as="div" className="work-subhead" style={{ marginTop: 90 }}>
          <div className="eyebrow">Timecode 00:07:30:00 — YouTube edits</div>
          <h2>The channel work</h2>
        </Reveal>
        <RevealGroup as="div" className="work-panel" style={{ marginTop: 32 }}>
          {youtubeEdits.map((v, i) => (
            <motion.div variants={revealItem} key={i}>
              <VideoCard video={v} />
            </motion.div>
          ))}
        </RevealGroup>

        {/* Short Films */}
        <Reveal as="div" className="work-subhead" style={{ marginTop: 90 }}>
          <div className="eyebrow">Timecode 00:09:45:00 — Short films</div>
          <h2>Longer-form stories</h2>
        </Reveal>
        <RevealGroup as="div" className="work-panel" style={{ marginTop: 32 }}>
          {shortFilms.map((v, i) => (
            <motion.div variants={revealItem} key={i}>
              <VideoCard video={v} />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
