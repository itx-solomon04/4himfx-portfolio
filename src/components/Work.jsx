import VideoStack from './VideoStack.jsx';
import VideoCard from './VideoCard.jsx';
import Reveal from './Reveal.jsx';
import { showreel, youtubeEdits, shortFilms } from '../data/videos.js';

export default function Work() {
  return (
    <>
      <section id="work">
        <div className="section-inner">
          <div className="eyebrow">Timecode 00:05:00:00 — Selected work</div>
          <Reveal as="h2">Watch the full showreel</Reveal>
          <Reveal as="p" className="lede" delay={0.08}>
            A quick look at the range — pacing, color, and sound working
            together across different kinds of projects.
          </Reveal>

          <div className="showreel-card" style={{ marginTop: 44 }}>
            <VideoCard video={showreel} />
          </div>
        </div>
      </section>

      <section id="work-youtube">
        <div className="section-inner">
          <div className="eyebrow">Timecode 00:07:00:00 — YouTube edits</div>
          <Reveal as="h2">Faceless, SaaS &amp; commentary edits</Reveal>
          <Reveal as="p" className="lede" delay={0.08}>
            Long-form YouTube work — each one locks fully into view as you
            scroll, then the next slides in over it.
          </Reveal>

          <div style={{ marginTop: 44 }}>
            <VideoStack videos={youtubeEdits} />
          </div>
        </div>
      </section>

      <section id="work-films">
        <div className="section-inner">
          <div className="eyebrow">Timecode 00:09:00:00 — Short films</div>
          <Reveal as="h2">Short film work</Reveal>
          <Reveal as="p" className="lede" delay={0.08}>
            Narrative and documentary-style short films — full edit, color,
            and sound design.
          </Reveal>

          <div style={{ marginTop: 44 }}>
            <VideoStack videos={shortFilms} />
          </div>
        </div>
      </section>
    </>
  );
}