import React, { useContext } from 'react'
import { GiLotus } from 'react-icons/gi'
import { FaYoutube, FaExternalLinkAlt, FaPlayCircle, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'

export default function Live() {
  const { contacts, galleryVideos } = useContext(AppContext)

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

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <section className="relative py-20 bg-dark-charcoal text-white text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-saffron uppercase font-bold tracking-widest text-xs flex items-center justify-center space-x-2">
            <GiLotus className="text-red-500 animate-pulse" />
            <span>Divine Broadcast</span>
            <GiLotus className="text-red-500 animate-pulse" />
          </span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-black">Live Katha Darshan</h1>
          <p className="text-sm font-light text-cream-deep/70 max-w-xl mx-auto">
            YouTube चैनल पर लाइव कथा देखें — नीचे दिए गए बटन पर क्लिक करें और सीधे लाइव स्ट्रीम से जुड़ें।
          </p>
        </div>
      </section>

      {/* Live Katha CTA Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
