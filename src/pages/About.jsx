import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaAward, FaHeart, FaHands, FaFileAlt, FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaPrayingHands, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'
import { GiLotus, GiOpenBook, GiSun } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import { useTranslation } from '../context/LanguageContext'
import logoImg from '../assets/images/logo.jpeg'
import aboutHeroImg from '../assets/images/about_guru.png'

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
    <div className="pt-[90px] lg:pt-[104px] pb-20 bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20">
        <img src={aboutHeroImg} alt="About Guru Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Main Biography Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Image Grid Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative border-4 border-gold p-3 rounded-[40px] bg-white shadow-[0_20px_50px_rgba(224,90,16,0.15)] max-w-sm w-full">
                <img
                  src={about.image}
                  alt={about.name}
                  className="rounded-[30px] w-full h-[300px] sm:h-[450px] object-cover object-top"
                />

                {/* Spiritual floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-saffron-dark text-white p-5 rounded-2xl border border-gold/20 shadow-xl text-center">
                  <GiSun className="text-gold text-2xl mx-auto mb-1 animate-[spin_10s_linear_infinite]" />
                  <span className="text-xs uppercase tracking-widest font-bold block">{t('about.badge3')}</span>
                </div>
              </div>
            </div>

            {/* Biography Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-saffron font-bold text-xs uppercase tracking-widest">{t('about.badge2')}</span>
              <h2 className="font-serif text-3xl font-bold text-dark">{about.name}</h2>

              <div className="text-base text-[#3D2B20]/80 space-y-4 font-normal leading-loose whitespace-pre-line">
                <p>{about.bio}</p>
              </div>

              {/* Mission Statement Box */}
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/10 shadow-premium flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 cursor-default">
                <div className="bg-saffron/10 p-3 rounded-xl text-saffron text-2xl mt-1">
                  <FaHands />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-dark text-lg">{t('about.missionTitle')}</h4>
                  <p className="text-sm text-dark-light font-light mt-1.5 leading-relaxed">
                    "{t('about.missionDesc')}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (from mockup) */}
      <section className="py-12 bg-[#FAF6F0] border-t border-[#EAD8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.stats?.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-[#EAD8C8] p-6 rounded-2xl text-center shadow-sm flex flex-col justify-center items-center h-28 hover:shadow-md transition-shadow"
              >
                <span className="font-serif text-3xl font-black text-[#E05A10] block">{stat.value}</span>
                <span className="text-xs font-bold text-[#3D2B20]/60 tracking-wide block mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-cream-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-saffron uppercase font-bold tracking-widest text-xs">{t('about.timelineBadge')}</span>
            <h2 className="font-serif text-3xl font-bold text-dark mt-1">{t('about.timelineTitle')}</h2>
            <div className="ornament-line">
              <span className="text-gold text-lg">✦</span>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative border-l border-gold/30 ml-4 md:ml-0 md:left-1/2 space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Year Badge as Center Node */}
                <div className="absolute left-[-9px] md:left-auto md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-saffron border-4 border-cream-light z-10 shadow-md"></div>

                {/* Year Label */}
                <div className="pl-6 md:pl-0 md:w-1/2 flex justify-start md:justify-center">
                  <span className="font-serif text-xl xs:text-2xl font-black text-saffron bg-white/60 px-4 py-1 rounded-full border border-gold/15 shadow-sm">
                    {item.year}
                  </span>
                </div>

                {/* Content Box */}
                <div className="pl-6 md:pl-0 md:w-1/2 md:px-8 mt-2 md:mt-0">
                  <div className="glass-card p-6 border border-amber-500/10 bg-white/80">
                    <h4 className="font-serif text-lg font-bold text-dark">{item.title}</h4>
                    <p className="text-xs text-dark-light font-light mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Achievements Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-saffron uppercase font-bold tracking-widest text-xs">Spiritual Milestones</span>
            <h2 className="font-serif text-3xl font-bold text-dark mt-1">Honors & Contributions</h2>
            <div className="ornament-line">
              <span className="text-gold text-lg">✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((ach, idx) => {
              const IconComponent = IconMap[ach.icon] || FaAward
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-card p-8 border border-amber-500/10 hover:border-gold/30 hover:shadow-premium-hover transition-all text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center text-saffron text-3xl mx-auto shadow-inner">
                    <IconComponent />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-dark">{ach.title}</h3>
                  <p className="text-xs text-dark-light font-light leading-relaxed">{ach.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
