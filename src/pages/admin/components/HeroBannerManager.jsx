import React, { useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../../context/AppContext'
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaImage, FaUndo, FaSave, FaSearchPlus, FaSearchMinus, FaCheckCircle, FaExclamationTriangle, FaCamera } from 'react-icons/fa'

const PAGES = ['About', 'Services', 'Deeksha', 'Events', 'Gallery', 'Contact'];

const DEFAULT_DEVICE_CONFIG = {
  height: 500,
  zoom: 100,
  posX: 50,
  posY: 50,
  overlay: true,
  overlayOpacity: 30
};

const DEFAULT_CONFIG = {
  desktop: { ...DEFAULT_DEVICE_CONFIG, height: 500 },
  laptop: { ...DEFAULT_DEVICE_CONFIG, height: 450 },
  tablet: { ...DEFAULT_DEVICE_CONFIG, height: 400 },
  mobile: { ...DEFAULT_DEVICE_CONFIG, height: 300 }
};

export default function HeroBannerManager() {
  const { pageHeroBanners, updatePageHeroBanner } = useContext(AppContext);
  const [selectedPage, setSelectedPage] = useState('About');
  const [device, setDevice] = useState('desktop'); // desktop, laptop, tablet, mobile
  const [separateMobile, setSeparateMobile] = useState(true);
  
  const [imageUrl, setImageUrl] = useState('');
  const [config, setConfig] = useState(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const [isDraggingFocal, setIsDraggingFocal] = useState(false);

  useEffect(() => {
    // Load config when page changes
    const existing = pageHeroBanners?.find(b => b.pageName === selectedPage);
    if (existing) {
      setImageUrl(existing.imageUrl || '');
      try {
        if (existing.configData) {
          const parsed = JSON.parse(existing.configData);
          setConfig(parsed);
          setSeparateMobile(parsed.separateMobile !== false);
        } else {
          setConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
        }
      } catch (e) {
        setConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
      }
    } else {
      setImageUrl('');
      setConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
      setSeparateMobile(true);
    }
  }, [selectedPage, pageHeroBanners]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentConfig = config[device];

  const updateCurrentConfig = (field, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      newConfig[device] = { ...newConfig[device], [field]: value };
      
      // If separate mobile is OFF and we are editing desktop, sync to mobile/tablet/laptop (except height)
      if (!separateMobile && device === 'desktop') {
        newConfig.laptop = { ...newConfig.laptop, zoom: value === undefined ? newConfig[device].zoom : newConfig[device].zoom, posX: newConfig[device].posX, posY: newConfig[device].posY, overlayOpacity: newConfig[device].overlayOpacity };
        newConfig.tablet = { ...newConfig.tablet, zoom: value === undefined ? newConfig[device].zoom : newConfig[device].zoom, posX: newConfig[device].posX, posY: newConfig[device].posY, overlayOpacity: newConfig[device].overlayOpacity };
        newConfig.mobile = { ...newConfig.mobile, zoom: value === undefined ? newConfig[device].zoom : newConfig[device].zoom, posX: newConfig[device].posX, posY: newConfig[device].posY, overlayOpacity: newConfig[device].overlayOpacity };
      }
      return newConfig;
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    const fullConfig = { ...config, separateMobile };
    
    const data = {
      pageName: selectedPage,
      imageUrl: imageUrl,
      configData: JSON.stringify(fullConfig)
    };
    
    const res = await updatePageHeroBanner(data);
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Error saving: " + res.error);
    }
  };

  const autoOptimize = () => {
    // Basic auto optimize: Center the image, fit to container width but slightly zoomed
    setConfig(prev => ({
      ...prev,
      desktop: { ...prev.desktop, zoom: 100, posX: 50, posY: 50 },
      laptop: { ...prev.laptop, zoom: 110, posX: 50, posY: 50 },
      tablet: { ...prev.tablet, zoom: 120, posX: 50, posY: 50 },
      mobile: { ...prev.mobile, zoom: 140, posX: 50, posY: 50 }
    }));
  };

  // Live preview dimensions
  const getSimulatedWidth = () => {
    if (device === 'desktop') return 1440;
    if (device === 'laptop') return 1024;
    if (device === 'tablet') return 768;
    if (device === 'mobile') return 375;
    return 1440;
  };

  const handleFocalPointerMove = (e) => {
    if (!isDraggingFocal || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    updateCurrentConfig('posX', Math.round(x));
    updateCurrentConfig('posY', Math.round(y));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#EAD8C8] pb-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#3D2B20] flex items-center gap-2">
            <FaCamera className="text-[#D4AF37]" /> Hero Banner Settings
          </h3>
          <p className="text-xs text-gray-500 mt-1">Configure responsive page headers. Changes apply instantly to frontend.</p>
        </div>
        {saved && (
          <span className="text-green-600 text-sm font-bold flex items-center gap-1 bg-green-50 px-3 py-1 rounded">
            <FaCheckCircle /> Saved Successfully
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Page Selector */}
          <div className="bg-white p-4 rounded-xl border border-[#EAD8C8] shadow-sm">
            <label className="text-xs font-bold text-gray-700 block mb-2">Select Page</label>
            <div className="flex flex-wrap gap-2">
              {PAGES.map(page => (
                <button
                  key={page}
                  onClick={() => setSelectedPage(page)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    selectedPage === page 
                    ? 'bg-[#E05A10] text-white shadow' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Device Selector */}
          <div className="bg-white p-4 rounded-xl border border-[#EAD8C8] shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-gray-700">Preview Device</label>
              <div className="flex items-center gap-2 text-[10px]">
                <input 
                  type="checkbox" 
                  id="sepMobile" 
                  checked={separateMobile} 
                  onChange={(e) => setSeparateMobile(e.target.checked)} 
                />
                <label htmlFor="sepMobile" className="font-bold text-gray-600">Separate Mobile Crop</label>
              </div>
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              <button 
                onClick={() => setDevice('desktop')}
                className={`flex-1 py-2 flex justify-center items-center gap-2 text-xs font-bold ${device === 'desktop' ? 'bg-[#3D2B20] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <FaDesktop /> Desktop
              </button>
              <button 
                onClick={() => setDevice('laptop')}
                className={`flex-1 py-2 flex justify-center items-center gap-2 text-xs font-bold border-l border-gray-200 ${device === 'laptop' ? 'bg-[#3D2B20] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <FaDesktop className="text-[10px]" /> Laptop
              </button>
              <button 
                onClick={() => setDevice('tablet')}
                className={`flex-1 py-2 flex justify-center items-center gap-2 text-xs font-bold border-l border-r border-gray-200 ${device === 'tablet' ? 'bg-[#3D2B20] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <FaTabletAlt /> Tablet
              </button>
              <button 
                onClick={() => setDevice('mobile')}
                className={`flex-1 py-2 flex justify-center items-center gap-2 text-xs font-bold ${device === 'mobile' ? 'bg-[#3D2B20] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <FaMobileAlt /> Mobile
              </button>
            </div>
            
            {!separateMobile && (device === 'tablet' || device === 'mobile') && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-[10px] text-yellow-800 flex items-start gap-2">
                <FaExclamationTriangle className="mt-0.5 shrink-0" />
                <p>Editing is locked. Mobile/Tablet crop is synced to Desktop because "Separate Mobile Crop" is OFF.</p>
              </div>
            )}
          </div>

          {/* Image & Crop Controls */}
          <div className={`bg-white p-4 rounded-xl border border-[#EAD8C8] shadow-sm space-y-4 ${!separateMobile && device !== 'desktop' ? 'opacity-60 pointer-events-none' : ''}`}>
            
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Source Image (1920x280 recommended)</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 bg-gray-50 border border-dashed border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <FaImage /> {imageUrl ? 'Change Image' : 'Upload Image'}
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Section Height</label>
                <span className="text-xs text-gray-500">{currentConfig.height}px</span>
              </div>
              <input 
                type="range" min="100" max="600" step="10" 
                value={currentConfig.height} 
                onChange={(e) => updateCurrentConfig('height', parseInt(e.target.value))}
                className="w-full accent-[#E05A10]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Zoom / Scale</label>
                <span className="text-xs text-gray-500">{currentConfig.zoom}%</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSearchMinus className="text-gray-400 text-xs" />
                <input 
                  type="range" min="100" max="300" step="5" 
                  value={currentConfig.zoom} 
                  onChange={(e) => updateCurrentConfig('zoom', parseInt(e.target.value))}
                  className="w-full accent-[#E05A10]"
                />
                <FaSearchPlus className="text-gray-400 text-xs" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Horizontal Position (Focal X)</label>
                <span className="text-xs text-gray-500">{currentConfig.posX}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="1" 
                value={currentConfig.posX} 
                onChange={(e) => updateCurrentConfig('posX', parseInt(e.target.value))}
                className="w-full accent-[#E05A10]"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                <span>Left</span><span>Center</span><span>Right</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Vertical Position (Focal Y)</label>
                <span className="text-xs text-gray-500">{currentConfig.posY}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="1" 
                value={currentConfig.posY} 
                onChange={(e) => updateCurrentConfig('posY', parseInt(e.target.value))}
                className="w-full accent-[#E05A10]"
              />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Overlay Opacity</label>
                <span className="text-xs text-gray-500">{currentConfig.overlayOpacity}%</span>
              </div>
              <input 
                type="range" min="0" max="80" step="5" 
                value={currentConfig.overlayOpacity} 
                onChange={(e) => updateCurrentConfig('overlayOpacity', parseInt(e.target.value))}
                className="w-full accent-gray-700"
              />
            </div>
            
            <div className="pt-4 flex gap-2">
              <button 
                onClick={autoOptimize}
                className="flex-1 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                Auto Optimize
              </button>
              <button 
                onClick={() => setConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)))}
                className="flex-none px-3 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded text-xs hover:bg-gray-100"
                title="Reset All"
              >
                <FaUndo />
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-8">
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 min-h-[400px] flex flex-col items-center justify-start overflow-hidden relative">
            
            <div className="w-full flex justify-between items-center mb-4 text-xs font-bold text-gray-500">
              <span>Live Preview ({device.toUpperCase()})</span>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1.5 bg-[#D4AF37] text-white rounded shadow-sm hover:bg-[#c4a132] flex items-center gap-2 disabled:opacity-50"
              >
                <FaSave /> {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>

            {/* Preview Container Wrapper (simulating the device screen) */}
            <div 
              ref={previewRef}
              className={`bg-white shadow-xl overflow-hidden transition-all duration-300 relative flex items-center justify-center mx-auto ${isDraggingFocal ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ 
                width: '100%', 
                maxWidth: device === 'desktop' ? '100%' : `${getSimulatedWidth()}px`,
                aspectRatio: `${getSimulatedWidth()} / ${currentConfig.height}`,
                border: device !== 'desktop' ? '12px solid #333' : '1px solid #ccc', 
                borderRadius: device !== 'desktop' ? '24px' : '4px',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                setIsDraggingFocal(true);
                handleFocalPointerMove(e);
              }}
              onPointerMove={handleFocalPointerMove}
              onPointerUp={() => setIsDraggingFocal(false)}
              onPointerLeave={() => setIsDraggingFocal(false)}
            >
              
              {/* Actual Hero Banner Simulator */}
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
                {imageUrl ? (
                  <>
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: `${currentConfig.posX}% ${currentConfig.posY}%`,
                        transform: `scale(${currentConfig.zoom / 100})`,
                        transformOrigin: `${currentConfig.posX}% ${currentConfig.posY}%`
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: currentConfig.overlayOpacity / 100 }}
                    ></div>
                    {/* Dummy Text for Preview */}
                    <div className="relative z-10 text-center text-white p-4">
                      <h1 className="text-3xl font-serif font-bold mb-2">{selectedPage}</h1>
                      <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <FaImage className="text-4xl mb-2 opacity-50" />
                    <span className="text-xs font-bold">No Image Selected</span>
                  </div>
                )}
              </div>

            </div>

            <div className="mt-6 text-center max-w-md mx-auto text-xs text-gray-500 bg-white p-3 rounded border border-gray-200">
              <strong>Tip:</strong> Drag the sliders to ensure the main subject (e.g. Guru Ji's face) remains fully visible within this exact height box on <strong>{device}</strong> devices. Use the zoom slider to eliminate unwanted edges.
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
