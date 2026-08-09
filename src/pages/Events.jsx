import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { GiLotus } from 'react-icons/gi'
import { FaMapMarkerAlt, FaChevronDown, FaPhoneAlt, FaCheckCircle, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaSearch, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaRegClock, FaBookOpen } from 'react-icons/fa'
import logoImg from '../assets/images/logo.jpeg'
import EventCard from '../components/EventCard'
import CustomCalendar from '../components/CustomCalendar'
import { AppContext } from '../context/AppContext'
import eventHeroBanner from '../assets/images/event_hero_banner.png'

export default function Events() {
  const { events, calendarDates, contacts } = useContext(AppContext)
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const kathaTypeParam = queryParams.get('type')

  const categories = ['All', 'Katha', 'Bhajan']
  
  // Get current month representations
  const currentMonthDate = new Date();
  const currentMonthShort = currentMonthDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const currentMonthLong = currentMonthDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const currentMonthHindi = currentMonthDate.toLocaleString('hi-IN', { month: 'long' }); // e.g. "अगस्त"
  
  // First filter by category, then filter by current month
  const categoryFilteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);
  
  const isCurrentMonthEvent = (e) => {
    const monthStr = (e.month || '').toLowerCase();
    const dateStr = (e.date || '').toLowerCase();
    
    // Check if either the month field or the date field contains the current month
    const matchesShort = monthStr.includes(currentMonthShort) || dateStr.includes(currentMonthShort);
    const matchesLong = monthStr.includes(currentMonthLong) || dateStr.includes(currentMonthLong);
    const matchesHindi = (e.month || '').includes(currentMonthHindi) || (e.date || '').includes(currentMonthHindi);

    return matchesShort || matchesLong || matchesHindi;
  };

  const filteredEvents = categoryFilteredEvents.filter(isCurrentMonthEvent);
  const futureEvents = categoryFilteredEvents.filter(e => !isCurrentMonthEvent(e));

  const bilingualMap = {
    "ram": "राम", "राम": "ram",
    "shiv": "शिव", "शिव": "shiv",
    "katha": "कथा", "कथा": "katha",
    "bhagvat": "भागवत", "भागवत": "bhagvat",
    "bhagwat": "भागवत", "भागवत": "bhagwat",
    "sundarkand": "सुंदरकांड", "सुंदरकांड": "sundarkand",
    "krishna": "कृष्ण", "कृष्ण": "krishna",
    "devi": "देवी", "देवी": "devi",
    "bhajan": "भजन", "भजन": "bhajan",
    "shrimad": "श्रीमद्", "श्रीमद्": "shrimad",
    "uttar pradesh": "उत्तर प्रदेश", "उत्तर प्रदेश": "uttar pradesh",
    "up": "उत्तर प्रदेश",
    "madhya pradesh": "मध्य प्रदेश", "मध्य प्रदेश": "madhya pradesh",
    "mp": "मध्य प्रदेश",
    "maharashtra": "महाराष्ट्र", "महाराष्ट्र": "maharashtra",
    "gujarat": "गुजरात", "गुजरात": "gujarat",
    "rajasthan": "राजस्थान", "राजस्थान": "rajasthan",
    "bihar": "बिहार", "बिहार": "bihar",
    "delhi": "दिल्ली", "दिल्ली": "delhi"
  };

  const searchedFutureEvents = futureEvents.filter(evt => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    const t = (evt.title || '').toLowerCase();
    const v = (evt.venue || '').toLowerCase();
    
    // Direct match (searches name, location, state, district, pincode, etc.)
    if (t.includes(q) || v.includes(q)) return true;

    // Translated match (word by word mapping for English/Hindi)
    const translatedQuery = q.split(' ').map(word => bilingualMap[word] || word).join(' ');
    if (translatedQuery !== q && (t.includes(translatedQuery) || v.includes(translatedQuery))) return true;

    // Fallback: check if any word from the query matches anything in title/venue
    const queryWords = q.split(' ').filter(w => w.length > 2);
    if (queryWords.length > 0 && queryWords.some(w => t.includes(w) || v.includes(w) || t.includes(bilingualMap[w]) || v.includes(bilingualMap[w]))) {
      return true;
    }

    return false;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(searchedFutureEvents.length / itemsPerPage) || 1;
  const currentTableData = searchedFutureEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
                className={`px-6 py-2 rounded-full font-serif text-sm tracking-wider uppercase border transition-all duration-300 ${filter === cat
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

          {/* Future Events Table Section */}
          {futureEvents.length > 0 && (
            <div className="mt-24 max-w-6xl mx-auto bg-gradient-to-b from-white to-[#FFFDF7] p-6 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(224,90,16,0.15)] border border-saffron/20 relative overflow-hidden">
              {/* Subtle decorative background blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative z-10">
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-4xl font-bold text-[#3D2B20] mb-3 flex flex-col md:flex-row items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron to-[#A8440A] text-white flex items-center justify-center shadow-lg shadow-saffron/30">
                      <GiLotus className="text-2xl" />
                    </span>
                    <span>आगामी कथाएं <span className="text-saffron font-light text-3xl opacity-90">(Future Events)</span></span>
                  </h3>
                  <p className="text-[#8B7355] text-base font-medium ml-0 md:ml-16">Find our upcoming spiritual sessions and plan your journey.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80 group">
                  <input
                    type="text"
                    placeholder="Search event, city, state, or pincode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-[#3D2B20] text-[15px] font-medium border-2 border-[#F2E8D9] rounded-full py-3.5 pl-12 pr-5 outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-sm group-hover:shadow-md placeholder:text-gray-400"
                  />
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-saffron/70 text-lg transition-colors group-focus-within:text-saffron" />
                </div>
              </div>

              <div className="rounded-2xl shadow-sm border border-saffron/10 bg-white relative z-10">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#702905] via-[#A8440A] to-[#E05A10] text-white font-serif">
                        <th className="px-6 py-6 font-bold tracking-wider rounded-tl-2xl text-[16px] border-b-0">
                          <div className="flex items-center gap-2.5">
                            <FaCalendarAlt className="text-white/80" /> कथा की तिथि (Date)
                          </div>
                        </th>
                        <th className="px-6 py-6 font-bold tracking-wider text-[16px] border-b-0">
                          <div className="flex items-center gap-2.5">
                            <FaRegClock className="text-white/80" /> समय (Time)
                          </div>
                        </th>
                        <th className="px-6 py-6 font-bold tracking-wider text-[16px] border-b-0">
                          <div className="flex items-center gap-2.5">
                            <FaBookOpen className="text-white/80" /> कथा का नाम (Event)
                          </div>
                        </th>
                        <th className="px-6 py-6 font-bold tracking-wider rounded-tr-2xl text-[16px] border-b-0">
                          <div className="flex items-center gap-2.5">
                            <FaMapMarkerAlt className="text-white/80" /> कथा का स्थान (Location)
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2E8D9]">
                      {currentTableData.length > 0 ? currentTableData.map((evt, idx) => {
                        const dayStr = evt.date || '';
                        const endDayStr = evt.endDate ? ` - ${evt.endDate}` : '';
                        const monthStr = evt.month ? ` ${evt.month}` : '';
                        const fullDateString = `${dayStr}${endDayStr}${monthStr}`;
                        
                        return (
                          <tr key={idx} className="hover:bg-gradient-to-r hover:from-white hover:to-[#FFF5EB] bg-white transition-all duration-300 group relative">
                            <td className="px-6 py-6 whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                <div className="w-11 h-11 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white group-hover:shadow-md transition-all duration-300 transform group-hover:scale-110">
                                  <FaCheckCircle className="text-[18px]" />
                                </div>
                                <span className="font-bold text-[#3D2B20] text-[15px] tracking-wide group-hover:text-saffron transition-colors">{fullDateString}</span>
                              </div>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-dark-light">
                              <div className="flex items-center gap-3">
                                {evt.time && (
                                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0] flex items-center justify-center text-dark-light/60 group-hover:text-saffron group-hover:bg-saffron/10 transition-colors">
                                    <FaRegClock className="text-sm" />
                                  </div>
                                )}
                                <span className="text-[15px] font-semibold opacity-90">{evt.time || '-'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-saffron/5 flex items-center justify-center text-[#E05A10]/70 group-hover:bg-[#E05A10] group-hover:text-white transition-colors">
                                  <FaBookOpen className="text-[15px]" />
                                </div>
                                <span className="font-serif font-bold text-[#E05A10] text-[17px] drop-shadow-sm">{evt.title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-start space-x-3 text-dark-light">
                                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-saffron/60 group-hover:bg-saffron/10 flex-shrink-0 mt-0.5 transition-colors">
                                  <FaMapMarkerAlt className="text-[15px]" />
                                </div>
                                <span className="text-[15px] font-medium leading-relaxed max-w-[250px]">{evt.venue}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center text-dark-light font-medium">
                            No upcoming events found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col divide-y divide-[#F2E8D9]">
                  {currentTableData.length > 0 ? currentTableData.map((evt, idx) => {
                    const dayStr = evt.date || '';
                    const endDayStr = evt.endDate ? ` - ${evt.endDate}` : '';
                    const monthStr = evt.month ? ` ${evt.month}` : '';
                    const fullDateString = `${dayStr}${endDayStr}${monthStr}`;
                    
                    return (
                      <div key={idx} className="p-5 flex flex-col gap-3 bg-white hover:bg-[#FFF5EB] transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-saffron text-[15px] tracking-wide">{fullDateString}</span>
                          <span className="text-sm font-semibold text-dark-light opacity-90">{evt.time || '-'}</span>
                        </div>
                        <h4 className="font-serif font-bold text-[#3D2B20] text-[18px]">{evt.title}</h4>
                        <div className="flex items-start space-x-2 text-dark-light text-sm font-medium mt-1">
                          <FaMapMarkerAlt className="text-saffron mt-1 flex-shrink-0" />
                          <span>{evt.venue}</span>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="p-8 text-center text-dark-light font-medium">
                      No upcoming events found matching your search.
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 px-2 border-t border-[#F2E8D9] pt-6">
                  <span className="text-sm font-medium text-dark-light">
                    Showing <span className="text-saffron font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-saffron font-bold">{Math.min(currentPage * itemsPerPage, searchedFutureEvents.length)}</span> of <span className="text-saffron font-bold">{searchedFutureEvents.length}</span> entries
                  </span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-saffron text-saffron hover:bg-saffron hover:text-white shadow-sm'}`}
                    >
                      <FaChevronLeft className="text-xs" />
                    </button>
                    <div className="flex gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentPage === pageNum ? 'bg-saffron text-white shadow-md' : 'text-dark-light hover:bg-[#FAF6F0] hover:text-saffron'}`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-saffron text-saffron hover:bg-saffron hover:text-white shadow-sm'}`}
                    >
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2. DASHBOARD SECTION (Calendar + Upcoming Events) */}
      <section id="calendar" className="py-16 bg-[#FDFBF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16">
            <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-[#FFFDF7] to-[#FAF6F0] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(224,90,16,0.15)] border border-[#EAD8C8] overflow-hidden flex flex-col lg:flex-row relative">
              
              {/* Overall Decorative background element */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent pointer-events-none"></div>

              {/* Left Side: Info / Instructions */}
              <div className="lg:w-5/12 relative text-[#3D2B20] p-10 lg:p-12 flex flex-col justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#F2E8D9]">
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-saffron/10 rounded-full blur-[80px] -z-0 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-saffron/10 text-saffron border border-saffron/20 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                    Plan Your Event
                  </span>
                  <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    आयोजन कैलेंडर <br/>
                    <span className="text-[#E05A10] text-2xl lg:text-3xl font-light drop-shadow-sm">(Booking Calendar)</span>
                  </h3>
                  <p className="text-[#8B7355] text-base mb-8 font-medium leading-relaxed">
                    Select a highlighted date from the calendar to check availability and securely submit your booking request for an auspicious event.
                  </p>
                  
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#EAD8C8] group-hover:bg-saffron group-hover:border-saffron transition-all duration-300 shadow-sm">
                        <FaCalendarAlt className="text-saffron text-lg group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[#4A3222] font-semibold group-hover:text-saffron transition-colors">1. Select an available date</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#EAD8C8] group-hover:bg-saffron group-hover:border-saffron transition-all duration-300 shadow-sm">
                        <FaCheckCircle className="text-saffron text-lg group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[#4A3222] font-semibold group-hover:text-saffron transition-colors">2. Fill your details securely</span>
                    </div>
                    <a href={`tel:${contacts?.phone || ''}`} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#EAD8C8] group-hover:bg-[#E05A10] group-hover:border-[#E05A10] transition-all duration-300 shadow-sm group-hover:scale-105">
                        <FaPhoneAlt className="text-saffron text-lg group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[#4A3222] font-semibold group-hover:text-[#E05A10] transition-colors">3. Confirmation from Ashram</span>
                    </a>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-12 pt-8 border-t border-[#F2E8D9]">
                    <p className="text-[#8B7355] text-xs mb-4 font-bold uppercase tracking-widest">Connect With Us</p>
                    <div className="flex items-center gap-4">
                      {contacts?.facebook && (
                        <a href={contacts.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#EAD8C8] flex items-center justify-center text-[#8B7355] hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                          <FaFacebook size={18} />
                        </a>
                      )}
                      {contacts?.instagram && (
                        <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#EAD8C8] flex items-center justify-center text-[#8B7355] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                          <FaInstagram size={18} />
                        </a>
                      )}
                      {contacts?.youtube && (
                        <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#EAD8C8] flex items-center justify-center text-[#8B7355] hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                          <FaYoutube size={18} />
                        </a>
                      )}
                      {contacts?.whatsapp && (
                        <a href={`https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#EAD8C8] flex items-center justify-center text-[#8B7355] hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                          <FaWhatsapp size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Calendar */}
              <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col items-center justify-center relative">
                
                <div className="w-full max-w-lg relative z-10 bg-[#FFFDF7] p-8 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] border border-[#EAD8C8]">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
