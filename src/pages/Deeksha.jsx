import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap, FaAward, FaHeart, FaHands, FaFileAlt, FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaPrayingHands, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaChevronDown, FaOm, FaEnvelope, FaPlay, FaCompass, FaSun, FaQuoteLeft, FaUser, FaMapMarkerAlt, FaPen, FaLeaf, FaTimesCircle, FaUserCheck } from 'react-icons/fa'
import { GiLotus, GiOpenBook, GiFireBowl } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import logoImg from '../assets/images/logo.jpeg'
import guruHeroImg from '../assets/images/guru_hero_image.png'
import deekshaImg from '../assets/images/deeksha.png'

export default function Deeksha() {
  const { contacts } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    state: '',
    subject: 'गुरु दीक्षा हेतु आवेदन',
    message: ''
  })

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const stateInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateInputRef.current && !stateInputRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const faqs = [
    { question: 'गुरु दीक्षा क्या है?', answer: 'दीक्षा का अर्थ है गुरु द्वारा शिष्य को आध्यात्मिक ज्ञान और मंत्र प्रदान करना। यह जीवन को सही मार्ग पर ले जाने का एक पवित्र संकल्प है।' },
    { question: 'क्या गुरु दीक्षा सभी के लिए है?', answer: 'हाँ, गृहस्थ या विरक्त, कोई भी व्यक्ति जो सात्विक जीवन जीने का संकल्प लेता है, दीक्षा प्राप्त कर सकता है।' },
    { question: 'क्या दीक्षा के लिए कोई शुल्क है?', answer: 'दीक्षा अमूल्य है, इसे खरीदा नहीं जा सकता। गुरु दक्षिणा का अर्थ है अपनी श्रद्धा और सामर्थ्य के अनुसार गुरु के प्रति समर्पण।' },
    { question: 'दीक्षा कब और कहाँ होती है?', answer: 'दीक्षा की तिथि और स्थान गुरु जी के कार्यक्रम के अनुसार निर्धारित किए जाते हैं, जिसकी सूचना आपको दी जाती है।' },
    { question: 'दीक्षा के बाद क्या नियम पालन करने होते हैं?', answer: 'सात्विक आहार (मांस, मदिरा, लहसुन, प्याज का त्याग) और प्रतिदिन गुरु मंत्र का जाप अनिवार्य है।' }
  ]

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  const benefits = [
    { icon: FaPrayingHands, title: 'आध्यात्मिक उन्नति', desc: 'जीवन में सकारात्मक परिवर्तन और ईश्वर से जुड़ाव बढ़ता है।' },
    { icon: FaHeart, title: 'मन की शांति', desc: 'गुरु कृपा से मन शांत होता है और तनाव दूर होता है।' },
    { icon: FaCompass, title: 'सही मार्गदर्शन', desc: 'गुरु जी के मार्गदर्शन से जीवन की दिशा स्पष्ट होती है।' },
    { icon: FaSun, title: 'कर्मों की शुद्धि', desc: 'नियमित साधना से पाप कर्मों का क्षय होता है।' }
  ]

  const processSteps = [
    { icon: FaFileAlt, title: 'आवेदन करें', desc: 'Apply Online' },
    { icon: FaCheckCircle, title: 'जानकारी की पुष्टि', desc: 'Team Verification' },
    { icon: FaPhoneAlt, title: 'गुरु जी से संपर्क', desc: 'Personal Contact' },
    { icon: FaCalendarCheck, title: 'तिथि निर्धारित', desc: 'Schedule Date' },
    { icon: FaPrayingHands, title: 'दीक्षा प्राप्त करें', desc: 'Receive Deeksha' }
  ]

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `*दीक्षा हेतु आवेदन / Inquiry*\n\n*नाम:* ${formData.name}\n*मोबाइल:* ${formData.mobile}\n*ईमेल:* ${formData.email || 'N/A'}\n*शहर / राज्य:* ${formData.state || 'N/A'}\n*विषय:* ${formData.subject}\n*संदेश:* ${formData.message}`
    const phone = contacts?.whatsapp?.replace(/[^\d]/g, '') || '918960292928'
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="pt-[60px] lg:pt-[64px] pb-20 bg-[#FFFDF7] min-h-screen font-sans text-dark overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20">
        <img src={guruHeroImg} alt="Guru Deeksha Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#FCF9F2] relative overflow-hidden">
        {/* Background Decorative Patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/mandala-pattern.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/mandala-pattern.png')] opacity-5 pointer-events-none rotate-90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Ornate Title Area */}
          <div className="text-center mb-16 relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-saffron text-[10px]">✧</span>
              <span className="text-saffron uppercase font-bold tracking-[0.25em] text-[10px] lg:text-xs">Spiritual Initiation</span>
              <span className="text-saffron text-[10px]">✧</span>
            </div>
            
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-gold/60 hidden sm:block"></div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b45b23]">गुरु दीक्षा क्या है?</h2>
              <div className="w-12 h-[2px] bg-gold/60 hidden sm:block"></div>
            </div>
            
            <div className="flex justify-center items-center gap-3">
              <GiLotus className="text-gold text-lg" />
              <p className="text-dark-light font-bold text-sm lg:text-base tracking-wide">आध्यात्मिक जीवन की प्रथम सीढ़ी</p>
              <GiLotus className="text-gold text-lg" />
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Image (Circular with Ornate Border) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/5 flex justify-center relative"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-[1px] border-gold/40 border-dashed animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border-[1.5px] border-gold/30"></div>
                <div className="absolute inset-4 rounded-full border-[2px] border-gold/50 border-dotted animate-[spin_40s_linear_infinite_reverse]"></div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-2xl"></div>
                
                {/* Main Circular Image */}
                <div className="w-[82%] h-[82%] rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10">
                  <img src={deekshaImg} alt="Deeksha Ceremony" className="w-full h-full object-cover" />
                </div>
                
                {/* Bottom Lotus Ornament */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 text-gold bg-[#FCF9F2] px-4 rounded-full border-t border-gold/20 shadow-sm">
                  <GiLotus className="text-4xl sm:text-5xl drop-shadow-md" />
                </div>
              </div>
            </motion.div>
            
            {/* Right Content (Stacked Cards) */}
            <div className="w-full lg:w-3/5 space-y-4">
              {[
                { title: 'दीक्षा का अर्थ', text: 'दीक्षा का अर्थ है गुरु द्वारा शिष्य को आध्यात्मिक ज्ञान और मंत्र प्रदान करना। यह जीवन को सही मार्ग पर ले जाने का एक पवित्र संकल्प है।', icon: GiOpenBook },
                { title: 'मानसिक और शारीरिक शुद्धि', text: 'दीक्षा प्राप्त करने के लिए मानसिक और शारीरिक शुद्धि आवश्यक है। सात्विक आहार और सात्विक आचरण का पालन करना अनिवार्य है।', icon: GiFireBowl },
                { title: 'नियमित पालन', text: 'दीक्षा के बाद, शिष्य को प्रतिदिन गुरु मंत्र का जाप और बताए गए नियमों का नियमित रूप से पालन करना होता है।', icon: FaPrayingHands },
                { title: 'आध्यात्मिक शांति', text: 'पूर्ण श्रद्धा और समर्पण के साथ गुरु की शरण में आने से ही दीक्षा फलित होती है और जीवन में आध्यात्मिक शांति आती है।', icon: GiLotus }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 lg:gap-5 bg-white py-4 px-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-gray-100"
                >
                  {/* Left Orange Border Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-saffron rounded-l-lg"></div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-2xl lg:text-3xl text-saffron" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-grow">
                    <h4 className="font-serif font-bold text-[#6a3b20] text-base lg:text-lg mb-0.5">{item.title}</h4>
                    <p className="text-dark-light text-[11px] lg:text-xs leading-relaxed font-medium pr-4">{item.text}</p>
                  </div>
                  
                  {/* Checkmark */}
                  <div className="flex-shrink-0 self-center">
                    <FaCheckCircle className="text-green-500 text-lg lg:text-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divine Thoughts Section */}
      <section className="py-16 bg-[#F6EDD9] relative border-y border-[#D4AF37]/30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_2px,transparent_2px)] [background-size:24px_24px] opacity-50 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FaQuoteLeft className="text-4xl lg:text-5xl text-[#D4AF37]/40 mx-auto mb-6" />
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#b45b23] mb-8">गुरु दीक्षा पर दिव्य विचार</h2>
          
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#EAD8C8] relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-saffron rounded-l-2xl"></div>
              <p className="text-lg lg:text-xl text-[#5a4332] font-medium leading-relaxed italic relative z-10 px-4">
                "दीक्षा केवल एक रीत या नियम नहीं, बल्कि आत्मा का दूसरा जन्म है। जब गुरु शिष्य को दीक्षा देते हैं, तो वह केवल मन्त्र नहीं सौंपते, बल्कि अपने तपोबल और प्रकाश का अंश शिष्य के जीवन में स्थापित कर देते हैं।"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#EAD8C8] text-left hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-serif font-bold text-[#b45b23] text-lg lg:text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37]">1.</span> दिशा और दशा का परिवर्तन
                </h3>
                <p className="text-[#5a4332] leading-relaxed text-sm lg:text-base">
                  "संसार हमें मार्ग भटकने के अनेक अवसर देता है, लेकिन 'गुरु दीक्षा' वह दिव्य प्रकाशपुंज है जो शिष्य की दशा और दिशा दोनों को सत्य की ओर मोड़ देती है।"
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#EAD8C8] text-left hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-serif font-bold text-[#b45b23] text-lg lg:text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37]">2.</span> मंत्र की शक्ति
                </h3>
                <p className="text-[#5a4332] leading-relaxed text-sm lg:text-base">
                  "दीक्षा में मिला मन्त्र केवल शब्दों का समूह नहीं, बल्कि गुरु का संकल्प है। जब शिष्य श्रद्धापूर्वक इसका जाप करता है, तो जीवन की समस्त बाधाएँ स्वतः समाप्त होने लगती हैं।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section: Benefits & Process */}
      <section className="py-20 bg-[#FDFBF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Benefits */}
            <div className="w-full lg:w-1/2">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-dark">गुरु दीक्षा के लाभ</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-3"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative bg-white p-6 sm:p-8 rounded-[24px] border border-gold/15 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.15)] hover:-translate-y-1.5 transition-all duration-500 text-center group overflow-hidden"
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-saffron/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Top Decorative Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gradient-to-r from-saffron to-gold group-hover:w-full transition-all duration-500 rounded-b-full"></div>

                    {/* Watermark Icon */}
                    <div className="absolute -bottom-6 -right-6 text-[120px] text-gold/5 group-hover:text-gold/10 group-hover:scale-110 transition-all duration-500 pointer-events-none transform -rotate-12 z-0">
                      <benefit.icon />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative w-16 h-16 mx-auto mb-5">
                        <div className="absolute inset-0 bg-saffron/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></div>
                        <div className="absolute inset-1 bg-[#FFFDF7] rounded-full flex items-center justify-center text-[26px] text-saffron shadow-sm border border-gold/20 group-hover:border-saffron/40 group-hover:text-saffron-dark transition-all duration-300 z-10">
                          <benefit.icon className="group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300" />
                        </div>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-dark mb-2.5 group-hover:text-saffron-dark transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-[13px] leading-relaxed text-dark-light/80 group-hover:text-dark-light transition-colors duration-300">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right: Process */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-dark">दीक्षा लेने की प्रक्रिया</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-3"></div>
              </div>
              
              {/* Horizontal Timeline (Scrollable on small screens) */}
              <div className="relative w-full flex-grow flex flex-col justify-center mb-3 overflow-x-auto pt-4 pb-2 custom-scrollbar">
                <div className="flex items-start justify-between min-w-[500px] w-full max-w-[560px] mx-auto relative px-4">
                  {/* Connecting Line */}
                  <div className="absolute top-5 left-[72px] right-[72px] h-[2px] bg-gold/30 z-0"></div>
                  
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center w-28 text-center group">
                      <div className="relative mb-3 group-hover:scale-110 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center text-saffron text-[16px] shadow-sm group-hover:bg-saffron group-hover:text-white transition-colors">
                          <step.icon />
                        </div>
                        {/* Number badge on icon */}
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-dark text-white rounded-full text-[9px] flex items-center justify-center font-bold shadow-sm ring-1 ring-white">
                          {idx + 1}
                        </div>
                      </div>
                      <h4 className="font-bold text-[13px] text-dark leading-tight mb-1">{step.title}</h4>
                      <p className="text-[11px] font-medium text-dark-light/80">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Apply Button */}
              <div className="flex justify-center mb-6">
                <button 
                  onClick={() => document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative overflow-hidden rounded-full font-poppins font-bold text-white shadow-saffron-glow transition-all hover:shadow-premium-hover hover:scale-[1.02] bg-gradient-to-r from-[#F6B73C] to-[#FF8C00] px-8 py-2.5"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-full group-hover:animate-shine transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-2 text-[14px]">
                    आवेदन करें <span className="opacity-70 font-normal mx-1">|</span> Apply Now
                  </div>
                </button>
              </div>

              {/* Important Notice */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gold/20 shadow-sm p-6 relative overflow-hidden mt-auto"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-saffron"></div>
                <h3 className="font-serif font-bold text-lg text-dark mb-5 flex items-center gap-2">
                  <GiLotus className="text-saffron text-xl animate-pulse" />
                  महत्वपूर्ण सूचना
                </h3>
                <div className="space-y-4 text-[13px] font-medium text-dark-light">
                  <div className="flex items-start gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <FaUserCheck size={14} />
                    </div>
                    <p className="mt-1.5 leading-relaxed group-hover:text-dark transition-colors">दीक्षा के दिन पूजा, सात्विक और स्वच्छ वस्त्र (श्वेत या पीले) धारण करें।</p>
                  </div>
                  <div className="flex items-start gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-500 group-hover:bg-green-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <FaLeaf size={14} />
                    </div>
                    <p className="mt-1.5 leading-relaxed group-hover:text-dark transition-colors">बिना लहसुन-प्याज का भोजन ग्रहण करना जीवन भर के लिए अनिवार्य है।</p>
                  </div>
                  <div className="flex items-start gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <FaTimesCircle size={14} />
                    </div>
                    <p className="mt-1.5 leading-relaxed group-hover:text-dark transition-colors">किसी भी प्रकार के नशे (तंबाकू, शराब आदि) का पूर्ण निषेध है।</p>
                  </div>
                  <div className="flex items-start gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center flex-shrink-0 text-saffron group-hover:bg-saffron group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <FaOm size={14} />
                    </div>
                    <p className="mt-1.5 leading-relaxed group-hover:text-dark transition-colors">अपने साथ एक माला (तुलसी या रुद्राक्ष) अवश्य लेकर आएं।</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Two Column Section: Video & FAQ */}
      <section className="py-20 bg-white border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Video */}
            <div className="w-full lg:w-1/2">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-dark">गुरु दीक्षा का महत्व</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-3"></div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-dark-charcoal group cursor-pointer"
              >
                <img src={guruHeroImg} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white text-2xl group-hover:scale-110 group-hover:bg-saffron/90 transition-all shadow-lg">
                    <FaPlay className="ml-1" />
                  </div>
                </div>
                {/* Fake progress bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <span className="text-white text-xs font-mono drop-shadow">0:00 / 2:45</span>
                  <div className="h-1 bg-white/30 flex-grow rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-saffron rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: FAQs */}
            <div className="w-full lg:w-1/2">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-dark">अक्सर पूछे जाने वाले प्रश्न</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-3"></div>
              </div>
              
              <div className="space-y-5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#FDFBF4] border border-gold/20 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gold/5 transition-colors"
                    >
                      <span className="font-serif font-bold text-[15px] text-dark pr-4">{faq.question}</span>
                      <FaChevronDown className={`text-saffron transition-transform duration-300 flex-shrink-0 text-sm ${activeFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-4 text-dark-light text-sm leading-relaxed border-t border-gold/10 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Section: Premium Contact & Inquiry */}
      <section className="relative py-24 bg-[#FFFDF7] overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/mandala-pattern.png')] opacity-5 pointer-events-none"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold/40 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Col 1: Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col space-y-8"
            >
              <div className="mb-8">
                <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-dark mb-4">दीक्षा हेतु संपर्क करें</h2>
                <p className="font-hindi text-lg text-dark-light/80 leading-relaxed">हम आपके आध्यात्मिक मार्गदर्शन एवं कथा आयोजन हेतु सदैव उपलब्ध हैं।</p>
                <div className="w-16 h-[2px] bg-gold mt-4"></div>
              </div>
              
              <a href={`https://wa.me/${contacts?.whatsapp?.replace(/[^\d]/g, '') || '918960292928'}?text=प्रणाम`} target="_blank" rel="noopener noreferrer" className="w-full group flex items-center gap-5 bg-white/60 backdrop-blur-sm p-5 rounded-[20px] border border-gold/10 shadow-sm hover:shadow-premium hover:border-green-400/50 transition-all duration-300">
                <div className="w-14 h-14 bg-green-50 group-hover:bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl flex-shrink-0 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-dark text-lg mb-0.5">WhatsApp</h4>
                  <p className="text-sm font-medium text-dark-light">{contacts?.whatsapp || '+91 8960292928'}</p>
                  <p className="text-xs text-green-600 mt-1">Response within 10 Minutes</p>
                </div>
              </a>
              
              <a href={`tel:${contacts?.phone?.replace(/[^\d+]/g, '') || '+918960292928'}`} className="w-full group flex items-center gap-5 bg-white/60 backdrop-blur-sm p-5 rounded-[20px] border border-gold/10 shadow-sm hover:shadow-premium hover:border-saffron/40 transition-all duration-300">
                <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-100 rounded-full flex items-center justify-center text-saffron text-2xl flex-shrink-0 transition-colors shadow-[0_0_15px_rgba(255,153,51,0.15)] group-hover:shadow-[0_0_20px_rgba(255,153,51,0.3)]">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-dark text-lg mb-0.5">Call Us</h4>
                  <p className="text-sm font-medium text-dark-light">{contacts?.phone || '+91 8960292928'}</p>
                  <p className="text-xs text-saffron mt-1">Office Hours (9 AM – 8 PM)</p>
                </div>
              </a>
              
              <a href={`mailto:${contacts?.email || 'amitshukla22509@gmail.com'}`} className="w-full group flex items-center gap-5 bg-white/60 backdrop-blur-sm p-5 rounded-[20px] border border-gold/10 shadow-sm hover:shadow-premium hover:border-gold/40 transition-all duration-300">
                <div className="w-14 h-14 bg-yellow-50 group-hover:bg-yellow-100 rounded-full flex items-center justify-center text-gold text-2xl flex-shrink-0 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-dark text-lg mb-0.5">Email Support</h4>
                  <p className="text-sm font-medium text-dark-light truncate max-w-[200px]">{contacts?.email || 'amitshukla22509@gmail.com'}</p>
                  <p className="text-xs text-gold-dark mt-1">Reply within 24 Hours</p>
                </div>
              </a>

              <div className="pt-6 flex items-center gap-4">
                <a href={contacts?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-sm hover:shadow-gold-glow">
                  <FaInstagram size={20} />
                </a>
                <a href={contacts?.youtube || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-sm hover:shadow-gold-glow">
                  <FaYoutube size={20} />
                </a>
                <a href={contacts?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-sm hover:shadow-gold-glow">
                  <FaFacebook size={20} />
                </a>
                <a href={`https://wa.me/${contacts?.whatsapp?.replace(/[^\d]/g, '') || '918960292928'}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-sm hover:shadow-gold-glow">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </motion.div>
            
            {/* Col 2: Inquiry Form */}
            <motion.div 
              id="inquiry-form"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 bg-white/80 backdrop-blur-xl rounded-[24px] border border-gold/20 shadow-premium p-6 lg:p-8 relative scroll-mt-24"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron to-gold rounded-t-[24px]"></div>
              
              <div className="text-center mb-8">
                <h2 className="font-playfair text-2xl font-bold text-dark flex items-center justify-center gap-2">
                  दीक्षा हेतु आवेदन <span className="font-poppins text-lg font-normal opacity-50 mx-2">|</span> Inquiry Form
                </h2>
                <div className="w-16 h-[2px] bg-gold mx-auto mt-4 rounded-full"></div>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">नाम / Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="अपना नाम दर्ज करें" className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm" required />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">मोबाइल नंबर / Mobile *</label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="अपना मोबाइल नंबर दर्ज करें" className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm" required />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">ईमेल / Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="अपना ईमेल दर्ज करें" className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="relative" ref={stateInputRef}>
                    <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">राज्य / State</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input 
                        type="text" 
                        name="state" 
                        value={formData.state} 
                        onChange={(e) => {
                          handleInputChange(e);
                          setShowStateDropdown(true);
                        }} 
                        onFocus={() => setShowStateDropdown(true)}
                        placeholder="राज्य चुनें या टाइप करें..." 
                        className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm" 
                        required 
                        autoComplete="off"
                      />
                    </div>
                    <AnimatePresence>
                      {showStateDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gold/20 rounded-xl shadow-xl custom-scrollbar"
                        >
                          {indianStates.filter(s => s.toLowerCase().includes(formData.state.toLowerCase())).map((state, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                setFormData(prev => ({...prev, state: state}));
                                setShowStateDropdown(false);
                              }}
                              className="px-4 py-3 text-sm font-poppins text-dark-light hover:bg-saffron/10 hover:text-saffron cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                            >
                              {state}
                            </div>
                          ))}
                          {indianStates.filter(s => s.toLowerCase().includes(formData.state.toLowerCase())).length === 0 && (
                            <div className="px-4 py-4 text-sm font-poppins text-gray-400 text-center italic">कोई परिणाम नहीं मिला</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">विषय / Subject</label>
                  <div className="relative">
                    <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 z-10" />
                    <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-10 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm text-dark-light appearance-none cursor-pointer">
                      <option>गुरु दीक्षा हेतु आवेदन</option>
                      <option>दीक्षा संबंधी जानकारी</option>
                      <option>अन्य</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none" />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block font-poppins text-xs font-semibold text-dark-light mb-1.5 ml-1">संदेश / Message</label>
                  <div className="relative">
                    <FaPen className="absolute left-4 top-4 text-gold/60" />
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows="3" placeholder="अपना संदेश लिखें..." className="w-full bg-[#FFFDF7] border border-gold/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/20 transition-all shadow-sm resize-none"></textarea>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button type="submit" className="group relative w-full overflow-hidden rounded-full font-poppins font-bold text-white shadow-saffron-glow transition-all hover:shadow-premium-hover">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F6B73C] to-[#FF8C00] transition-transform duration-300 group-hover:scale-[1.02]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-full animate-shine"></div>
                    <div className="relative flex items-center justify-center gap-2 py-4">
                      <span className="tracking-wide">Submit Inquiry</span>
                    </div>
                  </button>
                  
                  <div className="mt-5 space-y-2 text-center">
                    <p className="text-xs text-dark-light/70 font-poppins flex items-center justify-center gap-1.5">
                      <span className="text-gold">🔒</span> Your information remains completely confidential.
                    </p>
                    <p className="text-xs text-dark-light/70 font-poppins flex items-center justify-center gap-1.5">
                      <span className="text-gold">📿</span> Our team will contact you shortly after submission.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
            

          </div>
        </div>
      </section>
    </div>
  )
}
