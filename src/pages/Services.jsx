import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GiLotus, GiMusicalNotes, GiTrident } from 'react-icons/gi'
import { FaClock, FaBookOpen, FaOm, FaPlaceOfWorship, FaMapMarkerAlt, FaCalendarCheck, FaArrowRight, FaGlobeAmericas } from 'react-icons/fa'
import bhagvatBanner from '../assets/images/bhagvat.png'
import ramkathaBanner from '../assets/images/ramkatha.png'
import shivkathaBanner from '../assets/images/shivekatha.png'
import deviBhagwatBanner from '../assets/images/devi_bhagwat.png'
import sunderkandBanner from '../assets/images/sunderkand.png'
import serviceHeroImg from '../assets/images/service_hero_banner.png'

export default function Services() {
  const serviceDetails = [
    {
      titleHindi: '॥ श्रीमद्भागवत कथा सप्ताह ॥',
      title: 'Shrimad Bhagvat Katha Saptah',
      formType: 'Shrimad Bhagvat Katha',
      description: 'The supreme scriptural discourse detailing Lord Krishna\'s transcendental leelas. Narrated over seven days, this katha guides the soul toward supreme liberation, self-realization, and pure love of God.',
      icon: GiLotus,
      duration: '7 Days (3 Hours daily)',
      benefits: ['Purification of Mind & Heart', 'Krishna Bhakti', 'Family Peace', 'Removal of Obstacles', 'Spiritual Growth', 'Divine Blessings'],
      bgImage: bhagvatBanner
    },
    {
      titleHindi: '॥ श्री राम कथा महोत्सव ॥',
      title: 'Shri Ram Katha Mahotsav',
      formType: 'Ram Katha',
      description: 'Experience the divine qualities and life principles of Maryada Purushottam Lord Rama. Ram Katha details the journey of Lord Rama, highlighting moral values, duty, devotion, and ideal relationships.',
      icon: FaPlaceOfWorship,
      duration: '9 Days (3 Hours daily)',
      benefits: ['Harmony in Relationships', 'Moral Integrity', 'Victory over Negativity', 'Devotion to Lord Rama', 'Peace in the Home', 'Spiritual Discipline'],
      bgImage: ramkathaBanner
    },
    {
      titleHindi: '॥ शिव महापुराण कथा ॥',
      title: 'Shiv Mahapuran Katha',
      formType: 'Shiv Mahapuran',
      description: 'Delve into the absolute wisdom of the Shiv Mahapuran. Learn about the forms and formless aspects of Lord Shiva, his divine marriages, his deep cosmic meditations, and the secrets of the holy syllables.',
      icon: GiTrident,
      duration: '5 or 7 Days (3 Hours daily)',
      benefits: ['Inner Calm & Control', 'Spiritual Awakening', 'Destruction of Ego', 'Blessings of Mahadev', 'Relief from Sufferings', 'Cosmic Knowledge'],
      bgImage: shivkathaBanner
    },
    {
      titleHindi: '॥ श्रीमद देवी भागवत ॥',
      title: 'Shrimad Devi Bhagwat',
      formType: 'Devi Bhagwat',
      description: 'Celebrate the supreme creative energy of the universe, Adi Parashakti Durga. Devi Bhagwat narrates the stories of the divine mother, her major incarnations, and the secrets of the Sri Chakra.',
      icon: FaOm,
      duration: '9 Days (Navratri Special)',
      benefits: ['Mental Strength', 'Wealth & Wisdom', 'Protection from Evil', 'Fulfillment of Desires', 'Grace of the Mother', 'Courage in Adversity'],
      bgImage: deviBhagwatBanner
    },
    {
      titleHindi: '॥ सुन्दरकाण्ड पाठ ॥',
      title: 'Sundarkand Path',
      formType: 'Sundarkand Path',
      description: 'A melodious recital of the Sundarkand chapter from the Sri Ramcharitmanas, describing the glorious journey of Lord Hanuman to Lanka. Guided by Guru Ji with classical instruments.',
      icon: FaBookOpen,
      duration: '1 Day (4 Hours)',
      benefits: ['Dispelling Fear', 'Removal of Doshas', 'Confidence & Success', 'Hanuman Ji\'s Grace', 'Physical Strength', 'Victory in Tasks'],
      bgImage: sunderkandBanner
    },
    {
      titleHindi: '॥ भजन संध्या ॥',
      title: 'Bhajan Sandhya',
      formType: 'Bhajan Sandhya',
      description: 'A spiritual evening featuring beautiful sankirtans, classical bhajans, and sufi spiritual compositions sung by Guru Ji along with renowned accompanying musicians.',
      icon: GiMusicalNotes,
      duration: '1 Evening (3-4 Hours)',
      benefits: ['Community Chanting', 'Divine Ecstasy', 'Stress Relief', 'Inner Peace', 'Musical Meditation', 'Shared Devotion'],
      bgImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const stats = [
    { value: '1500+', label: 'Kathas Performed', icon: FaBookOpen },
    { value: '25+', label: 'Years Experience', icon: FaCalendarCheck },
    { value: '100+', label: 'Cities Visited', icon: FaMapMarkerAlt },
    { value: 'Worldwide', label: 'Booking Available', icon: FaGlobeAmericas }
  ]

  return (
    <div className="pt-[100px] sm:pt-[105px] lg:pt-[105px] bg-[#FFFDF7] relative overflow-hidden font-sans">
      
      {/* Background Decor Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Mandala Watermark (CSS based) */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-[0.03] bg-[radial-gradient(circle,transparent_20%,#D4AF37_20%,#D4AF37_80%,transparent_80%,transparent)] rounded-full [background-size:20px_20px]"></div>
        <div className="absolute top-[800px] -left-[200px] w-[600px] h-[600px] opacity-[0.02] bg-[radial-gradient(circle,transparent_20%,#D4AF37_20%,#D4AF37_80%,transparent_80%,transparent)] rounded-full [background-size:20px_20px]"></div>
        <div className="absolute top-[1600px] -right-[200px] w-[600px] h-[600px] opacity-[0.02] bg-[radial-gradient(circle,transparent_20%,#D4AF37_20%,#D4AF37_80%,transparent_80%,transparent)] rounded-full [background-size:20px_20px]"></div>
        
        {/* Soft Golden Gradients for cinematic lighting */}
        <div className="absolute top-[20%] left-0 w-full h-[500px] bg-gradient-to-b from-[#F6B73C]/[0.03] to-transparent"></div>
        <div className="absolute top-[50%] left-0 w-full h-[500px] bg-gradient-to-t from-[#F6B73C]/[0.03] to-transparent"></div>
      </div>

      {/* Page Header (Hero Banner) */}
      <section className="relative w-full flex justify-center border-b-2 border-[#D4AF37]/20 z-10">
        <img src={serviceHeroImg} alt="Our Services Banner" className="w-full max-w-[1920px] h-auto block shadow-md" />
        
        {/* Decorative Hanging Bells */}
        <div className="absolute top-0 left-[10%] w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent hidden md:block">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#B38D22] shadow-lg flex items-end justify-center pb-1"><div className="w-1.5 h-1.5 bg-[#8A6715] rounded-full"></div></div>
        </div>
        <div className="absolute top-0 right-[10%] w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent hidden md:block">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#B38D22] shadow-lg flex items-end justify-center pb-1"><div className="w-2 h-2 bg-[#8A6715] rounded-full"></div></div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#EAD8C8] shadow-[0_8px_30px_rgba(224,90,16,0.06)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFFDF7] border border-[#D4AF37]/30 flex items-center justify-center text-2xl text-[#D4AF37] mb-3 shadow-inner group-hover:scale-110 group-hover:text-[#E05A10] transition-all duration-300">
                <stat.icon />
              </div>
              <div className="font-serif text-3xl font-black text-[#3D2B20]">{stat.value}</div>
              <div className="text-sm font-semibold text-[#5a4332] uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Services List Section */}
        <div className="space-y-24">
          {serviceDetails.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
            >
              {/* Left Side: Image (40%) */}
              <div className={`w-full lg:w-[45%] relative ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* Image Frame with Golden Border */}
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border-[3px] border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(212,175,55,0.15)] group hover:-translate-y-2 transition-transform duration-700 ease-out z-10">
                  <img
                    src={svc.bgImage}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 text-white text-sm font-semibold shadow-lg">
                      <FaClock className="text-[#F6B73C]" />
                      <span>{svc.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative floating dots behind image */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(circle,#D4AF37_2px,transparent_2px)] [background-size:12px_12px] opacity-30 z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(circle,#D4AF37_2px,transparent_2px)] [background-size:12px_12px] opacity-30 z-0"></div>
              </div>

              {/* Right Side: Content (60%) */}
              <div className={`w-full lg:w-[55%] flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:order-2 lg:items-start lg:text-left'}`}>
                
                {/* Top Heading */}
                <div className={`flex items-center space-x-3 mb-4 ${idx % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F6B73C] to-[#E05A10] flex items-center justify-center text-white text-xl shadow-[0_4px_15px_rgba(224,90,16,0.3)]">
                    <svc.icon />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-wide drop-shadow-sm">
                    {svc.titleHindi}
                  </h2>
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#3D2B20] mb-4">
                  {svc.title}
                </h3>

                {/* Decorative Divider */}
                <div className={`h-[3px] w-24 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full mb-6 ${idx % 2 === 1 ? 'bg-gradient-to-l ml-auto' : ''}`}></div>

                {/* Description */}
                <p className="text-[#5a4332] text-lg font-medium leading-relaxed mb-8 max-w-xl">
                  {svc.description}
                </p>

                {/* Benefits Section */}
                <div className={`w-full max-w-xl ${idx % 2 === 1 ? 'ml-auto' : ''}`}>
                  <h4 className="text-sm uppercase font-bold text-[#D4AF37] tracking-widest mb-4 flex items-center space-x-2">
                    <GiLotus className="text-lg" />
                    <span>Spiritual Benefits</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="bg-white/70 backdrop-blur-sm border border-[#EAD8C8] rounded-full px-4 py-2.5 flex items-center space-x-3 shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300">
                        <div className="w-5 h-5 rounded-full bg-[#FFFDF7] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                          <FaOm className="text-[10px]" />
                        </div>
                        <span className="text-sm font-semibold text-[#5a4332]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action */}
                <div className="mt-10">
                  <Link
                    to={`/contact?type=${encodeURIComponent(svc.formType)}`}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-full overflow-hidden bg-gradient-to-r from-[#F6B73C] to-[#E05A10] shadow-[0_10px_30px_rgba(224,90,16,0.3)] hover:shadow-[0_15px_40px_rgba(224,90,16,0.4)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
                    
                    <span className="relative z-10 flex items-center space-x-3">
                      <span>Request Booking</span>
                      <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
