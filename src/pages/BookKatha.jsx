import React from 'react'
import { motion } from 'framer-motion'
import { GiLotus } from 'react-icons/gi'
import { FaPhoneAlt, FaEnvelope, FaCalendarCheck } from 'react-icons/fa'
import BookingForm from '../components/BookingForm'

export default function BookKatha() {
  const steps = [
    {
      step: '01',
      title: 'Submit Request',
      desc: 'Fill out our detailed request form with preferred dates, venue address, and select the specific scriptural Katha type.'
    },
    {
      step: '02',
      title: 'Ashram Review',
      desc: 'Our ashram committee reviews the dates against Guru Ji\'s traveling schedules and updates you with possibilities.'
    },
    {
      step: '03',
      title: 'Divine Coordination',
      desc: 'Once dates are finalized, we coordinate travel, accommodation, stage arrangements, and bhajan mandli details.'
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
            <span>Katha Invitation</span>
            <GiLotus />
          </span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-black">Book Katha Services</h1>
          <p className="text-sm font-light text-cream-deep/70 max-w-xl mx-auto">
            Invite Pujya Guru Ji to organize a divine, transformative scriptural Katha saptah in your city or locality.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Organization Guidance Steps */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-saffron font-bold text-xs uppercase tracking-widest">Process Flow</span>
                <h2 className="font-serif text-3xl font-bold text-dark">How To Organize</h2>
                <p className="text-sm text-dark-light font-light leading-relaxed">
                  Organizing a scriptural Katha requires collective devotion, coordination, and layout preparation. Follow our simple process to host Guru Ji.
                </p>
              </div>

              {/* Steps Cards */}
              <div className="space-y-6">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex space-x-4 bg-white/60 p-5 rounded-2xl border border-gold/10 shadow-sm">
                    <div className="font-serif text-2xl font-black text-saffron bg-saffron/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      {st.step}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-dark">{st.title}</h4>
                      <p className="text-xs text-dark-light font-light mt-1 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Support Details card */}
              <div className="bg-gradient-to-br from-dark to-dark-charcoal text-cream-deep p-6 rounded-3xl border border-gold-dark/30 shadow-xl space-y-4">
                <h4 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                  <FaCalendarCheck className="text-saffron" />
                  <span>Urgent Coordination?</span>
                </h4>
                <p className="text-xs font-light text-cream-deep/60 leading-relaxed">
                  If you are proposing a Katha within the next 45 days, please call our ashram secretary directly for rapid checks.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <a href="tel:+919876543210" className="flex items-center space-x-2 hover:text-saffron transition-colors">
                    <FaPhoneAlt className="text-saffron" />
                    <span>Call: +91 98765 43210</span>
                  </a>
                  <a href="mailto:info@shrimadbhagvatkatha.org" className="flex items-center space-x-2 hover:text-saffron transition-colors">
                    <FaEnvelope className="text-saffron" />
                    <span>Email: info@shrimadbhagvatkatha.org</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-7">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
