import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaRegHandshake, FaUser, FaPen, FaComment } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import BookingForm from '../components/BookingForm'
import contactHeroImg from '../assets/images/contact_hero_image.png'

export default function Contact() {
  const { contacts } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('type') || params.get('date')) {
      setActiveTab('booking')
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Construct WhatsApp message
    const whatsappNumber = contacts?.whatsapp?.replace(/[^\d]/g, '') || '918960292928'
    const text = `🪷 *स्वामी हरिप्रपन्नाचार्य जी* 🪷\n🙏 *जय सियाराम | राधे राधे* 🙏\n✨ _सत्यम परं धीमहि_ ✨\n\nसादर प्रणाम,\nमुझे एक सामान्य जानकारी (General Inquiry) के लिए संपर्क करना है। मेरा विवरण इस प्रकार है:\n\n*👤 नाम (Name):* ${formData.name}\n*📞 फोन (Phone):* ${formData.phone}\n*✉️ ईमेल (Email):* ${formData.email}\n*📋 विषय (Subject):* ${formData.subject}\n\n*📝 संदेश (Message):*\n${formData.message}\n\n🌐 _(वेबसाइट के माध्यम से भेजा गया संदेश)_`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    setTimeout(() => {
      setLoading(false)
      window.open(whatsappUrl, '_blank')
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 800)
  }

  const contactInfo = [
    {
      title: 'Phone Enquiries',
      value: '+91 89602 92928',
      subtext: 'Mon to Sat (09:00 AM to 06:00 PM)',
      icon: FaPhoneAlt,
      link: 'tel:+918960292928'
    },
    {
      title: 'WhatsApp Message',
      value: contacts.whatsapp,
      subtext: 'For instant scriptural booking chats',
      icon: FaWhatsapp,
      link: contacts.whatsapp.startsWith('http') ? contacts.whatsapp : `https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, '')}`
    },
    {
      title: 'Official Email',
      value: contacts.email,
      subtext: 'Send official proposals & letters',
      icon: FaEnvelope,
      link: `mailto:${contacts.email}`
    },
    {
      title: 'Ashram Address',
      value: 'राज राजेश्वरी महाशक्तिपीठ आश्रम चक्रसुदर्शनपूरी धनुपुर हंडिया प्रयागराज 221503',
      subtext: 'Uttar Pradesh, India',
      icon: FaMapMarkerAlt,
      link: 'https://maps.google.com'
    }
  ]

  return (
    <div className="pt-0 pb-0 overflow-x-hidden bg-[#FFFDF7]">
      {/* Hero Section */}
      <section className="relative w-full flex justify-center border-b border-gold/20 -mt-4">
        <img src={contactHeroImg} alt="Contact Hero Banner" className="w-full max-w-[1920px] h-auto block shadow-sm relative z-10" />
      </section>

      {/* Contact Content Section */}
      <section className="pt-2 pb-8 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info Cards Grid - Left Column */}
            <div className="lg:col-span-5 space-y-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card p-6 border border-amber-500/10 hover:border-saffron/30 hover:shadow-premium-hover transition-all flex items-start space-x-4"
                >
                  <div className="bg-saffron/10 p-3.5 rounded-xl text-saffron text-2xl flex-shrink-0">
                    <info.icon />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-base font-bold text-dark">{info.title}</h4>
                    <p className="text-sm font-semibold text-saffron-dark mt-1 break-words">{info.value}</p>
                    <p className="text-xs text-dark-light/60 font-light mt-0.5">{info.subtext}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Forms Section - Right Column */}
            <div className="lg:col-span-7">
              <div className="flex space-x-2 mb-6 bg-white/50 p-1.5 rounded-2xl border border-gold/10 inline-flex">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-5 py-2.5 rounded-xl font-serif font-bold text-sm transition-all duration-300 ${activeTab === 'contact' ? 'bg-saffron text-white shadow-md' : 'text-dark-light hover:text-dark hover:bg-white/60'}`}
                >
                  General Inquiry
                </button>
                <button
                  onClick={() => setActiveTab('booking')}
                  className={`px-5 py-2.5 rounded-xl font-serif font-bold text-sm transition-all duration-300 ${activeTab === 'booking' ? 'bg-saffron text-white shadow-md' : 'text-dark-light hover:text-dark hover:bg-white/60'}`}
                >
                  Book your Katha
                </button>
              </div>

              {activeTab === 'contact' ? (
                submitted ? (
                  <div className="bg-white/80 p-6 xs:p-10 rounded-3xl border border-gold-dark/20 text-center space-y-4 shadow-premium">
                    <GiLotus className="text-5xl text-green-500 mx-auto animate-bounce" />
                    <h3 className="font-serif text-2xl font-bold text-dark">Redirecting to WhatsApp...</h3>
                    <p className="text-sm text-dark-light max-w-md mx-auto font-light">
                      Radhe Radhe! We are opening WhatsApp so you can send this message directly to our ashram coordinator.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-premium-saffron text-xs px-6 py-2.5 mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-4 sm:p-10 rounded-3xl border border-amber-500/10 shadow-premium space-y-6 animate-fade-in-up">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-dark">Send Inquiry Message</h3>
                      <p className="text-xs text-saffron uppercase font-bold tracking-widest mt-1">Ashram Coordination Office</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Full Name</label>
                        <div className="relative">
                          <FaUser className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Phone Number</label>
                        <div className="relative">
                          <FaPhoneAlt className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="tel"
                            required
                            name="phone"
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark"
                            placeholder="10 digit number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Subject</label>
                        <div className="relative">
                          <FaPen className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="text"
                            required
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark"
                            placeholder="e.g. Katha Query"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">Your Message</label>
                      <div className="relative">
                        <FaComment className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                        <textarea
                          required
                          rows="4"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark resize-none"
                          placeholder="Write your spiritual request or event message..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-premium-saffron text-sm py-3 px-6 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <FaRegHandshake />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )
              ) : (
                <div className="animate-fade-in-up">
                  <BookingForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="h-96 w-full relative border-t-2 border-gold/30">
        {/* Real Dynamic Map Embed iframe */}
        <iframe
          src="https://maps.google.com/maps?q=%E0%A4%B0%E0%A4%BE%E0%A4%9C+%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A5%87%E0%A4%B6%E0%A5%8D%E0%A4%B5%E0%A4%B0%E0%A5%80+%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B6%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A4%BF%E0%A4%AA%E0%A5%80%E0%A4%A0+%E0%A4%86%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%AE+%E0%A4%9A%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%B8%E0%A5%81%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%E0%A4%AA%E0%A5%82%E0%A4%B0%E0%A5%80+%E0%A4%A7%E0%A4%A8%E0%A5%81%E0%A4%AA%E0%A5%81%E0%A4%B0+%E0%A4%B9%E0%A4%82%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A4%BE+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%AF%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A4%BE%E0%A4%9C+221503&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-none"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Raj Rajeshwari Mahashakti Peeth Ashram Map Location"
        ></iframe>
      </section>
    </div>
  )
}
