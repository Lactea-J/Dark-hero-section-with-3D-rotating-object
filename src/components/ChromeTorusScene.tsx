'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Chrome Torus Knot Mesh ─── */
function ChromeTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Slow rotation
    meshRef.current.rotation.x = elapsed * 0.15;
    meshRef.current.rotation.y = elapsed * 0.2;
    meshRef.current.rotation.z = elapsed * 0.08;

    // Floating effect
    meshRef.current.position.y = Math.sin(elapsed * 0.6) * 0.2;

    // Mouse parallax (smooth lerp)
    const mouse = mouseRef.current;
    mouse.targetX += (mouse.x * 0.3 - mouse.targetX) * 0.05;
    mouse.targetY += (-mouse.y * 0.3 - mouse.targetY) * 0.05;
    meshRef.current.rotation.x += mouse.targetY * 0.15;
    meshRef.current.rotation.y += mouse.targetX * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.38, 256, 64, 2, 3]} />
      <meshStandardMaterial
        color="#cccccc"
        metalness={1.0}
        roughness={0.05}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

/* ─── Orbiting Lights ─── */
function OrbitingLights() {
  const light1Ref = useRef<THREE.PointLight>(null!);
  const light2Ref = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(elapsed * 0.5) * 5;
      light1Ref.current.position.z = Math.cos(elapsed * 0.5) * 5;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(elapsed * 0.4) * 5;
      light2Ref.current.position.z = Math.sin(elapsed * 0.4) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={light1Ref} color="#6366f1" intensity={2} distance={20} position={[4, 3, 4]} />
      <pointLight ref={light2Ref} color="#ec4899" intensity={1.5} distance={20} position={[-4, -2, 3]} />
    </>
  );
}

/* ─── Main 3D Scene ─── */
export default function ChromeTorusScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <color attach="background" args={['#000000']} />
      <ChromeTorusKnot />
      <OrbitingLights />
      <Environment preset="city" />
    </Canvas>
  );
}
