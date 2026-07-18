import { useEffect, useState } from 'react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#top" className="logo">
        4him<span>.fx</span>
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta">
          Hire me
        </a>
      </div>
    </nav>
  );
}
