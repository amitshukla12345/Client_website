import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { GiLotus } from 'react-icons/gi'
import EventCard from '../components/EventCard'
import CustomCalendar from '../components/CustomCalendar'
import { AppContext } from '../context/AppContext'
import eventHeroBanner from '../assets/images/event_hero_banner.png'

export default function Events() {
  const { events, calendarDates } = useContext(AppContext)
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const kathaTypeParam = queryParams.get('type')

  const categories = ['All', 'Katha', 'Bhajan']
  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter)

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

      {/* 2. CALENDAR SECTION */}
      <section id="calendar" className="py-24 bg-[#FCF9F2] border-t border-[#EAD8C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E05A10] flex items-center justify-center space-x-2">
              <GiLotus />
              <span>Katha Booking Calendar</span>
              <GiLotus />
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#3D2B20] mt-1">
              तिथि उपलब्धता कैलेंडर
            </h2>
            <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          <div className="max-w-xl mx-auto">
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
      </section>
    </div>
  )
}
