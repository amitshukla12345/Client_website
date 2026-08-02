import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube, FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import logoImg from '../assets/images/logo.jpeg'

export default function Footer() {
  const { contacts } = useContext(AppContext)
  return (
    <footer className="bg-dark-charcoal text-cream-deep pt-20 pb-8 relative overflow-hidden border-t-2 border-gold/30">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark"></div>

      {/* Decorative Gold Mandala Grid Backing */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 overflow-hidden rounded-xl border border-gold-dark">
                <img src={logoImg} alt="Swami Hariprapannacharya Ji" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-xl font-extrabold tracking-wider text-white uppercase block leading-tight">
                  स्वामी हरिप्रपन्नाचार्य जी
                </span>
                <span className="block text-[8px] tracking-[0.25em] font-medium text-saffron uppercase mt-1">
                  सत्यम परं धीमहि
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream-deep/70 leading-relaxed font-light">
              Spreading the divine essence of Shrimad Bhagvat Mahapuran, Sri Ram Katha, and Shiv Leela under the holy guidance of Pujya Guru Ji. Join us in this spiritual awakening.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href={contacts?.youtube || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-gold transition-all duration-300 hover:-translate-y-1 border border-gold/20" aria-label="YouTube">
                <FaYoutube className="text-lg" />
              </a>
              <a href={contacts?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gold transition-all duration-300 hover:-translate-y-1 border border-gold/20" aria-label="Facebook">
                <FaFacebookF className="text-md" />
              </a>
              <a href={contacts?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white flex items-center justify-center text-gold transition-all duration-300 hover:-translate-y-1 border border-gold/20" aria-label="Instagram">
                <FaInstagram className="text-lg" />
              </a>
              <a href={contacts?.whatsapp?.startsWith('http') ? contacts.whatsapp : `https://wa.me/${contacts?.whatsapp?.replace(/[^\d]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-600 hover:text-white flex items-center justify-center text-gold transition-all duration-300 hover:-translate-y-1 border border-gold/20" aria-label="WhatsApp">
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-white relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-saffron after:mt-2">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li>
                <Link to="/" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">About Guru Ji</Link>
              </li>
              <li>
                <Link to="/services" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Katha Services</Link>
              </li>
              <li>
                <Link to="/events" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Gallery</Link>
              </li>
              <li>
                <Link to="/live" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Live Stream</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-deep/70 hover:text-saffron transition-colors duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-white relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-saffron after:mt-2">
              Spiritual Center
            </h3>
            <ul className="space-y-4 text-sm font-light text-cream-deep/70">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-saffron text-lg mt-0.5 flex-shrink-0" />
                <span className="break-words w-full">राज राजेश्वरी महाशक्तिपीठ आश्रम चक्रसुदर्शनपूरी धनुपुर हंडिया प्रयागराज 221503</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-saffron text-sm flex-shrink-0" />
                <span>+91 89602 92928</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-saffron text-sm flex-shrink-0" />
                <span className="break-all">{contacts?.email || ''}</span>
              </li>
            </ul>
          </div>

          {/* Sanskrit Quote / Message */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-white relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-saffron after:mt-2">
              Divine Quote
            </h3>
            <div className="bg-white/5 border border-gold-dark/20 p-5 rounded-2xl space-y-3">
              <p className="font-serif text-saffron text-center text-sm font-semibold italic">
                "वासुदेवसुतं देवं कंसचाणूरमर्दनम् ।<br />
                देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम् ॥"
              </p>
              <p className="text-xs text-cream-deep/50 text-center leading-relaxed font-light">
                Salutations to Lord Krishna, the supreme Guru of the universe, the son of Vasudeva, who gave ultimate joy to mother Devaki.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream-deep/50 font-light">
          <p>© {new Date().getFullYear()} Shrimad Bhagvat Katha. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-saffron transition-colors">Terms & Conditions</a>
            <Link to="/admin/login" className="text-saffron hover:underline font-bold transition-all">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
