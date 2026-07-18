import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rameshwar Lal Dwivedi',
      role: 'Katha Organizer, Delhi',
      comment: 'Hosting Shrimad Bhagvat Katha by Guru Ji was the most divine event of our lives. The sweet melody of the bhajans and the easy-to-understand explanation of complex verses left our family and the entire locality in absolute bliss.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1544790181-37288bde4d16?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Savitri Devi',
      role: 'Devotee, Vrindavan Dham',
      comment: 'I attend Guru Ji\'s katha every year. His narration of Lord Krishna\'s leelas is so emotional and engaging that one can feel the presence of the Lord. The spiritual wisdom has completely transformed my perspective on life.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1609137144813-7d2d34a41bd9?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Dr. Vivek Agrawal',
      role: 'Trustee, Shivalaya Trust, Mumbai',
      comment: 'We organized a Shiv Mahapuran Katha in Mumbai. The administrative coordination, timing, and most importantly, Guru Ji\'s scientific yet traditional interpretation of scriptures attracted over 5,000 devotees daily. Unforgettable experience.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Narendra Nath Shastri',
      role: 'Acharya, Sanskrit Gurukul, Haridwar',
      comment: 'Pujya Guru Ji\'s command over the Sanskrit shlokas and his ability to relate ancient stories with current psychological stress is outstanding. He is a true visionary guiding the youth towards Sanatan values.',
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80'
    }
  ]

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <section className="relative py-20 bg-dark-charcoal text-white text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-saffron uppercase font-bold tracking-widest text-xs flex items-center justify-center space-x-2">
            <GiLotus />
            <span>Devotee Experiences</span>
            <GiLotus />
          </span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-black">Spiritual Testimonials</h1>
          <p className="text-sm font-light text-cream-deep/70 max-w-xl mx-auto">
            Read stories of transformation, inner peace, and divine experiences shared by devotees and katha organizers.
          </p>
        </div>
      </section>

      {/* Testimonials Slider Area */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-amber-500/10 shadow-premium"
          >
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="py-10"
            >
              {reviews.map((rev, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto px-6">
                    {/* Stars */}
                    <div className="flex items-center space-x-1.5 text-gold text-lg">
                      {[...Array(rev.stars)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Comment text */}
                    <div className="relative">
                      <FaQuoteLeft className="text-saffron/10 text-6xl absolute -top-8 -left-4 pointer-events-none" />
                      <p className="font-serif text-base sm:text-lg text-dark leading-relaxed italic relative z-10">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Avatar & Info */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-cream-deep w-full justify-center">
                      <img 
                        src={rev.avatar} 
                        alt={rev.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold" 
                      />
                      <div className="text-left">
                        <h4 className="font-serif font-bold text-dark text-sm">{rev.name}</h4>
                        <span className="text-[10px] text-saffron uppercase font-bold tracking-wider">{rev.role}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
