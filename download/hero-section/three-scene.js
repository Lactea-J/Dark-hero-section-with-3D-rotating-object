/* ═══════════════════════════════════════════════
   Three.js 3D Scene — Hyper-Glossy Chrome Torus Knot
   ═══════════════════════════════════════════════ */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ─── Renderer ───
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

// ─── Scene ───
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// ─── Environment Map (for realistic chrome reflections) ───
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = envTexture;

// ─── Camera ───
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 6);

// ─── Torus Knot (Hyper-Glossy Chrome / Liquid Metal) ───
const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 256, 64, 2, 3);
const material = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  metalness: 1.0,
  roughness: 0.05,
  envMapIntensity: 1.8,
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// ─── Subtle ambient lights for fill ───
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x6366f1, 2, 20);
pointLight1.position.set(4, 3, 4);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xec4899, 1.5, 20);
pointLight2.position.set(-4, -2, 3);
scene.add(pointLight2);

// ─── Mouse Parallax ───
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ─── Animation Loop ───
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Slow rotation
  torusKnot.rotation.x = elapsed * 0.15;
  torusKnot.rotation.y = elapsed * 0.2;
  torusKnot.rotation.z = elapsed * 0.08;

  // Floating effect
  torusKnot.position.y = Math.sin(elapsed * 0.6) * 0.2;

  // Mouse parallax (smooth lerp)
  targetX += (mouseX * 0.3 - targetX) * 0.05;
  targetY += (-mouseY * 0.3 - targetY) * 0.05;
  torusKnot.rotation.x += targetY * 0.15;
  torusKnot.rotation.y += targetX * 0.15;

  // Animate point lights for color shifting
  pointLight1.position.x = Math.sin(elapsed * 0.5) * 5;
  pointLight1.position.z = Math.cos(elapsed * 0.5) * 5;
  pointLight2.position.x = Math.cos(elapsed * 0.4) * 5;
  pointLight2.position.z = Math.sin(elapsed * 0.4) * 5;

  renderer.render(scene, camera);
}

animate();

// ─── Resize Handler ───
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
