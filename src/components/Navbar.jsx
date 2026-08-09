import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaYoutube, FaWhatsapp, FaInstagram, FaHome, FaUserCircle, FaPrayingHands, FaRegCalendarAlt, FaImages, FaPlayCircle, FaShieldAlt, FaCalendarPlus, FaChevronRight } from 'react-icons/fa'
import { GiSparkles } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'
import logoImg from '../assets/images/logo.jpeg'

export default function Navbar() {
  const { contacts } = useContext(AppContext)
  const { t, language, toggleLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Track scroll position for dynamic background classes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: t('navbar.home'), path: '/', icon: <FaHome className="mb-1 text-lg" /> },
    { name: t('navbar.about'), path: '/about', icon: <FaUserCircle className="mb-1 text-lg" /> },
    { name: t('navbar.services'), path: '/services', icon: <GiSparkles className="mb-1 text-lg" /> },
    { name: 'Deeksha', path: '/deeksha', icon: <FaPrayingHands className="mb-1 text-lg" /> },
    { name: t('navbar.events'), path: '/events', icon: <FaRegCalendarAlt className="mb-1 text-lg" /> },
    { name: t('navbar.gallery'), path: '/gallery', icon: <FaImages className="mb-1 text-lg" /> },
    { name: t('navbar.live'), path: '/live', icon: <FaPlayCircle className="mb-1 text-lg" /> },
    { name: 'Admin Panel', path: '/admin/login', icon: <FaShieldAlt className="mb-1 text-lg" /> },
    { name: t('navbar.contact'), path: '/contact', icon: <FaPhoneAlt className="mb-1 text-lg" /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[80] transition-all duration-300">
        {/* 0. CONTACT BAR (phone, email & social links) — TOP */}
        <div className="bg-[#FAF0E6] text-[#3D2B20] text-[10px] xs:text-xs py-1.5 sm:py-2 px-2 sm:px-6 lg:px-8 border-b border-[#EAD8C8] flex flex-col sm:flex-row items-center justify-between gap-1 xs:gap-2 z-50">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-medium">
            <a href="tel:+918960229228" className="flex items-center space-x-1.5 hover:text-[#E05A10] transition-colors">
              <FaPhoneAlt className="text-[10px] text-[#E05A10]" />
              <span>+91 89602 29228</span>
            </a>
            <a href={`mailto:${contacts?.email || ''}`} className="flex items-center space-x-1.5 hover:text-[#E05A10] transition-colors">
              <FaEnvelope className="text-[10px] text-[#E05A10]" />
              <span className="hidden sm:inline">{contacts?.email || ''}</span>
              <span className="sm:hidden text-[10px]">Email</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-3 mt-1 sm:mt-0">
            <a href={contacts?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#E05A10] transition-colors" aria-label="Facebook">
              <FaFacebookF className="text-[11px]" />
            </a>
            <a href={contacts?.youtube || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#E05A10] transition-colors" aria-label="YouTube">
              <FaYoutube className="text-[11px]" />
            </a>
            <a href={contacts?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#E05A10] transition-colors" aria-label="Instagram">
              <FaInstagram className="text-[11px]" />
            </a>
            <a href={contacts?.whatsapp?.startsWith('http') ? contacts.whatsapp : `https://wa.me/${contacts?.whatsapp?.replace(/[^\d]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#E05A10] transition-colors" aria-label="WhatsApp">
              <FaWhatsapp className="text-[11px]" />
            </a>
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-1 sm:ml-2 px-2 py-0.5 border border-[#EAD8C8] rounded-md text-[9px] sm:text-[10px] font-bold text-[#E05A10] hover:bg-[#E05A10] hover:text-white transition-all shadow-sm"
            >
              {language === 'en' ? 'EN | HI' : 'HI | EN'}
            </button>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <nav className={`w-full transition-all duration-300 ${isScrolled
            ? 'bg-white shadow-md border-b border-[#FAF0E6] py-2'
            : 'bg-white/95 backdrop-blur-sm border-b border-[#FAF0E6] py-3'
          }`}>
          <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between">
              {/* Logo / Brand */}
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-[#D4AF37] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLogoModalOpen(true);
                  }}
                >
                  <img src={logoImg} alt="Swami Hariprapannacharya Ji" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-serif text-[14px] xs:text-[15px] sm:text-xl font-black tracking-wider text-[#3D2B20] block leading-tight">
                    स्वामी हरिप्रपन्नाचार्य जी
                  </span>
                  <span className="block text-[7px] xs:text-[8px] sm:text-[9px] tracking-widest font-semibold text-[#E05A10] uppercase sm:-mt-0.5">
                    सत्यम परं धीमहि
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`group relative flex flex-col items-center justify-center font-sans font-bold text-[12px] xl:text-[13px] tracking-wide whitespace-nowrap transition-colors duration-300 py-1.5 ${isActive(link.path)
                        ? 'text-[#E05A10]'
                        : 'text-[#5A3A22] hover:text-[#E05A10]'
                      }`}
                  >
                    <div className={`transition-transform duration-300 group-hover:-translate-y-0.5 ${isActive(link.path) ? 'text-[#E05A10]' : 'text-[#8B7355] group-hover:text-[#E05A10]'}`}>
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E05A10] rounded-full transition-all duration-300 ${isActive(link.path) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`} style={{ transformOrigin: 'left' }} />
                  </Link>
                ))}
              </div>

              <div className="hidden lg:block ml-4 xl:ml-6">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-[#E05A10] to-[#c74c0b] text-white font-sans font-bold text-[13px] xl:text-[14px] uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(224,90,16,0.39)] hover:shadow-[0_6px_20px_rgba(224,90,16,0.23)] hover:-translate-y-0.5 transition-all duration-300 border border-[#E05A10]/20 whitespace-nowrap flex items-center gap-2 group"
                >
                  <FaCalendarPlus className="text-[16px] group-hover:scale-110 transition-transform duration-300" />
                  {t('navbar.book') || 'BOOK YOUR KATHA'}
                </Link>
              </div>

              {/* Mobile Menu Button (Animated Hamburger) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative flex justify-center items-center w-11 h-11 bg-[#FFFDF7] hover:bg-[#FAF0E6] rounded-xl shadow-[0_2px_8px_rgba(224,90,16,0.08)] border border-[#EAD8C8] focus:outline-none transition-colors duration-200 z-[90] group"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  <div className="relative w-[20px] h-[14px]">
                    <span className={`absolute left-0 w-full h-[2px] bg-[#E05A10] rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-[#c74c0b] ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}></span>
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E05A10] rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-[#c74c0b] ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
                    <span className={`absolute left-0 w-full h-[2px] bg-[#E05A10] rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-[#c74c0b] ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-dark/60 z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} onClick={() => setIsOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 w-full md:w-[350px] h-[100dvh] bg-[#FFFDF7] z-[70] shadow-2xl transition-transform duration-[400ms] ease-out transform lg:hidden flex flex-col justify-between overflow-y-auto border-l border-[#EAD8C8] ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-[#FAF0E6] text-[#E05A10] rounded-full hover:bg-[#EAD8C8] transition-colors z-50 shadow-sm border border-[#EAD8C8]">
          <HiX className="text-xl" />
        </button>

        <div className="p-6 pt-[140px] overflow-y-auto flex-grow">
          {/* Navigation Links inside Mobile Drawer */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.name === 'Admin Panel' && (
                  <div className="my-2 border-t border-[#EAD8C8]/60 w-10/12 mx-auto"></div>
                )}
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between text-[15px] font-sans py-3.5 px-6 transition-all duration-300 rounded-r-2xl rounded-l-none ${isActive(link.path)
                      ? 'bg-gradient-to-r from-[#E05A10]/10 to-transparent text-[#E05A10] border-l-[4px] border-[#E05A10] font-extrabold'
                      : link.name === 'Admin Panel'
                        ? 'text-[#8B7355] hover:bg-[#FFFDF7] hover:text-[#E05A10] font-medium opacity-80'
                        : 'text-[#5A3A22] hover:bg-[#FFFDF7] hover:text-[#E05A10] hover:shadow-sm font-bold'
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 flex justify-start ${isActive(link.path) ? 'text-[#E05A10]' : 'text-[#8B7355]'}`}>
                      {React.cloneElement(link.icon, { className: 'text-[18px] mb-0' })}
                    </div>
                    <span className="ml-1 tracking-wide">{link.name}</span>
                  </div>
                  <FaChevronRight className={`text-[10px] transition-transform ${isActive(link.path) ? 'text-[#E05A10] translate-x-1' : 'text-[#8B7355]/40'}`} />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Drawer CTA */}
        <div className="p-6 bg-white border-t border-[#EAD8C8]">
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E05A10] to-[#c74c0b] text-white font-sans font-bold text-[14px] uppercase tracking-wider px-6 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(224,90,16,0.39)] transition-all duration-300"
          >
            <FaCalendarPlus className="text-xl" />
            {t('navbar.book') || 'BOOK YOUR KATHA'}
          </Link>
        </div>
      </div>

      {/* Full Screen Logo Modal */}
      {isLogoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setIsLogoModalOpen(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 md:top-6 md:right-6 text-white hover:text-saffron bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all duration-300 z-[101]"
              onClick={(e) => { e.stopPropagation(); setIsLogoModalOpen(false); }}
            >
              <HiX className="text-3xl" />
            </button>
            <img
              src={logoImg}
              alt="Swami Hariprapannacharya Ji"
              className="max-w-full max-h-[85vh] object-contain rounded-full shadow-2xl border-4 border-[#D4AF37] transform transition-transform duration-500 scale-100"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  )
}
