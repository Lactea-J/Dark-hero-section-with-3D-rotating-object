(function () {
  const canvas = document.getElementById("bg-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 5.5);

  /* ── ENVIRONMENT: procedural gradient cube map ── */
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Build a simple gradient env texture
  const envSize = 512;
  const envData = new Uint8Array(envSize * envSize * 4);
  for (let y = 0; y < envSize; y++) {
    for (let x = 0; x < envSize; x++) {
      const i = (y * envSize + x) * 4;
      const t = y / envSize;
      // Top: deep blue-purple, bottom: warm amber
      const r = Math.round(lerp(10, 40, t));
      const g = Math.round(lerp(30, 20, t));
      const b = Math.round(lerp(80, 30, t));
      envData[i] = r;
      envData[i + 1] = g;
      envData[i + 2] = b;
      envData[i + 3] = 255;
      // Add some bright city light spots
      const cx1 = 0.25,
        cy1 = 0.55,
        cx2 = 0.72,
        cy2 = 0.6;
      const dx1 = x / envSize - cx1,
        dy1 = t - cy1;
      const dx2 = x / envSize - cx2,
        dy2 = t - cy2;
      const spot1 = Math.max(0, 1 - Math.sqrt(dx1 * dx1 + dy1 * dy1) * 14);
      const spot2 = Math.max(0, 1 - Math.sqrt(dx2 * dx2 + dy2 * dy2) * 18);
      envData[i] = Math.min(255, envData[i] + spot1 * 180 + spot2 * 120);
      envData[i + 1] = Math.min(
        255,
        envData[i + 1] + spot1 * 160 + spot2 * 140,
      );
      envData[i + 2] = Math.min(255, envData[i + 2] + spot1 * 100 + spot2 * 90);
    }
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  const envTex = new THREE.DataTexture(
    envData,
    envSize,
    envSize,
    THREE.RGBAFormat,
  );
  envTex.encoding = THREE.sRGBEncoding;
  envTex.needsUpdate = true;

  const envRT = pmremGenerator.fromEquirectangular(envTex);
  scene.environment = envRT.texture;
  pmremGenerator.dispose();
  envTex.dispose();

  /* ── LIGHTS ── */
  const ambLight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambLight);

  const light1 = new THREE.PointLight(0x6688ff, 3.5, 14);
  light1.position.set(-4, 3, 3);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xffaa44, 2.5, 12);
  light2.position.set(4, -2, 2);
  scene.add(light2);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
  rimLight.position.set(0, 5, -4);
  scene.add(rimLight);

  /* ── TORUS KNOT (Chrome / Liquid Metal) ── */
  const geo = new THREE.TorusKnotGeometry(1.15, 0.36, 220, 32, 2, 3);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.08,
    envMapIntensity: 3.5,
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  /* ── PARTICLE FIELD ── */
  const pGeo = new THREE.BufferGeometry();
  const pCount = 900;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) {
    pPos[i] = (Math.random() - 0.5) * 22;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xaaccff,
    size: 0.025,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ── GLOW RING ── */
  const ringGeo = new THREE.TorusGeometry(1.9, 0.008, 8, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x88bbff,
    transparent: true,
    opacity: 0.25,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.2;
  scene.add(ring);

  /* ── MOUSE PARALLAX ── */
  const mouse = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ── RESIZE ── */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ── ANIMATE ── */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    smooth.x += (mouse.x - smooth.x) * 0.04;
    smooth.y += (mouse.y - smooth.y) * 0.04;

    // Rotate torus knot
    mesh.rotation.x = t * 0.18 + smooth.y * 0.25;
    mesh.rotation.y = t * 0.24 + smooth.x * 0.25;

    // Float
    mesh.position.y = Math.sin(t * 0.65) * 0.12;
    mesh.position.x = Math.sin(t * 0.38) * 0.05;

    // Ring
    ring.rotation.y = t * 0.1;
    ring.rotation.z = t * 0.07;

    // Particles
    particles.rotation.y = t * 0.018;
    particles.rotation.x = t * 0.008;

    // Light pulse
    light1.intensity = 3.5 + Math.sin(t * 1.2) * 0.5;
    light2.intensity = 2.5 + Math.sin(t * 0.9 + 1) * 0.4;

    // Camera micro-drift
    camera.position.x = smooth.x * 0.25;
    camera.position.y = -smooth.y * 0.18;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
