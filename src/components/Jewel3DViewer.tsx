import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { RotateCw, Eye, Sparkles, Layers, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface Jewel3DViewerProps {
  product: Product;
}

export const Jewel3DViewer: React.FC<Jewel3DViewerProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [metalFinish, setMetalFinish] = useState<'yellow' | 'rose' | 'platinum'>('yellow');
  const [gemstoneType, setGemstoneType] = useState<'diamond' | 'emerald' | 'sapphire' | 'ruby'>('diamond');

  const materialsRef = useRef<{
    metal?: THREE.MeshStandardMaterial;
    gem?: THREE.MeshPhysicalMaterial;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Root Group
    const jewelRoot = new THREE.Group();
    scene.add(jewelRoot);

    // Materials
    const metalColors = {
      yellow: 0xf5d77f,
      rose: 0xe8a598,
      platinum: 0xe6e6e6,
    };

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: metalColors[metalFinish],
      metalness: 0.94,
      roughness: 0.15,
      wireframe: wireframe,
    });
    materialsRef.current.metal = metalMaterial;

    const gemColors = {
      diamond: 0xffffff,
      emerald: 0x10b981,
      sapphire: 0x2563eb,
      ruby: 0xd90429,
    };

    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: gemColors[gemstoneType],
      transmission: gemstoneType === 'diamond' ? 0.92 : 0.78,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 2.42,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      wireframe: wireframe,
    });
    materialsRef.current.gem = gemMaterial;

    // Construct 3D Geometry based on Product Category
    const catStr = (product.category as string).toLowerCase();
    const nameStr = product.name.toLowerCase();
    const isRing = catStr.includes('ring') || nameStr.includes('ring');
    const isEarring = catStr.includes('earring') || nameStr.includes('earring') || nameStr.includes('jhumka') || nameStr.includes('stud');
    const isNecklace = catStr.includes('necklace') || catStr.includes('pendant') || nameStr.includes('necklace') || nameStr.includes('pendant');
    const isBracelet = catStr.includes('bracelet') || catStr.includes('bangle') || nameStr.includes('bangle') || nameStr.includes('bracelet') || nameStr.includes('cuff');

    if (isRing) {
      // 1. Ring Band (Torus)
      const ringGeo = new THREE.TorusGeometry(0.85, 0.11, 24, 64);
      const ringMesh = new THREE.Mesh(ringGeo, metalMaterial);
      ringMesh.rotation.x = Math.PI * 0.5;
      jewelRoot.add(ringMesh);

      // Crown / Prongs
      const crownGroup = new THREE.Group();
      crownGroup.position.set(0, 0.88, 0);

      // 4 or 6 Claws
      const numProngs = 6;
      for (let i = 0; i < numProngs; i++) {
        const angle = (i / numProngs) * Math.PI * 2;
        const prongGeo = new THREE.CylinderGeometry(0.025, 0.04, 0.35, 12);
        const prong = new THREE.Mesh(prongGeo, metalMaterial);
        prong.position.set(Math.cos(angle) * 0.28, 0.1, Math.sin(angle) * 0.28);
        prong.rotation.z = Math.cos(angle) * -0.15;
        prong.rotation.x = Math.sin(angle) * 0.15;
        crownGroup.add(prong);
      }

      // Solitaire Brilliant Diamond (Faceted Cone + Frustum)
      const diamondTopGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.12, 16);
      const diamondTop = new THREE.Mesh(diamondTopGeo, gemMaterial);
      diamondTop.position.y = 0.22;
      crownGroup.add(diamondTop);

      const diamondPavilionGeo = new THREE.ConeGeometry(0.36, 0.38, 16);
      diamondPavilionGeo.rotateX(Math.PI);
      const diamondPavilion = new THREE.Mesh(diamondPavilionGeo, gemMaterial);
      diamondPavilion.position.y = 0.03;
      crownGroup.add(diamondPavilion);

      jewelRoot.add(crownGroup);

    } else if (isEarring) {
      // Earring Hook + Chandelier Drop
      const hoopGeo = new THREE.TorusGeometry(0.3, 0.04, 16, 32, Math.PI * 1.3);
      const hoop = new THREE.Mesh(hoopGeo, metalMaterial);
      hoop.position.y = 0.8;
      jewelRoot.add(hoop);

      const dropGroup = new THREE.Group();
      dropGroup.position.y = 0.45;

      const mainGemGeo = new THREE.OctahedronGeometry(0.35, 2);
      mainGemGeo.scale(0.8, 1.2, 0.6);
      const mainGem = new THREE.Mesh(mainGemGeo, gemMaterial);
      dropGroup.add(mainGem);

      // Surrounding halo of small diamonds
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const smallGem = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06), gemMaterial);
        smallGem.position.set(Math.cos(a) * 0.45, Math.sin(a) * 0.6, 0);
        dropGroup.add(smallGem);
      }

      // Dangling teardrop pearl/solitaire
      const tearGeo = new THREE.ConeGeometry(0.18, 0.5, 16);
      tearGeo.rotateX(Math.PI);
      const tear = new THREE.Mesh(tearGeo, gemMaterial);
      tear.position.y = -0.7;
      dropGroup.add(tear);

      jewelRoot.add(dropGroup);

    } else if (isBracelet) {
      // Bangle / Bracelet (Torus Oval)
      const bangleGeo = new THREE.TorusGeometry(1.0, 0.08, 24, 64);
      bangleGeo.scale(1.15, 0.95, 1);
      const bangle = new THREE.Mesh(bangleGeo, metalMaterial);
      bangle.rotation.x = Math.PI * 0.5;
      jewelRoot.add(bangle);

      // Pave diamond stones around bangle
      for (let i = 0; i < 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.045), gemMaterial);
        gem.position.set(Math.cos(angle) * 1.15, 0.07, Math.sin(angle) * 0.95);
        jewelRoot.add(gem);
      }

    } else {
      // Pendant / High Jewellery Collar
      const chainGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 64, Math.PI);
      chainGeo.rotateZ(Math.PI);
      const chain = new THREE.Mesh(chainGeo, metalMaterial);
      chain.position.y = 0.5;
      jewelRoot.add(chain);

      // Pendant Medallion
      const pendantGroup = new THREE.Group();
      pendantGroup.position.y = -0.4;

      const bezelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.08, 32);
      const bezel = new THREE.Mesh(bezelGeo, metalMaterial);
      bezel.rotation.x = Math.PI * 0.5;
      pendantGroup.add(bezel);

      const centerSolitaire = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 2), gemMaterial);
      centerSolitaire.position.z = 0.06;
      pendantGroup.add(centerSolitaire);

      jewelRoot.add(pendantGroup);
    }

    // Floating Starlight Particles
    const starCount = 60;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 4;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf5d77f,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xfff8ee, 3.0);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc9a86a, 2.5);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const specularLight = new THREE.PointLight(0xffffff, 2.0, 10);
    specularLight.position.set(0, 2, 2);
    scene.add(specularLight);

    // Drag / Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      jewelRoot.rotation.y += deltaX * 0.01;
      jewelRoot.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        jewelRoot.rotation.y += delta * 0.65;
        jewelRoot.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
      }

      starPoints.rotation.y += delta * 0.08;
      renderer.render(scene, camera);
    };

    render();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [product, wireframe, metalFinish, gemstoneType, autoRotate]);

  return (
    <div className="relative w-full aspect-square max-w-md bg-[#1C1917] rounded-xs overflow-hidden border border-[#EAE4D9] flex flex-col justify-between select-none">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Bar Indicators */}
      <div className="relative z-10 p-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-[#C9A86A]">
          <RotateCw className="w-3 h-3 animate-spin" />
          <span>360° Atelier 3D View</span>
        </div>

        <span className="text-[10px] text-[#A89F91] bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-xs">
          Drag to rotate
        </span>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 pointer-events-auto">
        {/* Metal Finishes */}
        <div className="flex items-center justify-between text-xs text-[#EAE4D9]">
          <span className="text-[10px] uppercase tracking-wider text-[#A89F91]">Gold Alloy</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setMetalFinish('yellow')}
              title="18K Yellow Gold"
              className={`w-5 h-5 rounded-full bg-[#f5d77f] border-2 transition-all ${
                metalFinish === 'yellow' ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-70'
              }`}
            />
            <button
              onClick={() => setMetalFinish('rose')}
              title="18K Rose Gold"
              className={`w-5 h-5 rounded-full bg-[#e8a598] border-2 transition-all ${
                metalFinish === 'rose' ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-70'
              }`}
            />
            <button
              onClick={() => setMetalFinish('platinum')}
              title="Platinum 950"
              className={`w-5 h-5 rounded-full bg-[#e6e6e6] border-2 transition-all ${
                metalFinish === 'platinum' ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-70'
              }`}
            />
          </div>
        </div>

        {/* Gemstone Finishes */}
        <div className="flex items-center justify-between text-xs text-[#EAE4D9]">
          <span className="text-[10px] uppercase tracking-wider text-[#A89F91]">Center Gem</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setGemstoneType('diamond')}
              className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                gemstoneType === 'diamond' ? 'bg-white/20 border-[#C9A86A] text-[#FAF9F6]' : 'border-white/10 text-[#A89F91]'
              }`}
            >
              Solitaire
            </button>
            <button
              onClick={() => setGemstoneType('emerald')}
              className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                gemstoneType === 'emerald' ? 'bg-[#10b981]/30 border-[#10b981] text-[#6ee7b7]' : 'border-white/10 text-[#A89F91]'
              }`}
            >
              Emerald
            </button>
            <button
              onClick={() => setGemstoneType('ruby')}
              className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                gemstoneType === 'ruby' ? 'bg-[#d90429]/30 border-[#d90429] text-[#fca5a5]' : 'border-white/10 text-[#A89F91]'
              }`}
            >
              Ruby
            </button>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-xs transition-colors ${
              autoRotate ? 'text-[#C9A86A]' : 'text-[#7A7165]'
            }`}
          >
            {autoRotate ? 'Pause Spin' : 'Resume Spin'}
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-xs flex items-center gap-1 transition-colors ${
              wireframe ? 'text-[#C9A86A]' : 'text-[#7A7165]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Wireframe Facets</span>
          </button>
        </div>
      </div>
    </div>
  );
};
