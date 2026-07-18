import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

export default function MainLayout({ children }) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

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
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gold-dark text-white flex items-center justify-center shadow-gold-glow hover:bg-gold hover:-translate-y-1 transition-all duration-300 group border border-gold-light/20"
              aria-label="Back to Top"
            >
              <FaArrowUp className="text-lg group-hover:scale-110 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Floating Button */}
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          href="https://wa.me/919876543210?text=Radhe%20Radhe!%20I%20want%20to%20inquire%20about%20booking%20a%20Katha."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 animate-bounce"
          style={{ animationDuration: '3s' }}
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </motion.a>
      </div>
    </div>
  )
}
