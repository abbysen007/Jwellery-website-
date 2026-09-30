import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye, Diamond } from 'lucide-react';

interface HeroRealtimePrismProps {
  className?: string;
}

export const HeroRealtimePrism: React.FC<HeroRealtimePrismProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGem, setActiveGem] = useState<'diamond' | 'emerald' | 'sapphire'>('diamond');
  const [isHovered, setIsHovered] = useState(false);

  // References for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const gemMeshRef = useRef<THREE.Mesh | null>(null);
  const gemMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const orbitalRef = useRef<THREE.Group | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff3db, 2.5);
    mainLight.position.set(5, 6, 4);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xc9a86a, 2.0);
    rimLight.position.set(-5, -4, -3);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffeedd, 3.5, 12);
    pointLight.position.set(0, 2, 2.5);
    scene.add(pointLight);
    lightRef.current = pointLight;

    // 3. Root Jewel Group
    const jewelRoot = new THREE.Group();
    scene.add(jewelRoot);
    orbitalRef.current = jewelRoot;

    // 4. Gold Ring / Gyroscope Orbital
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d385,
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 1.5,
    });

    // Outer orbital ring
    const outerRingGeo = new THREE.TorusGeometry(1.2, 0.045, 24, 80);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMaterial);
    outerRing.rotation.x = Math.PI * 0.25;
    jewelRoot.add(outerRing);

    // Inner orbital ring with pavé diamond studs
    const innerRingGeo = new THREE.TorusGeometry(0.9, 0.035, 20, 60);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMaterial);
    innerRing.rotation.y = Math.PI * 0.35;
    jewelRoot.add(innerRing);

    // Four gold prongs
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const prongGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.6, 16);
      const prong = new THREE.Mesh(prongGeo, goldMaterial);
      prong.position.set(Math.cos(angle) * 0.42, Math.sin(angle) * 0.42, 0.1);
      prong.rotation.z = angle - Math.PI / 2;
      jewelRoot.add(prong);
    }

    // 5. Gem Material with Real-Time Physical Refraction
    const gemColors = {
      diamond: 0xffffff,
      emerald: 0x10b981,
      sapphire: 0x3b82f6,
    };

    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: gemColors[activeGem],
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      ior: 2.42, // Real Diamond refractive index
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color(gemColors[activeGem]),
      attenuationDistance: 0.8,
    });
    gemMaterialRef.current = gemMaterial;

    // Brilliant Cut Gemstone (Double-Cone Octahedron / Dodecahedron)
    const gemGeo = new THREE.OctahedronGeometry(0.55, 2);
    const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
    gemMesh.scale.set(1.1, 0.9, 1.1);
    jewelRoot.add(gemMesh);
    gemMeshRef.current = gemMesh;

    // 6. Floating Sparkle Stars / Real-time Caustic Particle Aura
    const starCount = 45;
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const radius = 1.3 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
      starScales[i] = Math.random() * 0.04 + 0.015;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xfff0d0,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 7. Interactive Mouse Tracking & Drag Orbit
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX;
      mouseY = normY;

      if (isDragging) {
        const deltaX = e.clientX - prevPointer.x;
        const deltaY = e.clientY - prevPointer.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 8. Real-Time Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Real-time gentle orbital rotation + mouse influence
      if (!isDragging) {
        targetRotationY += 0.008;
        targetRotationX = Math.sin(elapsed * 0.6) * 0.18 + mouseY * 0.4;
      }

      // Smooth interpolation (damping)
      jewelRoot.rotation.y += (targetRotationY - jewelRoot.rotation.y) * 0.06;
      jewelRoot.rotation.x += (targetRotationX - jewelRoot.rotation.x) * 0.06;

      // Outer & inner rings counter-rotate for gyroscopic effect
      outerRing.rotation.z += 0.006;
      innerRing.rotation.x -= 0.009;

      // Gem breathing levitation
      gemMesh.position.y = Math.sin(elapsed * 1.8) * 0.04;

      // Point light moves in dynamic real-time caustics loop
      pointLight.position.x = Math.sin(elapsed * 1.5) * 2.2;
      pointLight.position.y = Math.cos(elapsed * 1.2) * 2.0;

      // Particle aura twinkle
      starPoints.rotation.y = elapsed * 0.05;
      starPoints.rotation.z = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update gem color in real time
  useEffect(() => {
    if (!gemMaterialRef.current) return;
    const gemColors = {
      diamond: 0xffffff,
      emerald: 0x10b981,
      sapphire: 0x3b82f6,
    };
    gemMaterialRef.current.color.set(gemColors[activeGem]);
    gemMaterialRef.current.attenuationColor.set(gemColors[activeGem]);
    gemMaterialRef.current.needsUpdate = true;
  }, [activeGem]);

  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Real-Time WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 cursor-grab active:cursor-grabbing relative"
        title="Interactive 3D Jewel: Drag to rotate or move cursor"
      >
        {/* Subtle decorative gold lens flare in center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-[#C9A86A]/10 blur-2xl animate-pulse pointer-events-none" />
        </div>
      </div>

      {/* Real-time Interaction Bar */}
      <div className="flex flex-col items-center gap-2 -mt-2 sm:-mt-4 z-20">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C9A86A]/40 text-[10px] uppercase tracking-wide text-[#E8DFD0] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          <Sparkles className="w-3 h-3 text-[#C9A86A]" />
          <span>Real-Time 3D Atelier</span>
        </div>

        {/* Real-time Gem Color Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-md">
          <button
            onClick={() => setActiveGem('diamond')}
            className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeGem === 'diamond'
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Diamond
          </button>
          <button
            onClick={() => setActiveGem('emerald')}
            className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeGem === 'emerald'
                ? 'bg-[#10B981] text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Emerald
          </button>
          <button
            onClick={() => setActiveGem('sapphire')}
            className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeGem === 'sapphire'
                ? 'bg-[#3B82F6] text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Sapphire
          </button>
        </div>
      </div>
    </div>
  );
};
