import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal.jsx';

const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'Short films, brand and commercial content, wedding films, and social edits — anything where pacing, color, and sound need to work together to hold attention.',
  },
  {
    q: 'What software and format do you deliver in?',
    a: "I edit and grade in DaVinci Resolve. You'll get final files in whatever format your platform needs — vertical for social, broadcast-ready masters for brand work.",
  },
  {
    q: 'How long does a typical edit take?',
    a: 'Turnaround depends on scope — a social edit can turn around in a few days, while short films and full brand campaigns usually run one to three weeks.',
  },
  {
    q: 'Do you handle color grading and sound separately?',
    a: "No — grading and sound design are part of the same pass, not an add-on. Every project gets a full color grade and sound design finish by default.",
  },
  {
    q: "What's the best way to start a project?",
    a: 'Reach out through WhatsApp or Instagram with a bit about the project and any reference footage or brand assets — I\'ll reply with next steps and a timeline.',
  },
];

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button className="faq-q" onClick={onClick} aria-expanded={isOpen}>
        <span>{q}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-a-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <p className="faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq">
      <div className="section-inner">
        <div className="eyebrow">Timecode 00:15:30:00 — FAQ</div>
        <Reveal as="h2">Still have questions?</Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal as="div" key={f.q} delay={i * 0.05}>
              <FAQItem
                q={f.q}
                a={f.a}
                isOpen={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
