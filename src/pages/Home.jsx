import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaStar, FaQuoteLeft, FaPhoneAlt, FaRegHandshake, FaMapMarkerAlt, FaCheck, FaArrowRight, FaClock, FaOm, FaPlaceOfWorship, FaBookOpen, FaPrayingHands, FaYoutube, FaFacebookF, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GiLotus, GiGreekTemple, GiSun, GiMusicalNotes, GiFlame, GiBookCover, GiTrident, GiPrayerBeads, GiOpenBook, GiFireBowl } from 'react-icons/gi'

import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'

export default function Home() {
  const { banners, about, events, galleryPhotos, galleryVideos, organizers, contacts } = useContext(AppContext)
  const { t } = useTranslation()
  const [activeGalleryTab, setActiveGalleryTab] = useState('Photos')
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [activeYajmanIdx, setActiveYajmanIdx] = useState(0)

  const nextHeroSlide = () => {
    if (banners && banners.length > 0) {
      setCurrentHeroSlide((prev) => (prev + 1) % banners.length)
    }
  }

  const prevHeroSlide = () => {
    if (banners && banners.length > 0) {
      setCurrentHeroSlide((prev) => (prev - 1 + banners.length) % banners.length)
    }
  }

  // 2. Highlights Row Data
  const highlights = [
    {
      title: 'भागवत कथा',
      subtitle: 'आध्यात्मिक ज्ञान का अमृत',
      icon: GiLotus
    },
    {
      title: 'भक्ति और श्रद्धा',
      subtitle: 'जीवन में सुख और शांति',
      icon: GiSun
    },
    {
      title: 'सत्संग और सेवा',
      subtitle: 'मानव सेवा ही परमो सेवा',
      icon: FaRegHandshake
    },
    {
      title: 'सनातन संस्कृति',
      subtitle: 'हमारी पहचान, हमारी शान',
      icon: GiGreekTemple
    }
  ]

  // 4. Services Data
  const services = [
    { title: 'श्रीमद्भागवत कथा', icon: GiLotus },
    { title: 'राम कथा', icon: FaPlaceOfWorship },
    { title: 'शिव महापुराण', icon: GiTrident },
    { title: 'देवी भागवत', icon: FaOm },
    { title: 'सुन्दरकाण्ड पाठ', icon: FaBookOpen },
    { title: 'भजन संध्या', icon: GiMusicalNotes },
    { title: 'अन्य कार्यक्रम', icon: FaPrayingHands }
  ]

  // 7. Testimonials Data
  const testimonials = [
    {
      quote: 'महाराज जी की कथा सुनकर जीवन में सकारात्मक परिवर्तन आया है। बहुत ही मधुर वाणी और गहन ज्ञान।',
      author: 'संदीप शर्मा',
      location: 'वाराणसी'
    },
    {
      quote: 'कथा के प्रत्येक प्रसंग की व्याख्या इतनी सरल और भावपूर्ण होती है कि मन आनंदित हो जाता है।',
      author: 'दीपा गुप्ता',
      location: 'कानपुर'
    },
    {
      quote: 'महाराज जी की भजन संध्या और श्री राम कथा से पूरे परिवार में भक्ति मय वातावरण बना है।',
      author: 'अभिषेक मिश्रा',
      location: 'लखनऊ'
    }
  ]

  return (
    <div className="bg-[#FCF9F2] text-[#3D2B20] font-sans selection:bg-[#E05A10] selection:text-white overflow-x-hidden">

      {/* 1. HERO CAROUSEL SECTION */}
      <section className="relative w-full bg-white border-b border-[#EAD8C8] overflow-hidden">
        {/* Banner Grid Container */}
        <div className="w-full relative min-h-[460px] lg:h-[500px]">
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
              <div className="lg:col-span-6 flex flex-col justify-center px-4 xs:px-8 sm:px-16 lg:px-24 pt-36 xs:pt-40 sm:pt-44 lg:pt-48 pb-12 bg-[#FCF9F2] text-center lg:text-left relative z-10">
                <h2
                  className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D2B20] mb-2"
                  style={{ lineHeight: '1.5', paddingTop: '10px' }}
                >
                  {banners[currentHeroSlide]?.title}
                </h2>

                <p className="font-serif text-base xs:text-lg sm:text-xl lg:text-2xl text-[#3D2B20] font-bold leading-relaxed mb-4">
                  {banners[currentHeroSlide]?.tagline}
                </p>

                {(banners[currentHeroSlide]?.kathaDay || banners[currentHeroSlide]?.kathaTopic) && (
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-xs sm:text-sm font-bold text-[#E05A10] bg-[#E05A10]/10 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
                    {banners[currentHeroSlide]?.kathaDay && <span>{banners[currentHeroSlide].kathaDay}</span>}
                    {banners[currentHeroSlide]?.kathaDay && banners[currentHeroSlide]?.kathaTopic && <span>•</span>}
                    {banners[currentHeroSlide]?.kathaTopic && <span>{banners[currentHeroSlide].kathaTopic}</span>}
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
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto bg-[#E05A10] hover:bg-[#c94d0d] text-white font-sans font-bold text-xs uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded shadow transition-all duration-300 text-center"
                  >
                    {t('home.bookButton')}
                  </Link>
                  <Link
                    to="/live"
                    className="w-full sm:w-auto border border-[#E05A10]/40 hover:border-[#E05A10] text-[#E05A10] font-sans font-bold text-xs uppercase tracking-wider px-6 sm:px-8 py-3 rounded hover:bg-[#E05A10]/5 transition-all duration-300 text-center"
                  >
                    {t('home.liveButton')}
                  </Link>
                </div>
              </div>

              {/* Right Column: Full-height Guru Ji Image */}
              <div className="lg:col-span-6 relative h-[250px] xs:h-[300px] lg:h-full w-full overflow-hidden">
                {/* Diagonal Slant Divider to remove straight partition */}
                <svg className="absolute left-0 top-0 h-full w-12 lg:w-24 text-[#FCF9F2] z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polygon points="0,0 100,0 0,100" fill="currentColor" />
                </svg>
                <img
                  src={banners[currentHeroSlide]?.image}
                  alt="Pujya Guru Ji Maharaj"
                  className="w-full h-full object-cover object-top pointer-events-none"
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
            {banners.map((_, idx) => (
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

      {/* 2. HIGHLIGHTS ROW SECTION */}
      <section className="py-8 bg-white border-y border-[#FAF0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center space-x-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#FAF0E6] hover:shadow-sm hover:border-[#E05A10]/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E05A10]/10 text-[#E05A10] flex items-center justify-center text-2xl flex-shrink-0">
                  <item.icon />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D2B20]">{item.title}</h4>
                  <p className="text-xs text-[#3D2B20]/60 font-light mt-0.5">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC KATHA ORGANIZER / YAJMAN DETAILS SECTION */}
      <section className="py-24 bg-[#FCF9F2] border-t border-[#EAD8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E05A10] flex items-center justify-center space-x-2">
              <GiLotus />
              <span>कथा आयोजक एवं यजमान विवरण</span>
              <GiLotus />
            </span>
            <h2 className="font-serif text-3xl font-black text-[#3D2B20] mt-1">
              श्रद्धालु यजमान परिचय
            </h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          {organizers && organizers.length > 0 ? (
            <div className="bg-white border border-[#EAD8C8] rounded-3xl p-8 sm:p-12 shadow-premium max-w-5xl mx-auto">
              {/* Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* 🖼 Left Side (Image) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <motion.div
                    key={activeYajmanIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative border-[6px] border-[#FCF9F2] rounded-[2rem] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] w-full max-w-sm ring-1 ring-[#EAD8C8]"
                  >
                    <img
                      src={organizers[activeYajmanIdx].image || 'https://images.unsplash.com/photo-1544790181-37288bde4d16?auto=format&fit=crop&w=600&q=80'}
                      alt={organizers[activeYajmanIdx].name}
                      className="rounded-[1.5rem] w-full h-[300px] sm:h-[420px] object-cover"
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E05A10] to-[#c94d0d] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg border-2 border-white">
                      कथा यजमान
                    </div>
                  </motion.div>
                </div>

                {/* 📄 Right Side (Details) */}
                <motion.div
                  key={`details-${activeYajmanIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="lg:col-span-7 space-y-8"
                >
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <GiLotus className="text-[#E05A10] text-sm" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E05A10]">Yajman Details</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B20] leading-tight">
                      {organizers[activeYajmanIdx].name}
                    </h3>
                    {organizers[activeYajmanIdx].familyName && (
                      <p className="text-sm font-bold text-[#D4AF37] tracking-wide text-lg">
                        {organizers[activeYajmanIdx].familyName}
                      </p>
                    )}
                  </div>

                  {/* Info List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-[#FAF6F0] p-2.5 rounded-full text-[#E05A10]">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2B20]/50 mb-0.5">पता / स्थान</span>
                        <p className="text-sm font-semibold text-[#3D2B20]">{organizers[activeYajmanIdx].address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-[#FAF6F0] p-2.5 rounded-full text-[#E05A10]">
                        <GiGreekTemple className="text-sm" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2B20]/50 mb-0.5">शहर एवं राज्य</span>
                        <p className="text-sm font-semibold text-[#3D2B20]">{organizers[activeYajmanIdx].cityState}</p>
                      </div>
                    </div>

                    {organizers[activeYajmanIdx].purpose && (
                      <div className="flex items-start space-x-3 sm:col-span-2">
                        <div className="mt-1 bg-[#FAF6F0] p-2.5 rounded-full text-[#E05A10]">
                          <GiLotus className="text-sm" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2B20]/50 mb-0.5">आयोजन का उद्देश्य</span>
                          <p className="text-[15px] font-semibold text-[#E05A10]">{organizers[activeYajmanIdx].purpose}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* About Text */}
                  {organizers[activeYajmanIdx].about && (
                    <div className="relative bg-gradient-to-br from-[#FCF9F2] to-white p-6 rounded-2xl border border-[#EAD8C8]/60 shadow-sm mt-4">
                      <FaQuoteLeft className="absolute top-4 right-4 text-4xl text-[#D4AF37]/10" />
                      <p className="text-sm text-[#3D2B20]/80 font-medium leading-relaxed whitespace-pre-line relative z-10">
                        {organizers[activeYajmanIdx].about}
                      </p>
                    </div>
                  )}

                  {/* Organizer Selection Controllers */}
                  {organizers.length > 1 && (
                    <div className="flex items-center space-x-3 pt-4 border-t border-[#FAF0E6]">
                      <button
                        onClick={() => setActiveYajmanIdx((prev) => (prev - 1 + organizers.length) % organizers.length)}
                        className="w-10 h-10 rounded-full border border-[#EAD8C8] bg-white text-[#E05A10] hover:bg-[#E05A10] hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
                        title="Previous Yajman"
                      >
                        ◀
                      </button>
                      <span className="font-bold text-xs">
                        {activeYajmanIdx + 1} / {organizers.length}
                      </span>
                      <button
                        onClick={() => setActiveYajmanIdx((prev) => (prev + 1) % organizers.length)}
                        className="w-10 h-10 rounded-full border border-[#EAD8C8] bg-white text-[#E05A10] hover:bg-[#E05A10] hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
                        title="Next Yajman"
                      >
                        ▶
                      </button>
                    </div>
                  )}

                </motion.div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-[#3D2B20]/40 font-light bg-white rounded-3xl border border-[#EAD8C8] max-w-xl mx-auto">
              सम्प्रति कोई यजमान विवरण उपलब्ध नहीं है।
            </div>
          )}
        </div>
      </section>

      {/* 4. KATHA SERVICES SECTION */}
      <section className="py-20 bg-white border-y border-[#FAF0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-1 max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A10]">Katha Services</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#3D2B20]">हमारी सेवाएं</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          {/* Grid list of services */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#FCF9F2] border border-[#FAF0E6] p-5 rounded-xl text-center hover:shadow transition-all flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-full bg-[#E05A10]/10 text-[#E05A10] flex items-center justify-center text-xl mb-4">
                  <svc.icon />
                </div>
                <h4 className="font-serif font-bold text-xs text-[#3D2B20] leading-tight">{svc.title}</h4>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/services" className="bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest px-8 py-3 rounded shadow transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS */}
      <section className="py-20 bg-[#FCF9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-1 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A10]">Upcoming Events</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#3D2B20]">आगामी कथाएं</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          {/* Events cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {events.slice(0, 3).map((evt, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow border border-[#FAF0E6] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-[#E05A10] text-white rounded p-1.5 text-center min-w-[50px] shadow-md z-10 flex flex-col">
                    <span className="text-sm font-black leading-none">{evt.date}</span>
                    <span className="text-[9px] uppercase tracking-wider mt-0.5 leading-none font-bold">{evt.month}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-[#3D2B20]">{evt.title}</h4>
                    <div className="space-y-1 text-xs text-[#3D2B20]/65 font-light">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-[#E05A10] text-[10px]" />
                        <span>{evt.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <FaClock className="text-[#E05A10] text-[10px]" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="block text-center border border-[#E05A10] hover:bg-[#E05A10] hover:text-white text-[#E05A10] font-serif font-bold text-xs uppercase tracking-wider py-2.5 rounded transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/events" className="bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest px-8 py-3 rounded shadow transition-all">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section className="py-20 bg-white border-y border-[#FAF0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-1 max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A10]">Gallery</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#3D2B20]">हमारी गैलरी</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          {/* Photo/Video Tab toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveGalleryTab('Photos')}
              className={`px-6 py-2 rounded-full font-serif text-xs font-bold uppercase tracking-wider transition-all border ${activeGalleryTab === 'Photos'
                ? 'bg-[#E05A10] text-white border-[#E05A10]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:bg-[#FCF9F2]'
                }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveGalleryTab('Videos')}
              className={`px-6 py-2 rounded-full font-serif text-xs font-bold uppercase tracking-wider transition-all border ${activeGalleryTab === 'Videos'
                ? 'bg-[#E05A10] text-white border-[#E05A10]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:bg-[#FCF9F2]'
                }`}
            >
              Videos
            </button>
          </div>

          {/* Grid Layout of Gallery items */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {activeGalleryTab === 'Photos' ? (
              galleryPhotos.slice(0, 10).map((photo, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-sm border border-[#FAF0E6] cursor-pointer"
                >
                  <img src={photo.url} alt="Gallery Photo" className="w-full h-full object-cover" />
                </motion.div>
              ))
            ) : (
              galleryVideos.slice(0, 10).map((vid, idx) => (
                <a
                  key={vid.id}
                  href={`https://youtube.com/watch?v=${vid.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden rounded-lg shadow-sm border border-[#FAF0E6] cursor-pointer block group"
                >
                  <img src={vid.image || `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`} alt={vid.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#3D2B20]/45 flex items-center justify-center group-hover:bg-[#3D2B20]/60 transition-colors">
                    <span className="text-white text-3xl font-black">▶</span>
                  </div>
                </a>
              ))
            )}
          </div>

          <div className="mt-12">
            <Link to="/gallery" className="bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest px-8 py-3 rounded shadow transition-all">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LIVE KATHA SECTION */}
      <section className="py-20 bg-[#FCF9F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E130C] to-[#3D2B20] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

              {/* Left Texts */}
              <div className="p-6 xs:p-8 sm:p-12 space-y-4 xs:space-y-6 text-cream-light">
                <span className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[#D4AF37] animate-pulse block">
                  Live Katha
                </span>
                <h3 className="font-serif text-xl xs:text-2xl sm:text-4xl font-black text-white leading-tight">
                  सीधे प्रसारण से जुड़ें
                </h3>
                <p className="text-sm font-light text-white/70 max-w-md leading-relaxed">
                  हमारे साथ वेब सीधा प्रसारण YouTube और Facebook पर देखें
                </p>
                <div className="w-16 h-[1px] bg-[#D4AF37]"></div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-serif font-bold text-xs uppercase tracking-widest px-6 py-3 rounded flex items-center space-x-2 shadow transition-all"
                  >
                    <FaYoutube />
                    <span>Watch on YouTube</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1HLEzxvCT3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1877F2] hover:bg-[#0d62d3] text-white font-serif font-bold text-xs uppercase tracking-widest px-6 py-3 rounded flex items-center space-x-2 shadow transition-all"
                  >
                    <FaFacebookF />
                    <span>Watch on Facebook</span>
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="h-64 sm:h-80 lg:h-full min-h-[300px] relative">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                  alt="Guru Ji Live Stream"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1E130C] via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white border-t border-[#FAF0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-1 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A10]">Testimonials</span>
            <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-black text-[#3D2B20]">श्रद्धालुओं के विचार</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((rev, idx) => (
              <motion.div
                key={idx}
                className="bg-[#FCF9F2] p-6 rounded-xl border border-[#FAF0E6] flex flex-col justify-between space-y-6 shadow-sm hover:shadow transition-all"
              >
                <div className="space-y-4">
                  <FaQuoteLeft className="text-[#E05A10]/15 text-4xl" />
                  <p className="text-xs text-[#3D2B20]/80 italic leading-relaxed">"{rev.quote}"</p>
                </div>

                <div className="pt-4 border-t border-[#EAD8C8] flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#3D2B20]">{rev.author}</h4>
                    <span className="text-[10px] text-[#E05A10] uppercase font-bold tracking-wider">{rev.location}</span>
                  </div>
                  <div className="flex items-center space-x-0.5 text-[#D4AF37] text-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel dots simulated */}
          <div className="flex items-center justify-center space-x-1.5 mt-8">
            <span className="w-2 h-2 rounded-full bg-[#E05A10]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8C8]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8C8]"></span>
          </div>
        </div>
      </section>

    </div>
  )
}
