import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaArrowUp, FaBullhorn } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { AppContext } from '../context/AppContext'

export default function MainLayout({ children }) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  const { contacts } = useContext(AppContext)

  // Use scroll restoration hook
  useScrollToTop()

  // Track scroll for showing back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simulate premium initial page loading overlay
  useEffect(() => {
    if (isAdminPage) return // skip load screen on admin portal
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // 1.2s premium load effect
    return () => clearTimeout(timer)
  }, [location.pathname, isAdminPage])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] text-[#3D2B20]">
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-cream-light selection:bg-saffron selection:text-white">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-dark-charcoal z-[9999] flex flex-col items-center justify-center"
          >
            {/* Spiritual Lotus/Mandala Loading Spinner */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-gold-dark/20 border-t-saffron rounded-full animate-spin"></div>
              <div className="absolute font-serif text-saffron text-2xl animate-pulse font-extrabold">ॐ</div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 font-serif text-gold tracking-widest uppercase text-sm font-semibold"
            >
              Shree Ganeshay Namah
            </motion.div>
            <div className="mt-2 text-xs text-cream-deep/40 font-light">Loading Divine Experience...</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Announcement Banner Removed */}

      {/* Main Navigation */}
      <Navbar />

      {/* Dynamic Page Router Content with Page Transitions */}
      <main className="flex-grow pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Area */}
      <Footer />

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col space-y-3 sm:space-y-4">
        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#E05A10] text-white flex items-center justify-center shadow-md hover:bg-[#c74c0b] hover:-translate-y-1 transition-all duration-200 group border-2 border-[#D4AF37]/30"
              aria-label="Back to Top"
            >
              <FaArrowUp className="text-sm sm:text-base group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Floating Button */}
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          href={contacts?.whatsapp ? `https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, '')}?text=Radhe%20Radhe!%20I%20want%20to%20inquire%20about%20booking%20a%20Katha.` : "https://wa.me/917738169410?text=Radhe%20Radhe!"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:bg-[#128C7E] hover:-translate-y-1 transition-all duration-200"
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="text-[22px] sm:text-[26px]" />
        </motion.a>
      </div>
    </div>
  )
}
