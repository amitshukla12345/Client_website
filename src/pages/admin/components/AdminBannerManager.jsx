import React, { useState, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUpload, FaTrash, FaCopy, FaSave, FaEye, FaChevronDown, FaChevronUp, FaPlus,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaInfoCircle, FaImage, FaToggleOn, FaToggleOff
} from 'react-icons/fa'
import { AppContext } from '../../../context/AppContext'

// Switch Component
const ToggleSwitch = ({ enabled, onChange, label }) => (
  <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <button 
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-saffron' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

// Custom Combobox for Title & Subtitle
const CustomCombobox = ({ value, onChange, placeholder, options = [], maxLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
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
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all bg-[#FAF6F0] pr-10"
          placeholder={placeholder}
        />
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-saffron transition-colors"
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
            className="absolute z-50 w-full mt-1 bg-white border border-gold/30 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
          >
            <ul className="py-1">
              {options.map((opt, idx) => (
                <li 
                  key={idx}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-saffron/10 hover:text-[#b45b23] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
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

// Common Dropdown Options
const KATHA_OPTIONS = [
  'श्रीमद् भागवत कथा',
  'श्री राम कथा',
  'श्री शिव महापुराण कथा',
  'श्री देवी भागवत कथा',
  'नानी बाई रो मायरो',
  'श्री भक्तमाल कथा',
  'श्री हनुमान कथा',
  'गोपी गीत',
  'गुरु दीक्षा'
];

const SUBTITLE_OPTIONS = [
  'ज्ञान की अमृत वर्षा',
  'जीवन का सही मार्ग',
  'आत्मिक शांति का मार्ग',
  'भक्ति और ज्ञान का संगम',
  'प्रभु कृपा और आशीर्वाद',
  'धर्म और अध्यात्म',
  'मोक्ष दायिनी कथा',
  'कल्याणकारी प्रवचन'
];

const KATHA_DAY_OPTIONS = [
  'Day 1',
  'Day 2',
  'Day 3',
  'Day 4',
  'Day 5',
  'Day 6',
  'Day 7',
  'Day 8',
  'Day 9',
  'Day 10'
];

const TIME_OPTIONS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM'
];

const DATE_OPTIONS = [
  'To be announced',
  'Upcoming Month'
];

// Segmented Control (Alignments)
const SegmentedControl = ({ options, value, onChange, label }) => (
  <div className="mb-6">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="flex bg-gray-100 p-1 rounded-lg">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            value === opt.value ? 'bg-white text-saffron shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt.icon && <opt.icon className="text-sm" />}
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default function AdminBannerManager() {
  const { banners, updateBanners } = useContext(AppContext)
  
  // Local state for editing before saving globally
  const [localBanners, setLocalBanners] = useState([{
    id: Date.now(),
    image: '',
    title: 'आध्यात्मिक यात्रा',
    subtitle: 'जीवन का सही मार्ग',
    kathaDay: 'Day 1',
    prasang: 'श्री राम जन्म',
    date: '2026-08-15',
    time: '4:00 PM - 7:00 PM',
    venue: 'New Delhi, India',
    btn1Text: 'Book Katha',
    btn1Url: '/contact',
    btn2Text: 'Watch Live',
    btn2Url: '/live',
    textPosition: 'left',
    imageFocus: 'center',
    overlayDarkness: 40,
    enableBook: true,
    enableLive: true,
    enabled: true,
    isExpanded: true // UI only state
  }])

  // Sync with global state once loaded
  React.useEffect(() => {
    if (banners && banners.length > 0) {
      setLocalBanners(banners.map((b, i) => ({ ...b, isExpanded: i === 0 })));
    }
  }, [banners]);

  const fileInputRefs = useRef({})

  const handleUpdate = (id, field, value) => {
    setLocalBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Image exceeds 500KB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate(id, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const toggleExpand = (id) => {
    setLocalBanners(prev => prev.map(b => b.id === id ? { ...b, isExpanded: !b.isExpanded } : b))
  }

  const addNewBanner = () => {
    setLocalBanners(prev => [
      {
        id: Date.now(),
        image: '',
        title: 'New Banner',
        subtitle: '',
        textPosition: 'left',
        imageFocus: 'center',
        overlayDarkness: 40,
        enableBook: true,
        enableLive: true,
        enabled: true,
        isExpanded: true
      },
      ...prev.map(b => ({ ...b, isExpanded: false })) // Collapse others
    ])
  }

  const duplicateBanner = (banner) => {
    setLocalBanners(prev => [
      { ...banner, id: Date.now(), title: banner.title + ' (Copy)' },
      ...prev
    ])
  }

  const deleteBanner = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setLocalBanners(prev => prev.filter(b => b.id !== id))
    }
  }

  const saveAllBanners = () => {
    // Exclude isExpanded from saved state
    const cleanBanners = localBanners.map(({ isExpanded, ...rest }) => rest);
    if(updateBanners) updateBanners(cleanBanners);
    alert("बैनर सफलतापूर्वक सेव कर लिए गए हैं! (Banners Saved Successfully!)");
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Home Banner Management</h1>
          <p className="text-gray-500 mt-1 text-sm">Design and manage your homepage hero sliders.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNewBanner} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-all">
            <FaPlus className="text-saffron" /> Add Banner
          </button>
          <button onClick={saveAllBanners} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-saffron to-[#e67e22] text-white font-medium rounded-lg shadow-lg shadow-saffron/30 hover:opacity-90 transition-all">
            <FaSave /> Save Changes
          </button>
        </div>
      </div>

      {/* Banner Cards List */}
      <div className="space-y-6 pb-20">
        <AnimatePresence>
          {localBanners.map((banner, index) => (
            <motion.div 
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header / Collapsed View */}
              <div 
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50"
                onClick={() => toggleExpand(banner.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-saffron/10 text-saffron font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    {banner.image ? (
                      <img src={banner.image} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <FaImage className="w-full h-full p-2 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{banner.title || 'Untitled Banner'}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${banner.enabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-xs text-gray-500">{banner.enabled ? 'Active' : 'Draft'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={(e) => { e.stopPropagation(); duplicateBanner(banner); }} className="p-2 text-gray-400 hover:text-saffron transition-colors" title="Duplicate">
                    <FaCopy />
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); deleteBanner(banner.id); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                    <FaTrash />
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-2"></div>
                  <button className="p-2 text-gray-500">
                    {banner.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>

              {/* Expanded Body */}
              <AnimatePresence>
                {banner.isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 lg:p-8 bg-gray-50/50">
                      
                      {/* --- Live Preview Section --- */}
                      <div className="mb-10">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <FaEye className="text-saffron" /> Live Preview (1920x900)
                        </h4>
                        
                        <div className="w-full aspect-[21/9] bg-gray-200 rounded-xl overflow-hidden shadow-inner relative group border-4 border-white ring-1 ring-gray-100">
                          {banner.image ? (
                            <img 
                              src={banner.image} 
                              alt="Live Preview" 
                              className={`w-full h-full object-cover transition-all duration-500 ${banner.imageFocus === 'left' ? 'object-left' : banner.imageFocus === 'right' ? 'object-right' : 'object-center'}`} 
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <FaImage className="text-6xl mb-2 opacity-50" />
                              <p className="text-sm font-medium">No Image Uploaded</p>
                            </div>
                          )}
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: banner.overlayDarkness / 100 }}></div>

                          {/* Preview Text Content */}
                          <div className={`absolute inset-0 p-8 sm:p-12 md:p-20 flex flex-col justify-center pointer-events-none ${banner.textPosition === 'center' ? 'items-center text-center' : banner.textPosition === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                            {banner.kathaDay && <div className="text-saffron font-bold tracking-widest uppercase text-[10px] md:text-sm mb-3 drop-shadow-md">{banner.kathaDay}</div>}
                            {banner.title && <h2 className="text-white font-serif font-bold text-3xl md:text-5xl lg:text-7xl mb-2 md:mb-4 drop-shadow-lg max-w-4xl">{banner.title}</h2>}
                            {banner.subtitle && <p className="text-white/90 font-medium text-sm md:text-xl lg:text-2xl mb-6 max-w-2xl drop-shadow-md">{banner.subtitle}</p>}
                            
                            {(banner.date || banner.venue) && (
                              <div className="flex flex-wrap gap-4 text-white/80 text-xs md:text-sm mb-8">
                                {banner.date && <span>📅 {banner.date}</span>}
                                {banner.venue && <span>📍 {banner.venue}</span>}
                              </div>
                            )}

                            <div className="flex gap-4">
                              {banner.enableBook && <div className="px-6 py-2 md:py-3 bg-saffron text-white text-xs md:text-sm font-bold rounded-full shadow-lg">{banner.btn1Text || 'Button 1'}</div>}
                              {banner.enableLive && <div className="px-6 py-2 md:py-3 bg-white/20 backdrop-blur-md text-white border border-white/50 text-xs md:text-sm font-bold rounded-full shadow-lg">{banner.btn2Text || 'Button 2'}</div>}
                            </div>
                          </div>
                          
                          {/* Upload Overlay Button (visible on hover) */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => fileInputRefs.current[banner.id].click()}
                              className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
                            >
                              <FaUpload /> Change Background Image
                            </button>
                            <input 
                              type="file" 
                              ref={el => fileInputRefs.current[banner.id] = el}
                              onChange={(e) => handleImageUpload(banner.id, e)} 
                              accept="image/jpeg, image/png, image/webp" 
                              className="hidden" 
                            />
                          </div>
                        </div>

                        {/* Image Guidelines */}
                        <div className="mt-4 flex gap-2 p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-blue-800">
                          <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Image Guidelines:</p>
                            <ul className="list-disc pl-4 space-y-0.5 opacity-80 text-xs">
                              <li>Recommended Size: 1920 × 900 px (Landscape)</li>
                              <li>Max Size: 500KB (Accepts: JPG, PNG, WEBP)</li>
                              <li>Guru Ji should be placed on the RIGHT side.</li>
                              <li>Keep LEFT side empty for dynamic text overlay.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-px bg-gray-200 mb-10"></div>

                      {/* --- Edit Form Grid --- */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Column 1: Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Banner Content</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Banner Title</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.title || '').length}/255</span>
                              </label>
                              <CustomCombobox 
                                value={banner.title || ''} 
                                onChange={val => handleUpdate(banner.id, 'title', val)}
                                placeholder="Select or type custom title..."
                                options={KATHA_OPTIONS}
                                maxLength={255}
                              />
                            </div>
                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Subtitle</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.subtitle || '').length}/255</span>
                              </label>
                              <CustomCombobox 
                                value={banner.subtitle || ''} 
                                onChange={val => handleUpdate(banner.id, 'subtitle', val)}
                                placeholder="e.g. जीवन का सही मार्ग"
                                options={SUBTITLE_OPTIONS}
                                maxLength={255}
                              />
                            </div>
                            
                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Current Katha Day (Optional)</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.kathaDay || '').length}/50</span>
                              </label>
                              <CustomCombobox 
                                value={banner.kathaDay || ''} 
                                onChange={val => handleUpdate(banner.id, 'kathaDay', val)}
                                placeholder="e.g. Day 1"
                                options={KATHA_DAY_OPTIONS}
                                maxLength={50}
                              />
                            </div>
                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Today's Prasang (Optional)</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.prasang || '').length}/255</span>
                              </label>
                              <input type="text" maxLength="255" value={banner.prasang || ''} onChange={e => handleUpdate(banner.id, 'prasang', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all bg-[#FAF6F0]" placeholder="e.g. श्री राम जन्म" />
                            </div>

                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Event Date</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.date || '').length}/100</span>
                              </label>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <CustomCombobox 
                                    value={banner.date || ''} 
                                    onChange={val => handleUpdate(banner.id, 'date', val)}
                                    placeholder="e.g. 15 August 2026"
                                    options={DATE_OPTIONS}
                                    maxLength={100}
                                  />
                                </div>
                                <div className="relative group">
                                  <input 
                                    type="date" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        const d = new Date(e.target.value);
                                        const eng = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                                        handleUpdate(banner.id, 'date', eng);
                                      }
                                    }}
                                  />
                                  <button type="button" className="h-full px-3 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-bold text-xs" title="Select Date (English)">
                                    EN 📅
                                  </button>
                                </div>
                                <div className="relative group">
                                  <input 
                                    type="date" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        const d = new Date(e.target.value);
                                        const hi = d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                                        handleUpdate(banner.id, 'date', hi);
                                      }
                                    }}
                                  />
                                  <button type="button" className="h-full px-3 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-bold text-xs" title="Select Date (Hindi)">
                                    HI 📅
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Event Time</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.time || '').length}/100</span>
                              </label>
                              <CustomCombobox 
                                value={banner.time || ''} 
                                onChange={val => handleUpdate(banner.id, 'time', val)}
                                placeholder="e.g. 4:00 PM"
                                options={TIME_OPTIONS}
                                maxLength={100}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-1.5">
                                <span>Venue / Location</span>
                                <span className="text-xs font-normal text-gray-400">{(banner.venue || '').length}/255</span>
                              </label>
                              <input type="text" maxLength="255" value={banner.venue || ''} onChange={e => handleUpdate(banner.id, 'venue', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all bg-[#FAF6F0]" placeholder="e.g. Haridwar, Uttarakhand" />
                            </div>
                          </div>

                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 pt-4">Buttons Configuration</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">Primary Button</span>
                                <span className={`text-xs px-2 py-1 rounded-md ${banner.enableBook ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{banner.enableBook ? 'Enabled' : 'Disabled'}</span>
                              </div>
                              <input type="text" value={banner.btn1Text || ''} onChange={e => handleUpdate(banner.id, 'btn1Text', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-[#FAF6F0]" placeholder="Button Text (e.g. Book Katha)" />
                              <input type="text" value={banner.btn1Url || ''} onChange={e => handleUpdate(banner.id, 'btn1Url', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-[#FAF6F0]" placeholder="URL (e.g. /book)" />
                            </div>
                            <div className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                               <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">Secondary Button</span>
                                <span className={`text-xs px-2 py-1 rounded-md ${banner.enableLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{banner.enableLive ? 'Enabled' : 'Disabled'}</span>
                              </div>
                              <input type="text" value={banner.btn2Text || ''} onChange={e => handleUpdate(banner.id, 'btn2Text', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-[#FAF6F0]" placeholder="Button Text (e.g. Watch Live)" />
                              <input type="text" value={banner.btn2Url || ''} onChange={e => handleUpdate(banner.id, 'btn2Url', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-[#FAF6F0]" placeholder="URL (e.g. /live)" />
                            </div>
                          </div>

                        </div>

                        {/* Column 2: Settings & Styling */}
                        <div className="space-y-6">
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Appearance & Settings</h4>
                          
                          <SegmentedControl 
                            label="Text Position"
                            value={banner.textPosition}
                            onChange={(val) => handleUpdate(banner.id, 'textPosition', val)}
                            options={[
                              { label: 'Left', value: 'left', icon: FaAlignLeft },
                              { label: 'Center', value: 'center', icon: FaAlignCenter },
                              { label: 'Right', value: 'right', icon: FaAlignRight },
                            ]}
                          />

                          <SegmentedControl 
                            label="Image Focus"
                            value={banner.imageFocus}
                            onChange={(val) => handleUpdate(banner.id, 'imageFocus', val)}
                            options={[
                              { label: 'Left', value: 'left' },
                              { label: 'Center', value: 'center' },
                              { label: 'Right', value: 'right' },
                            ]}
                          />

                          <div className="mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <label className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                              Overlay Darkness <span>{banner.overlayDarkness}%</span>
                            </label>
                            <input 
                              type="range" 
                              min="0" max="100" 
                              value={banner.overlayDarkness || 0} 
                              onChange={(e) => handleUpdate(banner.id, 'overlayDarkness', e.target.value)}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                            />
                            <p className="text-xs text-gray-400 mt-2">Increases readability of text over bright images.</p>
                          </div>

                          <div className="space-y-3">
                            <ToggleSwitch label="Enable Primary Button" enabled={banner.enableBook} onChange={(val) => handleUpdate(banner.id, 'enableBook', val)} />
                            <ToggleSwitch label="Enable Secondary Button" enabled={banner.enableLive} onChange={(val) => handleUpdate(banner.id, 'enableLive', val)} />
                            <ToggleSwitch label="Publish Banner (Visibility)" enabled={banner.enabled} onChange={(val) => handleUpdate(banner.id, 'enabled', val)} />
                          </div>

                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
