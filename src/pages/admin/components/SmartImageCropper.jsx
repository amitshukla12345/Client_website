import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaSave, FaSearchPlus, FaSearchMinus,
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaUndo
} from 'react-icons/fa';

export default function SmartImageCropper({ isOpen, imageUrl, initialCropData, aspectRatio = '4/5', onSave, onClose, title = "IMAGE CROP EDITOR" }) {
  // Local state for edits
  const [posX, setPosX] = useState(50); // percentage 0-100
  const [posY, setPosY] = useState(50); // percentage 0-100
  const [zoom, setZoom] = useState(1);  // scale 1 to 3
  
  // Initialize state when opened
  useEffect(() => {
    if (isOpen && initialCropData) {
      try {
        const data = JSON.parse(initialCropData);
        setPosX(data.posX !== undefined ? data.posX : 50);
        setPosY(data.posY !== undefined ? data.posY : 50);
        setZoom(data.zoom !== undefined ? data.zoom : 1);
      } catch (e) {
        setPosX(50);
        setPosY(50);
        setZoom(1);
      }
    } else if (isOpen) {
      setPosX(50);
      setPosY(50);
      setZoom(1);
    }
  }, [isOpen, initialCropData]);

  if (!isOpen || !imageUrl) return null;

  const handleReset = () => {
    setPosX(50);
    setPosY(50);
    setZoom(1);
  };

  const handleSave = () => {
    const cropData = JSON.stringify({ posX, posY, zoom });
    onSave(cropData);
  };

  const handlePositionMove = (dx, dy) => {
    setPosX(prev => Math.max(0, Math.min(100, prev + dx)));
    setPosY(prev => Math.max(0, Math.min(100, prev + dy)));
  };

  // Determine aspect ratio class
  const getAspectClass = () => {
    if (aspectRatio === '1/1') return 'aspect-square rounded-full';
    return 'aspect-[4/5] rounded-lg'; // default for Yajman profile
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#FCF9F2] w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#EAD8C8]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EAD8C8] bg-white">
          <div>
            <h2 className="text-xl font-black text-[#3D2B20] font-serif">{title}</h2>
            <p className="text-sm font-medium text-[#8B5A2B]">Adjust focal point and zoom</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#8B5A2B] hover:text-[#E05A10] transition-colors rounded-full hover:bg-[#FAF0E6]">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
          
          {/* LEFT: Controls */}
          <div className="w-full md:w-1/2 space-y-6 flex flex-col">
            <div className="bg-white p-5 rounded-2xl border border-[#EAD8C8] shadow-sm flex-1">
              <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-6">Manual Overrides</h3>
              
              {/* Zoom Control */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3 text-sm font-bold text-[#3D2B20]">
                  <span>Zoom</span>
                  <span>{zoom.toFixed(2)}x</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setZoom(prev => Math.max(1, prev - 0.1))} className="p-2 text-[#8B5A2B] hover:text-[#E05A10]"><FaSearchMinus /></button>
                  <input 
                    type="range" 
                    min="1" max="3" step="0.05"
                    value={zoom} 
                    onChange={e => setZoom(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-[#EAD8C8] rounded-lg appearance-none cursor-pointer accent-[#E05A10]"
                  />
                  <button onClick={() => setZoom(prev => Math.min(3, prev + 0.1))} className="p-2 text-[#8B5A2B] hover:text-[#E05A10]"><FaSearchPlus /></button>
                </div>
              </div>

              {/* Position D-Pad */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 text-sm font-bold text-[#3D2B20]">
                  <span>Position</span>
                  <span className="text-[10px] text-[#8B5A2B]">X: {posX.toFixed(0)}% Y: {posY.toFixed(0)}%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button onClick={() => handlePositionMove(0, -5)} className="p-3 bg-[#FFF9F0] border border-[#EAD8C8] rounded-lg hover:bg-[#F5E6D3] hover:text-[#E05A10] transition-colors"><FaArrowUp /></button>
                  <div className="flex gap-2">
                    <button onClick={() => handlePositionMove(-5, 0)} className="p-3 bg-[#FFF9F0] border border-[#EAD8C8] rounded-lg hover:bg-[#F5E6D3] hover:text-[#E05A10] transition-colors"><FaArrowLeft /></button>
                    <button onClick={() => handlePositionMove(0, 5)} className="p-3 bg-[#FFF9F0] border border-[#EAD8C8] rounded-lg hover:bg-[#F5E6D3] hover:text-[#E05A10] transition-colors"><FaArrowDown /></button>
                    <button onClick={() => handlePositionMove(5, 0)} className="p-3 bg-[#FFF9F0] border border-[#EAD8C8] rounded-lg hover:bg-[#F5E6D3] hover:text-[#E05A10] transition-colors"><FaArrowRight /></button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 bg-[#FFF9F0] text-[#8B5A2B] border border-[#EAD8C8] font-bold py-2.5 rounded-xl hover:bg-[#F5E6D3] transition-colors active:scale-95">
                  <FaUndo /> RESET
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex-1 flex items-center justify-center gap-2 bg-[#3D2B20] text-white hover:bg-[#2A1E17] font-bold py-2.5 rounded-xl transition-all duration-300 active:scale-95"
                >
                  <FaSave /> SAVE CROP
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Previews */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-center">
            {/* ORIGINAL IMAGE with safe zone */}
            <div className="bg-white w-full p-4 rounded-2xl border border-[#EAD8C8] shadow-sm flex flex-col">
              <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-3">Original Image & Focal Point</h3>
              <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-[200px]">
                <div 
                  className="relative inline-block cursor-crosshair h-full"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setPosX(x);
                    setPosY(y);
                  }}
                >
                  <img 
                    src={imageUrl} 
                    alt="Original" 
                    className="max-w-full h-full object-contain opacity-70"
                  />
                  {/* Focal Point Indicator */}
                  <div 
                    className="absolute w-6 h-6 border-[3px] border-[#E05A10] rounded-full flex items-center justify-center shadow-lg bg-white/50 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#E05A10] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FINAL PREVIEW */}
            <div className="bg-white w-full p-4 rounded-2xl border border-[#EAD8C8] shadow-sm flex-1 flex flex-col items-center">
               <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-3 w-full">Final Output Preview</h3>
               
               <div className="flex-1 w-full bg-[#FAF0E6] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-[#EAD8C8] shadow-inner min-h-[250px]">
                 <div 
                   className={`relative bg-gray-200 shadow-xl overflow-hidden border-4 border-white ${getAspectClass()} w-[200px] h-[250px]`}
                 >
                   <img 
                     src={imageUrl} 
                     alt="Final Crop"
                     className="w-full h-full object-cover transition-all duration-300"
                     style={{
                       objectPosition: `${posX}% ${posY}%`,
                       transform: `scale(${zoom})`
                     }}
                   />
                 </div>
               </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
