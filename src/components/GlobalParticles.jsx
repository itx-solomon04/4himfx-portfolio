import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

// A lightweight, fixed-position starfield of gold/yellow particles that sits
// behind every section on the page (not just the hero), so the effect
// carries through the whole site as you scroll. It renders once and stays
// pinned to the viewport — cheap enough to run continuously.
function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
    >
      <ambientLight intensity={0.4} />
      <Sparkles count={90} scale={[16, 10, 6]} size={2.2} speed={0.22} opacity={0.5} color="#C9A227" />
      <Sparkles count={50} scale={[16, 10, 6]} size={1.2} speed={0.12} opacity={0.3} color="#D9B030" />
    </Canvas>
  );
}

export default function GlobalParticles() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="global-particles">
      <ParticleField />
    </div>
  );
}
