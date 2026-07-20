import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/*
  CrownAndCross
  -------------
  - Cursor tracking is now driven by a per-frame target angle plus a
    frame-rate-independent damp (THREE.MathUtils.damp), instead of a fixed
    0.15-per-frame lerp. That means it closes the gap to the cursor at the
    same real-world speed no matter the refresh rate (60/120/144Hz) — this
    is what actually removes the laggy/"stepped" feeling and makes it track
    the cursor immediately and smoothly.
  - offsetXRef pushes the whole group to the right on wide viewports so it
    never sits underneath the left-aligned headline text — see Hero3D()
    below for how that offset is computed.
  - The halo ring/glow discs got `depthWrite={false}` and separated
    z-positions + explicit renderOrder. Two overlapping transparent
    triangles this close together were the source of the flicker/z-fighting
    ("glitch") in the hero — this makes their draw order deterministic.
*/
function CrownAndCross({ scrollRef, offsetXRef }) {
  const group = useRef();
  const headRef = useRef();
  const thornsRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });

  const thornCount = 12;
  const thorns = Array.from({ length: thornCount }, (_, i) => {
    const angle = (i / thornCount) * Math.PI * 2;
    const radius = 0.95;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { x, z, angle };
  });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scrollP = scrollRef.current;
    const pointer = state.pointer || state.mouse;

    if (headRef.current) {
      headRef.current.rotation.y = t * 0.1;
    }
    if (thornsRef.current) {
      thornsRef.current.rotation.y = t * 0.1;
    }
    if (group.current) {
      // Extreme, immediate cursor follow: target angle is set directly
      // from the pointer every single frame...
      targetRot.current.y = pointer.x * 0.55;
      targetRot.current.x = -pointer.y * 0.38;

      // ...then approached with a time-based damp so it's silky smooth
      // rather than snapping. Higher damp factor = snappier response.
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetRot.current.y,
        9,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetRot.current.x,
        9,
        delta
      );

      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        offsetXRef.current,
        6,
        delta
      );
      group.current.position.y = -scrollP * 2.2;
      group.current.position.z = -scrollP * 3.5;
      const s = Math.max(0.55, 1 - scrollP * 0.6);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.4}>
        <mesh position={[0, 0.3, -0.6]} renderOrder={1}>
          <ringGeometry args={[1.35, 1.55, 64]} />
          <meshBasicMaterial
            color="#E8C77A"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0.3, -0.78]} renderOrder={0}>
          <circleGeometry args={[1.9, 48]} />
          <meshBasicMaterial
            color="#E8C77A"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={headRef} position={[0, -0.2, 0]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#141414" roughness={0.55} metalness={0.1} />
        </mesh>
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.75, 1.05, 1.1, 32]} />
          <meshStandardMaterial color="#101010" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[0, -2.05, 0]}>
          <cylinderGeometry args={[1.05, 1.7, 1.4, 32]} />
          <meshStandardMaterial color="#0C0C0C" roughness={0.7} metalness={0.05} />
        </mesh>

        <group ref={thornsRef} position={[0, 0.35, 0]}>
          {thorns.map((thorn, i) => (
            <mesh
              key={i}
              position={[thorn.x, 0, thorn.z]}
              rotation={[Math.PI / 2.3, -thorn.angle, 0]}
            >
              <coneGeometry args={[0.07, 0.42, 8]} />
              <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.15} />
            </mesh>
          ))}
        </group>

        <group position={[0, 0.55, 1.6]}>
          <mesh>
            <boxGeometry args={[0.17, 1.65, 0.12]} />
            <meshStandardMaterial
              color="#F5F5F0"
              emissive="#FFFFFF"
              emissiveIntensity={1.1}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[0.85, 0.17, 0.12]} />
            <meshStandardMaterial
              color="#F5F5F0"
              emissive="#FFFFFF"
              emissiveIntensity={1.1}
              roughness={0.3}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Particles() {
  return (
    <Sparkles count={140} speed={0.25} opacity={0.4} scale={[9, 5, 6]} size={2} color="#EDEAE2" />
  );
}

function Scene({ scrollRef, offsetXRef }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 4, 4]} intensity={22} color="#FFFFFF" />
      <pointLight position={[-4, -2, -3]} intensity={12} color="#8B9295" />
      <pointLight position={[0, 0.5, -2.5]} intensity={16} color="#E8C77A" />
      <CrownAndCross scrollRef={scrollRef} offsetXRef={offsetXRef} />
      <Particles />
    </>
  );
}

export default function Hero3D() {
  const scrollRef = useRef(0);
  // How far right (in world units) the crown should sit. Kept in a ref so
  // resizing doesn't cause a React re-render/canvas remount — it's just
  // read every frame inside useFrame above.
  const offsetXRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const onScroll = () => {
      const vh = window.innerHeight;
      scrollRef.current = Math.min(1.4, window.scrollY / (vh * 1.1));
    };

    // The headline in Hero.jsx is left-aligned. Push the 3D crown toward
    // the right side of the frame on wide viewports so its ring/cross
    // never sits underneath the "4him.fx" text; on narrow/mobile layouts
    // (where the text takes the full width anyway) keep it centered.
    const onResize = () => {
      offsetXRef.current = window.innerWidth > 900 ? 1.2 : 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (reduceMotion) {
    return (
      <div
        className="hero-canvas"
        style={{ background: 'radial-gradient(circle at 60% 38%, #191510, #0A0C0D)' }}
      >
        <svg
          className="hero-fallback-svg"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="halo" cx="50%" cy="40%" r="45%">
              <stop offset="0%" stopColor="#E8C77A" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#E8C77A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#E8C77A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="150" r="150" fill="url(#halo)" />
          <path
            d="M120 400 C120 260 145 190 200 190 C255 190 280 260 280 400 Z"
            fill="#0C0C0C"
          />
          <circle cx="200" cy="130" r="62" fill="#141414" />
          <g stroke="#F5F5F0" strokeWidth="10" strokeLinecap="round" opacity="0.92">
            <line x1="200" y1="150" x2="200" y2="330" />
            <line x1="152" y1="200" x2="248" y2="200" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        {/* Explicit opaque background prevents the transparent-canvas
            flash/glitch some browsers show for a frame during resize or
            DPR changes. */}
        <color attach="background" args={['#0B0A08']} />
        <Scene scrollRef={scrollRef} offsetXRef={offsetXRef} />
      </Canvas>
    </div>
  );
}
