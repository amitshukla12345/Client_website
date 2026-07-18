import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaImage, FaVideo, FaSearchPlus, FaPlayCircle, FaTimes } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import galleryHeroImg from '../assets/images/gallary_.png'

export default function Gallery() {
  const { galleryPhotos, galleryVideos } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState('Photos')
  const [lightboxIndex, setLightboxIndex] = useState(null)

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
    <div className="pt-[90px] lg:pt-[104px] pb-20 bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20">
        <img src={galleryHeroImg} alt="Gallery Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Media type tabs */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <button
              onClick={() => setActiveTab('Photos')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-serif text-sm tracking-wider uppercase border transition-all duration-300 ${
                activeTab === 'Photos'
                  ? 'bg-saffron text-white border-saffron shadow-md'
                  : 'bg-white text-dark-light border-gold/20 hover:bg-cream-dark'
              }`}
            >
              <FaImage />
              <span>Photo Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab('Videos')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-serif text-sm tracking-wider uppercase border transition-all duration-300 ${
                activeTab === 'Videos'
                  ? 'bg-saffron text-white border-saffron shadow-md'
                  : 'bg-white text-dark-light border-gold/20 hover:bg-cream-dark'
              }`}
            >
              <FaVideo />
              <span>Video Gallery</span>
            </button>
          </div>

          {/* Uniform Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setLightboxIndex(index)}
                className={`relative overflow-hidden rounded-2xl group border border-amber-500/10 cursor-pointer shadow-premium hover:shadow-premium-hover transition-all aspect-square bg-[#FCF9F2]`}
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Saffron Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/90 via-saffron-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  {/* Action Icon overlay */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white text-lg">
                    {item.type === 'Photo' ? <FaSearchPlus /> : <FaPlayCircle className="text-saffron-light" />}
                  </div>
                </div>
              </motion.div>
            ))}
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
                className="absolute -top-12 right-0 text-white hover:text-saffron text-2xl"
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
