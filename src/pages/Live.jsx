import React, { useContext } from 'react'
import { GiLotus, GiSoundWaves } from 'react-icons/gi'
import { FaYoutube, FaExternalLinkAlt, FaPlayCircle, FaInstagram, FaFacebookF, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCalendarDay, FaChevronRight } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'

export default function Live() {
  const { contacts, galleryVideos, liveSettings } = useContext(AppContext)

  const validVideos = galleryVideos ? galleryVideos.filter(v => v.videoId) : [];
  const latestVideoId = validVideos.length > 0
    ? [...validVideos].sort((a, b) => b.id - a.id)[0].videoId
    : null;

  const galleryLiveLink = latestVideoId
    ? (latestVideoId.startsWith('http') ? latestVideoId : `https://youtube.com/watch?v=${latestVideoId}`)
    : null;

  const liveLink = liveSettings?.youtubeLiveUrl 
    || galleryLiveLink
    || contacts.liveKathaLink
    || 'https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8';

  // Extract YouTube Video ID for iframe embed
  const getYoutubeVideoId = (url) => {
    if(!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  const embedVideoId = getYoutubeVideoId(liveLink);

  const handleWatchLive = () => {
    window.open(liveLink, '_blank', 'noopener,noreferrer')
  }

  const formatHindiDateObj = (dateStr) => {
    if (!dateStr) return { date: '', day: '' };
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const dateObj = new Date(dateStr);
      const date = dateObj.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      const day = dateObj.toLocaleDateString('hi-IN', { weekday: 'long' });
      return { date, day };
    }
    return { date: dateStr, day: '' };
  }

  const formatTimeObj = (timeStr) => {
    if(!timeStr) return { top: '', bottom: '' };
    const match = timeStr.match(/(.*?(?:AM|PM|am|pm))(.*)/);
    if(match && match[2].trim()) {
      return { top: match[1].trim(), bottom: match[2].trim() };
    }
    return { top: timeStr, bottom: '' };
  }

  const formatLocationObj = (locStr) => {
    if(!locStr) return { top: '', bottom: '' };
    const parts = locStr.split(',');
    if(parts.length > 1) {
       return { top: parts[0] + ',', bottom: parts.slice(1).join(',').trim() };
    }
    return { top: locStr, bottom: '' };
  }

  const isLive = liveSettings?.isLive === true;

  return (
    <div className="bg-[#FCF8F2] min-h-screen pt-[20px] lg:pt-[30px] pb-0 font-sans">
      
      {/* 1. LARGE LIVE KATHA HERO */}
      {liveSettings?.heroEnabled && (
        <section className="relative w-full overflow-hidden min-h-[500px] lg:min-h-[600px] shadow-2xl">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-300"
            style={{ 
              backgroundImage: `url(${liveSettings.bgImage})`,
              filter: `brightness(${liveSettings.bgBrightness || 100}%)`
            }}
          ></div>
          
          {/* Overlay Opacity */}
          <div 
            className="absolute inset-0 bg-black transition-all duration-300"
            style={{ opacity: (liveSettings.overlayOpacity !== undefined ? liveSettings.overlayOpacity : 30) / 100 }}
          ></div>

          {/* Guru Ji Image */}
          {liveSettings.guruImage && (
            <div className={`absolute bottom-0 h-[80%] lg:h-[90%] z-10 transition-all duration-500 ${liveSettings.guruPos === 'left' ? 'left-4 lg:left-32' : 'right-4 lg:right-32'}`}>
              <img src={liveSettings.guruImage} alt="Guru" className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
            </div>
          )}

          {/* Text Content */}
          <div className={`relative z-20 w-full h-full min-h-[500px] lg:min-h-[600px] pt-16 pb-12 px-6 lg:px-20 flex flex-col justify-center transition-all duration-500 
            ${liveSettings.textAlign === 'center' ? 'items-center text-center' : 'items-start text-left'}
            ${liveSettings.guruImage ? (liveSettings.guruPos === 'left' ? 'pl-[45%] lg:pl-[40%]' : 'pr-[45%] lg:pr-[40%]') : ''}
          `}>
            
            {/* Live Badge */}
            {isLive && (
              <div className="bg-red-600/90 text-white text-xs lg:text-sm font-bold px-5 py-2 rounded-full inline-flex items-center gap-3 mb-6 w-fit shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-white relative"></span>
                LIVE NOW
              </div>
            )}
            
            <p className="text-[#F9E79F] font-bold text-sm lg:text-xl tracking-widest drop-shadow-md whitespace-nowrap mb-3">{liveSettings.topText}</p>
            <h1 className="text-white font-serif font-black text-4xl lg:text-7xl mt-1 drop-shadow-2xl leading-tight uppercase shadow-black tracking-wide">{liveSettings.bannerTitle}</h1>
            <p className="text-white/95 text-base lg:text-2xl mt-5 font-medium drop-shadow-md leading-relaxed max-w-3xl">{liveSettings.bannerSubtitle}</p>
            
            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 w-full ${liveSettings.textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
              {liveSettings.primaryBtnText && (
                <a href={liveSettings.primaryBtnUrl || liveLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#D35400] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D35400] text-white text-base lg:text-lg px-8 py-4 rounded-xl font-bold shadow-xl flex items-center justify-center border border-white/20 transition-all hover:scale-105 hover:shadow-2xl">
                  {isLive && <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse mr-3"></span>}
                  {liveSettings.primaryBtnText}
                </a>
              )}
              {liveSettings.secondaryBtnText && (
                <a href={liveSettings.secondaryBtnUrl || contacts.youtube} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-base lg:text-lg px-8 py-4 rounded-xl font-bold shadow-xl flex items-center justify-center transition-all hover:scale-105">
                  <FaYoutube className="mr-3 text-2xl text-[#E67E22]" /> {liveSettings.secondaryBtnText}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. LIVE TICKER */}
      {liveSettings?.marqueeEnabled !== false && (liveSettings?.marqueeText ?? 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम') !== '' && (
        <section className="w-full bg-gradient-to-r from-[#E05A10] via-[#D35400] to-[#E05A10] text-white py-3.5 border-y border-[#D4AF37]/50 overflow-hidden shadow-md relative z-20">
          <div className="flex items-center w-full">
            <div className="bg-[#8A2900] px-4 py-3.5 absolute left-0 z-30 flex items-center shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
               <GiSoundWaves className="text-[#F9E79F] text-xl animate-pulse" />
            </div>
            <marquee behavior="scroll" direction="left" scrollamount="5" className="w-full pl-16 font-bold text-sm md:text-base tracking-wider whitespace-nowrap drop-shadow-sm flex items-center group cursor-default" onMouseOver={e => e.target.stop()} onMouseOut={e => e.target.start()}>
              {Array(10).fill(0).map((_, i) => (
                <span key={i} className="mx-10 inline-flex items-center">
                  <GiLotus className="mr-3 text-[#F9E79F] opacity-70" /> 
                  <span dangerouslySetInnerHTML={{ __html: liveSettings?.marqueeText ?? 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम' }}></span>
                </span>
              ))}
            </marquee>
          </div>
        </section>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        
        {/* 4. MAIN LIVE VIDEO + CURRENT PRASANG SECTION */}
        <section className="flex flex-col lg:flex-row gap-8">
          
          {/* LARGE LIVE VIDEO */}
          <div className="w-full lg:w-[68%]">
            {isLive && embedVideoId ? (
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${embedVideoId}?autoplay=1&mute=0`}
                  title="Live Katha Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                ></iframe>
              </div>
            ) : (
              <div className="w-full min-h-[300px] sm:min-h-[400px] lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#EAD8C8] bg-white flex flex-col items-center justify-center p-8 sm:p-12 text-center relative">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E05A10] to-[#D4AF37]"></div>
                 <FaPlayCircle className="text-5xl sm:text-6xl text-gray-200 mb-4 sm:mb-6" />
                 <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#3D2B20] mb-3 sm:mb-4 leading-tight">कथा अभी Live नहीं है</h2>
                 <p className="text-[#8B5A2B] text-base sm:text-lg lg:text-xl font-medium mb-6 sm:mb-8 leading-relaxed">अगली कथा के लिए हमारे साथ जुड़े रहें</p>
                 <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="bg-[#E05A10] hover:bg-[#D35400] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg flex items-center transition-all hover:scale-105 text-sm sm:text-base">
                   <FaYoutube className="mr-2 sm:mr-3 text-lg sm:text-xl" /> UPCOMING KATHA
                 </a>
              </div>
            )}
          </div>

          {/* CURRENT PRASANG CARD */}
          <div className="w-full lg:w-[32%] flex flex-col">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[#EAD8C8] flex-grow flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF0E6] rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#FCF5EB] flex items-center justify-center border border-[#EAD8C8]">
                  <GiLotus className="text-[#E05A10] text-xl" />
                </div>
                <h3 className="font-serif font-black text-xl lg:text-2xl text-[#3D2B20] uppercase tracking-wide">वर्तमान प्रसंग</h3>
              </div>

              <div className="flex-grow flex flex-col justify-center space-y-6 relative z-10">
                <div>
                  <h4 className="text-sm font-bold text-[#E05A10] uppercase tracking-widest mb-2">कथा का नाम</h4>
                  <p className="font-serif text-2xl lg:text-3xl font-black text-[#3D2B20] leading-tight">
                    {liveSettings?.eventTopic || 'श्रीमद् भागवत कथा'}
                  </p>
                </div>
                
                <div className="w-16 h-px bg-[#EAD8C8]"></div>
                
                <div>
                  <h4 className="text-sm font-bold text-[#E05A10] uppercase tracking-widest mb-2">दिवस</h4>
                  <p className="text-xl font-bold text-[#8B5A2B]">
                    {liveSettings?.eventDay || 'प्रथम दिवस'}
                  </p>
                </div>
              </div>

              <div className="mt-10 relative z-10">
                <button onClick={handleWatchLive} className="w-full bg-[#FCF5EB] hover:bg-[#FAF0E6] text-[#E05A10] border border-[#EAD8C8] px-6 py-4 rounded-xl font-bold flex items-center justify-between transition-colors group">
                  <span>पूर्ण विवरण देखें</span>
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. KATHA INFORMATION */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-2xl font-black text-[#3D2B20] uppercase tracking-widest">Katha Schedule</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-[#EAD8C8] to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* Date Card */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(224,90,16,0.05)] flex items-start gap-3 md:gap-4 transition-transform hover:-translate-y-1 overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FCF5EB] flex items-center justify-center shrink-0">
                <FaCalendarAlt className="text-[#E05A10] text-lg md:text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 break-words">तारीख (Date)</p>
                <p className="font-bold text-[#3D2B20] text-sm md:text-base break-words">{formatHindiDateObj(liveSettings?.eventDate).date || 'Today'}</p>
                <p className="text-[10px] md:text-xs text-[#8B5A2B] mt-0.5 break-words">{formatHindiDateObj(liveSettings?.eventDate).day}</p>
              </div>
            </div>

            {/* Time Card */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(224,90,16,0.05)] flex items-start gap-3 md:gap-4 transition-transform hover:-translate-y-1 overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FCF5EB] flex items-center justify-center shrink-0">
                <FaClock className="text-[#E05A10] text-lg md:text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 break-words">समय (Time)</p>
                <p className="font-bold text-[#3D2B20] text-sm md:text-base uppercase break-words">{formatTimeObj(liveSettings?.eventTime).top || '04:00 PM'}</p>
                <p className="text-[10px] md:text-xs text-[#8B5A2B] mt-0.5 break-words">{formatTimeObj(liveSettings?.eventTime).bottom || 'onwards'}</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(224,90,16,0.05)] flex items-start gap-3 md:gap-4 transition-transform hover:-translate-y-1 overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FCF5EB] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-[#E05A10] text-lg md:text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 break-words">स्थान (Loc)</p>
                <p className="font-bold text-[#3D2B20] text-sm md:text-base line-clamp-1 break-words">{formatLocationObj(liveSettings?.eventLocation).top || 'प्रयागराज,'}</p>
                <p className="text-[10px] md:text-xs text-[#8B5A2B] mt-0.5 line-clamp-1 break-words">{formatLocationObj(liveSettings?.eventLocation).bottom || 'उत्तर प्रदेश'}</p>
              </div>
            </div>

            {/* Day Card */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(224,90,16,0.05)] flex items-start gap-3 md:gap-4 transition-transform hover:-translate-y-1 overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FCF5EB] flex items-center justify-center shrink-0">
                <FaCalendarDay className="text-[#E05A10] text-lg md:text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 break-words">दिवस (Day)</p>
                <p className="font-bold text-[#3D2B20] text-sm md:text-base break-words">{liveSettings?.eventDay || 'प्रथम दिवस'}</p>
                <p className="text-[10px] md:text-xs text-[#8B5A2B] mt-0.5 break-words">Katha Journey</p>
              </div>
            </div>

          </div>
        </section>

        {/* 6. QUICK ACTION CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-3xl p-8 border border-[#EAD8C8] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaYoutube className="text-4xl text-red-600" />
            </div>
            <h4 className="font-serif font-black text-xl text-[#3D2B20] mb-3">Watch on YouTube</h4>
            <p className="text-[#8B5A2B] text-sm leading-relaxed mb-6">Experience the divine Katha live or watch past sessions directly on our official channel.</p>
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest flex items-center group-hover:text-red-700">Open Channel <FaChevronRight className="ml-2 text-[10px]" /></span>
          </a>

          <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-3xl p-8 border border-[#EAD8C8] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#FCF5EB] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaCalendarAlt className="text-3xl text-[#E05A10]" />
            </div>
            <h4 className="font-serif font-black text-xl text-[#3D2B20] mb-3">Upcoming Katha</h4>
            <p className="text-[#8B5A2B] text-sm leading-relaxed mb-6">Stay informed about Guru Ji's future Katha schedules and locations across India.</p>
            <span className="text-[#E05A10] font-bold text-sm uppercase tracking-widest flex items-center group-hover:text-[#D35400]">View Schedule <FaChevronRight className="ml-2 text-[10px]" /></span>
          </a>

          <div className="group bg-white rounded-3xl p-8 border border-[#EAD8C8] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <GiLotus className="text-4xl text-[#D4AF37]" />
            </div>
            <h4 className="font-serif font-black text-xl text-[#3D2B20] mb-3">About Katha</h4>
            <p className="text-[#8B5A2B] text-sm leading-relaxed mb-6">Understand the spiritual significance and divine message behind the Shrimad Bhagwat Katha.</p>
            <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest flex items-center group-hover:text-[#B8962E]">Read More <FaChevronRight className="ml-2 text-[10px]" /></span>
          </div>
        </section>

        {/* 7. SOCIAL / SUBSCRIBE SECTION */}
        <section className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#D4AF37] via-[#E05A10] to-[#D4AF37]"></div>
          <div className="flex flex-col md:flex-row items-center justify-between p-10 lg:p-14 gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif font-black text-3xl lg:text-4xl text-[#3D2B20] mb-4">कथा से जुड़े रहें</h3>
              <p className="text-[#8B5A2B] text-base lg:text-lg max-w-xl">Follow our official social media channels for daily spiritual quotes, short videos, and live updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex gap-4">
                <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl hover:bg-red-600 hover:text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1"><FaYoutube /></a>
                <a href={contacts.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1"><FaFacebookF /></a>
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center text-2xl hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1"><FaInstagram /></a>
              </div>
              <a href={contacts.youtube} target="_blank" rel="noopener noreferrer" className="bg-[#3D2B20] hover:bg-black text-[#D4AF37] px-8 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl flex items-center transition-all hover:scale-105 border border-[#D4AF37]/30">
                SUBSCRIBE NOW
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
