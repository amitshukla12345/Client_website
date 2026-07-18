import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GiLotus, GiGreekTemple, GiSun, GiMusicalNotes, GiFlame, GiTrident } from 'react-icons/gi'
import { FaClock, FaBookOpen, FaOm, FaPlaceOfWorship } from 'react-icons/fa'
import bhagvatBanner from '../assets/images/bhagvat.png'
import ramkathaBanner from '../assets/images/ramkatha.png'
import shivkathaBanner from '../assets/images/shivekatha.png'
import deviBhagwatBanner from '../assets/images/devi_bhagwat.png'
import sunderkandBanner from '../assets/images/sunderkand.png'
import serviceHeroImg from '../assets/images/service_hero_banner.png'

export default function Services() {
  const serviceDetails = [
    {
      title: 'Shrimad Bhagvat Katha Saptah',
      formType: 'Shrimad Bhagvat Katha',
      tagline: '7-Day Divine Discourse & Liberation',
      description: 'The supreme scriptural discourse detailing Lord Krishna\'s transcendental leelas. Narrated over seven days, this katha guides the soul toward supreme liberation, self-realization, and pure love of God. Each day features divine prasang like Krishna Janmotsav, Rukmini Vivah, and Sudama Milan with melodious bhajan kirtans.',
      icon: GiLotus,
      duration: '7 Days (3 Hours daily)',
      benefits: ['Purification of mind & heart', 'Removal of ancestral doshas', 'Awakening of transcendental devotion'],
      bgImage: bhagvatBanner
    },
    {
      title: 'Shri Ram Katha Mahotsav',
      formType: 'Ram Katha',
      tagline: '9-Day Journey of Righteousness',
      description: 'Experience the divine qualities and life principles of Maryada Purushottam Lord Rama. Ram Katha details the journey of Lord Rama, highlighting moral values, duty, devotion, and ideal relationships. It inspires devotees to establish a righteous life (Dharma) in their homes and communities.',
      icon: FaPlaceOfWorship,
      duration: '9 Days (3 Hours daily)',
      benefits: ['Harmony in family relationships', 'Establishment of moral integrity', 'Victory over spiritual obstacles'],
      bgImage: ramkathaBanner
    },
    {
      title: 'Shiv Mahapuran Katha',
      formType: 'Shiv Mahapuran',
      tagline: '5 or 7-Day Lord Shiva Wisdom Retold',
      description: 'Delve into the absolute wisdom of the Shiv Mahapuran. Learn about the forms and formless aspects of Lord Shiva, his divine marriages, his deep cosmic meditations, and the secrets of the holy syllables (Panchakshari Mantra). This katha provides cosmic peace and helps conquer spiritual ignorance.',
      icon: GiTrident,
      duration: '5 or 7 Days (3 Hours daily)',
      benefits: ['Inner calm and mental control', 'Spiritual awakening', 'Destruction of negative tendencies'],
      bgImage: shivkathaBanner
    },
    {
      title: 'Shrimad Devi Bhagwat',
      formType: 'Devi Bhagwat',
      tagline: '9-Day Divine Mother Discourse',
      description: 'Celebrate the supreme creative energy of the universe, Adi Parashakti Durga. Devi Bhagwat narrates the stories of the divine mother, her major incarnations (Maha Saraswati, Maha Lakshmi, Maha Kali), and the secrets of the Sri Chakra. Ideal for acquiring mental strength, prosperity, and protection.',
      icon: FaOm,
      duration: '9 Days (Navratri Special)',
      benefits: ['Manifestation of mental strength', 'Acquisition of wealth & wisdom', 'Protection from negative energies'],
      bgImage: deviBhagwatBanner
    },
    {
      title: 'Sundarkand Path',
      formType: 'Sundarkand Path',
      tagline: '1-Day Shri Hanuman Devotional Recital',
      description: 'A melodious recital of the Sundarkand chapter from the Sri Ramcharitmanas, describing the glorious journey of Lord Hanuman to Lanka. Guided by Guru Ji with classical instruments, this recital builds infinite confidence, strength, and dispels bad planetary combinations.',
      icon: FaBookOpen,
      duration: '1 Day (4 Hours)',
      benefits: ['Dispelling fear and depression', 'Removal of Saturn/Rahu doshas', 'Blessings of confidence and success'],
      bgImage: sunderkandBanner
    },
    {
      title: 'Bhajan Sandhya',
      formType: 'Bhajan Sandhya',
      tagline: 'Evening of Devotional Melodies',
      description: 'A spiritual evening featuring beautiful sankirtans, classical bhajans, and sufi spiritual compositions sung by Guru Ji along with renowned accompanying musicians. A perfect program to fill the venue with divine joy and invite a large gathering of community devotees.',
      icon: GiMusicalNotes,
      duration: '1 Evening (3-4 Hours)',
      benefits: ['Joyous community chanting', 'Stirring of divine emotional ecstasy', 'Stress relief and peace'],
      bgImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <div className="pt-24 lg:pt-[104px] bg-cream-light">
      {/* Page Header (Hero Banner) */}
      <section className="relative w-full flex justify-center bg-[#FFFDF7]">
        <img src={serviceHeroImg} alt="Our Services Banner" className="w-full max-w-[1920px] h-auto block shadow-sm" />
      </section>

      {/* Services List Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {serviceDetails.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 p-6 sm:p-8 glass-card border border-amber-500/10 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Image Frame Column */}
              <div className="lg:w-5/12 relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[400px] bg-[#1E130C]">
                <img
                  src={svc.bgImage}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {/* Golden overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/80 to-transparent"></div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-saffron uppercase">
                    <FaClock className="text-[10px]" />
                    <span>{svc.duration}</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold">{svc.title}</h4>
                </div>
              </div>

              {/* Service Meta Details Column */}
              <div className="lg:w-7/12 flex flex-col justify-between py-2 space-y-6">
                <div className="space-y-4">
                  {/* Icon + Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center text-2xl shadow-inner">
                      <svc.icon />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-dark">{svc.title}</h3>
                      <span className="text-xs text-saffron uppercase font-bold tracking-widest">{svc.tagline}</span>
                    </div>
                  </div>

                  <p className="text-sm text-dark-light font-light leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs uppercase font-bold text-dark tracking-wider flex items-center space-x-1.5">
                      <FaBookOpen className="text-gold text-[10px]" />
                      <span>Scriptural Benefits:</span>
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-dark-light">
                      {svc.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-saffron rounded-full"></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Call-to-action */}
                <div className="pt-6 border-t border-cream-deep flex items-center justify-between flex-wrap gap-4">
                  <div className="text-xs text-dark-light font-light">
                    * Available for booking across India & international locations.
                  </div>
                  <Link
                    to={`/contact?type=${encodeURIComponent(svc.formType)}`}
                    className="btn-premium-saffron text-sm px-6 py-2.5 shadow-md"
                  >
                    Request Booking
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
