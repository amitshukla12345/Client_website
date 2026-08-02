import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaYoutube, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
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

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.services'), path: '/services' },
    { name: 'Deeksha', path: '/deeksha' },
    { name: t('navbar.events'), path: '/events' },
    { name: t('navbar.gallery'), path: '/gallery' },
    { name: t('navbar.live'), path: '/live' },
    { name: 'Admin Panel', path: '/admin/login' },
    { name: t('navbar.contact'), path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* 0. CONTACT BAR (phone, email & social links) — TOP */}
        <div className="bg-[#FAF0E6] text-[#3D2B20] text-[10px] xs:text-xs py-1.5 sm:py-2 px-2 sm:px-6 lg:px-8 border-b border-[#EAD8C8] flex flex-col sm:flex-row items-center justify-between gap-1 xs:gap-2 z-50">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-medium">
            <a href="tel:+918960292928" className="flex items-center space-x-1.5 hover:text-[#E05A10] transition-colors">
              <FaPhoneAlt className="text-[10px] text-[#E05A10]" />
              <span>+91 89602 92928</span>
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
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative font-sans font-bold text-[13px] tracking-wide whitespace-nowrap transition-colors duration-200 hover:text-[#E05A10] py-1 ${isActive(link.path)
                        ? 'text-[#E05A10]'
                        : 'text-[#3D2B20]'
                      }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E05A10] rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="hidden lg:block">
                <Link
                  to="/contact"
                  className="bg-[#E05A10] hover:bg-[#c94d0d] text-white font-sans font-bold text-[13px] uppercase tracking-wider px-6 py-2.5 rounded shadow hover:-translate-y-0.5 transition-all duration-300 border border-[#c94d0d]/20 whitespace-nowrap"
                >
                  {t('navbar.book')}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-[#3D2B20] hover:bg-[#FAF0E6] focus:outline-none transition-colors"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
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
      <div className={`fixed top-0 right-0 w-full h-[100dvh] bg-cream-light z-[70] shadow-2xl transition-transform duration-300 transform lg:hidden flex flex-col justify-between overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex items-center justify-between border-b border-gold/30 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <div
                className="w-10 h-10 overflow-hidden rounded-full shadow-md border border-[#D4AF37] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLogoModalOpen(true);
                }}
              >
                <img src={logoImg} alt="Swami Hariprapannacharya Ji" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-base font-bold text-dark tracking-wide block">स्वामी हरिप्रपन्नाचार्य जी</span>
                <span className="block text-[8px] tracking-widest text-saffron uppercase font-bold">सत्यम परं धीमहि</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-gold/30 hover:bg-saffron/10 text-dark hover:text-saffron transition-colors"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          {/* Navigation Links inside Mobile Drawer */}
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-serif font-bold py-2.5 px-3 rounded-lg transition-all duration-200 ${isActive(link.path)
                    ? 'bg-saffron/10 text-saffron border-l-4 border-saffron'
                    : 'text-dark hover:bg-cream hover:text-saffron'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer CTA */}
        <div className="p-6 bg-cream border-t border-gold/30 space-y-3">
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full block text-center bg-[#E05A10] hover:bg-[#c94d0d] text-white font-sans font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            {t('navbar.book')}
          </Link>
          <div className="flex items-center justify-center space-x-2 text-xs text-dark pt-2">
            <FaPhoneAlt className="text-saffron text-[10px]" />
            <span>Contact: +91 89602 92928</span>
          </div>
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
