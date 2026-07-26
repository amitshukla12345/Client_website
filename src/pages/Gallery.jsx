import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaImage, FaVideo, FaSearchPlus, FaPlayCircle, FaTimes, FaImages, FaOm, FaBookOpen, FaPrayingHands } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import galleryHeroImg from '../assets/images/gallary_.png'

export default function Gallery() {
  const { galleryPhotos, galleryVideos, contacts } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState('Photos')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const navigate = useNavigate()

  const photos = galleryPhotos.map(photo => ({
    type: 'Photo',
    url: photo.url,
    title: 'Divine Moments',
    category: 'Spiritual Assembly'
  }))

  const videos = galleryVideos.map(vid => ({
    type: 'Video',
    url: vid.image || `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`,
    title: vid.title,
    videoId: vid.videoId,
    category: 'Video Discourse'
  }))

  const currentItems = activeTab === 'Photos' ? photos : videos

  return (
    <div className="pt-[50px] lg:pt-[60px] pb-20 bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20 -mt-12 lg:-mt-16">
        <img src={galleryHeroImg} alt="Gallery Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Detailed Gallery Section with Website Theme Colors */}
      <section className="py-16 bg-[#FFF9F0] relative overflow-hidden min-h-screen">
        
        {/* Rich Background Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFF9F0] via-transparent to-[#FFF9F0] pointer-events-none"></div>
        
        <div className="absolute top-8 left-8 text-[#D4AF37]/50 text-7xl font-serif animate-pulse pointer-events-none">✧</div>
        <div className="absolute top-8 right-8 text-[#D4AF37]/50 text-7xl font-serif animate-pulse pointer-events-none">✧</div>
        <div className="absolute bottom-1/4 left-4 text-[#E05A10]/10 text-9xl font-serif pointer-events-none">ॐ</div>
        <div className="absolute top-1/3 right-4 text-[#E05A10]/10 text-9xl font-serif pointer-events-none">卐</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Photo/Video Tab toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              onClick={() => setActiveTab('Photos')}
              className={`flex items-center space-x-2 px-8 py-2.5 rounded-full font-serif text-sm font-bold uppercase tracking-widest transition-all border-2 ${activeTab === 'Photos'
                ? 'bg-[#E05A10] text-white border-[#E05A10] shadow-[0_4px_15px_rgba(224,90,16,0.3)]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:border-[#D4AF37] hover:text-[#E05A10]'
                }`}
            >
              <FaImages />
              <span>फोटो</span>
            </button>
            <button
              onClick={() => setActiveTab('Videos')}
              className={`flex items-center space-x-2 px-8 py-2.5 rounded-full font-serif text-sm font-bold uppercase tracking-widest transition-all border-2 ${activeTab === 'Videos'
                ? 'bg-[#E05A10] text-white border-[#E05A10] shadow-[0_4px_15px_rgba(224,90,16,0.3)]'
                : 'bg-white text-[#3D2B20] border-[#EAD8C8] hover:border-[#D4AF37] hover:text-[#E05A10]'
                }`}
            >
              <FaVideo />
              <span>वीडियो</span>
            </button>
          </div>

          {/* Grid Layout of Gallery items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {currentItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-[#EAD8C8] cursor-pointer transition-all duration-300 hover:border-[#D4AF37] hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-[#E05A10] flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      {item.type === 'Photo' ? <FaSearchPlus /> : <FaPlayCircle />}
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-4 bg-white border-t border-[#EAD8C8] relative">
                  <h4 className="text-[#3D2B20] font-serif font-bold text-sm sm:text-base mb-1.5 group-hover:text-[#E05A10] transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-[#D4AF37] text-[10px] sm:text-xs font-bold tracking-wider uppercase">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Counter Bar */}
          <div className="mt-16 max-w-5xl mx-auto bg-white border border-[#EAD8C8] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-[#EAD8C8]">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center space-y-2 px-2 group cursor-pointer hover:bg-orange-50/50 rounded-xl py-3 transition-all duration-300"
              >
                <FaImages className="text-2xl text-[#E05A10] mb-1 group-hover:scale-125 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] group-hover:text-[#E05A10] transition-colors">500+</div>
                <div className="text-[10px] sm:text-xs font-bold text-[#E05A10] uppercase tracking-wider">फोटो</div>
              </a>
              <a 
                href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center space-y-2 px-2 group cursor-pointer hover:bg-orange-50/50 rounded-xl py-3 transition-all duration-300"
              >
                <FaVideo className="text-2xl text-[#E05A10] mb-1 group-hover:scale-125 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] group-hover:text-[#E05A10] transition-colors">120+</div>
                <div className="text-[10px] sm:text-xs font-bold text-[#E05A10] uppercase tracking-wider">वीडियो</div>
              </a>
              <div 
                onClick={() => navigate('/events')}
                className="flex flex-col items-center justify-center space-y-2 px-2 group cursor-pointer hover:bg-orange-50/50 rounded-xl py-3 transition-all duration-300"
              >
                <FaBookOpen className="text-2xl text-[#E05A10] mb-1 group-hover:scale-125 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] group-hover:text-[#E05A10] transition-colors">25+</div>
                <div className="text-[10px] sm:text-xs font-bold text-[#E05A10] uppercase tracking-wider">आयोजन</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 px-2 group hover:bg-orange-50/50 rounded-xl py-3 transition-all duration-300">
                <FaPrayingHands className="text-2xl text-[#E05A10] mb-1 group-hover:scale-125 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-black text-[#3D2B20] group-hover:text-[#E05A10] transition-colors">15000+</div>
                <div className="text-[10px] sm:text-xs font-bold text-[#E05A10] uppercase tracking-wider">श्रद्धालु</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-transparent z-10 flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] text-white bg-black/50 hover:bg-black/80 hover:text-saffron p-3 rounded-full text-xl transition-all shadow-lg"
                aria-label="Close"
              >
                <FaTimes />
              </button>

              {currentItems[lightboxIndex].type === 'Photo' ? (
                /* High-Res Photo view */
                <div className="bg-cream-dark p-2 rounded-2xl border border-gold/30 overflow-hidden shadow-2xl">
                  <img 
                    src={currentItems[lightboxIndex].url} 
                    alt={currentItems[lightboxIndex].title} 
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                  />
                  <div className="p-4 text-center">
                    <h4 className="font-serif text-lg font-bold text-dark">{currentItems[lightboxIndex].title}</h4>
                    <p className="text-xs text-saffron font-medium">{currentItems[lightboxIndex].category}</p>
                  </div>
                </div>
              ) : (
                /* Embedded YouTube Video view */
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gold/30">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentItems[lightboxIndex].videoId}?autoplay=1`}
                    title={currentItems[lightboxIndex].title}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
