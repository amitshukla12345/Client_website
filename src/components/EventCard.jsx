import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle, FaTicketAlt } from 'react-icons/fa'

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
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white rounded-3xl overflow-hidden group flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(224,90,16,0.15)] border border-[#EAD8C8] relative"
      >
        {/* Hover Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E05A10] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-md"></div>

        {/* Event Image Banner */}
        <div className="relative h-60 overflow-hidden rounded-t-3xl">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-[#E05A10] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-[#E05A10]/20">
            {event.status || 'Upcoming'}
          </div>
        </div>

        {/* Event Meta Details */}
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-5 bg-white relative z-20">
          <div className="space-y-3">
            <h4 className="font-serif text-2xl font-bold text-[#3D2B20] group-hover:text-[#E05A10] transition-colors duration-300 leading-tight">
              {event.title}
            </h4>
            
            <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">
              {event.subtitle || 'Katha By Pujya Guru Ji'}
            </p>

            <div className="flex flex-col gap-3 pt-3 text-sm text-[#3D2B20]/80">
              {/* Date & Time Row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 group/item">
                  <div className="p-1.5 rounded-lg bg-[#FAF0E6] text-[#E05A10] group-hover/item:bg-[#E05A10] group-hover/item:text-white transition-colors">
                    <FaCalendarAlt className="text-xs" />
                  </div>
                  <span className="font-semibold">{event.month ? `${event.date} ${event.month}` : event.date}</span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-[#E05A10]/30 hidden sm:block"></div>
                
                <div className="flex items-center gap-2 group/item">
                  <div className="p-1.5 rounded-lg bg-[#FAF0E6] text-[#E05A10] group-hover/item:bg-[#E05A10] group-hover/item:text-white transition-colors">
                    <FaClock className="text-xs" />
                  </div>
                  <span className="font-semibold">{event.time}</span>
                </div>
              </div>

              {/* Location Row */}
              <div className="flex items-start gap-2.5 mt-1 group/item">
                <div className="p-1.5 rounded-lg bg-[#FAF0E6] text-[#E05A10] group-hover/item:bg-[#E05A10] group-hover/item:text-white transition-colors shrink-0">
                  <FaMapMarkerAlt className="text-xs" />
                </div>
                <span className="font-medium leading-relaxed mt-0.5 line-clamp-2">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#FAF0E6]">
            {/* Google Map Link Button */}
            <a 
              href={event.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 text-sm font-bold text-[#3D2B20]/70 hover:text-[#E05A10] bg-white border-2 border-[#EAD8C8] hover:border-[#E05A10] rounded-xl py-3 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(224,90,16,0.15)] group/map"
            >
              <FaExternalLinkAlt className="text-xs group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5 transition-transform" />
              <span>Location</span>
            </a>

            {/* Register Action Button */}
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#E05A10] to-[#D4AF37] hover:from-[#c74c0b] hover:to-[#BFA030] text-white text-sm font-bold rounded-xl py-3 shadow-[0_8px_20px_rgba(224,90,16,0.3)] hover:shadow-[0_12px_25px_rgba(224,90,16,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaTicketAlt className="text-xs" />
              <span>Register</span>
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
              className="fixed inset-0 bg-[#3D2B20]/60 backdrop-blur-md" 
            />

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-8 rounded-[2rem] max-w-md w-full relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#EAD8C8] overflow-hidden"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#E05A10]/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

              {registered ? (
                <div className="text-center py-10 space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <div className="bg-green-50 p-4 rounded-full">
                      <FaCheckCircle className="text-6xl text-green-500 animate-bounce" />
                    </div>
                  </div>
                  <h4 className="font-serif text-2xl font-black text-[#3D2B20]">Registration Confirmed!</h4>
                  <p className="text-[#3D2B20]/70 font-medium leading-relaxed">
                    You have successfully registered for <br/><span className="text-[#E05A10] font-bold">{event.title}</span>.<br/>A confirmation message has been sent to your phone.
                  </p>
                  <p className="text-sm text-[#D4AF37] uppercase font-black tracking-widest animate-pulse pt-4">
                    RADHE RADHE!
                  </p>
                </div>
              ) : (
                <div className="space-y-8 relative z-10">
                  <div className="text-center">
                    <div className="inline-block bg-[#FAF6F0] text-[#E05A10] p-3 rounded-full mb-4 shadow-sm border border-[#EAD8C8]">
                      <FaTicketAlt className="text-2xl" />
                    </div>
                    <h4 className="font-serif text-2xl font-black text-[#3D2B20]">Reserve Your Seat</h4>
                    <p className="text-xs text-[#E05A10] font-bold uppercase tracking-widest mt-2 bg-[#E05A10]/10 inline-block px-3 py-1 rounded-full">{event.title}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={regForm.name} 
                        onChange={(e) => setRegForm({...regForm, name: e.target.value})} 
                        className="w-full bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all text-[#3D2B20] font-medium"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest">Mobile Number</label>
                      <input 
                        type="tel" 
                        required 
                        pattern="[0-9]{10}"
                        value={regForm.phone} 
                        onChange={(e) => setRegForm({...regForm, phone: e.target.value})} 
                        className="w-full bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all text-[#3D2B20] font-medium"
                        placeholder="10 digit number"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest">Attendees</label>
                      <select 
                        value={regForm.count} 
                        onChange={(e) => setRegForm({...regForm, count: parseInt(e.target.value)})} 
                        className="w-full bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all text-[#3D2B20] font-medium appearance-none cursor-pointer"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4 flex space-x-4">
                      <button 
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-white hover:bg-[#FAF6F0] text-[#3D2B20]/70 border-2 border-[#EAD8C8] font-bold py-3 rounded-xl text-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#E05A10] to-[#D4AF37] hover:from-[#c74c0b] hover:to-[#BFA030] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-[0_8px_20px_rgba(224,90,16,0.3)] hover:shadow-[0_12px_25px_rgba(224,90,16,0.4)] hover:-translate-y-0.5"
                      >
                        Confirm Booking
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

