import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { 
  X, Camera, CameraOff, Sparkles, RefreshCw, Download, 
  Sliders, Move, Eye, Check, AlertCircle, Maximize2 
} from 'lucide-react';

interface ARTryOnModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ARTryOnModal: React.FC<ARTryOnModalProps> = ({ product, isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Model fallback presets if webcam is unavailable or user chooses
  const studioPresets = [
    {
      id: 'studio-model-1',
      name: 'Studio Portrait (Classic)',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 'studio-model-2',
      name: 'Studio Portrait (Evening)',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 'studio-model-3',
      name: 'Studio Portrait (Bridal)',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    },
  ];
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [useLiveCamera, setUseLiveCamera] = useState<boolean>(true);

  // Placement adjustments
  const isEarring = product?.category === 'Earrings' || product?.name.toLowerCase().includes('earring') || product?.name.toLowerCase().includes('jhumka');
  const isNecklace = product?.category === 'Necklaces' || product?.category === 'Pendants' || product?.name.toLowerCase().includes('necklace') || product?.name.toLowerCase().includes('pendant');

  const [scale, setScale] = useState<number>(1);
  const [offsetY, setOffsetY] = useState<number>(isEarring ? 0 : 35);
  const [earSpan, setEarSpan] = useState<number>(130);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [sparkleActive, setSparkleActive] = useState<boolean>(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Initialize camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
        setCameraActive(true);
        setUseLiveCamera(true);
      } else {
        setCameraError('Webcam is not supported in this browser. Showing studio portrait model.');
        setUseLiveCamera(false);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access not granted. Studio portrait preview loaded.');
      setUseLiveCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    startCamera();
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Snapshot
  const captureSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 720;
    canvas.height = 960;

    // Draw background
    if (useLiveCamera && videoRef.current && cameraActive) {
      ctx.save();
      // Mirror if webcam
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = studioPresets[selectedPreset].url;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawJewelOverlay(ctx, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.95));
      };
      return;
    }

    drawJewelOverlay(ctx, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL('image/jpeg', 0.95));
  };

  const drawJewelOverlay = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const jewelImg = new Image();
    jewelImg.crossOrigin = 'anonymous';
    jewelImg.src = product.images[0];
    jewelImg.onload = () => {
      const centerX = w / 2;
      const centerY = h * 0.55 + offsetY;

      if (isEarring) {
        // Draw Left & Right Earrings
        const eSize = 85 * scale;
        const leftX = centerX - earSpan;
        const rightX = centerX + earSpan;
        const earY = h * 0.42 + offsetY;

        ctx.drawImage(jewelImg, leftX - eSize / 2, earY, eSize, eSize * 1.3);
        ctx.drawImage(jewelImg, rightX - eSize / 2, earY, eSize, eSize * 1.3);
      } else {
        // Draw Necklace / Pendant
        const nWidth = 260 * scale;
        const nHeight = 220 * scale;
        ctx.drawImage(jewelImg, centerX - nWidth / 2, centerY, nWidth, nHeight);
      }

      // Add Subha Atelier Watermark
      ctx.fillStyle = 'rgba(28, 25, 23, 0.85)';
      ctx.fillRect(0, h - 50, w, 50);
      ctx.fillStyle = '#C9A86A';
      ctx.font = '14px serif';
      ctx.fillText(`Subha Atelier Virtual AR Try-On • ${product.name}`, 20, h - 22);

      setCapturedImage(canvasRef.current?.toDataURL('image/jpeg', 0.95) || null);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#141210] text-[#FAF9F6] rounded-xs shadow-2xl border border-[#3E3830] overflow-hidden my-auto flex flex-col"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#2D2822] flex items-center justify-between bg-[#1C1917]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#C9A86A]/20 text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl text-[#FAF9F6]">
                  Virtual AR Try-On Mirror
                </h3>
                <span className="text-[10px] uppercase tracking-wider bg-[#C9A86A]/20 text-[#C9A86A] px-2 py-0.5 rounded-full font-medium">
                  {isEarring ? 'Earrings Positioning' : isNecklace ? 'Necklace & Collar Drape' : 'Atelier Visualization'}
                </span>
              </div>
              <p className="text-xs text-[#A89F91]">
                Real-time visual fitting of <strong className="text-white">{product.name}</strong> on you.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 text-[#A89F91] hover:text-white rounded-full transition-colors"
            aria-label="Close AR"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main AR Canvas Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] bg-black">
          {/* Viewport Area */}
          <div className="lg:col-span-8 relative flex items-center justify-center overflow-hidden min-h-[420px] sm:min-h-[500px]">
            {/* Live Camera Feed */}
            {useLiveCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <img
                src={studioPresets[selectedPreset].url}
                alt="Studio Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
            )}

            {/* Dotted Alignment Face / Neck Guide */}
            {showGuides && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                {/* Oval Face Contour Guide */}
                <div className="w-56 h-72 border-2 border-dashed border-[#C9A86A]/40 rounded-[50%] flex items-center justify-center mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A86A]/70 bg-black/40 px-2 py-0.5 rounded-xs">
                    Align Face
                  </span>
                </div>
                {/* Collar Guide */}
                <div className="w-64 h-12 border-b-2 border-dashed border-[#C9A86A]/30 rounded-b-full -mt-10" />
              </div>
            )}

            {/* Jewelry Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {isEarring ? (
                /* Dual Earrings Overlay */
                <div
                  className="relative w-full flex justify-center items-center"
                  style={{ transform: `translateY(${offsetY}px)` }}
                >
                  {/* Left Earring */}
                  <motion.div
                    animate={sparkleActive ? { rotate: [-1.5, 1.5, -1.5] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute"
                    style={{
                      transform: `translateX(-${earSpan}px) scale(${scale})`,
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt="Left Earring"
                      referrerPolicy="no-referrer"
                      className="w-20 h-28 object-contain"
                    />
                    {sparkleActive && (
                      <span className="absolute top-2 right-2 animate-ping w-2 h-2 rounded-full bg-[#FAF9F6] shadow-lg" />
                    )}
                  </motion.div>

                  {/* Right Earring */}
                  <motion.div
                    animate={sparkleActive ? { rotate: [1.5, -1.5, 1.5] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute"
                    style={{
                      transform: `translateX(${earSpan}px) scale(${scale})`,
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt="Right Earring"
                      referrerPolicy="no-referrer"
                      className="w-20 h-28 object-contain"
                    />
                    {sparkleActive && (
                      <span className="absolute top-2 left-2 animate-ping w-2 h-2 rounded-full bg-[#FAF9F6] shadow-lg" />
                    )}
                  </motion.div>
                </div>
              ) : (
                /* Necklace / Collar Overlay */
                <motion.div
                  animate={sparkleActive ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    transform: `translateY(${offsetY}px) scale(${scale})`,
                    filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
                  }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={product.images[0]}
                    alt="Necklace Overlay"
                    referrerPolicy="no-referrer"
                    className="w-64 sm:w-80 h-auto object-contain"
                  />
                  {sparkleActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-80" />
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Snapshot Trigger Overlay Button */}
            <div className="absolute bottom-5 inset-x-0 flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={captureSnapshot}
                className="px-5 py-2.5 rounded-full bg-[#C9A86A] text-[#141210] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl hover:bg-white transition-all transform hover:scale-105"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Look</span>
              </button>
            </div>

            {/* Hidden Processing Canvas for Snapshot */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* AR Calibration & Controls Sidebar */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-[#181614] border-t lg:border-t-0 lg:border-l border-[#2D2822] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Camera Source Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89F91] mb-2 font-medium">
                  Camera Feed Source
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setUseLiveCamera(true);
                      startCamera();
                    }}
                    className={`py-2 px-3 rounded-xs border text-left flex items-center gap-2 transition-all ${
                      useLiveCamera
                        ? 'border-[#C9A86A] bg-[#C9A86A]/10 text-white font-medium'
                        : 'border-[#3E3830] text-[#8C8273] hover:text-white'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-[#C9A86A]" />
                    <span>My Live Webcam</span>
                  </button>

                  <button
                    onClick={() => {
                      setUseLiveCamera(false);
                      stopCamera();
                    }}
                    className={`py-2 px-3 rounded-xs border text-left flex items-center gap-2 transition-all ${
                      !useLiveCamera
                        ? 'border-[#C9A86A] bg-[#C9A86A]/10 text-white font-medium'
                        : 'border-[#3E3830] text-[#8C8273] hover:text-white'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-[#C9A86A]" />
                    <span>Studio Model</span>
                  </button>
                </div>

                {/* Studio Model Presets if not using webcam */}
                {!useLiveCamera && (
                  <div className="mt-3 flex gap-2">
                    {studioPresets.map((preset, idx) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(idx)}
                        className={`flex-1 p-1 rounded-xs border text-[10px] text-center transition-all ${
                          selectedPreset === idx ? 'border-[#C9A86A] bg-white/10 text-white font-semibold' : 'border-[#3E3830] text-[#8C8273]'
                        }`}
                      >
                        Model {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sliders for Fitting Adjustments */}
              <div className="space-y-4 pt-4 border-t border-[#2D2822]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A89F91] uppercase tracking-wider text-[10px]">Jewelry Scale</span>
                  <span className="font-mono text-white text-xs">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-[#C9A86A] cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A89F91] uppercase tracking-wider text-[10px]">Vertical Position (Up/Down)</span>
                  <span className="font-mono text-white text-xs">{offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-80"
                  max="120"
                  step="2"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value))}
                  className="w-full accent-[#C9A86A] cursor-pointer"
                />

                {isEarring && (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A89F91] uppercase tracking-wider text-[10px]">Ear Span Width</span>
                      <span className="font-mono text-white text-xs">{earSpan}px</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="190"
                      step="2"
                      value={earSpan}
                      onChange={(e) => setEarSpan(parseInt(e.target.value))}
                      className="w-full accent-[#C9A86A] cursor-pointer"
                    />
                  </>
                )}
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-4 border-t border-[#2D2822] text-xs">
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="text-[#A89F91]">Face Alignment Guides</span>
                  <input
                    type="checkbox"
                    checked={showGuides}
                    onChange={(e) => setShowGuides(e.target.checked)}
                    className="accent-[#C9A86A] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="text-[#A89F91]">Diamond Sparkle Glimmer</span>
                  <input
                    type="checkbox"
                    checked={sparkleActive}
                    onChange={(e) => setSparkleActive(e.target.checked)}
                    className="accent-[#C9A86A] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Reset / Done Button */}
            <div className="pt-4 border-t border-[#2D2822] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setScale(1);
                  setOffsetY(isEarring ? 0 : 35);
                  setEarSpan(130);
                }}
                className="flex-1 py-2 text-xs text-[#8C8273] hover:text-white uppercase tracking-wider transition-colors border border-[#3E3830] rounded-xs"
              >
                Reset Calibration
              </button>
            </div>
          </div>
        </div>

        {/* Snapshot Modal Preview */}
        <AnimatePresence>
          {capturedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/90 p-6 flex flex-col items-center justify-center"
            >
              <div className="max-w-md w-full bg-[#1C1917] p-4 rounded-xs border border-[#C9A86A]/40 shadow-2xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-widest text-[#C9A86A] font-semibold">
                    Captured Look
                  </span>
                  <button onClick={() => setCapturedImage(null)} className="text-[#A89F91] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <img
                  src={capturedImage}
                  alt="Captured Look"
                  className="w-full rounded-xs aspect-[3/4] object-cover mb-4 border border-[#3E3830]"
                />
                <div className="flex gap-2">
                  <a
                    href={capturedImage}
                    download={`subha-tryon-${product.id}.jpg`}
                    className="flex-1 py-2.5 bg-[#C9A86A] text-[#141210] text-center text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Photo</span>
                  </a>
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="px-4 py-2.5 bg-white/10 text-white text-xs uppercase tracking-wider rounded-xs hover:bg-white/20"
                  >
                    Retake
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
