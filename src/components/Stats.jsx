import useCountUp from '../hooks/useCountUp.js';
import Reveal from './Reveal.jsx';

// Edit these numbers to match your real stats — everything else animates
// automatically.
const stats = [
  { value: 150, suffix: '+', label: 'Edits delivered' },
  { value: 5, suffix: '+', label: 'Years editing' },
  { value: 40, suffix: '+', label: 'Brands & creators' },
  { value: 100, suffix: '%', label: 'Storytelling-led grading' },
];

function Stat({ value, suffix, label }) {
  const [ref, count] = useCountUp(value);
  return (
    <div className="stat-block" ref={ref}>
      <span className="stat-number">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="section-inner">
        <Reveal as="div" className="stats-grid">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
