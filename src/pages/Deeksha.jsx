import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap, FaAward, FaHeart, FaHands, FaFileAlt, FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaPrayingHands, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaChevronDown, FaOm, FaEnvelope, FaPlay, FaCompass, FaSun } from 'react-icons/fa'
import { GiLotus, GiOpenBook, GiFireBowl } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import logoImg from '../assets/images/logo.jpeg'
import guruHeroImg from '../assets/images/guru_hero_image.png'
import deekshaImg from '../assets/images/deeksha.png'

export default function Deeksha() {
  const { contacts } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    { question: 'गुरु दीक्षा क्या है?', answer: 'दीक्षा का अर्थ है गुरु द्वारा शिष्य को आध्यात्मिक ज्ञान और मंत्र प्रदान करना। यह जीवन को सही मार्ग पर ले जाने का एक पवित्र संकल्प है।' },
    { question: 'क्या गुरु दीक्षा सभी के लिए है?', answer: 'हाँ, गृहस्थ या विरक्त, कोई भी व्यक्ति जो सात्विक जीवन जीने का संकल्प लेता है, दीक्षा प्राप्त कर सकता है।' },
    { question: 'क्या दीक्षा के लिए कोई शुल्क है?', answer: 'दीक्षा अमूल्य है, इसे खरीदा नहीं जा सकता। गुरु दक्षिणा का अर्थ है अपनी श्रद्धा और सामर्थ्य के अनुसार गुरु के प्रति समर्पण।' },
    { question: 'दीक्षा कब और कहाँ होती है?', answer: 'दीक्षा की तिथि और स्थान गुरु जी के कार्यक्रम के अनुसार निर्धारित किए जाते हैं, जिसकी सूचना आपको दी जाती है।' },
    { question: 'दीक्षा के बाद क्या नियम पालन करने होते हैं?', answer: 'सात्विक आहार (मांस, मदिरा, लहसुन, प्याज का त्याग) और प्रतिदिन गुरु मंत्र का जाप अनिवार्य है।' }
  ]

  const benefits = [
    { icon: FaPrayingHands, title: 'आध्यात्मिक उन्नति', desc: 'जीवन में सकारात्मक परिवर्तन और ईश्वर से जुड़ाव बढ़ता है।' },
    { icon: FaHeart, title: 'मन की शांति', desc: 'गुरु कृपा से मन शांत होता है और तनाव दूर होता है।' },
    { icon: FaCompass, title: 'सही मार्गदर्शन', desc: 'गुरु जी के मार्गदर्शन से जीवन की दिशा स्पष्ट होती है।' },
    { icon: FaSun, title: 'कर्मों की शुद्धि', desc: 'नियमित साधना से पाप कर्मों का क्षय होता है।' }
  ]

  const processSteps = [
    { title: 'आवेदन करें', desc: 'ऑनलाइन फॉर्म भरें' },
    { title: 'जानकारी की पुष्टि', desc: 'हमारी टीम द्वारा पुष्टि' },
    { title: 'गुरु जी से संपर्क', desc: 'स्वीकृति के बाद संपर्क' },
    { title: 'तिथि निर्धारित', desc: 'सुविधा अनुसार तिथि' },
    { title: 'दीक्षा प्राप्त करें', desc: 'निर्धारित विधि पर' }
  ]

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/contact?type=Deeksha');
  }

  return (
    <div className="pt-[90px] lg:pt-[104px] pb-20 bg-[#FFFDF7] min-h-screen font-sans text-dark overflow-hidden">
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
                    className="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm hover:shadow-md hover:border-gold/30 transition-all text-center group"
                  >
                    <div className="w-14 h-14 mx-auto bg-cream-light rounded-full flex items-center justify-center text-2xl text-saffron mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-dark mb-2">{benefit.title}</h3>
                    <p className="text-xs text-dark-light">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right: Process */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-dark">दीक्षा लेने की प्रक्रिया</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-3"></div>
              </div>
              
              {/* Horizontal Timeline (Scrollable on small screens) */}
              <div className="relative w-full flex-grow flex flex-col justify-center mb-8 overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex items-start justify-between min-w-[500px] relative px-4">
                  {/* Connecting Line */}
                  <div className="absolute top-5 left-10 right-10 h-[2px] bg-gold/30 z-0"></div>
                  
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center w-24 text-center group">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center text-saffron font-bold text-sm shadow-sm group-hover:bg-saffron group-hover:text-white transition-colors mb-3">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-[13px] text-dark leading-tight mb-1">{step.title}</h4>
                      <p className="text-[10px] text-dark-light">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Important Notice */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gold/20 shadow-sm p-6 relative overflow-hidden mt-auto"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-saffron"></div>
                <h3 className="font-serif font-bold text-lg text-dark mb-4 flex items-center gap-2">
                  <GiLotus className="text-saffron" />
                  महत्वपूर्ण सूचना
                </h3>
                <ul className="space-y-2 text-sm text-dark-light">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1 text-xs">●</span>
                    गुरु दीक्षा केवल गुरु जी की स्वीकृति के बाद ही प्रदान की जाती है।
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1 text-xs">●</span>
                    आवेदन करने से दीक्षा सुनिश्चित नहीं होती।
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1 text-xs">●</span>
                    कृपया सही जानकारी ही दर्ज करें।
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1 text-xs">●</span>
                    दीक्षा की तिथि एवं स्थान की सूचना मोबाइल या ईमेल द्वारा भेजी जाएगी।
                  </li>
                </ul>
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
              
              <div className="space-y-3">
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

      {/* Bottom Section: Contact, Form, Quote */}
      <section className="py-20 bg-[#FDFBF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Col 1: Contact Cards */}
            <div className="flex flex-col space-y-4">
              <div className="text-center lg:text-left mb-6">
                <h2 className="font-serif text-2xl font-bold text-dark">दीक्षा हेतु संपर्क करें</h2>
                <p className="text-sm text-dark-light mt-1">आप हमसे निम्न माध्यमों से संपर्क कर सकते हैं:</p>
                <div className="w-12 h-[2px] bg-gold mt-3 mx-auto lg:mx-0"></div>
              </div>
              
              <a href={`https://wa.me/${contacts?.whatsapp?.replace(/[^\d]/g, '') || '918960292928'}?text=प्रणाम`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl flex-shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-dark">WhatsApp पर संपर्क करें</h4>
                  <p className="text-xs text-dark-light">{contacts?.whatsapp || '+91 8960292928'}</p>
                </div>
              </a>
              
              <a href={`tel:${contacts?.phone?.replace(/[^\d+]/g, '') || '+918960292928'}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gold/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-bold text-dark">अभी कॉल करें</h4>
                  <p className="text-xs text-dark-light">{contacts?.phone || '+91 8960292928'}</p>
                </div>
              </a>
              
              <a href={`mailto:${contacts?.email || 'amitshukla22509@gmail.com'}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gold/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-dark">ईमेल करें</h4>
                  <p className="text-xs text-dark-light truncate max-w-[200px]">{contacts?.email || 'amitshukla22509@gmail.com'}</p>
                </div>
              </a>
            </div>
            
            {/* Col 2: Inquiry Form */}
            <div className="bg-white rounded-3xl border border-gold/20 shadow-lg p-6 lg:p-8">
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl font-bold text-dark">दीक्षा हेतु आवेदन / Inquiry Form</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-2"></div>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-light mb-1">नाम *</label>
                    <input type="text" placeholder="अपना नाम दर्ज करें" className="w-full bg-[#FDFBF4] border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-saffron transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-light mb-1">मोबाइल नंबर *</label>
                    <input type="tel" placeholder="अपना मोबाइल नंबर दर्ज करें" className="w-full bg-[#FDFBF4] border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-saffron transition-colors" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-light mb-1">ईमेल</label>
                    <input type="email" placeholder="अपना ईमेल दर्ज करें" className="w-full bg-[#FDFBF4] border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-saffron transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-light mb-1">विषय</label>
                    <select className="w-full bg-[#FDFBF4] border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-saffron transition-colors text-dark-light">
                      <option>गुरु दीक्षा हेतु आवेदन</option>
                      <option>दीक्षा संबंधी जानकारी</option>
                      <option>अन्य</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark-light mb-1">संदेश</label>
                  <textarea rows="3" placeholder="अपना संदेश लिखें..." className="w-full bg-[#FDFBF4] border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-saffron transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-saffron to-gold text-white font-bold py-3 rounded-xl hover:shadow-lg hover:opacity-90 transition-all text-sm">
                  सबमिट करें
                </button>
              </form>
            </div>
            
            {/* Col 3: Quote Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gold/20 group h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5EEDC] to-[#E8DCC2]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)]"></div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <span className="text-5xl text-saffron/40 font-serif leading-none mb-2">"</span>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-dark-charcoal leading-snug mb-8">
                  गुरु बिना ज्ञान नहीं,<br/>ज्ञान बिना मोक्ष नहीं।
                </h3>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-5xl drop-shadow-md"
                >
                  🪔
                </motion.div>
                <div className="w-16 h-2 bg-saffron/20 rounded-full mt-4 blur-sm"></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
