import { motion } from 'framer-motion';

// A single, reusable scroll-reveal wrapper used across every section so the
// whole site animates consistently and smoothly. Uses whileInView + a
// spring-flavored ease so items settle in gently rather than snapping.
const EASE = [0.16, 0.84, 0.44, 1];

export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  style,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Wraps children and staggers their entrance — use with motion children or
// plain <Reveal> items inside for list/grid reveals.
export function RevealGroup({ as = 'div', children, className = '', stagger = 0.08, style, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
