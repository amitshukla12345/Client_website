import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaMagic, FaUndo, FaSave, FaSearchPlus, FaSearchMinus,
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaDesktop, FaMobileAlt
} from 'react-icons/fa';

export default function ImageCropDialog({ banner, isOpen, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('desktop'); // 'desktop' or 'mobile'
  
  // Local state for edits
  const [posX, setPosX] = useState(50); // percentage 0-100
  const [posY, setPosY] = useState(50); // percentage 0-100
  const [zoom, setZoom] = useState(1);  // scale 1 to 3
  const [isSaved, setIsSaved] = useState(false);
  
  const imageRef = useRef(null);

  // Initialize state when opened
  useEffect(() => {
    if (isOpen && banner) {
      // Load current settings based on tab
      const currentPos = activeTab === 'desktop' 
        ? (banner.desktopImagePosition || '70% 50%') 
        : (banner.mobileImagePosition || '50% 50%');
      
      const currentZoom = activeTab === 'desktop'
        ? (banner.desktopImageZoom || 1)
        : (banner.mobileImageZoom || 1);

      const [x, y] = currentPos.split(' ').map(p => parseFloat(p));
      setPosX(isNaN(x) ? 70 : x);
      setPosY(isNaN(y) ? 50 : y);
      setZoom(currentZoom);
    }
  }, [isOpen, banner, activeTab]);

  if (!isOpen) return null;

  const handleAutoCrop = () => {
    // Smart heuristic: Focus on right side (70%), centered vertically, slight zoom
    if (activeTab === 'desktop') {
      setPosX(75);
      setPosY(50);
      setZoom(1.1);
    } else {
      setPosX(50);
      setPosY(40);
      setZoom(1.15);
    }
  };

  const handleReset = () => {
    setPosX(50);
    setPosY(50);
    setZoom(1);
  };

  const handleSave = () => {
    const positionString = `${posX}% ${posY}%`;
    if (activeTab === 'desktop') {
      onSave({
        desktopImagePosition: positionString,
        desktopImageZoom: zoom
      });
    } else {
      onSave({
        mobileImagePosition: positionString,
        mobileImageZoom: zoom
      });
    }
    
    // Show visual feedback
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handlePositionMove = (dx, dy) => {
    setPosX(prev => Math.max(0, Math.min(100, prev + dx)));
    setPosY(prev => Math.max(0, Math.min(100, prev + dy)));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#FCF9F2] w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#EAD8C8]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EAD8C8] bg-white">
          <div>
            <h2 className="text-xl font-black text-[#3D2B20] font-serif">IMAGE CROP EDITOR</h2>
            <p className="text-sm font-medium text-[#8B5A2B]">Adjust the smart focal point and zoom</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#8B5A2B] hover:text-[#E05A10] transition-colors rounded-full hover:bg-[#FAF0E6]">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col xl:flex-row gap-8">
          
          {/* LEFT: Controls & Preview Selection */}
          <div className="w-full xl:w-1/3 space-y-6 flex flex-col">
            
            {/* Viewport Tabs */}
            <div className="flex bg-[#FAF0E6] p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('desktop')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'desktop' ? 'bg-white text-[#E05A10] shadow-sm' : 'text-[#8B5A2B]'}`}
              >
                <FaDesktop /> Desktop Crop
              </button>
              <button 
                onClick={() => setActiveTab('mobile')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'mobile' ? 'bg-white text-[#E05A10] shadow-sm' : 'text-[#8B5A2B]'}`}
              >
                <FaMobileAlt /> Mobile Crop
              </button>
            </div>

            {/* Smart Auto Crop Actions */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
              <button onClick={handleAutoCrop} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E05A10] to-[#c94d0d] text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                <FaMagic /> ✨ AUTO CROP
              </button>
              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 bg-[#FFF9F0] text-[#8B5A2B] border border-[#EAD8C8] font-bold py-2.5 rounded-xl hover:bg-[#F5E6D3] transition-colors active:scale-95">
                  <FaUndo /> RESET
                </button>
                <button 
                  onClick={handleSave} 
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl transition-all duration-300 active:scale-95 ${
                    isSaved ? 'bg-green-600 text-white shadow-inner' : 'bg-[#3D2B20] text-white hover:bg-[#2A1E17]'
                  }`}
                >
                  <FaSave /> {isSaved ? 'SAVED!' : 'SAVE CROP'}
                </button>
              </div>
            </div>

            {/* Manual Controls */}
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
              <div>
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

            </div>
          </div>

          {/* RIGHT: Previews */}
          <div className="w-full xl:w-2/3 flex flex-col gap-6">
            
            {/* ORIGINAL IMAGE with Safe Area Overlay */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAD8C8] shadow-sm flex flex-col">
              <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-3">Original Image & Focal Point</h3>
              <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center max-h-[300px]">
                {banner?.image ? (
                  <div 
                    className="relative inline-block cursor-crosshair"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      setPosX(x);
                      setPosY(y);
                    }}
                  >
                    <img 
                      src={banner.image} 
                      alt="Original" 
                      className="max-w-full max-h-[300px] object-contain opacity-70"
                    />
                    
                    {/* Safe Zone Overlay */}
                    {activeTab === 'desktop' && (
                      <div className="absolute inset-0 pointer-events-none flex">
                        <div className="w-[45%] h-full bg-red-500/20 border-r border-dashed border-red-500/50 flex items-center justify-center">
                          <span className="text-red-900/60 font-black text-[10px] uppercase tracking-widest text-center px-2">Text Safe Area</span>
                        </div>
                        <div className="w-[55%] h-full bg-green-500/10 flex items-center justify-center">
                          <span className="text-green-900/60 font-black text-[10px] uppercase tracking-widest text-center px-2">Main Subject Area</span>
                        </div>
                      </div>
                    )}

                    {/* Focal Point Indicator */}
                    <div 
                      className="absolute w-6 h-6 border-[3px] border-[#E05A10] rounded-full flex items-center justify-center shadow-lg bg-white/50 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#E05A10] rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 p-10">No image uploaded</p>
                )}
              </div>
            </div>

            {/* FINAL HERO CROP PREVIEW */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAD8C8] shadow-sm flex-1 flex flex-col">
               <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-3">Final Hero Crop Preview ({activeTab})</h3>
               
               <div className="flex-1 bg-[#FAF0E6] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-[#EAD8C8] shadow-inner">
                 {banner?.image ? (
                   <div 
                     className={`relative bg-gray-200 shadow-xl overflow-hidden border-[6px] border-gray-800 rounded-lg ${activeTab === 'desktop' ? 'w-full aspect-[21/9]' : 'w-[280px] h-[500px] rounded-[2rem]'}`}
                   >
                     <img 
                       src={banner.image} 
                       alt="Final Crop"
                       className="w-full h-full object-cover transition-all duration-300"
                       style={{
                         objectPosition: `${posX}% ${posY}%`,
                         transform: `scale(${zoom})`
                       }}
                     />
                     {/* Text Safe Area Guide (optional visual aid) */}
                     <div className={`absolute inset-0 pointer-events-none ${activeTab === 'desktop' ? 'bg-gradient-to-r from-black/60 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 to-transparent'}`}>
                        <div className={`absolute border border-dashed border-white/40 flex items-center justify-center p-4 ${activeTab === 'desktop' ? 'left-8 top-8 bottom-8 w-1/3' : 'bottom-8 left-8 right-8 h-1/3'}`}>
                           <span className="text-white/60 font-bold text-xs uppercase tracking-widest text-center">Hero Text Area<br/>(Keep main subject away)</span>
                        </div>
                     </div>
                   </div>
                 ) : (
                    <p className="text-gray-400 p-10">No image uploaded</p>
                 )}
               </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
