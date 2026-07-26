import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { GiLotus } from 'react-icons/gi'
import { FaMapMarkerAlt, FaChevronDown, FaPhoneAlt, FaCheckCircle, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import logoImg from '../assets/images/logo.jpeg'
import EventCard from '../components/EventCard'
import CustomCalendar from '../components/CustomCalendar'
import { AppContext } from '../context/AppContext'
import eventHeroBanner from '../assets/images/event_hero_banner.png'

export default function Events() {
  const { events, calendarDates, contacts } = useContext(AppContext)
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const kathaTypeParam = queryParams.get('type')

  const categories = ['All', 'Katha', 'Bhajan']
  const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter)

  return (
    <div className="pt-[90px] lg:pt-[104px] pb-20 bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20">
        <img src={eventHeroBanner} alt="Events Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Main Content & Filter Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-serif text-sm tracking-wider uppercase border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-saffron text-white border-saffron shadow-md'
                    : 'bg-white text-dark-light border-gold/20 hover:bg-cream-dark'
                }`}
              >
                {cat === 'All' ? 'All Events' : cat === 'Katha' ? 'Scriptural Kathas' : 'Bhajan Sandhyas'}
              </button>
            ))}
          </div>

          {/* Events Grid layout */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((evt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <EventCard event={evt} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <GiLotus className="text-4xl text-gold mx-auto animate-spin" style={{ animationDuration: '10s' }} />
              <h4 className="font-serif text-xl font-bold">No Events Found</h4>
              <p className="text-sm text-dark-light max-w-md mx-auto font-light">
                There are no scheduled programs in this category at this time. Please check back later or subscribe to our newsletter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. DASHBOARD SECTION (Calendar + Upcoming Events) */}
      <section id="calendar" className="py-16 bg-[#FDFBF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Left: Calendar Card */}
            <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-[#F2E8D9] p-6 lg:p-8">
              <h3 className="font-serif text-[22px] font-bold text-[#4A3222] mb-6">आयोजन कैलेंडर</h3>
              <div className="max-w-md mx-auto">
                <CustomCalendar 
                  calendarDates={calendarDates} 
                  onDateSelect={(dateStr) => {
                    let targetUrl = `/book?date=${dateStr}`
                    if (kathaTypeParam) {
                      targetUrl += `&type=${encodeURIComponent(kathaTypeParam)}`
                    }
                    navigate(targetUrl)
                  }}
                />
              </div>
            </div>

            {/* Right: Upcoming Events List */}
            <div className="w-full lg:w-2/5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-[#F2E8D9] p-6 lg:p-8 flex flex-col">
              <h3 className="font-serif text-[22px] font-bold text-[#4A3222] mb-6">इस महीने के प्रमुख आयोजन</h3>
              
              <div className="flex-grow space-y-5">
                {events.slice(0, 3).map((evt, idx) => {
                  const day = evt.date;
                  const month = evt.month;
                  
                  return (
                    <div key={idx} className="flex items-center gap-4 pb-4 border-b border-[#F2E8D9] last:border-0 last:pb-0">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-gold/20">
                        <img src={evt.image || logoImg} alt={evt.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center min-w-[50px] max-w-[80px] flex-shrink-0 border-r border-[#F2E8D9] pr-3 mr-1 text-center break-words">
                        <span className="text-[#E05A10] font-bold text-xl leading-tight">{day}</span>
                        {month && <span className="text-[#E05A10] text-[10px] font-bold uppercase tracking-wider mt-1">{month}</span>}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-[#3D2B20] text-[15px] truncate">{evt.title}</h4>
                        {evt.venue && (
                          <p className="text-[#8B7355] text-[11px] flex items-center gap-1.5 mt-1 truncate">
                            <FaMapMarkerAlt className="text-[#E05A10]" /> {evt.venue}
                          </p>
                        )}
                      </div>
                      
                      {/* Time */}
                      <div className="text-right flex-shrink-0 max-w-[100px]">
                        <span className="text-[10px] text-[#8B7355] font-medium leading-tight">{evt.time}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* View All Button */}
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} 
                className="w-full mt-6 py-3 rounded-xl border border-[#EAD8C8] text-[#5A3A22] font-semibold text-sm hover:bg-[#FDF9F1] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
              >
                View All Events <FaChevronDown size={12} className="-rotate-90" />
              </button>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="relative w-full bg-gradient-to-r from-[#FFF6E5] to-[#FDE8D0] rounded-2xl overflow-hidden shadow-sm border border-[#F2E8D9] p-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="relative z-10">
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#4A3222] mb-2">अपना कार्यक्रम बुक करें</h2>
              <p className="text-[#8B7355] text-sm lg:text-[15px] mb-5">अभी संपर्क करें और तिथि/समय का निर्धारण करवाएं</p>
              
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs lg:text-[13px] font-semibold text-[#5A3A22]">
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-[#E05A10]" /> व्यक्तिगत मार्गदर्शन</span>
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-[#E05A10]" /> संपूर्ण पूजन</span>
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-[#E05A10]" /> शुभ एवं पवित्र वातावरण</span>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="relative z-10 flex flex-col items-center min-w-[200px]">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-[#E05A10] hover:bg-[#c74c0b] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 mb-3 w-full justify-center text-lg"
              >
                <FaPhoneAlt /> Contact Us
              </button>
              
              <div className="flex items-center gap-4 mb-2">
                <a href={contacts?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-[#8B7355] hover:text-[#E05A10] transition-colors"><FaFacebook size={20} /></a>
                <a href={contacts?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-[#8B7355] hover:text-[#E05A10] transition-colors"><FaInstagram size={20} /></a>
                <a href={contacts?.youtube || '#'} target="_blank" rel="noopener noreferrer" className="text-[#8B7355] hover:text-[#E05A10] transition-colors"><FaYoutube size={20} /></a>
                <a href={`https://wa.me/${contacts?.whatsapp?.replace(/[^0-9]/g, '') || '918960292928'}`} target="_blank" rel="noopener noreferrer" className="text-[#8B7355] hover:text-[#E05A10] transition-colors"><FaWhatsapp size={20} /></a>
              </div>
              <span className="text-[11px] text-[#8B7355] font-medium">हमसे सोशल मीडिया पर जुड़ें</span>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
