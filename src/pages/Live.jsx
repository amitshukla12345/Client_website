import React, { useContext } from 'react'
import { GiLotus } from 'react-icons/gi'
import { FaYoutube, FaExternalLinkAlt, FaPlayCircle, FaInstagram, FaFacebookF, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import LiveHeroImg from '../assets/images/live_hero.png'

export default function Live() {
  const { contacts, galleryVideos, liveSettings } = useContext(AppContext)

  const validVideos = galleryVideos ? galleryVideos.filter(v => v.videoId) : [];
  const latestVideoId = validVideos.length > 0
    ? [...validVideos].sort((a, b) => b.id - a.id)[0].videoId
    : null;

  const galleryLiveLink = latestVideoId
    ? (latestVideoId.startsWith('http') ? latestVideoId : `https://youtube.com/watch?v=${latestVideoId}`)
    : null;

  const liveLink = galleryLiveLink
    || contacts.liveKathaLink
    || 'https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8';

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

  return (
    <div className="pt-[20px] lg:pt-[30px] pb-0">
      {/* Dynamic Hero Banner */}
      {liveSettings?.heroEnabled && (
        <section className="relative w-full overflow-hidden min-h-[400px] lg:min-h-[500px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-bottom transition-all duration-300"
            style={{ 
              backgroundImage: `url(${liveSettings.bgImage})`,
              filter: `brightness(${liveSettings.bgBrightness}%)`
            }}
          ></div>
          
          {/* Overlay Opacity */}
          <div 
            className="absolute inset-0 bg-black transition-all duration-300"
            style={{ opacity: liveSettings.overlayOpacity / 100 }}
          ></div>

          {/* Guru Ji Image */}
          {liveSettings.guruImage && (
            <div className={`absolute bottom-0 h-[85%] z-10 transition-all duration-500 ${liveSettings.guruPos === 'left' ? 'left-10 lg:left-32' : 'right-10 lg:right-32'}`}>
              <img src={liveSettings.guruImage} alt="Guru" className="h-full w-auto object-contain object-bottom drop-shadow-2xl" />
            </div>
          )}

          {/* Text Content */}
          <div className={`relative z-20 w-full pt-16 pb-8 px-8 lg:pt-24 lg:pb-12 lg:px-20 flex flex-col justify-start transition-all duration-500 
            ${liveSettings.textAlign === 'center' ? 'items-center text-center' : 'items-start text-left'}
            ${liveSettings.guruImage ? (liveSettings.guruPos === 'left' ? 'pl-[50%] lg:pl-[40%]' : 'pr-[50%] lg:pr-[40%]') : ''}
          `}>
            
            {/* Live Badge */}
            {liveSettings?.isLive && (
              <div className="bg-red-600/90 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-4 w-fit shadow-lg shadow-red-900/30 border border-red-500 backdrop-blur-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                LIVE NOW
              </div>
            )}
            
            <p className="text-[#F9E79F] font-bold text-sm lg:text-lg tracking-widest drop-shadow-md whitespace-nowrap mb-2">{liveSettings.topText}</p>
            <h1 className="text-white font-serif font-black text-3xl lg:text-6xl mt-1 drop-shadow-lg leading-tight uppercase shadow-black">{liveSettings.bannerTitle}</h1>
            <p className="text-white/90 text-sm lg:text-xl mt-4 font-medium drop-shadow-md leading-snug line-clamp-2 max-w-2xl">{liveSettings.bannerSubtitle}</p>
            
            {/* Buttons */}
            <div className={`flex gap-4 mt-8 w-full ${liveSettings.textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
              {liveSettings.primaryBtnText && (
                <a href={liveSettings.primaryBtnUrl || liveLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#D35400] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D35400] text-white text-sm lg:text-base px-6 py-3 rounded-lg font-bold shadow-xl flex items-center border border-white/20 transition-all hover:scale-105">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse mr-2"></span> {liveSettings.primaryBtnText}
                </a>
              )}
              {liveSettings.secondaryBtnText && (
                <a href={liveSettings.secondaryBtnUrl || contacts.youtube} target="_blank" rel="noopener noreferrer" className="bg-[#1C1C1C] hover:bg-black text-[#F39C12] border border-[#F39C12]/50 text-sm lg:text-base px-6 py-3 rounded-lg font-bold shadow-xl flex items-center transition-all hover:scale-105">
                  <FaYoutube className="mr-2 text-xl" /> {liveSettings.secondaryBtnText}
                </a>
              )}
            </div>
            {/* Event Info Bar (Floating inside Hero) */}
            {liveSettings?.eventDay && (
              <div className={`mt-10 bg-[#FCF5EB]/95 backdrop-blur-sm border border-[#F0E4D4]/80 p-1.5 md:p-2 rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row items-center gap-4 md:gap-6 w-fit transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${liveSettings.textAlign === 'center' ? 'mx-auto' : ''}`}>
                
                {/* The Badge */}
                <div className="bg-[#7A1E14] text-white rounded-xl md:rounded-full px-6 py-2.5 flex items-center justify-between gap-6 shadow-inner min-w-[200px] w-full md:w-auto transition-colors duration-300 hover:bg-[#8B2217] cursor-default">
                  <span className="text-[#E5B869] font-bold opacity-80 tracking-widest">||</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] md:text-xs font-medium tracking-wide opacity-90">{liveSettings.eventDay}</span>
                    <span className="text-base md:text-lg font-bold tracking-wider">{liveSettings.eventTopic}</span>
                  </div>
                  <span className="text-[#E5B869] font-bold opacity-80 tracking-widest">||</span>
                </div>
                
                {/* Details Container */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 px-2 md:px-6 pb-4 md:pb-0">
                  {/* Date */}
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="text-[#D35400] text-xl md:text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"><FaCalendarAlt /></div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[#4A2C2A] font-bold text-sm md:text-[15px] leading-tight transition-colors duration-300 group-hover:text-[#D35400]">{formatHindiDateObj(liveSettings.eventDate).date}</span>
                      <span className="text-[#8A5A44] font-semibold text-[10px] md:text-[11px] leading-tight mt-0.5">{formatHindiDateObj(liveSettings.eventDate).day}</span>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-[#EAD8C8]"></div>

                  {/* Time */}
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="text-[#D35400] text-xl md:text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"><FaClock /></div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[#4A2C2A] font-bold text-sm md:text-[15px] leading-tight uppercase transition-colors duration-300 group-hover:text-[#D35400]">{formatTimeObj(liveSettings.eventTime).top}</span>
                      {formatTimeObj(liveSettings.eventTime).bottom && (
                        <span className="text-[#8A5A44] font-semibold text-[10px] md:text-[11px] leading-tight mt-0.5">{formatTimeObj(liveSettings.eventTime).bottom}</span>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-[#EAD8C8]"></div>

                  {/* Location */}
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="text-[#D35400] text-xl md:text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"><FaMapMarkerAlt /></div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[#4A2C2A] font-bold text-sm md:text-[15px] leading-tight transition-colors duration-300 group-hover:text-[#D35400]">{formatLocationObj(liveSettings.eventLocation).top}</span>
                      {formatLocationObj(liveSettings.eventLocation).bottom && (
                        <span className="text-[#8A5A44] font-semibold text-[10px] md:text-[11px] leading-tight mt-0.5">{formatLocationObj(liveSettings.eventLocation).bottom}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Marquee Section */}
      {liveSettings?.marqueeEnabled !== false && (liveSettings?.marqueeText ?? 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम') !== '' && (
        <section className="w-full bg-gradient-to-r from-[#8A2900] via-[#BA3800] to-[#8A2900] text-white py-3 border-y-2 border-[#D4AF37]/60 overflow-hidden shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] relative z-20">
          <marquee behavior="scroll" direction="left" scrollamount="6" className="w-full font-bold text-sm md:text-[16px] tracking-wide whitespace-nowrap drop-shadow-md flex items-center">
            {Array(10).fill(0).map((_, i) => (
              <span key={i} className="mx-8 inline-flex items-center">
                <span className="animate-pulse mr-2 text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">🔴</span> 
                <span dangerouslySetInnerHTML={{ __html: liveSettings?.marqueeText ?? 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम' }}></span>
              </span>
            ))}
          </marquee>
        </section>
      )}

      {/* Live Katha CTA Section */}
      <section className="pb-8 bg-cream-light relative z-10 pt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gold/20 overflow-hidden">

            {/* Decorative Top Gradient */}
            <div className="h-2 bg-gradient-to-r from-[#E05A10] via-[#D4AF37] to-[#E05A10]"></div>

            {/* Main Content */}
            <div className="p-10 sm:p-16 text-center space-y-8">

              {/* Animated YouTube Icon */}
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 w-32 h-32 bg-red-500/10 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                  <FaYoutube className="text-white text-6xl" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B20]">
                  लाइव कथा देखें
                </h2>
                <p className="text-[#3D2B20]/60 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  पूज्य गुरु जी महाराज की लाइव श्रीमद भागवत कथा YouTube पर सीधा प्रसारण हो रही है।
                  नीचे बटन पर क्लिक करें और तुरंत लाइव कथा से जुड़ें।
                </p>
              </div>

              {/* Live Badge */}
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span>Live Stream Active</span>
              </div>

              {/* CTA Button */}
              <div className="w-full flex justify-center px-2">
                <button
                  onClick={handleWatchLive}
                  className="group w-full sm:w-auto flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-serif font-bold text-xs xs:text-sm sm:text-xl uppercase tracking-wider px-2 xs:px-4 sm:px-14 py-3 xs:py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <FaPlayCircle className="text-lg xs:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-center">Watch Live on YouTube</span>
                  <FaExternalLinkAlt className="text-[10px] xs:text-sm flex-shrink-0 opacity-70" />
                </button>
              </div>

              {/* Link Display */}
              <div className="pt-4 px-2 w-full flex justify-center">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-[10px] sm:text-xs text-[#3D2B20]/40 hover:text-red-600 transition-colors break-all text-center max-w-full"
                >
                  <FaExternalLinkAlt className="text-[10px] flex-shrink-0" />
                  <span className="break-all">{liveLink}</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white border-t border-[#EAD8C8] px-10 py-6">
              <p className="text-center text-xs font-serif font-bold text-[#3D2B20]/50 uppercase tracking-widest mb-4">हमें फॉलो करें</p>
              <div className="flex items-center justify-center space-x-5">
                <a
                  href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-xl" />
                </a>
                <a
                  href="https://swamiraghavacharyaji.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-pink-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="https://www.facebook.com/share/1HLEzxvCT3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-xl" />
                </a>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="bg-[#FAF0E6] border-t border-[#EAD8C8] px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-[#3D2B20]/60">
                <GiLotus className="text-[#E05A10]" />
                <span className="font-serif font-bold">Shrimat Bhagvat Katha — सत्यम परं धीमहि</span>
              </div>
              <a
                href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <FaYoutube />
                <span>Subscribe on YouTube</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <a
              href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md text-center space-y-4 block hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FaYoutube className="text-red-600 text-2xl" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3D2B20]">YouTube Live</h4>
              <p className="text-xs text-[#3D2B20]/80 leading-relaxed">
                सीधा YouTube चैनल पर लाइव कथा का प्रसारण देखें
              </p>
            </a>

            <a
              href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md text-center space-y-4 block hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <GiLotus className="text-[#E05A10] text-2xl" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3D2B20]">निःशुल्क प्रसारण</h4>
              <p className="text-xs text-[#3D2B20]/80 leading-relaxed">
                कथा सुनने के लिए कोई शुल्क नहीं — पूर्णतः निःशुल्क
              </p>
            </a>

            <a
              href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md text-center space-y-4 block hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FaPlayCircle className="text-[#D4AF37] text-2xl" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3D2B20]">कभी भी देखें</h4>
              <p className="text-xs text-[#3D2B20]/80 leading-relaxed">
                लाइव न हो तो पुरानी कथाओं के वीडियो चैनल पर उपलब्ध हैं
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
