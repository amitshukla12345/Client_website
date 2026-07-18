import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa'

export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [regForm, setRegForm] = useState({ name: '', phone: '', count: 1 })

  const handleRegister = (e) => {
    e.preventDefault()
    setRegistered(true)
    setTimeout(() => {
      setShowModal(false)
      setRegistered(false)
      setRegForm({ name: '', phone: '', count: 1 })
    }, 3000)
  }

  return (
    <>
      <motion.div 
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="glass-card overflow-hidden group flex flex-col h-full border border-amber-500/10 hover:border-saffron/30 hover:shadow-premium-hover transition-all"
      >
        {/* Event Image Banner */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {/* Saffron Overlay Badge for Status */}
          <div className="absolute top-4 left-4 bg-saffron text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {event.status || 'Upcoming'}
          </div>
        </div>

        {/* Event Meta Details */}
        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-dark group-hover:text-saffron-dark transition-colors duration-200">
              {event.title}
            </h4>
            
            <p className="text-xs text-saffron font-medium uppercase tracking-wider">
              {event.subtitle || 'Katha By Pujya Guru Ji'}
            </p>

            <div className="grid grid-cols-1 gap-2 pt-3 text-sm text-dark-light font-light">
              <div className="flex items-center space-x-2.5">
                <FaCalendarAlt className="text-saffron text-xs flex-shrink-0" />
                <span>{event.month ? `${event.date} ${event.month}` : event.date}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <FaClock className="text-saffron text-xs flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <FaMapMarkerAlt className="text-saffron text-xs mt-1 flex-shrink-0" />
                <span className="line-clamp-2">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cream-deep">
            {/* Google Map Link Button */}
            <a 
              href={event.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 text-xs font-medium text-gold-dark hover:text-saffron border border-gold/30 hover:border-saffron rounded-full py-2.5 transition-colors"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              <span>Google Map</span>
            </a>

            {/* Register Action Button */}
            <button 
              onClick={() => setShowModal(true)}
              className="bg-saffron hover:bg-saffron-dark text-white text-xs font-medium rounded-full py-2.5 shadow-premium hover:shadow-saffron-glow transition-all"
            >
              Register Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal Popup dialog for quick Registration */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-dark-charcoal/70 backdrop-blur-sm" 
            />

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cream-light p-6 sm:p-8 rounded-3xl max-w-md w-full relative z-10 border border-gold-dark/20 shadow-2xl text-dark"
            >
              {registered ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center">
                    <FaCheckCircle className="text-5xl text-saffron animate-bounce" />
                  </div>
                  <h4 className="font-serif text-xl font-bold">Registration Successful!</h4>
                  <p className="text-sm text-dark-light">
                    You have successfully registered for **{event.title}**. A confirmation message has been sent to your phone number.
                  </p>
                  <p className="text-xs text-saffron uppercase font-bold tracking-widest animate-pulse pt-2">
                    RADHE RADHE!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-dark-light">Register for Event</h4>
                    <p className="text-xs text-saffron font-medium uppercase tracking-wider mt-1">{event.title}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={regForm.name} 
                        onChange={(e) => setRegForm({...regForm, name: e.target.value})} 
                        className="w-full bg-white border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Mobile Number</label>
                      <input 
                        type="tel" 
                        required 
                        pattern="[0-9]{10}"
                        value={regForm.phone} 
                        onChange={(e) => setRegForm({...regForm, phone: e.target.value})} 
                        className="w-full bg-white border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron"
                        placeholder="10 digit number"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Number of Attendees</label>
                      <select 
                        value={regForm.count} 
                        onChange={(e) => setRegForm({...regForm, count: parseInt(e.target.value)})} 
                        className="w-full bg-white border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button 
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-cream-deep hover:bg-cream-dark text-dark-light font-medium py-2.5 rounded-xl text-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-saffron hover:bg-saffron-dark text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-md"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
