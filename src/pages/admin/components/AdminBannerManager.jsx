import React, { useState, useContext, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUpload, FaTrash, FaCopy, FaSave, FaEye, FaChevronDown, FaChevronUp, FaPlus,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaInfoCircle, FaImage, FaCalendarAlt,
  FaDesktop, FaTabletAlt, FaMobileAlt, FaCrosshairs, FaCheckCircle, FaMapMarkerAlt, FaClock, FaCrop, FaCheck, FaTimes
} from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../../../context/AppContext'
import ImageCropDialog from './ImageCropDialog'

// Switch Component
const ToggleSwitch = ({ enabled, onChange, label }) => (
  <div className="flex items-center justify-between bg-white border border-[#EAD8C8] p-4 rounded-xl shadow-sm">
    <span className="text-sm font-bold text-[#3D2B20]">{label}</span>
    <button 
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-[#E05A10]' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

// Custom Combobox
const CustomCombobox = ({ value, onChange, placeholder, options = [], maxLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input 
          type="text"
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all bg-[#FFFDF7] pr-10 text-[#3D2B20]"
          placeholder={placeholder}
        />
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B5A2B] hover:text-[#E05A10] transition-colors"
        >
          <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && options.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white border border-[#D4AF37]/40 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
          >
            <ul className="py-1">
              {options.map((opt, idx) => (
                <li 
                  key={idx}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-[#3D2B20] hover:bg-[#E05A10]/10 hover:text-[#E05A10] cursor-pointer transition-colors border-b border-[#FAF0E6] last:border-none"
                >
                  {opt}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Segmented Control
const SegmentedControl = ({ options, value, onChange, label }) => (
  <div className="mb-4">
    {label && <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase tracking-wider mb-2">{label}</label>}
    <div className="flex bg-[#FAF0E6] p-1 rounded-lg">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
            value === opt.value ? 'bg-white text-[#E05A10] shadow-sm border border-[#EAD8C8]/50' : 'text-[#8B5A2B] hover:text-[#3D2B20]'
          }`}
        >
          {opt.icon && <opt.icon className="text-sm" />}
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const STATUS_OPTIONS = ['Draft', 'Published', 'Scheduled', 'Disabled'];
const KATHA_OPTIONS = ['श्रीमद् भागवत कथा', 'श्री राम कथा', 'श्री शिव महापुराण कथा', 'श्री देवी भागवत कथा', 'नानी बाई रो मायरो', 'श्री भक्तमाल कथा'];
const SUBTITLE_OPTIONS = ['ज्ञान की अमृत वर्षा', 'जीवन का सही मार्ग', 'आत्मिक शांति का मार्ग', 'भक्ति और ज्ञान का संगम'];
const KATHA_DAY_OPTIONS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export default function AdminBannerManager() {
  const { banners, updateBanners, events } = useContext(AppContext)
  
  const [localBanners, setLocalBanners] = useState([])
  const [activeTab, setActiveTab] = useState('desktop') // desktop, tablet, mobile
  const [expandedId, setExpandedId] = useState(null)
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false)
  
  const fileInputRefs = useRef({})
  const imagePreviewRef = useRef(null)

  useEffect(() => {
    if (banners && banners.length > 0) {
      const initialized = banners.map((b, i) => ({ 
        ...b, 
        status: b.status || (b.enabled ? 'Published' : 'Draft'),
        desktopImagePosition: b.desktopImagePosition || '70% 50%',
        mobileImagePosition: b.mobileImagePosition || '50% 50%',
        desktopImageZoom: b.desktopImageZoom || 1,
        mobileImageZoom: b.mobileImageZoom || 1,
        overlayDarkness: b.overlayDarkness !== undefined ? b.overlayDarkness : 0,
        textPositionHorizontal: b.textPositionHorizontal || 'left',
        textPositionVertical: b.textPositionVertical || 'center'
      }));
      setLocalBanners(initialized);
      setExpandedId(initialized[0].id);
    } else {
      addNewBanner()
    }
  }, [banners]);

  const activeBanner = localBanners.find(b => b.id === expandedId) || localBanners[0];

  const handleUpdate = (id, field, value) => {
    setLocalBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  const addNewBanner = () => {
    const newId = Date.now();
    setLocalBanners(prev => [
      {
        id: newId,
        image: '',
        title: 'श्रीमद् भागवत कथा',
        subtitle: 'ज्ञान की अमृत वर्षा',
        kathaDay: '',
        prasang: '',
        date: '',
        time: '',
        venue: '',
        btn1Text: 'Book Katha',
        btn1Url: '/contact',
        btn2Text: 'Watch Live',
        btn2Url: '/live',
        textPositionHorizontal: 'left',
        textPositionVertical: 'center',
        desktopImagePosition: '70% 50%',
        mobileImagePosition: '50% 50%',
        desktopImageZoom: 1,
        mobileImageZoom: 1,
        overlayDarkness: 0,
        overlayType: 'AUTO',
        theme: 'AUTO',
        altText: '',
        enableBook: true,
        enableLive: true,
        status: 'Draft',
        overrideEventInfo: false
      },
      ...prev
    ])
    setExpandedId(newId)
  }

  const duplicateBanner = (banner) => {
    const newId = Date.now();
    setLocalBanners(prev => [
      { ...banner, id: newId, title: banner.title + ' (Copy)', status: 'Draft' },
      ...prev
    ])
    setExpandedId(newId)
  }

  const deleteBanner = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setLocalBanners(prev => prev.filter(b => b.id !== id))
      if (expandedId === id) setExpandedId(null)
    }
  }

  const saveAllBanners = () => {
    // Add enabled property for legacy compatibility
    const cleanBanners = localBanners.map(b => ({
      ...b,
      enabled: b.status === 'Published'
    }));
    if(updateBanners) updateBanners(cleanBanners);
    alert("बैनर सफलतापूर्वक सेव कर लिए गए हैं! (Banners Saved Successfully!)");
  }

  const handleEventSelect = (bannerId, eventIdStr) => {
    const eventId = parseInt(eventIdStr);
    handleUpdate(bannerId, 'eventId', eventId);
    
    if (eventId) {
      const evt = events?.find(e => e.id === eventId);
      if (evt) {
        handleUpdate(bannerId, 'overrideEventInfo', false);
        handleUpdate(bannerId, 'date', evt.date + ' ' + (evt.month || ''));
        handleUpdate(bannerId, 'time', evt.time);
        handleUpdate(bannerId, 'venue', evt.venue);
      }
    }
  }

  const handleImageUpload = (id, e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Image exceeds 5MB limit. Please compress it.");
          return;
        }
        
        const fileSizeKB = Math.round(file.size / 1024);
        const format = file.type ? file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN' : 'UNKNOWN';

        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            const img = new Image();
            img.onload = () => {
              const width = img.width || 0;
              const height = img.height || 0;
              const aspect = height ? (width / height).toFixed(2) : 1;
              const isGoodRatio = aspect >= 1.8 && aspect <= 2.5; 
              const isGoodRes = width >= 1200;

              handleUpdate(id, 'imageStats', {
                width, height, aspect, isGoodRatio, isGoodRes, fileSizeKB, format
              });
              handleUpdate(id, 'image', reader.result);
              setIsCropDialogOpen(true);
            };
            img.onerror = () => {
              handleUpdate(id, 'image', reader.result);
              setIsCropDialogOpen(true);
            };
            img.src = reader.result;
          } catch (err) {
            console.error("Image processing error", err);
            handleUpdate(id, 'image', reader.result);
            setIsCropDialogOpen(true);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload error", error);
    }
  }

  // Handle saving from the crop dialog
  const handleCropSave = (cropData) => {
    Object.keys(cropData).forEach(key => {
      handleUpdate(activeBanner.id, key, cropData[key]);
    });
  }

  // Generate preview classes
  const getPreviewClasses = () => {
    if (activeTab === 'mobile') return 'w-[390px] h-[700px] text-[0.8rem] rounded-[2rem] border-8 border-gray-800 shadow-2xl';
    if (activeTab === 'tablet') return 'w-[768px] h-[600px] text-[0.9rem] rounded-[2rem] border-8 border-gray-800 shadow-2xl';
    return 'w-full aspect-[21/9] rounded-xl border border-[#EAD8C8] shadow-lg';
  };

  const getOverlayPreset = (val) => {
    if (val === 0) return 'None';
    if (val <= 30) return 'Soft';
    if (val <= 60) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="max-w-[1920px] mx-auto p-4 lg:p-8 bg-[#FAF6F0] min-h-screen font-sans text-[#3D2B20]">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
        <div>
          <h1 className="text-3xl font-serif font-black text-[#3D2B20] flex items-center gap-3">
            <GiLotus className="text-[#E05A10]" /> Hero Banner CMS
          </h1>
          <p className="text-[#8B5A2B] font-medium mt-1">Premium visual manager for homepage sliders.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNewBanner} className="flex items-center gap-2 px-5 py-2.5 bg-[#FFF9F0] border border-[#EAD8C8] text-[#8A2900] font-bold rounded-lg hover:bg-[#F5E6D3] transition-all">
            <FaPlus /> Add Banner
          </button>
          <button onClick={saveAllBanners} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#E05A10] to-[#c94d0d] text-white font-bold rounded-lg shadow-lg shadow-[#E05A10]/30 hover:opacity-90 transition-all">
            <FaSave /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: Controls */}
        <div className="w-full xl:w-5/12 2xl:w-1/3 space-y-6">
          
          {/* List of Banners */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EAD8C8]">
            <h3 className="text-sm font-black text-[#8A2900] uppercase tracking-wider mb-4 px-2">Banner Sequence</h3>
            <div className="space-y-2">
              {localBanners.map((banner, index) => (
                <div 
                  key={banner.id}
                  onClick={() => setExpandedId(banner.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${expandedId === banner.id ? 'bg-[#FFF9F0] border-[#E05A10] shadow-sm' : 'bg-white border-transparent hover:border-[#EAD8C8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-[#EAD8C8]">
                       {banner.image ? <img src={banner.image} className="w-full h-full object-cover" /> : <FaImage className="w-full h-full p-2 text-gray-300" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3D2B20] line-clamp-1">{banner.title || 'Untitled'}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${banner.status === 'Published' ? 'bg-green-100 text-green-700' : banner.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {banner.status || 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={(e) => { e.stopPropagation(); duplicateBanner(banner); }} className="p-1.5 text-gray-400 hover:text-[#E05A10]"><FaCopy /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteBanner(banner.id); }} className="p-1.5 text-gray-400 hover:text-red-500"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Banner Editor */}
          {activeBanner && (
            <div className="space-y-6 pb-20">
              
              {/* STATUS & SCHEDULING */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAD8C8]">
                <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-4 border-b border-[#FAF0E6] pb-2">1. Publishing & Status</h3>
                
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Status</label>
                  <select 
                    value={activeBanner.status || 'Draft'} 
                    onChange={e => handleUpdate(activeBanner.id, 'status', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-bold text-[#3D2B20] outline-none focus:border-[#E05A10]"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {activeBanner.status === 'Scheduled' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Publish From</label>
                      <input type="date" value={activeBanner.publishFrom || ''} onChange={e => handleUpdate(activeBanner.id, 'publishFrom', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] text-sm" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Publish Until</label>
                      <input type="date" value={activeBanner.publishUntil || ''} onChange={e => handleUpdate(activeBanner.id, 'publishUntil', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] text-sm" />
                    </div>
                  </div>
                )}
              </div>

              {/* EVENT LINKING */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAD8C8]">
                <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-4 border-b border-[#FAF0E6] pb-2">2. Event Information</h3>
                
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Link to Existing Event</label>
                  <select 
                    value={activeBanner.eventId || ''} 
                    onChange={e => handleEventSelect(activeBanner.id, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-bold text-[#3D2B20] outline-none focus:border-[#E05A10]"
                  >
                    <option value="">-- No Event Linked (Custom Info) --</option>
                    {events?.map(e => <option key={e.id} value={e.id}>{e.title} - {e.venue}</option>)}
                  </select>
                </div>

                {activeBanner.eventId && (
                   <div className="mb-4 flex items-center gap-2">
                     <input type="checkbox" id="override" checked={activeBanner.overrideEventInfo || false} onChange={e => handleUpdate(activeBanner.id, 'overrideEventInfo', e.target.checked)} className="accent-[#E05A10] w-4 h-4 cursor-pointer" />
                     <label htmlFor="override" className="text-sm font-bold text-[#8B5A2B] cursor-pointer">Override Event Information</label>
                   </div>
                )}

                <div className={`grid grid-cols-2 gap-4 ${(activeBanner.eventId && !activeBanner.overrideEventInfo) ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Venue / Location</label>
                    <input type="text" value={activeBanner.venue || ''} onChange={e => handleUpdate(activeBanner.id, 'venue', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] text-sm font-semibold" placeholder="e.g. Prayagraj" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Date</label>
                    <input type="text" value={activeBanner.date || ''} onChange={e => handleUpdate(activeBanner.id, 'date', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] text-sm font-semibold" placeholder="10 Aug 2026" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Time</label>
                    <input type="text" value={activeBanner.time || ''} onChange={e => handleUpdate(activeBanner.id, 'time', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] text-sm font-semibold" placeholder="7:00 PM" />
                  </div>
                </div>
              </div>

              {/* BANNER CONTENT */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAD8C8]">
                <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-4 border-b border-[#FAF0E6] pb-2">3. Banner Content</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Title</label>
                    <CustomCombobox value={activeBanner.title || ''} onChange={v => handleUpdate(activeBanner.id, 'title', v)} options={KATHA_OPTIONS} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Subtitle</label>
                    <CustomCombobox value={activeBanner.subtitle || ''} onChange={v => handleUpdate(activeBanner.id, 'subtitle', v)} options={SUBTITLE_OPTIONS} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Katha Day</label>
                      <CustomCombobox value={activeBanner.kathaDay || ''} onChange={v => handleUpdate(activeBanner.id, 'kathaDay', v)} options={KATHA_DAY_OPTIONS} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Prasang</label>
                      <input type="text" value={activeBanner.prasang || ''} onChange={e => handleUpdate(activeBanner.id, 'prasang', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-semibold text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* THEME & ACCESSIBILITY */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAD8C8]">
                <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-4 border-b border-[#FAF0E6] pb-2">4. Theme & Accessibility</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Color Theme</label>
                      <select 
                        value={activeBanner.theme || 'AUTO'} 
                        onChange={e => handleUpdate(activeBanner.id, 'theme', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-bold text-[#3D2B20] outline-none focus:border-[#E05A10]"
                      >
                        <option value="AUTO">AUTO (Cream)</option>
                        <option value="CREAM">Cream (#FCF9F2)</option>
                        <option value="SAFFRON">Saffron (#FFF4EB)</option>
                        <option value="WARM GOLD">Warm Gold (#FDF9EB)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5">Image Overlay</label>
                      <select 
                        value={activeBanner.overlayType || 'AUTO'} 
                        onChange={e => handleUpdate(activeBanner.id, 'overlayType', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-bold text-[#3D2B20] outline-none focus:border-[#E05A10]"
                      >
                        <option value="AUTO">AUTO</option>
                        <option value="GRADIENT">Gradient Only</option>
                        <option value="WARM">Warm Wash</option>
                        <option value="DARK">Dark Fade</option>
                        <option value="NONE">None</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B5A2B] uppercase mb-1.5 flex items-center justify-between">
                      Image Alt Text 
                      <span className="text-[9px] font-normal text-gray-500">(For SEO & Screen Readers)</span>
                    </label>
                    <input 
                      type="text" 
                      value={activeBanner.altText || ''} 
                      onChange={e => handleUpdate(activeBanner.id, 'altText', e.target.value)} 
                      className="w-full px-4 py-2.5 rounded-lg border border-[#EAD8C8] bg-[#FFFDF7] font-semibold text-sm" 
                      placeholder="e.g. Shri Ram Katha with Pujya Guru Ji" 
                    />
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAD8C8]">
                <h3 className="text-xs font-black text-[#8A2900] uppercase tracking-wider mb-4 border-b border-[#FAF0E6] pb-2">5. Buttons Configuration</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-[#FAF0E6]/50 rounded-xl border border-[#EAD8C8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-[#3D2B20] text-sm">Primary Button</span>
                      <ToggleSwitch enabled={activeBanner.enableBook !== false} onChange={v => handleUpdate(activeBanner.id, 'enableBook', v)} label="" />
                    </div>
                    {activeBanner.enableBook !== false && (
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <input type="text" value={activeBanner.btn1Text || ''} onChange={e => handleUpdate(activeBanner.id, 'btn1Text', e.target.value)} className="w-full px-3 py-2 rounded border border-[#EAD8C8] text-sm font-bold" placeholder="BOOK YOUR KATHA" />
                        <input type="text" value={activeBanner.btn1Url || ''} onChange={e => handleUpdate(activeBanner.id, 'btn1Url', e.target.value)} className="w-full px-3 py-2 rounded border border-[#EAD8C8] text-sm" placeholder="/contact" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-[#FAF0E6]/50 rounded-xl border border-[#EAD8C8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-[#3D2B20] text-sm">Secondary Button</span>
                      <ToggleSwitch enabled={activeBanner.enableLive !== false} onChange={v => handleUpdate(activeBanner.id, 'enableLive', v)} label="" />
                    </div>
                    {activeBanner.enableLive !== false && (
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <input type="text" value={activeBanner.btn2Text || ''} onChange={e => handleUpdate(activeBanner.id, 'btn2Text', e.target.value)} className="w-full px-3 py-2 rounded border border-[#EAD8C8] text-sm font-bold" placeholder="WATCH LIVE KATHA" />
                        <input type="text" value={activeBanner.btn2Url || ''} onChange={e => handleUpdate(activeBanner.id, 'btn2Url', e.target.value)} className="w-full px-3 py-2 rounded border border-[#EAD8C8] text-sm" placeholder="/live" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Sticky Preview */}
        <div className="w-full xl:w-7/12 2xl:w-2/3 xl:sticky xl:top-6">
          {activeBanner ? (
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(224,90,16,0.05)] border border-[#EAD8C8]">
              
              {/* Preview Controls Header */}
              <div className="flex flex-col xl:flex-row items-center justify-between mb-6 gap-3">
                <div className="shrink-0 -mb-4">
                  <SegmentedControl 
                    label=""
                    value={activeTab}
                    onChange={setActiveTab}
                    options={[
                      { label: 'Desktop', value: 'desktop', icon: FaDesktop },
                      { label: 'Tablet', value: 'tablet', icon: FaTabletAlt },
                      { label: 'Mobile', value: 'mobile', icon: FaMobileAlt },
                    ]}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button 
                    onClick={() => setIsCropDialogOpen(true)}
                    className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2.5 rounded-lg font-bold text-[11px] lg:text-xs transition-colors shadow-sm bg-[#FFF9F0] text-[#E05A10] border border-[#EAD8C8] hover:bg-[#F5E6D3] whitespace-nowrap"
                  >
                    <FaCrop className="text-sm shrink-0" /> <span className="hidden sm:inline">Smart</span> Auto Crop
                  </button>
                  <button 
                    onClick={() => fileInputRefs.current[activeBanner.id]?.click()}
                    className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2.5 rounded-lg font-bold text-[11px] lg:text-xs bg-[#3D2B20] text-white hover:bg-[#2A1E17] transition-colors shadow-sm whitespace-nowrap"
                  >
                    <FaUpload className="text-sm shrink-0" /> Upload Image
                  </button>
                  <input type="file" ref={el => { if(el) fileInputRefs.current[activeBanner.id] = el; }} onChange={e => handleImageUpload(activeBanner.id, e)} accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Image Guidelines & Quality Check */}
              <div className="mb-4 flex flex-col gap-3">
                <div className="bg-[#FFF9F0] border border-[#D4AF37]/50 text-[#8A2900] p-4 rounded-xl flex items-start gap-3 text-sm shadow-inner">
                  <FaInfoCircle className="mt-0.5 text-[#E05A10] text-lg flex-shrink-0" />
                  <div>
                    <p className="mb-1"><strong>Recommended Size:</strong> 1920 × 900 pixels (Max: 5MB) for the best resolution.</p>
                    <p>Click <strong>Smart Auto Crop & Focus</strong> to intelligently fit the main subject (e.g. Guru Ji) into the hero banner for both Desktop and Mobile views.</p>
                  </div>
                </div>

                {/* Image Quality Report */}
                {activeBanner?.imageStats && (
                  <div className="bg-white border border-[#EAD8C8] p-4 rounded-xl shadow-sm text-sm">
                    <h4 className="font-bold text-[#3D2B20] border-b border-[#FAF0E6] pb-2 mb-3 text-xs uppercase tracking-wider">Image Quality Report</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex items-center gap-2">
                        {activeBanner.imageStats.isGoodRes ? <FaCheck className="text-green-600" /> : <FaTimes className="text-red-500" />}
                        <span className="text-[#8B5A2B]">Resolution: <strong>{activeBanner.imageStats.width} × {activeBanner.imageStats.height}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeBanner.imageStats.isGoodRatio ? <FaCheck className="text-green-600" /> : <FaInfoCircle className="text-yellow-600" />}
                        <span className="text-[#8B5A2B]">Aspect Ratio: <strong>{activeBanner.imageStats.aspect}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span className="text-[#8B5A2B]">File Size: <strong>{activeBanner.imageStats.fileSizeKB} KB</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span className="text-[#8B5A2B]">Format: <strong>{activeBanner.imageStats.format}</strong></span>
                      </div>
                    </div>
                    {!activeBanner.imageStats.isGoodRes && (
                      <p className="text-xs text-red-600 mt-3 font-semibold bg-red-50 p-2 rounded">
                        ⚠ Warning: Image width is less than 1200px. It may appear blurry on large screens.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* The Actual Scalable Preview Area */}
              <div className="bg-[#FAF0E6] rounded-2xl p-4 sm:p-8 flex justify-center overflow-hidden border border-[#EAD8C8] shadow-inner relative items-center min-h-[400px]">
                
                {/* Scaled Wrapper */}
                <div 
                  className={`relative bg-[#FCF9F2] overflow-hidden transition-all duration-500 ease-out origin-top ${getPreviewClasses()}`}
                  style={{
                    transform: activeTab === 'tablet' ? 'scale(0.85)' : activeTab === 'mobile' ? 'scale(0.8)' : 'scale(1)',
                    transformOrigin: 'center center'
                  }}
                >
                  
                  {/* Hero Container Replicating Frontend Structure */}
                  <div className="w-full h-full flex flex-col lg:flex-row relative z-10">
                    
                    {/* Left: Text Content */}
                    <div className={`w-full ${activeTab === 'mobile' ? 'h-[60%] pt-12 pb-6 px-6 z-30 text-center flex flex-col' : 'lg:w-1/2 flex flex-col justify-center pl-8 pr-12 z-30 relative'} ${
                      activeBanner?.theme === 'SAFFRON' ? 'bg-[#FFF4EB]' : 
                      activeBanner?.theme === 'WARM GOLD' ? 'bg-[#FDF9EB]' : 'bg-[#FCF9F2]'
                    }`}>
                      

                      <div className="relative z-20 flex flex-col">
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-[#3D2B20] mb-3 leading-normal">
                          {activeBanner.title || 'श्रीमद् भागवत कथा'}
                        </h2>
                        
                        {activeBanner.subtitle && (
                          <p className="font-serif text-base lg:text-2xl text-[#3D2B20]/80 font-semibold leading-relaxed mb-4">
                            {activeBanner.subtitle}
                          </p>
                        )}

                        {/* Pill */}
                        {(activeBanner.kathaDay || activeBanner.prasang || activeBanner.date || activeBanner.time || activeBanner.venue) && (
                          <div className={`inline-flex flex-col lg:flex-row items-center lg:items-stretch bg-[#EAD8C8] rounded-2xl lg:rounded-full shadow-md mb-6 lg:mb-8 text-[#3D2B20] border-2 border-[#8B5A2B]/40 w-max max-w-none relative z-20 ${activeTab === 'mobile' ? 'mx-auto' : ''}`}>
                            
                            {(activeBanner.kathaDay || activeBanner.prasang) && (
                              <div className="bg-[#7B241C] text-white flex flex-col items-center justify-center px-6 lg:px-8 py-2.5 rounded-t-2xl lg:rounded-l-full lg:rounded-tr-none lg:rounded-br-none w-full lg:w-auto relative shadow-md shrink-0">
                                {activeBanner.kathaDay && <span className="text-[11px] font-medium opacity-90 whitespace-nowrap">{activeBanner.kathaDay}</span>}
                                {activeBanner.prasang && <span className="text-sm font-bold tracking-wide mt-0.5 whitespace-nowrap">{activeBanner.prasang}</span>}
                              </div>
                            )}

                            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center divide-y lg:divide-y-0 lg:divide-x divide-[#3D2B20]/15 py-1.5 w-full lg:w-auto">
                              {activeBanner.date && (
                                <div className="flex items-center gap-2 px-4 lg:px-5 py-2 w-full lg:w-auto justify-center lg:justify-start shrink-0"><FaCalendarAlt className="text-[#E05A10] text-lg shrink-0" /><span className="text-sm font-bold leading-tight whitespace-nowrap">{activeBanner.date}</span></div>
                              )}
                              {activeBanner.time && (
                                <div className="flex items-center gap-2 px-4 lg:px-5 py-2 w-full lg:w-auto justify-center lg:justify-start shrink-0"><FaClock className="text-[#E05A10] text-lg shrink-0" /><span className="text-sm font-bold leading-tight whitespace-nowrap">{activeBanner.time}</span></div>
                              )}
                              {activeBanner.venue && (
                                <div className="flex items-center gap-2 pl-4 pr-5 lg:pr-8 py-2 w-full lg:w-auto justify-center lg:justify-start shrink-0"><FaMapMarkerAlt className="text-[#E05A10] text-lg shrink-0" /><span className="text-sm font-bold leading-tight whitespace-nowrap">{activeBanner.venue.split(',')[0]}</span></div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className={`flex items-center space-x-3 mb-6 ${activeTab === 'mobile' ? 'justify-center' : 'justify-start'}`}>
                          <span className="h-[1.5px] w-20 bg-[#D4AF37]"></span><span className="text-[#D4AF37] text-xs font-bold">❈</span><span className="h-[1.5px] w-20 bg-[#D4AF37]"></span>
                        </div>

                        {/* Buttons */}
                        <div className={`flex flex-col sm:flex-row items-center gap-4 relative z-30 ${activeTab === 'mobile' ? 'w-full px-4 mt-auto' : 'w-max'}`}>
                          {activeBanner.enableBook !== false && (
                            <div className="w-full sm:w-auto bg-[#E05A10] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded shadow text-center min-w-[140px]">
                              {activeBanner.btn1Text || 'BOOK YOUR KATHA'}
                            </div>
                          )}
                          {activeBanner.enableLive !== false && (
                            <div className="w-full sm:w-auto border border-[#E05A10] text-[#E05A10] font-sans font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded text-center min-w-[140px]">
                              {activeBanner.btn2Text || 'WATCH LIVE KATHA'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Full Height Image */}
                    <div className={`w-full ${activeTab === 'mobile' ? 'h-[40%]' : 'lg:w-1/2 h-full'} relative overflow-hidden`}>
                      {/* Gradient Transition */}
                      <div className={`absolute left-0 top-0 h-full w-24 z-10 pointer-events-none hidden lg:block bg-gradient-to-r to-transparent ${
                        activeBanner?.theme === 'SAFFRON' ? 'from-[#FFF4EB]' : 
                        activeBanner?.theme === 'WARM GOLD' ? 'from-[#FDF9EB]' : 'from-[#FCF9F2]'
                      }`}></div>
                      
                      {/* Custom Overlay */}
                      {activeBanner?.overlayType === 'DARK' && <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>}
                      {activeBanner?.overlayType === 'WARM' && <div className="absolute inset-0 bg-[#8A2900]/20 pointer-events-none z-10 mix-blend-overlay"></div>}
                      {activeBanner?.overlayType === 'GRADIENT' && <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent pointer-events-none z-10"></div>}
                      {(!activeBanner?.overlayType || activeBanner?.overlayType === 'AUTO') && <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-10"></div>}
                      
                      {activeBanner.image ? (
                        <div 
                          ref={imagePreviewRef}
                          className="w-full h-full relative"
                        >
                          <img 
                            src={activeBanner.image}
                            alt={activeBanner?.altText || "Preview"}
                            className="w-full h-full object-cover pointer-events-none transition-all duration-300"
                            style={{ 
                              objectPosition: activeTab === 'mobile' || activeTab === 'tablet' ? (activeBanner.mobileImagePosition || '50% 50%') : (activeBanner.desktopImagePosition || '70% 50%'),
                              transform: `scale(${activeTab === 'mobile' || activeTab === 'tablet' ? (activeBanner.mobileImageZoom || 1) : (activeBanner.desktopImageZoom || 1)})`
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#EAD8C8]/30 flex flex-col items-center justify-center text-[#8B5A2B]/50">
                          <FaImage className="text-4xl mb-2" />
                          <span className="text-sm font-bold uppercase tracking-wider">No Image</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Appearance Tweaks */}
              <div className="mt-6 bg-[#FAF0E6]/30 rounded-xl p-4 border border-[#EAD8C8]/50">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#8A2900] uppercase tracking-wider">Image Overlay Darkness: {activeBanner.overlayDarkness}%</span>
                    <span className="text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider bg-white px-2 py-1 rounded shadow-sm border border-[#EAD8C8]">{getOverlayPreset(activeBanner.overlayDarkness || 0)}</span>
                 </div>
                 <input 
                    type="range" 
                    min="0" max="80" 
                    value={activeBanner.overlayDarkness || 0} 
                    onChange={e => handleUpdate(activeBanner.id, 'overlayDarkness', parseInt(e.target.value))}
                    className="w-full h-2 bg-[#EAD8C8] rounded-lg appearance-none cursor-pointer accent-[#E05A10]"
                 />
                 <p className="text-[10px] font-semibold text-[#8B5A2B] mt-2 opacity-80">Used to darken bright images so the text remains readable.</p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#EAD8C8] flex flex-col items-center justify-center h-[600px] text-center">
               <GiLotus className="text-6xl text-[#EAD8C8] mb-4" />
               <h3 className="text-xl font-bold text-[#8A2900]">No Banner Selected</h3>
               <p className="text-[#8B5A2B] mt-2">Select a banner from the left or create a new one to start editing.</p>
            </div>
          )}
        </div>

      </div>

      <ImageCropDialog 
        banner={activeBanner}
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        onSave={handleCropSave}
      />
    </div>
  )
}
