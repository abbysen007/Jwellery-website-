import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Compass, Move3d, Layers, Wand2 } from 'lucide-react';

interface Hero4DCharacterProps {
  onExplore?: () => void;
}

export const Hero4DCharacter: React.FC<Hero4DCharacterProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensionMode, setDimensionMode] = useState<'celestial' | 'aurora' | 'quantum'>('celestial');
  const [isInteractive, setIsInteractive] = useState(true);
  const [sparkleIntensity, setSparkleIntensity] = useState(1);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12100e, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for Character
    const characterRoot = new THREE.Group();
    scene.add(characterRoot);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.0,
    });

    const platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0x221f1c,
      metalness: 0.85,
      roughness: 0.25,
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 2.417, // Natural Diamond index of refraction
      reflectivity: 0.98,
      dispersion: 0.044,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const glowingGemMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe6a3,
      emissive: 0xd4af37,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });

    // 1. Muse Head (Stylized Haute Couture Mannequin)
    const headGroup = new THREE.Group();
    characterRoot.add(headGroup);

    // Cranium / Face
    const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
    headGeo.scale(0.85, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, goldMaterial);
    headMesh.position.y = 1.25;
    headGroup.add(headMesh);

    // Sculpted Stylized Cheekbones & Jaw
    const jawGeo = new THREE.ConeGeometry(0.44, 0.65, 24);
    jawGeo.rotateX(Math.PI);
    const jawMesh = new THREE.Mesh(jawGeo, goldMaterial);
    jawMesh.position.set(0, 0.92, 0.08);
    jawMesh.scale.set(0.9, 0.8, 0.85);
    headGroup.add(jawMesh);

    // Stylized Eye Visors / Diamond Facet Mask
    const visorGeo = new THREE.TorusGeometry(0.42, 0.04, 16, 32, Math.PI);
    visorGeo.rotateX(Math.PI * 0.1);
    const visorMesh = new THREE.Mesh(visorGeo, glowingGemMaterial);
    visorMesh.position.set(0, 1.25, 0.42);
    headGroup.add(visorMesh);

    // 2. High Jewellery Diamond Drop Earrings
    const createEarring = (xOffset: number) => {
      const earringGroup = new THREE.Group();
      earringGroup.position.set(xOffset, 1.1, 0);

      // Stud
      const stud = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), diamondMaterial);
      earringGroup.add(stud);

      // Chain
      const link1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18), goldMaterial);
      link1.position.y = -0.1;
      earringGroup.add(link1);

      // Solitaire Teardrop Diamond
      const dropGeo = new THREE.ConeGeometry(0.09, 0.24, 8);
      dropGeo.rotateX(Math.PI);
      const dropDiamond = new THREE.Mesh(dropGeo, diamondMaterial);
      dropDiamond.position.y = -0.26;
      earringGroup.add(dropDiamond);

      headGroup.add(earringGroup);
      return earringGroup;
    };
    const leftEarring = createEarring(-0.52);
    const rightEarring = createEarring(0.52);

    // 3. Neck & Collar
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.55, 32);
    const neckMesh = new THREE.Mesh(neckGeo, goldMaterial);
    neckMesh.position.y = 0.65;
    characterRoot.add(neckMesh);

    // 4. Haute Joaillerie Diamond Choker & Cascade Necklace
    const necklaceGroup = new THREE.Group();
    necklaceGroup.position.set(0, 0.48, 0);
    characterRoot.add(necklaceGroup);

    // Multi-tier Gold & Diamond Collar
    const collarGeo1 = new THREE.TorusGeometry(0.32, 0.035, 16, 48);
    collarGeo1.rotateX(Math.PI * 0.5);
    const collarMesh1 = new THREE.Mesh(collarGeo1, goldMaterial);
    necklaceGroup.add(collarMesh1);

    const collarGeo2 = new THREE.TorusGeometry(0.38, 0.025, 16, 48);
    collarGeo2.rotateX(Math.PI * 0.5);
    const collarMesh2 = new THREE.Mesh(collarGeo2, goldMaterial);
    collarMesh2.position.y = -0.06;
    necklaceGroup.add(collarMesh2);

    // Faceted Solitaires around the necklace
    const numGems = 16;
    for (let i = 0; i < numGems; i++) {
      const angle = (i / numGems) * Math.PI * 2;
      const r = 0.38;
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.045), diamondMaterial);
      gem.position.set(Math.cos(angle) * r, -0.06, Math.sin(angle) * r);
      gem.rotation.y = angle;
      necklaceGroup.add(gem);
    }

    // Main Center Solitaire Pendant
    const centerPendant = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 1), diamondMaterial);
    centerPendant.position.set(0, -0.22, 0.4);
    necklaceGroup.add(centerPendant);

    // 5. Stylized Torso & Shoulders
    const torsoGeo = new THREE.CylinderGeometry(0.28, 0.65, 1.2, 32);
    torsoGeo.scale(1.4, 1.0, 0.75);
    const torsoMesh = new THREE.Mesh(torsoGeo, platinumMaterial);
    torsoMesh.position.y = -0.25;
    characterRoot.add(torsoMesh);

    // Couture Shoulder Epaulettes (Polished Gold Wings)
    const shoulderGeo = new THREE.TorusGeometry(0.55, 0.06, 16, 32, Math.PI);
    shoulderGeo.rotateZ(Math.PI * 0.1);
    const leftShoulder = new THREE.Mesh(shoulderGeo, goldMaterial);
    leftShoulder.position.set(-0.62, 0.28, 0);
    characterRoot.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();
    rightShoulder.rotation.z = -Math.PI * 0.1;
    rightShoulder.position.set(0.62, 0.28, 0);
    characterRoot.add(rightShoulder);

    // 6. 4D Dimensional Tesseract Orbit Rings (Gyroscopic 4th-Dimension spatial rings)
    const tesseractGroup = new THREE.Group();
    characterRoot.add(tesseractGroup);

    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.015, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, glowingGemMaterial);
    tesseractGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.65, 0.012, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, goldMaterial);
    ring2.rotation.x = Math.PI * 0.35;
    tesseractGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(1.85, 0.01, 16, 64);
    const ring3 = new THREE.Mesh(ringGeo3, glowingGemMaterial);
    ring3.rotation.y = Math.PI * 0.45;
    tesseractGroup.add(ring3);

    // Orbiting Diamond Satellites along the 4D rings
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(new THREE.DodecahedronGeometry(0.065), diamondMaterial);
      tesseractGroup.add(sat);
      satellites.push(sat);
    }

    // 7. Particle Aura (Floating Diamond Stardust)
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particlePhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      particlePhases[i] = Math.random() * Math.PI * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d77f,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd0, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc9a86a, 2.8);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xd4af37, 2.2, 5);
    bottomGlow.position.set(0, -1.2, 1.5);
    scene.add(bottomGlow);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation Loop (4D Continuous Temporal Morphing)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 4D Character Breathing and Fluid Undulation
      const breath = Math.sin(time * 1.4) * 0.035;
      const sway = Math.cos(time * 0.8) * 0.04;
      characterRoot.position.y = -0.2 + breath;
      characterRoot.position.x = sway;

      // Head tracking user cursor with organic articulation
      headGroup.rotation.y = mouseRef.current.x * 0.55 + Math.sin(time * 0.6) * 0.08;
      headGroup.rotation.x = -mouseRef.current.y * 0.35 + Math.cos(time * 0.9) * 0.05;
      headGroup.rotation.z = -mouseRef.current.x * 0.12;

      // Body subtle follow-through
      characterRoot.rotation.y = mouseRef.current.x * 0.25;
      characterRoot.rotation.x = -mouseRef.current.y * 0.1;

      // Earring physics swing
      const earringSwing = Math.sin(time * 2.2 + mouseRef.current.x * 3) * 0.15;
      leftEarring.rotation.z = earringSwing;
      rightEarring.rotation.z = earringSwing;

      // Center Diamond Solitaire facet shimmer
      centerPendant.rotation.y = time * 0.7;
      centerPendant.rotation.x = Math.sin(time * 1.1) * 0.2;

      // 4D Tesseract Orbit Rings rotation in multi-axes
      ring1.rotation.x = time * 0.35;
      ring1.rotation.y = time * 0.45;
      ring2.rotation.y = -time * 0.4;
      ring2.rotation.z = time * 0.25;
      ring3.rotation.z = -time * 0.3;
      ring3.rotation.x = time * 0.5;

      // Satellites orbiting along complex 4D paths
      satellites.forEach((sat, i) => {
        const offset = (i / satellites.length) * Math.PI * 2;
        const radius = 1.6 + Math.sin(time * 1.5 + offset) * 0.3;
        sat.position.set(
          Math.cos(time * 0.8 + offset) * radius,
          Math.sin(time * 1.2 + offset) * 0.8 + 0.6,
          Math.sin(time * 0.8 + offset) * radius
        );
        sat.rotation.x += 0.03;
        sat.rotation.y += 0.04;
      });

      // Particle Aura Wave
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + particlePhases[i]) * 0.003;
        // Keep within bounds
        if (positions[i3 + 1] > 2.5) positions[i3 + 1] = -2.0;
        if (positions[i3 + 1] < -2.0) positions[i3 + 1] = 2.5;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 4D Temporal HUD Overlays */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A86A]"></span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A86A] font-semibold bg-[#12100E]/70 px-2.5 py-1 rounded-full border border-[#C9A86A]/30 backdrop-blur-md">
          4D Haute Muse Live
        </span>
      </div>

      {/* Floating 4D Dimensional Controller Pill */}
      <div className="absolute bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-20 flex flex-wrap items-center justify-center gap-2 bg-[#1C1917]/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 text-xs text-[#EAE4D9] shadow-2xl">
        <div className="flex items-center gap-1.5 text-[11px] text-[#A89F91] pr-2 border-r border-white/10">
          <Move3d className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>Interactive 4D</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setDimensionMode('celestial');
            setSparkleIntensity(1);
          }}
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
            dimensionMode === 'celestial'
              ? 'bg-[#C9A86A] text-[#141210] shadow-sm font-semibold'
              : 'text-[#A89F91] hover:text-white'
          }`}
        >
          Solitaire Muse
        </button>

        <button
          type="button"
          onClick={() => {
            setDimensionMode('aurora');
            setSparkleIntensity(1.5);
          }}
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
            dimensionMode === 'aurora'
              ? 'bg-[#C9A86A] text-[#141210] shadow-sm font-semibold'
              : 'text-[#A89F91] hover:text-white'
          }`}
        >
          Aurora Gold
        </button>

        <button
          type="button"
          onClick={() => {
            setDimensionMode('quantum');
            setSparkleIntensity(2);
          }}
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
            dimensionMode === 'quantum'
              ? 'bg-[#C9A86A] text-[#141210] shadow-sm font-semibold'
              : 'text-[#A89F91] hover:text-white'
          }`}
        >
          Tesseract 4D
        </button>
      </div>

      {/* Atmospheric Radial Gradient for 3D Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,_rgba(201,168,106,0.12)_0%,_transparent_65%)]" />
    </div>
  );
};
