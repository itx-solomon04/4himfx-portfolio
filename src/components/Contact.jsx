import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx';

const links = [
  {
    label: 'Discord',
    small: 'itxsolomon — fastest reply',
    copy: 'itxsolomon',
  },
  { href: 'https://wa.me/918667697198', label: 'WhatsApp', small: 'Fast reply' },
  { href: 'https://www.instagram.com/4him.fx/', label: 'Instagram', small: '@4him.fx' },
  { href: 'https://www.fiverr.com/itx_solomon', label: 'Fiverr', small: 'Hire me' },
  { href: 'https://www.linkedin.com/in/itx-solomon-23a3912b5', label: 'LinkedIn', small: 'Connect' },
];

function CopyLink({ label, small, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable — ignore, label still shows the handle.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.button
      type="button"
      variants={revealItem}
      className="contact-link contact-link-copy"
      onClick={handleCopy}
      whileHover={{ x: 10 }}
      transition={{ duration: 0.25, ease: [0.16, 0.84, 0.44, 1] }}
    >
      {label} <small>{copied ? 'Copied to clipboard!' : small}</small>
    </motion.button>
  );
}

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <div>
          <div className="eyebrow">Timecode 00:16:00:00 — Contact</div>
          <Reveal as="h2">Let's cut something worth watching.</Reveal>
        </div>
        <RevealGroup as="div" className="contact-links">
          {links.map((l) =>
            l.copy ? (
              <CopyLink key={l.label} label={l.label} small={l.small} value={l.copy} />
            ) : (
              <motion.a
                variants={revealItem}
                key={l.label}
                className="contact-link"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 0.84, 0.44, 1] }}
              >
                {l.label} <small>{l.small}</small>
              </motion.a>
            )
          )}
        </RevealGroup>
      </div>
    </section>
  );
}
