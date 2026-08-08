import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaAward, FaHeart, FaHands, FaFileAlt, FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaPrayingHands, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaBookOpen, FaGlobeAmericas, FaPlayCircle, FaArrowRight, FaQuoteLeft, FaQuoteRight, FaMapMarkerAlt, FaUsers, FaBook, FaOm, FaDharmachakra, FaScroll } from 'react-icons/fa'
import { GiLotus, GiOpenBook, GiSun, GiGreekTemple } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'
import logoImg from '../assets/images/logo.jpeg'
import aboutHeroImg from '../assets/images/about_guru.png'
import guruVicharImg from '../assets/images/guru_vichar.png'
import guruIntroImg from '../assets/images/guru_intro_image.png'

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

      {/* NEW GURU JI INTRO SECTION (As per provided image) */}
      <section className="relative w-full overflow-hidden bg-[#FFF9F0] pt-12 pb-6 px-4 sm:px-6 lg:px-12 font-sans border-b border-gold/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Column: Info Block */}
          <div className="lg:col-span-6 bg-[#FFFDF7] rounded-[2rem] p-8 lg:p-10 border border-[#F2E5D5] shadow-[0_8px_30px_rgba(224,90,16,0.05)] flex flex-col justify-between">
            <div>
              <h4 className="text-[#8A2900] font-bold text-lg mb-2 flex items-center gap-2">
                 <GiLotus className="text-[#E05A10]" /> पूज्य गुरु जी के बारे में
              </h4>
              <h2 className="text-[#D35400] text-3xl md:text-4xl font-black mb-6 leading-tight drop-shadow-sm">
                जगद्गुरु हरिप्रपन्नाचार्य जी महाराज
              </h2>
              {/* User Shared Image */}
              <div className="w-full h-[280px] md:h-[350px] mb-6 rounded-2xl overflow-hidden border-[3px] border-[#EAD8C8] shadow-md relative group cursor-default">
                <img src={guruIntroImg} alt="Guru Ji" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <p className="text-[#5C4033] text-sm md:text-[15px] leading-relaxed mb-6 font-medium text-justify">
                अनंत विभूषित श्री श्री 1008 श्रीमद् जगद्गुरू रामानुजाचार्य स्वामी श्री हरिप्रपन्नाचार्य जी महाराज (हरिहरानंद) शक्तिपीठाधीश्वर चक्रसुदर्शनपूरी 221503 और महाराज जी अपने आश्रम पर अब तक 23 श्रीमद् सहस्त्र चंडी महायज्ञ सम्पन्न कर चुके है।
              </p>

              <ul className="space-y-4 mb-10 text-[#5C4033] text-[14px] md:text-[15px] font-semibold leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#D35400] text-xl shrink-0 mt-0.5"><GiSun/></span> 
                  <span><span className="font-bold text-[#D35400]">पिता जी का नाम:</span> स्वर्गीय सूर्य नारायण शुक्ला</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D35400] text-xl shrink-0 mt-0.5"><GiOpenBook/></span> 
                  <span><span className="font-bold text-[#D35400]">गुरु दीक्षा:</span> गुरु दीक्षा जब महाराज जी 8-10 वर्ष के थे तभी ले चुके थे। उनके गुरु का नाम ब्रह्मलीन स्वामी श्री रघुनाथाचार्य जी महाराज है।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D35400] text-xl shrink-0 mt-0.5"><FaBookOpen/></span> 
                  <span><span className="font-bold text-[#D35400]">प्रथम कथा:</span> महाराज जी ने अपनी पहली कथा 'श्रीराम कथा' से सन् 1990-92 में शुरू की थी।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D35400] text-xl shrink-0 mt-0.5"><FaGlobeAmericas/></span> 
                  <span><span className="font-bold text-[#D35400]">कथा यात्रा:</span> अब तक ऐसा कोई राज्य नहीं जहाँ महाराज जी की कथा न हुई हो।</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Parampara and Mission */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Parampara */}
            <div className="bg-[#FFFDF7] rounded-[2rem] p-8 border border-[#F2E5D5] shadow-[0_8px_30px_rgba(224,90,16,0.05)] flex-1 flex flex-col justify-center">
              <h4 className="text-[#8A2900] font-bold text-lg mb-8 flex items-center gap-2">
                 <GiLotus className="text-[#E05A10]" /> गुरु परंपरा
              </h4>
              <div className="flex justify-between items-center px-1">
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border-[3px] border-[#D4AF37] overflow-hidden bg-white p-1 shadow-md">
                     <img src={guruVicharImg} className="w-full h-full object-cover rounded-full sepia contrast-125 brightness-75" alt="Param Guru" />
                   </div>
                   <p className="text-[11px] md:text-[13px] font-bold text-[#3D2B20] text-center leading-tight">ब्रह्मलीन<br/>परम पूज्य गुरु महाराज</p>
                 </div>
                 <FaArrowRight className="text-[#D35400] text-sm" />
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border-[3px] border-[#D4AF37] overflow-hidden bg-white p-1 shadow-md">
                     <img src={guruVicharImg} className="w-full h-full object-cover rounded-full grayscale" alt="Guru" />
                   </div>
                   <p className="text-[11px] md:text-[13px] font-bold text-[#3D2B20] text-center leading-tight">पूज्य गुरुधर<br/>श्री महाराज जी</p>
                 </div>
                 <FaArrowRight className="text-[#D35400] text-sm" />
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border-[3px] border-[#D4AF37] overflow-hidden bg-white p-1 shadow-md">
                     <img src={guruVicharImg} className="w-full h-full object-cover rounded-full" alt="Guru Ji" />
                   </div>
                   <p className="text-[11px] md:text-[13px] font-bold text-[#3D2B20] text-center leading-tight">पूज्य<br/>गुरु जी महाराज</p>
                 </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-[#FFFDF7] rounded-[2rem] p-8 border border-[#F2E5D5] shadow-[0_8px_30px_rgba(224,90,16,0.05)] flex-1 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 text-[#E05A10] opacity-5 text-9xl group-hover:scale-110 transition-transform duration-500">
                <GiLotus />
              </div>
              <h4 className="text-[#8A2900] font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
                 <GiLotus className="text-[#E05A10]" /> हमारा मिशन
              </h4>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5CBA7] to-[#E05A10] flex items-center justify-center shrink-0 shadow-lg text-white">
                  <GiLotus className="text-3xl drop-shadow-md" />
                </div>
                <p className="text-[#5C4033] text-[13.5px] md:text-[15px] leading-relaxed font-semibold">
                  सनातन धर्म, वेद, पुराण और भारतीय संस्कृति का प्रचार करना, युवा पीढ़ी को संस्कारयुक्त बनाना और समाज में प्रेम, सेवा और सद्भावना का भाव स्थापित करना।
                </p>
              </div>
            </div>

          </div>
        </div>
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
                  <div className="absolute top-[-100px] bottom-[-40px] left-1/2 -translate-x-1/2 w-0 border-l-[2px] border-dashed border-[#D4AF37]/50 -z-10"></div>
                  
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

                {/* Our Holy Scriptures Section */}
                <div className="mt-8 w-full max-w-[460px] flex flex-col relative z-20 mx-auto">
                  <h4 className="text-[#8A2900] font-bold text-[17px] md:text-lg mb-6 flex items-center justify-center gap-2">
                     <GiLotus className="text-[#E05A10]" /> हमारे पूज्य शास्त्र
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-6">
                    {[
                      { name: 'श्रीमद भागवत', icon: GiOpenBook },
                      { name: 'शिव पुराण', icon: FaOm },
                      { name: 'रामचरितमानस', icon: FaBook },
                      { name: 'शिव पुराण', icon: FaOm },
                      { name: 'भगवद गीता', icon: FaDharmachakra },
                      { name: 'वेद एवं उपनिषद', icon: FaScroll }
                    ].map((Shastra, idx) => (
                      <div key={idx} className="bg-[#FFFDF7] border border-[#F2E5D5] rounded-2xl py-3.5 px-4 md:py-4 md:px-5 flex items-center gap-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:bg-white hover:border-[#D35400]/40 hover:shadow-[0_8px_25px_rgba(211,84,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#D87040] group-hover:bg-[#D35400] transition-colors duration-300 flex items-center justify-center shrink-0 shadow-sm">
                          <Shastra.icon className="text-white text-[15px] md:text-[16px]" />
                        </div>
                        <span className="text-[#5C4033] text-[13.5px] md:text-[15px] font-bold leading-tight group-hover:text-[#D35400] transition-colors duration-300">{Shastra.name}</span>
                      </div>
                    ))}
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
                  
                  {/* 1998 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <GiLotus className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">1998</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">Spiritual Initiation</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">गुरु दीक्षा प्राप्त की।</p>
                    </div>
                  </div>

                  {/* 2000 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <GiOpenBook className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2000</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">First Shrimad Bhagavat Katha</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">प्रथम भागवत कथा।</p>
                    </div>
                  </div>

                  {/* 2005 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaBookOpen className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2005</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">100+ Kathas Completed</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">100+ कथाएं पूर्ण।</p>
                    </div>
                  </div>

                  {/* 2010 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <GiGreekTemple className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2010</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">Nationwide Preaching</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">देश भर में कथा प्रवाह।</p>
                    </div>
                  </div>

                  {/* 2015 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaGlobeAmericas className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2015</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">International Events</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">विदेशों में कथा आयोजन।</p>
                    </div>
                  </div>

                  {/* 2020 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <FaPrayingHands className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2020</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">1000+ Kathas Completed</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">1000+ कथाएं पूर्ण।</p>
                    </div>
                  </div>

                  {/* 2024 */}
                  <div className="relative flex items-center group">
                    <div className="absolute -left-[30px] bg-[#FFF9F0] p-1 border-2 border-[#D4AF37] rounded-full group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-[#E05A10] shadow-inner">
                        <GiSun className="text-lg" />
                        <span className="text-[10px] font-bold mt-0.5">2024</span>
                      </div>
                    </div>
                    <div className="ml-16 bg-white border border-[#EAD8C8] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full relative group-hover:border-[#D4AF37]/50 transition-colors before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-b before:border-[#EAD8C8] group-hover:before:border-[#D4AF37]/50">
                      <h4 className="font-serif font-bold text-[#3D2B20] text-sm uppercase tracking-wide mb-1.5">Relentless Devotion</h4>
                      <p className="text-[11px] text-[#3D2B20]/70 font-medium leading-relaxed">सनातन धर्म सेवा में निरंतर समर्पित।</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* NEW 2-COLUMN SECTION: Services & Values */}
        <section className="relative w-full pb-8 pt-8 z-10 font-sans">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Box 1: हमारी सेवाएं (Our Services) */}
            <div className="bg-[#FFFDF7] rounded-[2rem] p-8 lg:p-10 border border-[#F2E5D5] shadow-[0_8px_30px_rgba(224,90,16,0.05)] flex flex-col justify-between group">
              <div>
                <h4 className="text-[#8A2900] font-bold text-[19px] md:text-[22px] mb-8 flex items-center gap-2">
                   <GiLotus className="text-[#E05A10]" /> हमारी सेवाएं
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-10">
                  {[
                    { text: 'श्रीमद भागवत कथा', icon: GiOpenBook },
                    { text: 'श्री राम कथा', icon: GiGreekTemple },
                    { text: 'शिव महापुराण कथा', icon: GiLotus },
                    { text: 'श्रीमद देवी भागवत', icon: FaBookOpen },
                    { text: 'सुंदरकाण्ड पाठ', icon: FaPrayingHands },
                    { text: 'गुरु दीक्षा एवं मार्गदर्शन', icon: FaHeart }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#FFF6E9] hover:bg-[#FFEBD4] hover:-translate-y-0.5 transition-all duration-300 rounded-xl p-3.5 flex items-center gap-3 border border-[#F5E6D3] shadow-sm cursor-default">
                       <span className="text-[#D35400] text-xl opacity-80 shrink-0"><item.icon/></span>
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#5C4033] leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="bg-[#D35400] text-white px-8 py-3.5 rounded-xl font-bold w-fit mx-auto hover:bg-[#BA4A00] transition-colors shadow-md text-sm mt-auto">
                सभी फोटो देखें
              </button>
            </div>

            {/* Box 2: हमारे मूल मूल्य (Core Values) */}
            <div className="bg-[#FFFDF7] rounded-[2rem] p-8 lg:p-10 border border-[#F2E5D5] shadow-[0_8px_30px_rgba(224,90,16,0.05)] flex flex-col justify-between">
              <div>
                <h4 className="text-[#8A2900] font-bold text-[19px] md:text-[22px] mb-10 flex items-center gap-2">
                   <GiLotus className="text-[#E05A10]" /> हमारे मूल मूल्य
                </h4>
                <div className="grid grid-cols-3 gap-x-4 gap-y-10 mb-10">
                  {[
                    { text: 'सत्य', icon: GiOpenBook },
                    { text: 'धर्म', icon: GiGreekTemple },
                    { text: 'भक्ति', icon: FaPrayingHands },
                    { text: 'सेवा', icon: FaHands },
                    { text: 'करुणा', icon: GiLotus },
                    { text: 'संस्कार', icon: FaHeart }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3.5">
                      <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-br from-[#FFF6E9] to-[#FDE8D0] border-[3px] border-[#F5E6D3] flex items-center justify-center text-[#D35400] text-2xl shadow-md hover:scale-110 transition-transform duration-300">
                        <item.icon />
                      </div>
                      <span className="text-[14px] font-bold text-[#5C4033]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Infographic Section: कथा कहाँ-कहाँ */}
        <section className="relative w-full pb-12 pt-4 z-10 font-sans">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="bg-[#FFF9F0] rounded-[2rem] border-[2px] border-[#EAD8C8] shadow-[0_15px_40px_rgba(224,90,16,0.08)] overflow-hidden p-6 md:p-8 relative">
              
              {/* Decorative top ornaments */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D35400] to-transparent opacity-50"></div>
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-[#8A2900] text-xl md:text-[28px] font-black leading-tight drop-shadow-sm mb-2">
                  गुरुजी सम्पूर्ण भारत के सभी राज्यों में <br className="hidden md:block"/> कथा कह चुके हैं
                </h2>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-[1px] w-8 bg-[#D4AF37]/50"></div>
                  <GiLotus className="text-[#E05A10] text-base" />
                  <div className="h-[1px] w-8 bg-[#D4AF37]/50"></div>
                </div>
                <p className="text-[#5C4033] font-bold text-[13px] md:text-sm">
                  इन राज्यों में सर्वाधिक श्रीमद्भागवत एवं अन्य दिव्य कथाओं का आयोजन सम्पन्न हुआ है।
                </p>
              </div>

              {/* Main Content: Map & Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
                
                {/* Left: Map of India */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <div className="relative w-full max-w-[300px] aspect-[4/5]">
                    <img 
                      src="/images/india_map.svg" 
                      alt="India Map" 
                      className="absolute inset-0 w-full h-full object-contain opacity-80 mix-blend-multiply drop-shadow-md" 
                    />
                    
                    {/* State Pins (Approximate Positions) */}
                    {[
                      { state: 'UP', t: '38%', l: '45%' }, // UP
                      { state: 'MP', t: '52%', l: '40%' }, // MP
                      { state: 'RJ', t: '42%', l: '25%' }, // Rajasthan
                      { state: 'MH', t: '65%', l: '28%' }, // Maharashtra
                      { state: 'GJ', t: '52%', l: '12%' }, // Gujarat
                      { state: 'JH', t: '50%', l: '60%' }, // Jharkhand
                      { state: 'CG', t: '58%', l: '52%' }, // Chhattisgarh
                      { state: 'OD', t: '65%', l: '65%' }, // Odisha
                    ].map((pos, i) => (
                      <div key={i} className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group" style={{top: pos.t, left: pos.l}}>
                        <div className="bg-[#D35400] text-white p-1 rounded-full shadow-md animate-bounce group-hover:scale-125 transition-transform" style={{animationDelay: `${i * 0.15}s`, animationDuration: '2s'}}>
                          <FaMapMarkerAlt className="text-[10px]" />
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#8A2900]/30 rounded-full mt-0.5 blur-[1px]"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Bar Chart */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="bg-white border border-[#EAD8C8] rounded-xl p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-5">
                      <FaScroll className="text-[#D35400] text-lg" />
                      <h3 className="text-[#8A2900] font-bold text-base md:text-lg border-b-2 border-[#D4AF37]/40 pb-0.5 inline-block">
                        सर्वाधिक कथा सम्पन्न राज्य
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      {[
                        { rank: 1, name: 'उत्तर प्रदेश', count: '120+', width: '100%', color: 'from-[#C0392B] to-[#E74C3C]' },
                        { rank: 2, name: 'मध्य प्रदेश', count: '95+', width: '85%', color: 'from-[#D35400] to-[#E67E22]' },
                        { rank: 3, name: 'राजस्थान', count: '80+', width: '75%', color: 'from-[#E67E22] to-[#F39C12]' },
                        { rank: 4, name: 'महाराष्ट्र (मुंबई)', count: '75+', width: '70%', color: 'from-[#F39C12] to-[#F1C40F]' },
                        { rank: 5, name: 'गुजरात', count: '60+', width: '55%', color: 'from-[#F1C40F] to-[#F4D03F]' },
                        { rank: 6, name: 'झारखंड', count: '45+', width: '45%', color: 'from-[#D4AF37] to-[#F5E6D3]' },
                        { rank: 7, name: 'छत्तीसगढ़', count: '40+', width: '40%', color: 'from-[#EAD8C8] to-[#FFF6E9]' },
                        { rank: 8, name: 'ओडिशा', count: '35+', width: '35%', color: 'from-[#EAD8C8] to-[#FFF6E9]' },
                      ].map((state, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                          {/* Rank Badge */}
                          <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm font-bold text-xs
                            ${state.rank <= 3 ? 'border-[#D4AF37] bg-gradient-to-br from-[#FFF9F0] to-[#F9E79F] text-[#8A2900]' 
                                              : 'border-[#EAD8C8] bg-white text-[#5C4033]'}`}>
                            {state.rank}
                          </div>
                          
                          {/* State Name */}
                          <div className="w-24 md:w-28 shrink-0">
                            <span className="text-[#5C4033] font-bold text-[12px] md:text-[13px] group-hover:text-[#D35400] transition-colors">{state.name}</span>
                          </div>

                          {/* Progress Bar & Count */}
                          <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 bg-[#F5E6D3]/50 h-2.5 md:h-3 rounded-full overflow-hidden shadow-inner border border-[#EAD8C8]/50">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r ${state.color} shadow-sm group-hover:brightness-110 transition-all duration-500`} 
                                style={{ width: state.width }}
                              ></div>
                            </div>
                            <div className="w-8 md:w-10 shrink-0 text-right">
                              <span className="text-[#8A2900] font-black text-[12px] md:text-[13.5px]">{state.count}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Quote */}
              <div className="mt-8 text-center max-w-xl mx-auto px-2 relative z-10">
                <p className="text-[#8A2900] font-serif font-bold italic text-[13px] md:text-sm leading-relaxed relative inline-block">
                  <span className="text-[#D4AF37] text-xl absolute -top-1.5 -left-3">“</span>
                  जहां जहां कथा हुई है, वहां वहां ईश्वर की कृपा, शांति और आनंद की अनुभूति हुई है।
                  <span className="text-[#D4AF37] text-xl absolute -bottom-3 -right-3">”</span>
                </p>
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

        {/* 2. Stats Section (Matching Screenshot) */}
        <section className="pb-16 relative z-10 px-4">
          <div className="max-w-[1200px] mx-auto bg-[#FFFDF7] border border-[#F2E5D5] rounded-3xl shadow-[0_8px_30px_rgba(224,90,16,0.05)] hover:shadow-[0_15px_40px_rgba(224,90,16,0.12)] hover:-translate-y-1 transition-all duration-500 ease-out p-6 md:p-8 relative group cursor-default">
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-2 md:divide-x md:divide-[#EAD8C8]/70 py-2">
              
              {/* Stat 1 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-2 md:px-5 space-y-3 md:space-y-0 md:space-x-4 group/stat">
                <div className="w-12 h-12 rounded-full bg-[#FFF6E9] flex items-center justify-center text-[#D35400] text-2xl shrink-0 group-hover/stat:bg-[#D35400] group-hover/stat:text-white transition-colors duration-300 shadow-inner border border-[#F2E5D5]">
                  <FaBookOpen />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-sans text-2xl md:text-[28px] font-black text-[#D35400] leading-none mb-1 group-hover/stat:scale-105 transition-transform origin-left">1500+</div>
                  <div className="text-[12.5px] md:text-[13px] text-[#5C4033] font-bold leading-tight">संपूर्ण कथाएं</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-2 md:px-5 space-y-3 md:space-y-0 md:space-x-4 group/stat">
                <div className="w-12 h-12 rounded-full bg-[#FFF6E9] flex items-center justify-center text-[#D35400] text-2xl shrink-0 group-hover/stat:bg-[#D35400] group-hover/stat:text-white transition-colors duration-300 shadow-inner border border-[#F2E5D5]">
                  <FaUsers />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-sans text-2xl md:text-[28px] font-black text-[#D35400] leading-none mb-1 group-hover/stat:scale-105 transition-transform origin-left">50,000+</div>
                  <div className="text-[12.5px] md:text-[13px] text-[#5C4033] font-bold leading-tight">श्रद्धालु परिवार</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-2 md:px-5 space-y-3 md:space-y-0 md:space-x-4 group/stat">
                <div className="w-12 h-12 rounded-full bg-[#FFF6E9] flex items-center justify-center text-[#D35400] text-2xl shrink-0 group-hover/stat:bg-[#D35400] group-hover/stat:text-white transition-colors duration-300 shadow-inner border border-[#F2E5D5]">
                  <FaGlobeAmericas />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-sans text-2xl md:text-[28px] font-black text-[#D35400] leading-none mb-1 group-hover/stat:scale-105 transition-transform origin-left">100+</div>
                  <div className="text-[12.5px] md:text-[13px] text-[#5C4033] font-bold leading-tight">शहरों में कथाएं</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-2 md:px-5 space-y-3 md:space-y-0 md:space-x-4 group/stat">
                <div className="w-12 h-12 rounded-full bg-[#FFF6E9] flex items-center justify-center text-[#D35400] text-2xl shrink-0 group-hover/stat:bg-[#D35400] group-hover/stat:text-white transition-colors duration-300 shadow-inner border border-[#F2E5D5]">
                  <FaAward />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-sans text-2xl md:text-[28px] font-black text-[#D35400] leading-none mb-1 group-hover/stat:scale-105 transition-transform origin-left">25+</div>
                  <div className="text-[12.5px] md:text-[13px] text-[#5C4033] font-bold leading-tight">वर्षों का अनुभव</div>
                </div>
              </div>

              {/* Stat 5 */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-2 md:px-5 space-y-3 md:space-y-0 md:space-x-4 col-span-2 md:col-span-1 justify-center group/stat">
                <div className="w-12 h-12 rounded-full bg-[#FFF6E9] flex items-center justify-center text-[#D35400] text-2xl shrink-0 group-hover/stat:bg-[#D35400] group-hover/stat:text-white transition-colors duration-300 shadow-inner border border-[#F2E5D5]">
                  <FaHands />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-sans text-2xl md:text-[28px] font-black text-[#D35400] leading-none mb-1 group-hover/stat:scale-105 transition-transform origin-left">50+</div>
                  <div className="text-[12.5px] md:text-[13px] text-[#5C4033] font-bold leading-tight">सेवा प्रकल्प</div>
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
