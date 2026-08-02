import React, { useState, useContext, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaPlayCircle, FaYoutube, FaFacebookF, FaInstagram, FaCamera, 
  FaCalendarAlt, FaHistory, FaBell, FaSearch, FaPalette,
  FaImage, FaAlignLeft, FaAlignCenter, FaCheckCircle, FaSave, FaExternalLinkAlt, FaTrash,
  FaClock, FaMapMarkerAlt, FaChevronDown,
  FaQuoteLeft, FaHeading, FaBookOpen, FaPen, FaLink, FaCalendarDay
} from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../../../context/AppContext'

const EditableDropdown = ({ label, value, onChange, options, icon: Icon, maxLength }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-2 relative" ref={wrapperRef}>
      <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
        <span>{label}</span>
        {maxLength && <span className="text-gray-400 font-normal">({value?.length || 0}/{maxLength})</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />}
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setIsOpen(true)}
          maxLength={maxLength}
          placeholder={label.includes('Day') ? 'e.g. प्रथम दिवस' : 'e.g. 07:00 PM onwards'}
          className={`w-full p-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] pr-10 text-[#3D2B20] shadow-sm transition-all ${Icon ? 'pl-11' : ''}`}
        />
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="absolute right-3 top-3.5 text-[#D4AF37] hover:text-[#E05A10] transition-colors">
          <FaChevronDown size={14} />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 w-full mt-1 bg-white border border-[#D4AF37]/30 rounded-lg shadow-xl max-h-40 overflow-y-auto">
            {options.map((opt, i) => (
              <div key={i} onClick={() => { onChange(opt); setIsOpen(false) }} className="px-4 py-2 text-sm cursor-pointer hover:bg-[#FFFDF5] hover:text-[#E05A10] text-[#3D2B20] transition-colors">
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LiveTab() {
  const { liveSettings, updateLiveSettings, deleteLiveSettings } = useContext(AppContext)
  
  // 1. Hero Banner Management
  const [bgImage, setBgImage] = useState(liveSettings?.bgImage || 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&w=1920&q=80')
  const [guruImage, setGuruImage] = useState(liveSettings?.guruImage || '')
  const [bannerTitle, setBannerTitle] = useState(liveSettings?.bannerTitle || 'LIVE KATHA DARSHAN')
  const [bannerSubtitle, setBannerSubtitle] = useState(liveSettings?.bannerSubtitle || 'पूज्य गुरु जी के श्रीमुखारविंद से अमृतमयी कथा का श्रवण करें।')
  const [topText, setTopText] = useState(liveSettings?.topText || '|| जय श्री राम ||')
  const [primaryBtnText, setPrimaryBtnText] = useState(liveSettings?.primaryBtnText || 'LIVE देखें')
  const [primaryBtnUrl, setPrimaryBtnUrl] = useState(liveSettings?.primaryBtnUrl || '')
  const [secondaryBtnText, setSecondaryBtnText] = useState(liveSettings?.secondaryBtnText || 'YOUTUBE CHANNEL')
  const [secondaryBtnUrl, setSecondaryBtnUrl] = useState(liveSettings?.secondaryBtnUrl || '')
  const [textAlign, setTextAlign] = useState(liveSettings?.textAlign || 'center') // 'left' | 'center'
  const [guruPos, setGuruPos] = useState(liveSettings?.guruPos || 'right') // 'left' | 'right'
  const [overlayOpacity, setOverlayOpacity] = useState(liveSettings?.overlayOpacity !== undefined ? liveSettings.overlayOpacity : 30)
  const [bgBrightness, setBgBrightness] = useState(liveSettings?.bgBrightness !== undefined ? liveSettings.bgBrightness : 100)
  const [heroEnabled, setHeroEnabled] = useState(liveSettings?.heroEnabled !== undefined ? liveSettings.heroEnabled : true)

  // 2. Live Streaming Management
  const [isLive, setIsLive] = useState(liveSettings?.isLive || false)
  const [eventDay, setEventDay] = useState(liveSettings?.eventDay ?? '')
  const [eventTopic, setEventTopic] = useState(liveSettings?.eventTopic ?? '')
  const [eventDate, setEventDate] = useState(liveSettings?.eventDate ?? '')
  const [eventTime, setEventTime] = useState(liveSettings?.eventTime ?? '')
  const [eventLocation, setEventLocation] = useState(liveSettings?.eventLocation ?? '')
  const [marqueeText, setMarqueeText] = useState(liveSettings?.marqueeText ?? 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम')
  const [marqueeEnabled, setMarqueeEnabled] = useState(liveSettings?.marqueeEnabled ?? true)

  const formatHindiDate = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return dateStr;
  }
  
  // Save State
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Save to AppContext
    updateLiveSettings({
      bgImage, guruImage, bannerTitle, bannerSubtitle, topText,
      primaryBtnText, primaryBtnUrl, secondaryBtnText, secondaryBtnUrl,
      textAlign, guruPos, overlayOpacity, bgBrightness, heroEnabled, isLive,
      eventDay, eventTopic, eventDate, eventTime, eventLocation, marqueeText, marqueeEnabled
    })
    alert('लाइव सेटिंग्स सफलतापूर्वक सहेज ली गई हैं! (Live settings saved successfully!)');

    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete today's katha data? This will clear all details for the next day.")){
      setIsDeleting(true);
      const success = await deleteLiveSettings();
      if(success) {
        window.location.reload();
      } else {
        setIsDeleting(false);
        alert("Failed to delete katha data.");
      }
    }
  }

  // --- IMAGE UPLOADS (Base64 for LocalStorage) ---
  const handleBgUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setBgImage(reader.result)
      reader.readAsDataURL(file)
    }
  }
  const handleGuruUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setGuruImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-black text-[#3D2B20] flex items-center">
            <GiLotus className="text-[#D4AF37] mr-3" /> Live Katha Content Management
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Control the frontend appearance, schedule, and streaming parameters in real-time.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-5 py-2.5 rounded-full border shadow-sm font-bold flex items-center space-x-3 transition-colors ${isLive ? 'bg-red-50 text-[#D32F2F] border-red-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#D32F2F] animate-pulse' : 'bg-gray-400'}`}></span>
            <span className="text-[10px] leading-[1.2] uppercase tracking-widest font-black flex flex-col items-start">
              <span>{isLive ? 'LIVE' : 'OFFLINE'}</span>
              {isLive && <span>NOW</span>}
            </span>
          </div>
          <button 
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || isSaving}
            className="bg-red-50 hover:bg-red-100 text-[#D32F2F] border border-red-200 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest hover:shadow-sm transition-all flex items-center space-x-3 disabled:opacity-75"
          >
            <FaTrash className="text-sm" />
            <span className="text-[10px] leading-[1.2] font-black flex flex-col items-start">
              <span>{isDeleting ? 'DELETING...' : 'DELETE'}</span>
              {!isDeleting && <span>KATHA</span>}
            </span>
          </button>
          <button 
            type="button"
            onClick={handleSave}
            disabled={isSaving || isDeleting}
            className="bg-gradient-to-r from-[#D6A035] to-[#E38128] text-white px-8 py-2.5 rounded-xl font-bold uppercase tracking-widest hover:shadow-md hover:opacity-90 transition-all flex items-center space-x-3 disabled:opacity-75 border-none"
          >
            {isSaved ? <FaCheckCircle className="text-sm" /> : <FaSave className="text-sm" />}
            <span className="text-[10px] leading-[1.2] font-black flex flex-col items-start">
              <span>{isSaving ? 'SAVING...' : (isSaved ? 'SAVED' : 'SAVE')}</span>
              {!isSaving && !isSaved && <span>CHANGES</span>}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ========================================== */}
        {/* LEFT COLUMN - SETTINGS FORM                */}
        {/* ========================================== */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 pb-20">
          
          {/* 1. Hero Banner Management */}
          <section className="bg-white rounded-2xl border border-[#EAD8C8] shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#FFFDF5] to-white px-6 py-4 border-b border-[#EAD8C8] flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-[#3D2B20] flex items-center">
                <FaImage className="text-[#D4AF37] mr-3" /> 1. Hero Banner Management
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={heroEnabled} onChange={(e) => setHeroEnabled(e.target.checked)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
              </label>
            </div>
            
            <div className="p-6 sm:p-8 space-y-8">
              {/* Image Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">Background Image (1920x200)</label>
                  <div className="relative group">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-6 bg-[#FAF6F0] hover:bg-[#FFFDF5] cursor-pointer transition-colors h-32 relative overflow-hidden">
                      {bgImage && <img src={bgImage} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-10 transition-opacity" />}
                      <FaCamera className="text-2xl text-[#E67E22] mb-2 relative z-10" />
                      <span className="text-xs font-bold text-[#3D2B20] relative z-10">Upload Background</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleBgUpload} />
                    </label>
                    {bgImage && (
                      <button onClick={() => setBgImage('')} className="absolute top-2 right-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white p-2 rounded-lg transition-colors shadow-sm z-20">
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">Transparent Guru Ji (PNG)</label>
                  <div className="relative group">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-6 bg-[#FAF6F0] hover:bg-[#FFFDF5] cursor-pointer transition-colors h-32 relative overflow-hidden">
                      {guruImage && <img src={guruImage} alt="guru" className="absolute h-full object-contain right-4 opacity-50 group-hover:opacity-20 transition-opacity" />}
                      <FaCamera className="text-2xl text-[#E67E22] mb-2 relative z-10" />
                      <span className="text-xs font-bold text-[#3D2B20] relative z-10">Upload Transparent PNG</span>
                      <input type="file" className="hidden" accept="image/png" onChange={handleGuruUpload} />
                    </label>
                    {guruImage && (
                      <button onClick={() => setGuruImage('')} className="absolute top-2 right-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white p-2 rounded-lg transition-colors shadow-sm z-20">
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                    <span>Top Spiritual Text</span>
                    <span className="text-gray-400 font-normal normal-case">({topText?.length || 0}/30)</span>
                  </label>
                  <div className="relative">
                    <FaQuoteLeft className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="text" maxLength={30} value={topText} onChange={(e)=>setTopText(e.target.value)} className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                    <span>Main Banner Title</span>
                    <span className="text-gray-400 font-normal normal-case">({bannerTitle?.length || 0}/50)</span>
                  </label>
                  <div className="relative">
                    <FaHeading className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="text" maxLength={50} value={bannerTitle} onChange={(e)=>setBannerTitle(e.target.value)} className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider">Banner Subtitle / Description</label>
                  <div className="relative">
                    <FaBookOpen className="absolute top-3.5 left-4 text-[#E05A10] text-sm z-10" />
                    <select value={bannerSubtitle} onChange={(e)=>setBannerSubtitle(e.target.value)} className="w-full pl-11 pr-10 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all appearance-none cursor-pointer">
                      <option value="पूज्य गुरुदेव के श्रीमुखारविंद से अमृतमयी कथा का श्रवण करें।">पूज्य गुरुदेव के श्रीमुखारविंद से अमृतमयी कथा का श्रवण करें।</option>
                      <option value="पूज्य गुरुदेव के श्रीमुखारविंद से प्रसारित दिव्य कथा का लाइव श्रवण करें तथा सनातन धर्म, भक्ति और आध्यात्मिक ज्ञान की अमूल्य अनुभूति प्राप्त करें।">पूज्य गुरुदेव के श्रीमुखारविंद से प्रसारित दिव्य कथा का लाइव श्रवण करें...</option>
                      <option value="गुरुकृपा ही जीवन का परम सौभाग्य है। पूज्य गुरुदेव के श्रीमुखारविंद से अमृतमयी कथा का श्रवण कर अपने जीवन को धर्म, भक्ति और सदाचार से प्रकाशित करें।">गुरुकृपा ही जीवन का परम सौभाग्य है...</option>
                      <option value="पूज्य गुरुदेव के श्रीमुखारविंद से प्रसारित अमृतमयी कथा का दिव्य श्रवण करें एवं अपने जीवन में भक्ति, ज्ञान, शांति और गुरुकृपा का पावन अनुभव प्राप्त करें।">पूज्य गुरुदेव के श्रीमुखारविंद से प्रसारित अमृतमयी कथा का दिव्य श्रवण करें...</option>
                      <option value="जहाँ गुरुवाणी का अमृत बरसता है, वहाँ मन को शांति, आत्मा को प्रकाश और जीवन को नई दिशा प्राप्त होती है। आइए, इस दिव्य कथा से जुड़ें।">जहाँ गुरुवाणी का अमृत बरसता है...</option>
                      <option value="पूज्य गुरुदेव के श्रीमुखारविंद से दिव्य कथा का श्रवण करें और ईश्वर की असीम कृपा का अनुभव करें।">पूज्य गुरुदेव के श्रीमुखारविंद से दिव्य कथा का श्रवण करें...</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-4 h-4 text-[#E05A10]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Marquee (Scrolling Text)</span>
                      <span className="text-gray-400 font-normal normal-case">({marqueeText?.length || 0}/200)</span>
                    </label>
                    <label className="flex items-center cursor-pointer shrink-0">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={marqueeEnabled} onChange={(e) => setMarqueeEnabled(e.target.checked)} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${marqueeEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${marqueeEnabled ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="ml-3 text-sm font-bold text-[#3D2B20]">{marqueeEnabled ? 'ON' : 'OFF'}</span>
                    </label>
                  </div>
                  <div className={`relative transition-opacity duration-300 ${!marqueeEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <FaPen className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="text" maxLength={200} value={marqueeText} onChange={(e)=>setMarqueeText(e.target.value)} className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" placeholder="Enter scrolling text..." />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#FAF6F0] rounded-xl border border-[#EAD8C8]">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#E05A10] border-b border-[#EAD8C8] pb-2 flex justify-between">
                    <span>Primary Button (Red)</span>
                    <span className="text-gray-400 font-normal">({primaryBtnText?.length || 0}/30)</span>
                  </h4>
                  <div className="relative">
                    <FaPen className="absolute top-3.5 left-3 text-[#E05A10] text-xs" />
                    <input type="text" maxLength={30} value={primaryBtnText} onChange={(e)=>setPrimaryBtnText(e.target.value)} placeholder="Button Text" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                  <div className="relative">
                    <FaLink className="absolute top-3.5 left-3 text-[#E05A10] text-xs" />
                    <input type="url" value={primaryBtnUrl} onChange={(e)=>setPrimaryBtnUrl(e.target.value)} placeholder="Button URL" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#E05A10] border-b border-[#EAD8C8] pb-2 flex justify-between">
                    <span>Secondary Button (Dark)</span>
                    <span className="text-gray-400 font-normal">({secondaryBtnText?.length || 0}/30)</span>
                  </h4>
                  <div className="relative">
                    <FaPen className="absolute top-3.5 left-3 text-[#E05A10] text-xs" />
                    <input type="text" maxLength={30} value={secondaryBtnText} onChange={(e)=>setSecondaryBtnText(e.target.value)} placeholder="Button Text" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                  <div className="relative">
                    <FaLink className="absolute top-3.5 left-3 text-[#E05A10] text-xs" />
                    <input type="url" value={secondaryBtnUrl} onChange={(e)=>setSecondaryBtnUrl(e.target.value)} placeholder="Button URL" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex items-center justify-between">
                      <span>Text Alignment</span>
                      <span className="text-[#E05A10]">{textAlign}</span>
                    </label>
                    <div className="flex bg-[#FCF5EB] border border-[#EAD8C8] p-1 rounded-lg">
                      <button type="button" onClick={()=>setTextAlign('left')} className={`flex-1 flex items-center justify-center py-2 text-sm rounded-md transition-all ${textAlign === 'left' ? 'bg-white shadow-sm font-bold text-[#E05A10] border border-[#EAD8C8]' : 'text-[#8a6f27]'}`}><FaAlignLeft className="mr-2"/> Left</button>
                      <button type="button" onClick={()=>setTextAlign('center')} className={`flex-1 flex items-center justify-center py-2 text-sm rounded-md transition-all ${textAlign === 'center' ? 'bg-white shadow-sm font-bold text-[#E05A10] border border-[#EAD8C8]' : 'text-[#8a6f27]'}`}><FaAlignCenter className="mr-2"/> Center</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex items-center justify-between">
                      <span>Guru Ji Position</span>
                      <span className="text-[#E05A10]">{guruPos}</span>
                    </label>
                    <div className="flex bg-[#FCF5EB] border border-[#EAD8C8] p-1 rounded-lg">
                      <button type="button" onClick={()=>setGuruPos('left')} className={`flex-1 flex items-center justify-center py-2 text-sm rounded-md transition-all ${guruPos === 'left' ? 'bg-white shadow-sm font-bold text-[#E05A10] border border-[#EAD8C8]' : 'text-[#8a6f27]'}`}>Left Side</button>
                      <button type="button" onClick={()=>setGuruPos('right')} className={`flex-1 flex items-center justify-center py-2 text-sm rounded-md transition-all ${guruPos === 'right' ? 'bg-white shadow-sm font-bold text-[#E05A10] border border-[#EAD8C8]' : 'text-[#8a6f27]'}`}>Right Side</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                      <span>Overlay Opacity</span>
                      <span className="text-[#E05A10]">{overlayOpacity}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={overlayOpacity} onChange={(e)=>setOverlayOpacity(e.target.value)} className="w-full accent-[#E05A10]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                      <span>Background Brightness</span>
                      <span className="text-[#E05A10]">{bgBrightness}%</span>
                    </label>
                    <input type="range" min="30" max="150" value={bgBrightness} onChange={(e)=>setBgBrightness(e.target.value)} className="w-full accent-[#E05A10]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Live Streaming Management */}
          <section className="bg-white rounded-2xl border border-[#EAD8C8] shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#FFFDF5] to-white px-6 py-4 border-b border-[#EAD8C8]">
              <h3 className="font-serif text-xl font-bold text-[#3D2B20] flex items-center">
                <FaPlayCircle className="text-red-500 mr-3" /> 2. Live Streaming Management
              </h3>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#FFFDF5] to-[#FCF8F2] rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <div>
                  <h4 className="font-bold text-[#E05A10] text-lg">Master Broadcast Switch</h4>
                  <p className="text-xs text-[#8a6f27] mt-1">Turning this ON activates the "Live Now" badge globally.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isLive} onChange={(e) => setIsLive(e.target.checked)} />
                  <div className="w-14 h-7 bg-[#EAD8C8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#E05A10] shadow-inner"></div>
                </label>
              </div>

              {/* Event Details Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <EditableDropdown 
                  label="कथा का दिन (Day)" 
                  value={eventDay} 
                  onChange={setEventDay} 
                  maxLength={20}
                  options={["प्रथम दिवस", "द्वितीय दिवस", "तृतीय दिवस", "चतुर्थ दिवस", "पंचम दिवस", "षष्ठ दिवस", "सप्तम दिवस", "अष्टम दिवस", "नवम दिवस", "दशम दिवस"]}
                  icon={FaCalendarDay}
                />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                    <span>कथा का प्रसंग (Topic)</span>
                    <span className="text-gray-400 font-normal normal-case">({eventTopic?.length || 0}/30)</span>
                  </label>
                  <div className="relative">
                    <FaBookOpen className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="text" maxLength={30} value={eventTopic} onChange={(e) => setEventTopic(e.target.value)} placeholder="e.g. श्री राम जन्म प्रसंग" className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider">तारीख (Date)</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm uppercase transition-all" />
                  </div>
                  <p className="text-[10px] text-[#8a6f27] mt-1">Pick a date from the calendar</p>
                </div>

                <EditableDropdown 
                  label="समय (Time)" 
                  value={eventTime} 
                  onChange={setEventTime} 
                  maxLength={30}
                  options={["10:00 AM onwards", "02:00 PM onwards", "04:00 PM onwards", "07:00 PM onwards"]}
                  icon={FaClock}
                />
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-[#E05A10] uppercase tracking-wider flex justify-between">
                    <span>स्थान (Location)</span>
                    <span className="text-gray-400 font-normal normal-case">({eventLocation?.length || 0}/50)</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute top-3.5 left-4 text-[#E05A10] text-sm" />
                    <input type="text" maxLength={50} value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="e.g. प्रयागराज, उत्तर प्रदेश" className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="relative">
                  <FaYoutube className="absolute top-3.5 left-4 text-red-600 text-lg" />
                  <input type="url" placeholder="YouTube Live Embed URL / Video ID" className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                </div>
                <div className="relative">
                  <FaFacebookF className="absolute top-3.5 left-4 text-blue-600 text-lg" />
                  <input type="url" placeholder="Facebook Live URL" className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                </div>
                <div className="relative">
                  <FaInstagram className="absolute top-3.5 left-4 text-pink-600 text-lg" />
                  <input type="url" placeholder="Instagram Live URL" className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-[#EAD8C8] focus:outline-none focus:border-[#E05A10] focus:ring-2 focus:ring-[#E05A10]/30 bg-[#FCF5EB] text-[#3D2B20] shadow-sm transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* 3, 4, 6, 7 Sections Removed per User Request */}

        </div>


        {/* ========================================== */}
        {/* RIGHT COLUMN - LIVE PREVIEW PANEL          */}
        {/* ========================================== */}
        <div className="w-full lg:w-2/5 xl:w-1/3 space-y-6 sticky top-6">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden shadow-[#D4AF37]/10">
            <div className="bg-[#3D2B20] text-white px-4 py-3 flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center"><FaExternalLinkAlt className="mr-2 text-[#D4AF37]"/> Frontend Live Preview</h4>
              <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-1 rounded">16:9 Scale</span>
            </div>

            {/* Simulated Frontend Window */}
            <div className="bg-[#FCF9F2] w-full aspect-[4/3] flex flex-col relative overflow-hidden">
              
              {/* Fake Navbar */}
              <div className="h-10 bg-white border-b border-[#EAD8C8] px-4 flex justify-between items-center z-50">
                <div className="w-8 h-8 rounded-full bg-[#E67E22]/20 flex items-center justify-center"><GiLotus className="text-[#E67E22]"/></div>
                <div className="flex space-x-2">
                  <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* The Hero Banner Preview Area */}
              {heroEnabled && (
                <div className="relative w-full overflow-hidden" style={{ height: '35%' }}>
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ 
                      backgroundImage: `url(${bgImage})`,
                      filter: `brightness(${bgBrightness}%)`
                    }}
                  ></div>
                  
                  {/* Overlay Opacity */}
                  <div 
                    className="absolute inset-0 bg-black transition-all duration-300"
                    style={{ opacity: overlayOpacity / 100 }}
                  ></div>

                  {/* Guru Ji Image */}
                  {guruImage && (
                    <div className={`absolute bottom-0 h-[85%] z-10 transition-all duration-500 ${guruPos === 'left' ? 'left-4' : 'right-4'}`}>
                      <img src={guruImage} alt="Guru" className="h-full w-auto object-contain object-bottom drop-shadow-2xl" />
                    </div>
                  )}

                  {/* Text Content */}
                  <div className={`absolute inset-0 p-4 z-20 flex flex-col justify-center transition-all duration-500 
                    ${textAlign === 'center' ? 'items-center text-center' : 'items-start text-left'}
                    ${guruImage ? (guruPos === 'left' ? 'pl-[40%]' : 'pr-[40%]') : 'px-8'}
                  `}>
                    <p className="text-[#F9E79F] font-bold text-[8px] sm:text-[10px] tracking-widest drop-shadow-md whitespace-nowrap">{topText}</p>
                    <h1 className="text-white font-serif font-black text-lg sm:text-2xl mt-1 drop-shadow-lg leading-tight uppercase shadow-black">{bannerTitle}</h1>
                    <p className="text-white/90 text-[7px] sm:text-[9px] mt-1 font-medium drop-shadow-md leading-snug line-clamp-2 max-w-[80%]">{bannerSubtitle}</p>
                    
                    {/* Buttons Preview */}
                    <div className={`flex gap-2 mt-3 w-full ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
                      {primaryBtnText && (
                        <div className="bg-gradient-to-r from-[#D35400] to-[#E67E22] text-white text-[7px] sm:text-[8px] px-3 py-1.5 rounded font-bold whitespace-nowrap shadow flex items-center border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5"></span> {primaryBtnText}
                        </div>
                      )}
                      {secondaryBtnText && (
                        <div className="bg-[#1C1C1C] text-[#F39C12] border border-[#F39C12]/50 text-[7px] sm:text-[8px] px-3 py-1.5 rounded font-bold whitespace-nowrap shadow flex items-center">
                          <FaYoutube className="mr-1" /> {secondaryBtnText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Fake Content Below Banner */}
              <div className="flex-grow bg-gradient-to-b from-gray-50 to-white p-4 relative flex flex-col items-center">
                {isLive && (
                  <div className="absolute top-2 right-4 bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse flex items-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1"></span> LIVE NOW
                  </div>
                )}
                <div className="w-[85%] bg-white aspect-video mt-4 rounded-lg shadow-xl border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/5"></div>
                  <FaPlayCircle className="text-4xl text-gray-300 group-hover:text-red-500 transition-colors drop-shadow-md z-10" />
                </div>
                <div className="w-[85%] mt-3 bg-[#FCF8F2] border border-[#EAD8C8] rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="flex items-center rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#6B1B10] text-white text-[8px] px-2 py-1 font-bold">{eventDay}</div>
                    <div className="bg-white text-[#6B1B10] text-[9px] px-3 py-1 font-black border-y border-r border-[#6B1B10]">{eventTopic}</div>
                  </div>
                  <div className="flex text-[6px] text-[#3D2B20] font-bold mt-2 gap-2">
                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-[#6B1B10]"/> {formatHindiDate(eventDate)}</span>
                    <span className="flex items-center text-gray-300">|</span>
                    <span className="flex items-center"><FaClock className="mr-1 text-[#6B1B10]"/> {eventTime}</span>
                    <span className="flex items-center text-gray-300">|</span>
                    <span className="flex items-center"><FaMapMarkerAlt className="mr-1 text-[#6B1B10]"/> {eventLocation}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">Status: <span className="font-bold text-green-600">Syncing to preview...</span></span>
              <GiLotus className="text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
