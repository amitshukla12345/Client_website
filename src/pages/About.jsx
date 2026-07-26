import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaAward, FaHeart, FaHands, FaFileAlt, FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaPrayingHands, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaBookOpen, FaGlobeAmericas, FaPlayCircle, FaArrowRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { GiLotus, GiOpenBook, GiSun, GiGreekTemple } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'
import logoImg from '../assets/images/logo.jpeg'
import aboutHeroImg from '../assets/images/about_guru.png'
import guruVicharImg from '../assets/images/guru_vichar.png'

const IconMap = {
  FaGraduationCap,
  FaAward,
  FaHeart,
  FaHands
}

export default function About() {
  const { about, timeline, achievements, contacts } = useContext(AppContext)
  const [showDetails, setShowDetails] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="pt-[60px] lg:pt-[64px] pb-20 bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20">
        <img src={aboutHeroImg} alt="About Guru Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Main Container for rest of the page with exact background matching the image */}
      <div className="bg-[#FFF9F0] relative overflow-hidden font-sans">
        
        {/* Subtle Background Watermarks */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none rounded-full transform -translate-x-1/2"></div>
        <div className="absolute top-96 right-0 w-[600px] h-[600px] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none rounded-full transform translate-x-1/3"></div>

        {/* 1. ABOUT GURU JI & TIMELINE SECTION */}
        <section className="relative w-full overflow-hidden pb-8 pt-10">
          <div className="absolute bottom-0 left-0 text-[#E05A10] opacity-5 text-9xl pointer-events-none transform translate-y-1/4 -translate-x-10">
            <GiGreekTemple />
          </div>
          <div className="absolute bottom-10 right-0 text-[#E05A10] opacity-5 text-9xl pointer-events-none transform translate-x-10">
            <GiGreekTemple />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
              
              {/* Left Column: Guru Ji Image */}
              <div className="flex flex-col relative items-center justify-center">
                <div className="w-full relative flex justify-center z-30 group cursor-pointer">
                  <img 
                    src={guruVicharImg} 
                    alt="Guru Ji" 
                    className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(224,90,16,0.15)] z-10 relative group-hover:scale-[1.03] group-hover:-translate-y-2 transition-all duration-700 ease-out rounded-2xl"
                  />
                  {/* Glowing effect behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#E05A10]/10 rounded-full blur-[80px] -z-10 group-hover:bg-[#E05A10]/25 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                </div>
                
                {/* Spiritual Thoughts Cards */}
                <div className="mt-10 w-full max-w-[460px] flex flex-col gap-7 relative z-20 mx-auto group/cards">
                  {/* Vertical Dashed Line behind cards */}
                  <div className="absolute top-[-100px] bottom-[-15px] left-1/2 -translate-x-1/2 w-0 border-l-[2px] border-dashed border-[#D4AF37]/50 -z-10"></div>
                  
                  <div className="bg-white/60 backdrop-blur-md border border-[#EAD8C8] rounded-full px-5 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(224,90,16,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 group cursor-default">
                    <GiLotus className="text-[#E05A10] text-xl shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                    <p className="text-[#3D2B20] text-[13px] md:text-sm font-medium leading-relaxed">
                      "गुरु की कृपा ही जीवन का सबसे बड़ा धन है।"
                    </p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-md border border-[#EAD8C8] rounded-full px-5 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(224,90,16,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 group cursor-default">
                    <GiLotus className="text-[#E05A10] text-xl shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                    <p className="text-[#3D2B20] text-[13px] md:text-sm font-medium leading-relaxed">
                      "जहाँ श्रद्धा है, वहाँ मार्ग अपने आप बन जाता है।"
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-md border border-[#EAD8C8] rounded-full px-5 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(224,90,16,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 group cursor-default">
                    <GiLotus className="text-[#E05A10] text-xl shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                    <p className="text-[#3D2B20] text-[13px] md:text-sm font-medium leading-relaxed">
                      "सुमिरन से मन शुद्ध होता है और सेवा से जीवन सफल।"
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-md border border-[#EAD8C8] rounded-full px-5 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(224,90,16,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 group cursor-default">
                    <GiLotus className="text-[#E05A10] text-xl shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                    <p className="text-[#3D2B20] text-[13px] md:text-sm font-medium leading-relaxed">
                      "श्रद्धा से ज्ञान मिलता है और समर्पण से ईश्वर।"
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline */}
              <div className="flex flex-col relative z-20 lg:pl-12">
                
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="w-8 h-px bg-[#D4AF37]"></span>
                    <span className="text-[#E05A10] font-bold text-[10px] uppercase tracking-widest">The Divine Journey</span>
                    <span className="w-8 h-px bg-[#D4AF37]"></span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-black text-[#3D2B20] uppercase tracking-wider mb-2">
                    Timeline of Devotion
                  </h2>
                  <div className="flex justify-center text-[#D4AF37] text-2xl">
                    <GiLotus />
                  </div>
                </div>

                {/* Timeline Container */}
                <div className="relative border-l-[2px] border-dashed border-[#D4AF37]/40 ml-4 md:ml-12 space-y-10 py-4 z-0">
                  
                  {/* Horizontal line extending leftwards towards Guru Ji image to create a perfect joint (Desktop Only) */}
                  <div className="hidden lg:block absolute top-[-2px] left-[-2px] w-[30vw] max-w-[350px] xl:max-w-[450px] h-0 border-t-[2px] border-dashed border-[#D4AF37]/40 -translate-x-full pointer-events-none"></div>
                  {/* 2008 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaBookOpen className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2008</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">The Spiritual Awakening</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">बाल्यकाल से ही आध्यात्मिक झुकाव, शास्त्रों का अध्ययन और सत्संग में गहरी रुचि की शुरुआत।</p>
                    </div>
                  </div>

                  {/* 2012 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <GiGreekTemple className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2012</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">First Shrimad Bhagavat Katha</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">प्रथम बार श्रीमद भागवत कथा का वाचन, अनेक श्रद्धालुओं को आध्यात्मिक मार्ग पर प्रेरित किया।</p>
                    </div>
                  </div>

                  {/* 2016 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaPrayingHands className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2016</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">Establishment of Mission</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">मानव कल्याण के लिए मिशन की स्थापना, धर्म, भक्ति और सेवा को जन-जन तक पहुँचाने का संकल्प।</p>
                    </div>
                  </div>

                  {/* 2022 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaGlobeAmericas className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2022</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">Global Broadcasting</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">कथा का सीधा प्रसारण विश्वभर के विभिन्न माध्यमों से, लाखों लोगों तक आध्यात्मिक संदेश का प्रसार।</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 1. Quote Section */}
        <section className="pt-16 pb-12 relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center flex flex-col md:flex-row items-center justify-center md:space-x-4 hover:scale-[1.02] transition-transform duration-500 cursor-default group/quote">
            <span className="text-[#D4AF37] text-5xl md:text-6xl font-serif font-bold hidden md:block group-hover/quote:text-[#E05A10] transition-colors duration-500">“</span>
            <div>
              <h3 className="font-serif text-2xl md:text-[28px] font-bold text-[#3D2B20] leading-relaxed group-hover/quote:text-[#E05A10] transition-colors duration-500">
                <span className="text-[#D4AF37] md:hidden text-4xl leading-none group-hover/quote:text-[#E05A10] transition-colors duration-500">“ </span>
                धर्म वही है जो मानवता को ईश्वर से जोड़ दे।
                <span className="text-[#D4AF37] md:hidden text-4xl leading-none group-hover/quote:text-[#E05A10] transition-colors duration-500"> ”</span>
              </h3>
              <p className="mt-3 text-[#5a4332] text-lg font-medium">- पूज्य गुरुजी</p>
            </div>
            <span className="text-[#D4AF37] text-5xl md:text-6xl font-serif font-bold hidden md:block group-hover/quote:text-[#E05A10] transition-colors duration-500">”</span>
          </div>
        </section>

        {/* 2. Stats Section */}
        <section className="pb-16 relative z-10 px-4">
          <div className="max-w-[1100px] mx-auto bg-white/70 backdrop-blur-md border border-[#EAD8C8] rounded-3xl shadow-[0_8px_30px_rgba(224,90,16,0.06)] hover:shadow-[0_15px_40px_rgba(224,90,16,0.12)] hover:-translate-y-1.5 transition-all duration-500 ease-out p-6 md:p-8 relative group cursor-default">
            <div className="absolute -top-3 left-6 text-2xl text-[#EAD8C8]/40"><GiLotus /></div>
            <div className="absolute -bottom-3 right-6 text-2xl text-[#EAD8C8]/40 rotate-180"><GiLotus /></div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 md:divide-x md:divide-[#EAD8C8]/60">
              
              {/* Stat 1 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:px-4 space-y-3 md:space-y-0 md:space-x-3 group/stat">
                <div className="text-[#D4AF37] text-4xl shrink-0 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 group-hover/stat:rotate-[360deg] transition-all duration-700 ease-out"><FaHeart /></div>
                <div>
                  <div className="font-serif text-2xl font-black text-[#3D2B20] group-hover/stat:text-[#E05A10] transition-colors duration-300">25+</div>
                  <div className="text-[11px] text-[#3D2B20]/80 font-bold mt-0.5 leading-snug">वर्षों का आध्यात्मिक<br/>सेवा अनुभव</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:px-4 space-y-3 md:space-y-0 md:space-x-3 group/stat">
                <div className="text-[#D4AF37] text-4xl shrink-0 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 group-hover/stat:rotate-[360deg] transition-all duration-700 ease-out"><FaBookOpen /></div>
                <div>
                  <div className="font-serif text-2xl font-black text-[#3D2B20] group-hover/stat:text-[#E05A10] transition-colors duration-300">500+</div>
                  <div className="text-[11px] text-[#3D2B20]/80 font-bold mt-0.5 leading-snug">श्रीमद भागवत<br/>कथा</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:px-4 space-y-3 md:space-y-0 md:space-x-3 group/stat">
                <div className="text-[#D4AF37] text-4xl shrink-0 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 group-hover/stat:rotate-[360deg] transition-all duration-700 ease-out"><FaPrayingHands /></div>
                <div>
                  <div className="font-serif text-2xl font-black text-[#3D2B20] group-hover/stat:text-[#E05A10] transition-colors duration-300">15,000+</div>
                  <div className="text-[11px] text-[#3D2B20]/80 font-bold mt-0.5 leading-snug">श्रद्धालु और<br/>अनुयायी</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:px-4 space-y-3 md:space-y-0 md:space-x-3 group/stat">
                <div className="text-[#D4AF37] text-4xl shrink-0 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 group-hover/stat:rotate-[360deg] transition-all duration-700 ease-out"><FaGlobeAmericas /></div>
                <div>
                  <div className="font-serif text-2xl font-black text-[#3D2B20] group-hover/stat:text-[#E05A10] transition-colors duration-300">20+</div>
                  <div className="text-[11px] text-[#3D2B20]/80 font-bold mt-0.5 leading-snug">राज्यों एवं देशों में<br/>सेवा यात्रा</div>
                </div>
              </div>

              {/* Stat 5 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:px-4 space-y-3 md:space-y-0 md:space-x-3 col-span-2 md:col-span-1 justify-center group/stat">
                <div className="text-[#D4AF37] text-4xl shrink-0 group-hover/stat:text-[#E05A10] group-hover/stat:scale-110 group-hover/stat:rotate-[360deg] transition-all duration-700 ease-out"><FaCalendarCheck /></div>
                <div>
                  <div className="font-serif text-2xl font-black text-[#3D2B20] group-hover/stat:text-[#E05A10] transition-colors duration-300">150+</div>
                  <div className="text-[11px] text-[#3D2B20]/80 font-bold mt-0.5 leading-snug">धार्मिक एवं सामाजिक<br/>आयोजन</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Honors & Contributions */}
        <section className="pt-8 pb-16 relative z-10">
          <div className="max-w-[1100px] mx-auto px-4">
            
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E05A10] opacity-80">Spiritual Milestones</span>
              <h2 className="font-serif text-2xl md:text-[28px] font-black text-[#3D2B20] mt-1.5 uppercase tracking-wide">
                Honors & Contributions
              </h2>
              <div className="flex justify-center items-center mt-3 opacity-60">
                <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <GiLotus className="text-[#D4AF37] mx-3 text-lg" />
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Honor Card 1 */}
               <div className="bg-white/80 border border-[#EAD8C8] rounded-[20px] p-6 flex items-start space-x-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(224,90,16,0.12)] hover:-translate-y-2 hover:border-[#E05A10]/30 transition-all duration-300 group cursor-default">
                  <div className="text-[#D4AF37] text-[40px] shrink-0 mt-1 group-hover:scale-110 transition-transform"><FaGraduationCap /></div>
                  <div>
                     <h4 className="font-serif font-bold text-[#3D2B20] text-[17px]">वेद शास्त्र आचार्य</h4>
                     <p className="text-[11px] text-[#3D2B20]/75 mt-1.5 leading-relaxed font-medium">वेद, उपनिषद, गीता और शास्त्रों के गहन अध्ययन एवं प्रचार-प्रसार के लिए सम्मानित।</p>
                  </div>
               </div>

               {/* Honor Card 2 */}
               <div className="bg-white/80 border border-[#EAD8C8] rounded-[20px] p-6 flex items-start space-x-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(224,90,16,0.12)] hover:-translate-y-2 hover:border-[#E05A10]/30 transition-all duration-300 group cursor-default">
                  <div className="text-[#D4AF37] text-[40px] shrink-0 mt-1 group-hover:scale-110 transition-transform"><FaAward /></div>
                  <div>
                     <h4 className="font-serif font-bold text-[#3D2B20] text-[17px]">वृंदावन सेवा सम्मान</h4>
                     <p className="text-[11px] text-[#3D2B20]/75 mt-1.5 leading-relaxed font-medium">धार्मिक सेवा और वृंदावन क्षेत्र में आध्यात्मिक गतिविधियों में योगदान हेतु सम्मानित।</p>
                  </div>
               </div>

               {/* Honor Card 3 */}
               <div className="bg-white/80 border border-[#EAD8C8] rounded-[20px] p-6 flex items-start space-x-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(224,90,16,0.12)] hover:-translate-y-2 hover:border-[#E05A10]/30 transition-all duration-300 group cursor-default">
                  <div className="text-[#D4AF37] text-[40px] shrink-0 mt-1 group-hover:scale-110 transition-transform"><FaHands /></div>
                  <div>
                     <h4 className="font-serif font-bold text-[#3D2B20] text-[17px]">भक्ति एवं सामाजिक कल्याण</h4>
                     <p className="text-[11px] text-[#3D2B20]/75 mt-1.5 leading-relaxed font-medium">गरीबों की सहायता, शिक्षा, गौ सेवा और सामाजिक कल्याण के लिए विशेष योगदान।</p>
                  </div>
               </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}
