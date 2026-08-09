import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaStar, FaQuoteLeft, FaPhoneAlt, FaRegHandshake, FaMapMarkerAlt, FaCheck, FaArrowRight, FaClock, FaOm, FaPlaceOfWorship, FaBookOpen, FaPrayingHands, FaGlobeAmericas, FaYoutube, FaFacebookF, FaChevronLeft, FaChevronRight, FaImages, FaVideo, FaPlayCircle, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { GiLotus, GiGreekTemple, GiSun, GiMusicalNotes, GiFlame, GiBookCover, GiTrident, GiPrayerBeads, GiOpenBook, GiFireBowl } from 'react-icons/gi'

import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'
import YajmanIntro from '../components/YajmanIntro'
import aboutHeroImg from '../assets/images/about_guru.png'

export default function Home() {
  const { banners, about, events, galleryPhotos, galleryVideos, organizers, contacts } = useContext(AppContext)
  const { t } = useTranslation()
  const [activeGalleryTab, setActiveGalleryTab] = useState('Photos')
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [isHeroHovered, setIsHeroHovered] = useState(false)
  const [activeYajmanIdx, setActiveYajmanIdx] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Helper to ensure button text is valid and visible
  const getValidBtnText = (text1, text2, fallbackKey) => {
    if (text1 && text1.trim().length > 0) return text1;
    if (text2 && text2.trim().length > 0) return text2;
    return t(fallbackKey);
  };

  const activeBanners = banners ? banners.filter(b => b.status === 'Published' || (b.status === undefined && b.enabled !== false)) : [];

  const nextHeroSlide = () => {
    if (activeBanners && activeBanners.length > 0) {
      setCurrentHeroSlide((prev) => (prev + 1) % activeBanners.length)
    }
  }

  const prevHeroSlide = () => {
    if (activeBanners && activeBanners.length > 0) {
      setCurrentHeroSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)
    }
  }

  // Auto-slide effect for the Hero Banner
  React.useEffect(() => {
    if (activeBanners && activeBanners.length > 1 && !isHeroHovered) {
      const slideInterval = setInterval(() => {
        setCurrentHeroSlide((prev) => (prev + 1) % activeBanners.length)
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(slideInterval);
    }
  }, [activeBanners?.length, isHeroHovered]);

  // 4. Services Data
  const services = [
    { 
      title: 'श्रीमद भागवत कथा', 
      desc: 'भगवान श्रीकृष्ण की दिव्य कथा का श्रवण और चिंतन।',
      icon: GiOpenBook, 
      img: 'https://images.unsplash.com/photo-1582500057088-750da52b2dfa?w=600&q=80&fit=crop'
    },
    { 
      title: 'श्री राम कथा', 
      desc: 'मर्यादा पुरुषोत्तम श्रीराम के चरित्र का रसपान।',
      icon: GiPrayerBeads, 
      img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=600&q=80&fit=crop'
    },
    { 
      title: 'शिव महापुराण', 
      desc: 'महादेव की अनंत महिमा और शिव तत्व का ज्ञान।',
      icon: GiTrident, 
      img: 'https://images.unsplash.com/photo-1621614008127-ec561d3da556?w=600&q=80&fit=crop'
    },
    { 
      title: 'देवी भागवत कथा', 
      desc: 'आदिशक्ति जगदम्बा की कथा और महिमा का गुणगान।',
      icon: GiLotus, 
      img: 'https://images.unsplash.com/photo-1604005934440-410a694a11f2?w=600&q=80&fit=crop'
    },
    { 
      title: 'सुंदरकांड पाठ', 
      desc: 'श्री हनुमान जी की कृपा और सुंदरकांड का पाठ।',
      icon: FaBookOpen, 
      img: 'https://images.unsplash.com/photo-1603714228681-b399854b8f75?w=600&q=80&fit=crop'
    },
    { 
      title: 'अन्य धार्मिक सेवाएँ', 
      desc: 'पूजन, अनुष्ठान, जागरण एवं अन्य धार्मिक कार्यक्रम।',
      icon: GiFireBowl, 
      img: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=80&fit=crop'
    }
  ]

  // 7. Testimonials Data
  const testimonials = [
    {
      quote: 'गुरु जी की मधुर वाणी और ज्ञान से जीवन में सकारात्मक परिवर्तन आया है। कथा सुनकर मन को शांति और नई ऊर्जा मिली।',
      author: 'राजेश शर्मा',
      location: 'प्रयागराज, उत्तर प्रदेश',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
    },
    {
      quote: 'भागवत कथा ने मुझे ईश्वर के और करीब ला दिया। गुरु जी का आशीर्वाद हमेशा बना रहे, यही प्रार्थना है।',
      author: 'सीमा तिवारी',
      location: 'वाराणसी, उत्तर प्रदेश',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop'
    },
    {
      quote: 'कथा का प्रत्येक क्षण बहुत ही दिव्य और प्रेरणादायक होता है। जीवन में भक्ति और सेवा की भावना जागृत हुई।',
      author: 'अंकित मिश्रा',
      location: 'लखनऊ, उत्तर प्रदेश',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    }
  ]
  const currentBanner = activeBanners.length > 0 ? activeBanners[currentHeroSlide % activeBanners.length] : {};

  return (
    <div className="bg-[#FCF9F2] text-[#3D2B20] font-sans selection:bg-[#E05A10] selection:text-white overflow-x-hidden">

      {/* 1. HERO CAROUSEL SECTION */}
      <section 
        className="relative w-full bg-[#FCF9F2] border-b border-[#EAD8C8] overflow-hidden flex justify-center"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        onTouchStart={() => setIsHeroHovered(true)}
        onTouchEnd={() => setIsHeroHovered(false)}
      >
        {/* Banner Grid Container */}
        <div className="w-full max-w-[1920px] relative min-h-[500px] lg:h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left Column: Text content */}
              <div className={`lg:col-span-6 flex flex-col justify-start px-8 sm:px-12 lg:pl-8 lg:pr-12 xl:pl-10 xl:pr-16 pt-36 sm:pt-40 lg:pt-[140px] pb-8 text-center lg:text-left relative z-30 ${
                currentBanner?.theme === 'SAFFRON' ? 'bg-[#FFF4EB]' : 
                currentBanner?.theme === 'WARM GOLD' ? 'bg-[#FDF9EB]' : 'bg-[#FCF9F2]'
              }`}>
                
                <h2
                  className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D2B20] mb-3 leading-normal"
                >
                  {currentBanner?.title || 'श्रीमद् भागवत कथा'}
                </h2>

                {currentBanner?.subtitle && (
                  <p className="font-serif text-base xs:text-lg sm:text-xl lg:text-2xl text-[#3D2B20]/80 font-semibold leading-relaxed mb-4">
                    {currentBanner.subtitle}
                  </p>
                )}

                {/* Dynamic Metadata Pill / Ticket Bar */}
                {(currentBanner?.kathaDay || currentBanner?.prasang || currentBanner?.date || currentBanner?.time || currentBanner?.venue) && (
                  <div className="inline-flex flex-col lg:flex-row items-center lg:items-stretch bg-[#EAD8C8] rounded-2xl lg:rounded-full shadow-md mb-6 lg:mb-8 mx-auto lg:mx-0 text-[#3D2B20] border border-[#8B5A2B]/40 w-full sm:w-auto lg:w-max max-w-full relative z-20 overflow-hidden">
                    
                    {/* Dark Red Block for Day & Prasang */}
                    {(currentBanner?.kathaDay || currentBanner?.prasang) && (
                      <div className="bg-[#7B241C] text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-2.5 rounded-t-2xl lg:rounded-l-full lg:rounded-tr-none lg:rounded-br-none w-full lg:w-auto relative shadow-md shrink-0">
                        <div className="absolute left-3 text-[#D4AF37] opacity-60 text-sm font-light hidden lg:block">||</div>
                        {currentBanner?.kathaDay && <span className="text-[11px] font-medium opacity-90 text-center whitespace-normal">{currentBanner.kathaDay}</span>}
                        {currentBanner?.prasang && <span className="text-base font-bold tracking-wide mt-0.5 text-center whitespace-normal break-words max-w-full">{currentBanner.prasang}</span>}
                        <div className="absolute right-3 text-[#D4AF37] opacity-60 text-sm font-light hidden lg:block">||</div>
                      </div>
                    )}

                    {/* Meta Details Segment */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center justify-center divide-y lg:divide-y-0 lg:divide-x divide-[#3D2B20]/15 py-1.5 w-full lg:w-auto">
                      
                      {/* Date Block */}
                      {currentBanner?.date && (
                        <div className="flex items-center gap-2 px-4 lg:px-5 py-2.5 w-full lg:w-auto justify-center lg:justify-start">
                          <FaCalendarAlt className="text-[#E05A10] text-lg shrink-0" />
                          <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-sm font-bold text-[#3D2B20] leading-tight truncate">{currentBanner.date}</span>
                          </div>
                        </div>
                      )}

                      {/* Time Block */}
                      {currentBanner?.time && (
                        <div className="flex items-center gap-2 px-4 lg:px-5 py-2.5 w-full lg:w-auto justify-center lg:justify-start">
                          <FaClock className="text-[#E05A10] text-lg shrink-0" />
                          <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-sm font-bold text-[#3D2B20] leading-tight truncate">{currentBanner.time}</span>
                            <span className="text-[10px] font-medium text-[#8B6E59] leading-tight">onwards</span>
                          </div>
                        </div>
                      )}

                      {/* Location Block */}
                      {currentBanner?.venue && (
                        <div className="flex items-center gap-2 px-4 lg:px-5 py-2.5 w-full lg:w-auto justify-center lg:justify-start">
                          <FaMapMarkerAlt className="text-[#E05A10] text-lg shrink-0" />
                          <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-sm font-bold text-[#3D2B20] leading-tight truncate">{currentBanner.venue.split(',')[0]}</span>
                            {currentBanner.venue.includes(',') && (
                              <span className="text-[10px] font-medium text-[#8B6E59] leading-tight truncate">
                                {currentBanner.venue.split(',').slice(1).join(',').trim()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                )}

                {/* Horizontal Ornament Separator */}
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                  <span className="h-[1.5px] w-20 bg-[#D4AF37]"></span>
                  <span className="text-[#D4AF37] text-xs font-bold">❈</span>
                  <span className="h-[1.5px] w-20 bg-[#D4AF37]"></span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-[280px] sm:max-w-none mx-auto lg:mx-0 relative z-30">
                  {currentBanner?.enableBook !== false && (
                    <Link
                      to={(currentBanner?.btn1Url || '').trim() || "/contact"}
                      className="w-full sm:w-auto bg-[#E05A10] hover:bg-[#c94d0d] text-white font-sans font-bold text-xs uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded shadow transition-all duration-300 text-center flex items-center justify-center min-w-[140px]"
                    >
                      {getValidBtnText(currentBanner?.btn1Text, currentBanner?.btnText1, 'home.bookButton')}
                    </Link>
                  )}
                  
                  {currentBanner?.enableLive !== false && (
                    <Link
                      to={(currentBanner?.btn2Url || '').trim() || "/live"}
                      className="w-full sm:w-auto border border-[#E05A10]/40 hover:border-[#E05A10] text-[#E05A10] font-sans font-bold text-xs uppercase tracking-wider px-6 sm:px-8 py-3 rounded hover:bg-[#E05A10]/5 transition-all duration-300 text-center flex items-center justify-center min-w-[140px]"
                    >
                      {getValidBtnText(currentBanner?.btn2Text, currentBanner?.btnText2, 'home.liveButton')}
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Column: Full-height Guru Ji Image */}
              <div className="lg:col-span-6 relative h-[250px] xs:h-[300px] lg:h-full w-full overflow-hidden">
                {/* Soft Linear Gradient Blend to remove straight partition */}
                <div className={`absolute left-0 top-0 h-full w-32 lg:w-48 z-10 pointer-events-none hidden lg:block bg-gradient-to-r to-transparent ${
                  currentBanner?.theme === 'SAFFRON' ? 'from-[#FFF4EB]' : 
                  currentBanner?.theme === 'WARM GOLD' ? 'from-[#FDF9EB]' : 'from-[#FCF9F2]'
                }`}></div>
                
                {/* Custom Overlay */}
                {currentBanner?.overlayType === 'DARK' && <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>}
                {currentBanner?.overlayType === 'WARM' && <div className="absolute inset-0 bg-[#8A2900]/20 pointer-events-none z-10 mix-blend-overlay"></div>}
                {currentBanner?.overlayType === 'GRADIENT' && <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent pointer-events-none z-10"></div>}
                {(!currentBanner?.overlayType || currentBanner?.overlayType === 'AUTO') && <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-10"></div>}
                
                <img
                  src={currentBanner?.image}
                  alt={currentBanner?.altText || "Pujya Guru Ji Maharaj"}
                  className="w-full h-full object-cover pointer-events-none"
                  style={{
                     objectPosition: window.innerWidth < 768 
                         ? (currentBanner?.mobileImagePosition || '50% 50%') 
                         : (currentBanner?.desktopImagePosition || '70% 50%'),
                     transform: `scale(${window.innerWidth < 768 
                         ? (currentBanner?.mobileImageZoom || 1) 
                         : (currentBanner?.desktopImageZoom || 1)})`
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevHeroSlide}
            className="absolute left-4 lg:left-8 top-auto bottom-[150px] translate-y-1/2 lg:translate-y-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 bg-white hover:bg-[#E05A10] text-[#E05A10] hover:text-white w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center shadow-lg border border-[#EAD8C8] z-20 transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={nextHeroSlide}
            className="absolute right-4 lg:right-8 top-auto bottom-[150px] translate-y-1/2 lg:translate-y-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 bg-white hover:bg-[#E05A10] text-[#E05A10] hover:text-white w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center shadow-lg border border-[#EAD8C8] z-20 transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <FaChevronRight className="text-xs" />
          </button>

          {/* Dots Indicator Overlay on Left Text Area */}
          <div className="absolute bottom-6 left-1/2 lg:left-24 -translate-x-1/2 lg:translate-x-0 flex items-center space-x-2.5 z-20">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentHeroSlide === idx ? 'bg-[#E05A10] w-6' : 'bg-[#EAD8C8]'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT MARQUEE SECTION */}
      {contacts?.announcement && contacts?.isAnnouncementActive !== false && (
        <section className="bg-[#E05A10] text-white py-2.5 shadow-inner border-y border-[#c94d0d] relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="flex items-center gap-2 pr-4 border-r border-white/30 whitespace-nowrap">
              <FaOm className="text-lg text-[#FDE047] animate-pulse" />
              <span className="font-bold text-xs sm:text-sm tracking-widest uppercase text-[#FEF3C7]">{t('home.notice') || 'सूचना'}</span>
            </div>
            <div className="flex-1 overflow-hidden ml-4 flex items-center">
              {/* Using native marquee for simple smooth scrolling without complex CSS configs */}
              <marquee behavior="scroll" direction="left" scrollamount="6" className="text-sm sm:text-base font-medium font-serif tracking-wide pt-1">
                {contacts.announcement}
              </marquee>
            </div>
          </div>
        </section>
      )}

      {/* 3. DYNAMIC KATHA YAJMAN SECTION */}
      <YajmanIntro />

      {/* 4. KATHA SERVICES SECTION */}
      {/* 4. KATHA SERVICES SECTION */}
      <section className="group relative py-24 bg-[#FFF9F0] overflow-hidden border-y border-[#EAD8C8]/40">
        
        {/* Soft Center Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#FFF9F0]/0 to-transparent transition-opacity duration-1000 group-hover:opacity-60"></div>
        
        {/* Decorative Mandala Corners - 4 Sides with Hover Animation */}
        {/* Top Left */}
        <svg className="absolute top-0 left-0 w-96 h-96 text-[#D4AF37] opacity-10 pointer-events-none -translate-x-1/3 -translate-y-1/3 transition-all duration-[1500ms] ease-in-out group-hover:opacity-25 group-hover:rotate-45 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        {/* Top Right */}
        <svg className="absolute top-0 right-0 w-96 h-96 text-[#D4AF37] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3 transition-all duration-[1500ms] ease-in-out group-hover:opacity-25 group-hover:-rotate-45 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        {/* Bottom Left */}
        <svg className="absolute bottom-0 left-0 w-96 h-96 text-[#D4AF37] opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/3 transition-all duration-[1500ms] ease-in-out group-hover:opacity-25 group-hover:-rotate-45 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        {/* Bottom Right */}
        <svg className="absolute bottom-0 right-0 w-96 h-96 text-[#D4AF37] opacity-10 pointer-events-none translate-x-1/3 translate-y-1/3 transition-all duration-[1500ms] ease-in-out group-hover:opacity-25 group-hover:rotate-45 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          
          {/* Header */}
          <div className="space-y-2 max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <div className="h-px w-10 bg-[#D4AF37]/60"></div>
              <span className="text-[11px] font-bold text-[#D4AF37] font-serif tracking-widest uppercase">सेवा ही समर्पण है</span>
              <div className="h-px w-10 bg-[#D4AF37]/60"></div>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B20]">हमारी सेवाएँ</h2>
            <p className="text-[#3D2B20]/60 font-medium text-xs sm:text-sm pt-2">
              भक्ति, ज्ञान और सेवा के माध्यम से हम समाज में आध्यात्मिक चेतना का प्रसार कर रहे हैं।
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20 px-2 lg:px-8">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#F5E6D3] flex flex-col overflow-hidden relative transition-all duration-300"
              >
                {/* Image Section */}
                <div className="h-40 w-full overflow-hidden border-b border-[#F5E6D3]">
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                {/* Overlapping Icon */}
                <div className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#F5E6D3] z-10">
                  <svc.icon className="text-lg text-[#D4AF37]" />
                </div>

                {/* Content Section */}
                <div className="pt-9 pb-6 px-4 flex flex-col flex-grow items-center text-center">
                  <h4 className="font-serif font-bold text-sm text-[#3D2B20] mb-2">{svc.title}</h4>
                  <p className="text-[10px] text-[#3D2B20]/60 font-medium leading-relaxed mb-5 line-clamp-2 px-1">
                    {svc.desc}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to="/services" className="inline-flex items-center space-x-1 text-[#D4AF37] font-bold text-[11px] transition-colors hover:text-[#E05A10]">
                      <span>अधिक जानें</span>
                      <FaArrowRight className="text-[8px] mt-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Statistics Card */}
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#FFF9F0] via-white to-[#FFF9F0] border border-[#F5E6D3] rounded-xl p-6 sm:p-10 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-1 relative group cursor-default">
            {/* Decorative Diamond Corners */}
            <div className="absolute top-2 left-3 text-[#D4AF37]/50 text-sm transition-transform duration-500 group-hover:scale-125 group-hover:text-[#D4AF37]">✧</div>
            <div className="absolute top-2 right-3 text-[#D4AF37]/50 text-sm transition-transform duration-500 group-hover:scale-125 group-hover:text-[#D4AF37]">✧</div>
            <div className="absolute bottom-2 left-3 text-[#D4AF37]/50 text-sm transition-transform duration-500 group-hover:scale-125 group-hover:text-[#D4AF37]">✧</div>
            <div className="absolute bottom-2 right-3 text-[#D4AF37]/50 text-sm transition-transform duration-500 group-hover:scale-125 group-hover:text-[#D4AF37]">✧</div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 divide-x divide-[#F5E6D3]/80">
              <div className="flex flex-col items-center justify-center space-y-2 px-2 hover-group group/stat cursor-pointer">
                <FaStar className="text-3xl text-[#D4AF37] transition-all duration-300 group-hover/stat:-translate-y-1.5 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 drop-shadow-sm" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] transition-colors duration-300 group-hover/stat:text-[#E05A10]">25+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8B5A2B] uppercase tracking-widest text-center transition-colors duration-300">वर्षों का अनुभव</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 px-2 hover-group group/stat cursor-pointer">
                <FaBookOpen className="text-3xl text-[#D4AF37] transition-all duration-300 group-hover/stat:-translate-y-1.5 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 drop-shadow-sm" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] transition-colors duration-300 group-hover/stat:text-[#E05A10]">500+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8B5A2B] uppercase tracking-widest text-center transition-colors duration-300">कथा आयोजन</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 px-2 hover-group group/stat cursor-pointer">
                <FaMapMarkerAlt className="text-3xl text-[#D4AF37] transition-all duration-300 group-hover/stat:-translate-y-1.5 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 drop-shadow-sm" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] transition-colors duration-300 group-hover/stat:text-[#E05A10]">20+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8B5A2B] uppercase tracking-widest text-center transition-colors duration-300">राज्यों में सेवा</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 px-2 hover-group group/stat cursor-pointer">
                <FaPrayingHands className="text-3xl text-[#D4AF37] transition-all duration-300 group-hover/stat:-translate-y-1.5 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 drop-shadow-sm" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] transition-colors duration-300 group-hover/stat:text-[#E05A10]">15000+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8B5A2B] uppercase tracking-widest text-center transition-colors duration-300">श्रद्धालु परिवार</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 px-2 hover-group group/stat cursor-pointer">
                <FaOm className="text-3xl text-[#D4AF37] transition-all duration-300 group-hover/stat:-translate-y-1.5 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 drop-shadow-sm" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] transition-colors duration-300 group-hover/stat:text-[#E05A10]">5</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8B5A2B] uppercase tracking-widest text-center transition-colors duration-300">मुख्य सेवाएँ</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. UPCOMING EVENTS - SPIRITUAL & SIMPLE DESIGN */}
      <section className="py-24 relative overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/spiritual_bg.png')" }}>
        
        {/* Soft elegant overlay to ensure content is readable over the rich background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0]/80 via-white/60 to-[#FFF9F0]/90 backdrop-blur-[1px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Elegant Spiritual Section Header */}
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-[2px] bg-[#D4AF37]"></div>
              <FaOm className="text-[#D4AF37] text-3xl drop-shadow-sm" />
              <div className="w-16 h-[2px] bg-[#D4AF37]"></div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E05A10] mb-3 font-serif">Upcoming Events</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B20] tracking-wide">आगामी कथाएं</h2>
          </div>

          {/* Events cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 text-left px-2 sm:px-4">
            {events.slice(0, 3).map((evt, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.06)] border border-[#EAD8C8] hover:shadow-[0_15px_35px_rgba(212,175,55,0.25)] transition-all duration-700 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden border-b-2 border-[#D4AF37]/30">
                  <div className="absolute inset-0 bg-[#3D2B20]/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-out group-hover:scale-110" />

                  {/* Elegant Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#EAD8C8] text-[#3D2B20] rounded p-2 text-center min-w-[55px] shadow-sm z-20 flex flex-col transition-transform duration-700 group-hover:-translate-y-1">
                    <span className="text-xl font-black text-[#E05A10] leading-none font-serif">{evt.date}</span>
                    <span className="text-[9px] uppercase tracking-widest mt-1.5 leading-none font-bold text-[#8B5A2B]">{evt.month}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="space-y-4 mb-8">
                    <h4 className="font-serif text-xl font-bold text-[#3D2B20] group-hover:text-[#E05A10] transition-colors duration-500">{evt.title}</h4>
                    
                    <div className="space-y-2.5 text-[11px] sm:text-xs text-[#3D2B20]/70 font-medium">
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-[#D4AF37] text-[12px]" />
                        <span className="line-clamp-1">{evt.venue}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaClock className="text-[#D4AF37] text-[12px]" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimalist Button */}
                  <div className="mt-auto pt-4 border-t border-[#EAD8C8]/30">
                    <Link
                      to="/contact"
                      className="inline-flex items-center space-x-2 text-[#E05A10] font-serif font-bold text-xs uppercase tracking-widest group-hover:text-[#c94d0d] transition-colors duration-300"
                    >
                      <span>Book Now</span>
                      <FaArrowRight className="text-[10px] transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Elegant View All Button */}
          <div className="mt-16 text-center">
            <Link to="/events" className="inline-flex items-center justify-center space-x-3 bg-white border-2 border-[#EAD8C8] hover:border-[#D4AF37] text-[#3D2B20] hover:text-[#E05A10] font-serif font-bold text-sm uppercase tracking-widest px-10 py-3.5 rounded-full shadow-sm hover:shadow-[0_8px_25px_rgba(212,175,55,0.15)] transition-all transform hover:-translate-y-1">
              <span>सभी इवेंट्स देखें</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
          
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section className="py-24 bg-[#FCF9F2] relative overflow-hidden border-y-[4px] border-[#FAF0E6]">
        {/* Rich Background Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFF9F0] via-transparent to-[#FFF9F0] pointer-events-none opacity-80"></div>
        <div className="absolute -top-10 -right-10 text-[#E05A10]/15 text-[220px] font-serif pointer-events-none transform rotate-12">ॐ</div>
        <div className="absolute -bottom-10 -left-10 text-[#D4AF37]/20 text-[220px] font-serif pointer-events-none transform -rotate-12">卐</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E05A10] mb-2 font-serif">Gallery</span>
            <div className="bg-[#E05A10] px-8 py-2.5 shadow-sm rounded-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-wide">हमारी गैलरी</h2>
            </div>
            {/* Small decorative divider */}
            <div className="w-16 h-px bg-[#D4AF37] mt-5 opacity-40"></div>
          </div>

          {/* Photo/Video Tab toggle */}
          <div className="flex items-center justify-center space-x-4 mb-10">
            <button
              onClick={() => setActiveGalleryTab('Photos')}
              className={`px-8 py-2.5 rounded-full font-serif text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border-2 ${activeGalleryTab === 'Photos'
                ? 'bg-[#E05A10] text-white border-[#E05A10] shadow-[0_4px_15px_rgba(224,90,16,0.3)]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:border-[#D4AF37] hover:text-[#E05A10]'
                }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveGalleryTab('Videos')}
              className={`px-8 py-2.5 rounded-full font-serif text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border-2 ${activeGalleryTab === 'Videos'
                ? 'bg-[#E05A10] text-white border-[#E05A10] shadow-[0_4px_15px_rgba(224,90,16,0.3)]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:border-[#D4AF37] hover:text-[#E05A10]'
                }`}
            >
              Videos
            </button>
          </div>

          {/* Grid Layout of Gallery items (4 in a row) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-4">
            {activeGalleryTab === 'Photos' ? (
              galleryPhotos.slice(0, 4).map((photo, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative aspect-square overflow-hidden rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#F5E6D3] cursor-pointer transition-all duration-300"
                >
                  <img src={photo.url} alt="Gallery Photo" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
              ))
            ) : (
              galleryVideos.slice(0, 4).map((vid, idx) => (
                <a
                  key={vid.id}
                  href={`https://youtube.com/watch?v=${vid.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video lg:aspect-square overflow-hidden rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#F5E6D3] cursor-pointer block group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img src={vid.image || `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#3D2B20]/40 flex items-center justify-center group-hover:bg-[#E05A10]/50 transition-colors duration-300">
                    <span className="text-white text-4xl font-black drop-shadow-md group-hover:scale-110 transition-transform">▶</span>
                  </div>
                </a>
              ))
            )}
          </div>

          {/* View Full Gallery Button */}
          <div className="mt-14 text-center">
            <Link to="/gallery" className="inline-flex items-center justify-center bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest px-10 py-3.5 rounded shadow-[0_4px_15px_rgba(224,90,16,0.25)] transition-all hover:shadow-[0_6px_20px_rgba(224,90,16,0.35)] hover:-translate-y-0.5">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LIVE KATHA SECTION */}
      <section className="py-24 bg-[#FCF9F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(224,90,16,0.1)] border border-[#EAD8C8] group">
            
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF7] via-[#FCF9F2] to-[#FFF9F0]"></div>
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-multiply"></div>

            {/* Glowing Orbs */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#E05A10] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-stretch">
              
              {/* Left Texts */}
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                
                {/* Live Badge */}
                <div className="flex items-center space-x-3 bg-[#E05A10]/10 backdrop-blur-md w-max px-4 py-1.5 rounded-full border border-[#E05A10]/30 shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05A10] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E05A10]"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E05A10]">Live Katha</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl font-black text-[#D4AF37] leading-relaxed pt-2 pb-2 drop-shadow-sm">
                  <span className="text-[#E05A10]">सीधे</span> प्रसारण से जुड़ें
                </h3>
                
                <p className="text-sm sm:text-base font-medium text-[#3D2B20] leading-relaxed max-w-md">
                  हमारे साथ वेब सीधा प्रसारण YouTube, Facebook, Instagram और WhatsApp पर देखें। दिव्य कथा और प्रवचन का आनंद अपने घर से लें।
                </p>
                
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent my-2"></div>

                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 pt-4">
                  {/* YouTube Button */}
                  <a
                    href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#FF0000] to-[#cc0000] text-white font-serif font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-4 rounded-xl shadow-[0_5px_15px_rgba(255,0,0,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(255,0,0,0.5)] hover:-translate-y-1 flex items-center justify-center space-x-2 flex-grow sm:flex-grow-0"
                  >
                    <FaYoutube className="text-xl" />
                    <span>YouTube</span>
                  </a>
                  
                  {/* Facebook Button */}
                  <a
                    href="https://www.facebook.com/share/1HLEzxvCT3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#1877F2] to-[#0d62d3] text-white font-serif font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-4 rounded-xl shadow-[0_5px_15px_rgba(24,119,242,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(24,119,242,0.5)] hover:-translate-y-1 flex items-center justify-center space-x-2 flex-grow sm:flex-grow-0"
                  >
                    <FaFacebookF className="text-xl" />
                    <span>Facebook</span>
                  </a>

                  {/* Instagram Button */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-serif font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-4 rounded-xl shadow-[0_5px_15px_rgba(220,39,67,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(220,39,67,0.5)] hover:-translate-y-1 flex items-center justify-center space-x-2 flex-grow sm:flex-grow-0"
                  >
                    <FaInstagram className="text-xl" />
                    <span>Instagram</span>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-serif font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-4 rounded-xl shadow-[0_5px_15px_rgba(37,211,102,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:-translate-y-1 flex items-center justify-center space-x-2 flex-grow sm:flex-grow-0"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="h-72 sm:h-96 lg:h-auto relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                  alt="Guru Ji Live Stream"
                  className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Gradient mask for smooth blending matching light theme */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FFFDF7] via-[#FFFDF7]/60 lg:via-[#FFFDF7]/40 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full border border-[#E05A10]/20 flex items-center justify-center backdrop-blur-md bg-white/40 text-[#E05A10] shadow-[0_0_40px_rgba(224,90,16,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <FaPlayCircle className="text-6xl drop-shadow-lg opacity-90" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-24 relative bg-[#FFF9F0] overflow-hidden border-t border-[#FAF0E6]">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none transform -translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        
        {/* Bottom Wavy Gradient (Simulated with absolute div) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDEBD0]/50 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading Section */}
          <div className="text-center mb-24">
            <p className="text-[#E05A10] font-medium text-sm sm:text-base tracking-widest mb-3">... || श्री गुरवे नमः || ...</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#3D2B20] mb-4">
              श्रद्धालुओं के विचार
            </h2>
            <p className="text-[#3D2B20] text-sm sm:text-base font-medium mb-5">
              आप सभी का स्नेह, विश्वास और आशीर्वाद ही हमारी सबसे बड़ी पूँजी है।
            </p>
            <div className="flex justify-center text-[#E05A10] text-2xl">
              <GiLotus />
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-20 px-2 sm:px-0">
            {testimonials.map((rev, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-b from-white to-[#FFF5E1] rounded-[2rem] p-8 pt-16 shadow-[0_10px_35px_rgba(230,126,34,0.15)] flex flex-col border border-white hover:-translate-y-2 transition-transform duration-500 group"
              >
                {/* Avatar overlapping top */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-24 h-24 rounded-full border-[5px] border-white shadow-[0_5px_15px_rgba(230,126,34,0.2)] overflow-hidden bg-white">
                    <img 
                      src={rev.avatar} 
                      alt={rev.author} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                </div>

                {/* Quote Mark Top Left */}
                <div className="absolute top-6 left-6 text-[#E05A10] text-6xl font-serif font-black leading-none opacity-90 select-none">
                  “
                </div>

                {/* Decorative Pattern Top Right */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.04] pointer-events-none rounded-tr-[2rem]"></div>

                {/* Temple Silhouette Bottom Left */}
                <div className="absolute bottom-0 left-0 text-[#E05A10] opacity-[0.04] text-7xl pointer-events-none transform translate-y-2 -translate-x-2">
                  <GiGreekTemple />
                </div>

                <div className="mt-8 mb-6 relative z-10 text-center flex-grow flex items-center justify-center">
                  <p className="text-[#3D2B20]/90 text-[13px] sm:text-sm leading-relaxed font-medium">
                    {rev.quote}
                  </p>
                </div>

                {/* Elegant Divider */}
                <div className="flex items-center justify-center space-x-2 mb-6 opacity-60">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                </div>

                {/* Author Info & Stars */}
                <div className="text-center relative z-10 pb-2">
                  <h4 className="font-serif font-bold text-lg text-[#E05A10] mb-1.5">{rev.author}</h4>
                  <div className="flex items-center justify-center text-[11px] sm:text-xs text-[#3D2B20]/70 font-bold mb-4">
                    <FaMapMarkerAlt className="mr-1.5 text-[#E05A10]" />
                    {rev.location}
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 text-[#E05A10] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                
              </div>
            ))}
          </div>

          {/* Bottom Action Button */}
          <div className="mt-20 text-center relative z-10">
            <div className="flex items-center justify-center space-x-4 mb-6 opacity-40">
              <div className="w-24 h-[1px] bg-[#3D2B20]"></div>
              <GiLotus className="text-[#E05A10] text-lg" />
              <div className="w-24 h-[1px] bg-[#3D2B20]"></div>
            </div>
            
            <p className="text-[#3D2B20] font-bold text-sm sm:text-base mb-6">आप भी अपनी अनुभूति हमारे साथ साझा करें</p>
            
            <button className="bg-gradient-to-r from-[#E05A10] to-[#E67E22] hover:from-[#c94d0d] hover:to-[#d35400] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(230,126,34,0.3)] transition-all hover:shadow-[0_10px_25px_rgba(230,126,34,0.4)] hover:-translate-y-1 flex items-center justify-center mx-auto space-x-2.5 group">
              <FaQuoteLeft className="text-xs opacity-90" />
              <span>अपना विचार साझा करें</span>
              <FaArrowRight className="text-xs opacity-90 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

    </div>
  )
}
