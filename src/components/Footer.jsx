import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube, FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import logoImg from '../assets/images/logo.jpeg'

export default function Footer() {
  const { contacts } = useContext(AppContext)
  
  return (
    <footer className="bg-[#2A1E17] text-[#FAF6F0] pt-16 pb-6 relative overflow-hidden border-t border-[#D4AF37]/30">
      
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          
          {/* COLUMN 1: Brand & Social */}
          <div className="space-y-6 flex flex-col order-1">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-[55px] h-[55px] overflow-hidden rounded-xl border border-[#D4AF37]/50 shadow-sm group-hover:border-[#E05A10] transition-colors flex-shrink-0">
                <img src={logoImg} alt="Swami Hariprapannacharya Ji" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-[19px] sm:text-[21px] font-extrabold tracking-wide text-white uppercase block leading-tight">
                  स्वामी हरिप्रपन्नाचार्य जी
                </span>
                <span className="block text-[9px] tracking-[0.2em] font-bold text-[#E05A10] uppercase mt-0.5">
                  सत्यम परं धीमहि
                </span>
              </div>
            </Link>

            <p className="text-[14.5px] text-[#FAF6F0]/80 leading-relaxed font-medium">
              Spreading the divine essence of Shrimad Bhagwat Mahapurana, Shri Ram Katha, and Shiv Leela under the holy guidance of Pujya Guru Ji. Join us in this spiritual awakening.
            </p>

            {/* Social Icons Desktop & Mobile */}
            <div className="flex items-center space-x-3 pt-2">
              {contacts?.youtube && (
                <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A120E]/50 flex items-center justify-center text-[#FAF6F0] transition-all duration-200 hover:-translate-y-1 hover:bg-[#E05A10] hover:text-white border border-[#D4AF37]/40 hover:border-transparent shadow-sm" aria-label="YouTube">
                  <FaYoutube className="text-[17px]" />
                </a>
              )}
              {contacts?.facebook && (
                <a href={contacts.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A120E]/50 flex items-center justify-center text-[#FAF6F0] transition-all duration-200 hover:-translate-y-1 hover:bg-[#E05A10] hover:text-white border border-[#D4AF37]/40 hover:border-transparent shadow-sm" aria-label="Facebook">
                  <FaFacebookF className="text-[15px]" />
                </a>
              )}
              {contacts?.instagram && (
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A120E]/50 flex items-center justify-center text-[#FAF6F0] transition-all duration-200 hover:-translate-y-1 hover:bg-[#E05A10] hover:text-white border border-[#D4AF37]/40 hover:border-transparent shadow-sm" aria-label="Instagram">
                  <FaInstagram className="text-[17px]" />
                </a>
              )}
              {contacts?.whatsapp && (
                <a href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A120E]/50 flex items-center justify-center text-[#FAF6F0] transition-all duration-200 hover:-translate-y-1 hover:bg-[#E05A10] hover:text-white border border-[#D4AF37]/40 hover:border-transparent shadow-sm" aria-label="WhatsApp">
                  <FaWhatsapp className="text-[18px]" />
                </a>
              )}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="space-y-6 flex flex-col order-2">
            <h3 className="font-serif text-[17px] font-bold text-white uppercase tracking-wider relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#E05A10] after:mt-2.5">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3.5 text-[14.5px] font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Guru Ji', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Deeksha', path: '/deeksha' },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Live Katha', path: '/live' },
                { name: 'Contact', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-[#FAF6F0]/80 hover:text-[#E05A10] transition-all duration-200 inline-flex items-center group py-1">
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Spiritual Center */}
          <div className="space-y-6 flex flex-col order-3">
            <h3 className="font-serif text-[17px] font-bold text-white uppercase tracking-wider relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#E05A10] after:mt-2.5">
              Spiritual Center
            </h3>
            <ul className="space-y-5 text-[14.5px] font-medium text-[#FAF6F0]/80">
              <li className="flex items-start space-x-3.5 group">
                <FaMapMarkerAlt className="text-[#D4AF37] text-[17px] mt-1 flex-shrink-0 group-hover:text-[#E05A10] transition-colors" />
                <span className="leading-relaxed pr-2">राज राजेश्वरी महाशक्तिपीठ आश्रम चक्रसुदर्शनपूरी धनुपुर हंडिया प्रयागराज 221503</span>
              </li>
              <li className="flex items-center space-x-3.5 group">
                <FaPhoneAlt className="text-[#D4AF37] text-[15px] flex-shrink-0 group-hover:text-[#E05A10] transition-colors" />
                <span className="leading-relaxed tracking-wide">{contacts?.phone || '+91 89602 92928'}</span>
              </li>
              <li className="flex items-center space-x-3.5 group">
                <FaEnvelope className="text-[#D4AF37] text-[15px] flex-shrink-0 group-hover:text-[#E05A10] transition-colors" />
                <span className="leading-relaxed break-all">{contacts?.email || 'contact@shrimadkatha.com'}</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Divine Quote */}
          <div className="space-y-6 flex flex-col order-4 w-full">
            <h3 className="font-serif text-[17px] font-bold text-white uppercase tracking-wider relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#E05A10] after:mt-2.5">
              Divine Quote
            </h3>
            <div className="bg-[#1A120E]/40 border border-[#D4AF37]/30 p-5 sm:p-6 rounded-2xl shadow-inner space-y-4 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
              <p className="font-serif text-[#D4AF37] text-center text-[15px] sm:text-[16px] font-bold italic leading-relaxed drop-shadow-sm">
                "वासुदेवसुतं देवं<br /> कंसचाणूरमर्दनम् ।<br />
                देवकीपरमानन्दं<br /> कृष्णं वन्दे जगद्गुरुम् ॥"
              </p>
              <div className="w-10 h-[1px] bg-[#E05A10]/50 mx-auto"></div>
              <p className="text-[12.5px] sm:text-[13px] text-[#FAF6F0]/70 text-center leading-relaxed font-medium">
                Salutations to Lord Krishna, the supreme Guru of the universe, the son of Vasudeva, who gave ultimate joy to mother Devaki.
              </p>
            </div>
          </div>

        </div>

        {/* Divider & Bottom Copyright Bar */}
        <div className="border-t border-[#D4AF37]/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-[13px] text-[#FAF6F0]/60 font-medium space-y-4 md:space-y-0">
            <p className="text-center md:text-left">© {new Date().getFullYear()} Shrimad Bhagwat Katha. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-5 gap-y-2">
              <Link to="/privacy" className="hover:text-[#FAF6F0] transition-colors duration-200">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#FAF6F0] transition-colors duration-200">Terms & Conditions</Link>
              <Link to="/admin/login" className="text-[#E05A10] hover:text-[#FAF6F0] transition-colors duration-200 font-bold ml-1 flex items-center group">
                Admin Panel <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
