// Continuous scrolling text band. Content is duplicated so the CSS
// animation can loop seamlessly with no visible seam or reset-jump.
const items = [
  'CINEMATIC EDITS',
  'COLOR GRADING',
  'SOUND DESIGN',
  '4HIM.FX',
  'SHORT FILMS',
  'BRAND CONTENT',
  'WEDDING FILMS',
  'SOCIAL EDITS',
];

export default function Marquee() {
  const track = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="false">
      <div className="marquee-track">
        {track.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
