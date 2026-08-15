// Cache bust update
import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaRegHandshake, FaUser, FaPen, FaComment, FaTrain, FaPlane, FaBus, FaCar, FaMobileAlt, FaParking, FaRestroom, FaUtensils, FaHotel, FaTint, FaFirstAid, FaWheelchair, FaLeaf, FaBed, FaSun, FaClock, FaCalendarAlt, FaPhoneVolume, FaArrowRight, FaFire, FaBookReader, FaHandsHelping, FaHandHoldingHeart, FaTimes } from 'react-icons/fa'
import { GiLotus, GiBowlOfRice, GiSunset, GiCow } from 'react-icons/gi'
import { AppContext } from '../context/AppContext'
import BookingForm from '../components/BookingForm'
import contactHeroImg from '../assets/images/contact_hero_image.png'
import mapPhoneIcon from '../assets/images/map_phone_icon.png'
import ResponsiveHeroBanner from '../components/ResponsiveHeroBanner'
import { saveSessionSubmission } from '../utils/sessionSubmissions'

const emojis = {
  diya: "🪔",
  pray: "🙏",
  user: "👤",
  mobile: "📱",
  email: "📧",
  pin: "📍",
  city: "🏙️",
  house: "🏡",
  postbox: "📮",
  calendar: "📅",
  clockNine: "🕘",
  phone: "📞",
  cherryBlossom: "🌸",
  sparkle: "✨",
  cow: "🐄",
  temple: "🛕"
}

export default function Contact() {
  const { contacts } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    pincode: '',
    state: '',
    district: '',
    village: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')
  const location = useLocation()

  const [showSevaModal, setShowSevaModal] = useState(false)
  const [sevaFormData, setSevaFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    state: '',
    district: '',
    village: '',
    pincode: '',
    sevaType: 'अन्नदान सेवा'
  })

  const handleSevaFormChange = (e) => {
    const { name, value } = e.target
    setSevaFormData(prev => ({ ...prev, [name]: value }))
  }

  const [showMeetModal, setShowMeetModal] = useState(false)
  const [meetFormData, setMeetFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    state: '',
    district: '',
    village: '',
    pincode: '',
    day: 'सोमवार (Monday)',
    timeSlot: 'प्रातः 08:00 AM - 09:00 AM'
  })

  const handleMeetFormChange = (e) => {
    const { name, value } = e.target
    setMeetFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMeetFormSubmit = (e) => {
    e.preventDefault()
    saveSessionSubmission('Meeting Request', meetFormData)
    const stateName = meetFormData.state
    const whatsappNumber = contacts?.whatsapp?.replace(/[^\d]/g, '') || '917738169410'
    const text = `${emojis.diya} *गुरुजी से भेंट के लिए अनुरोध | Request for meeting with Guruji* ${emojis.diya}\n${emojis.pray} *जय सियाराम | राधे राधे (Jai Siyaram | Radhe Radhe)* ${emojis.pray}\n\nमैं गुरुजी से भेंट करना चाहता/चाहती हूँ। मेरा विवरण इस प्रकार है:\nI would like to request a meeting with Guruji. My details are as follows:\n\n${emojis.user} नाम (Name) : ${meetFormData.firstName} ${meetFormData.lastName}\n${emojis.mobile} मोबाइल (Mobile) : ${meetFormData.mobile}\n${emojis.email} ईमेल (Email) : ${meetFormData.email}\n\n${emojis.pin} राज्य (State) : ${stateName}\n${emojis.city} ज़िला (District) : ${meetFormData.district}\n${emojis.house} शहर / गाँव (City/Village) : ${meetFormData.village}\n${emojis.postbox} पिनकोड (Pincode) : ${meetFormData.pincode}\n\n${emojis.calendar} दिन (Day) : ${meetFormData.day}\n${emojis.clockNine} समय (Time) : ${meetFormData.timeSlot}\n\n━━━━━━━━━━━━━━━━━━\n\n${emojis.phone} *कृपया भेंट के लिए समय की पुष्टि करें।* \n(Please confirm the meeting time.)\n\n${emojis.cherryBlossom} *धन्यवाद (Thank You)* ${emojis.pray}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
    setShowMeetModal(false)
    setMeetFormData({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      state: '',
      district: '',
      village: '',
      pincode: '',
      day: 'सोमवार (Monday)',
      timeSlot: 'प्रातः 08:00 AM - 09:00 AM'
    })
  }

  const handleSevaFormSubmit = (e) => {
    e.preventDefault()
    saveSessionSubmission('Seva Request', sevaFormData)
    const stateName = sevaFormData.state
    const whatsappNumber = contacts?.whatsapp?.replace(/[^\d]/g, '') || '917738169410'
    const text = `${emojis.temple} *सेवा के लिए अनुरोध | Request for Seva* ${emojis.temple}\n${emojis.pray} *जय सियाराम | राधे राधे (Jai Siyaram | Radhe Radhe)* ${emojis.pray}\n\nमैं आश्रम में सेवा कार्य के लिए अपना योगदान देना चाहता/चाहती हूँ। मेरा विवरण इस प्रकार है:\nI wish to contribute to the Seva work at the Ashram. My details are as follows:\n\n${sevaFormData.sevaType === 'गौ सेवा' ? emojis.cow : emojis.sparkle} सेवा (Seva Type) : ${sevaFormData.sevaType}\n\n${emojis.user} नाम (Name) : ${sevaFormData.firstName} ${sevaFormData.lastName}\n${emojis.mobile} मोबाइल (Mobile) : ${sevaFormData.mobile}\n${emojis.email} ईमेल (Email) : ${sevaFormData.email}\n\n${emojis.pin} राज्य (State) : ${stateName}\n${emojis.city} ज़िला (District) : ${sevaFormData.district}\n${emojis.house} शहर / गाँव (City/Village) : ${sevaFormData.village}\n${emojis.postbox} पिनकोड (Pincode) : ${sevaFormData.pincode}\n\n━━━━━━━━━━━━━━━━━━\n\n${emojis.phone} *कृपया सेवार्थी से संपर्क कर सेवा हेतु मार्गदर्शन प्रदान करें।* \n(Please contact the devotee to guide them for the Seva.)\n\n${emojis.cherryBlossom} *धन्यवाद (Thank You)* ${emojis.pray}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
    setShowSevaModal(false)
    setSevaFormData({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      state: '',
      district: '',
      village: '',
      pincode: '',
      sevaType: 'अन्नदान सेवा'
    })
  }

  const fetchPincodeDetails = async (pincode, setFormState) => {
    if (pincode && pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const data = await response.json()
        if (data && Array.isArray(data) && data[0] && data[0].Status === 'Success' && Array.isArray(data[0].PostOffice) && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0]

          setFormState(prev => ({
            ...prev,
            state: postOffice.State || '',
            district: postOffice.District || '',
            village: postOffice.Name || ''
          }))
        } else {
          // Reset if invalid pincode response
          setFormState(prev => ({
            ...prev,
            state: '',
            district: '',
            village: ''
          }))
        }
      } catch (error) {
        console.error('Error fetching pincode details:', error)
      }
    } else {
      // Reset if less than 6 digits
      setFormState(prev => ({
        ...prev,
        state: '',
        district: '',
        village: ''
      }))
    }
  }

  useEffect(() => {
    fetchPincodeDetails(sevaFormData.pincode, setSevaFormData)
  }, [sevaFormData.pincode])

  useEffect(() => {
    fetchPincodeDetails(meetFormData.pincode, setMeetFormData)
  }, [meetFormData.pincode])

  useEffect(() => {
    fetchPincodeDetails(formData.pincode, setFormData)
  }, [formData.pincode])

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
    saveSessionSubmission('General Inquiry', formData)

    // Construct WhatsApp message
    const whatsappNumber = contacts?.whatsapp?.replace(/[^\d]/g, '') || '917738169410'
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
      value: '+91 77381 69410',
      subtext: 'Mon to Sat (09:00 AM to 06:00 PM)',
      icon: FaPhoneAlt,
      link: 'tel:+917738169410'
    },
    {
      title: 'WhatsApp Message',
      value: contacts?.whatsapp || '+91 77381 69410',
      subtext: 'For instant scriptural booking chats',
      icon: FaWhatsapp,
      link: contacts?.whatsapp?.startsWith('http') ? contacts.whatsapp : `https://wa.me/${(contacts?.whatsapp || '917738169410').replace(/[^\d]/g, '')}`
    },
    {
      title: 'Official Email',
      value: contacts?.email || 'amitshukla22509@gmail.com',
      subtext: 'Send official proposals & letters',
      icon: FaEnvelope,
      link: `mailto:${contacts?.email || 'amitshukla22509@gmail.com'}`
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
    <div className="pt-[0px] lg:pt-[0px] pb-0 overflow-x-hidden bg-[#FFFDF7]">
      {/* Hero Section */}
      <ResponsiveHeroBanner pageName="Contact" fallbackImage={contactHeroImg}>
        {/* Clickable Overlay Areas for Image Icons */}
        <div className="absolute inset-0 z-20 w-full h-full max-w-[1920px] mx-auto">
          {/* Instagram */}
          <a
            href={contacts?.instagram || '#'}
            target="_blank" rel="noopener noreferrer"
            className="absolute rounded-full hover:bg-white/30 transition-colors"
            style={{ top: '29%', right: '0.8%', width: '4%', height: '8%' }}
            title="Instagram"
          />
          {/* YouTube */}
          <a
            href={contacts?.youtube || '#'}
            target="_blank" rel="noopener noreferrer"
            className="absolute rounded-full hover:bg-white/30 transition-colors"
            style={{ top: '40%', right: '0.8%', width: '4%', height: '8%' }}
            title="YouTube"
          />
          {/* Facebook */}
          <a
            href={contacts?.facebook || '#'}
            target="_blank" rel="noopener noreferrer"
            className="absolute rounded-full hover:bg-white/30 transition-colors"
            style={{ top: '51%', right: '0.8%', width: '4%', height: '8%' }}
            title="Facebook"
          />
          {/* WhatsApp */}
          <a
            href={contacts?.whatsapp?.startsWith('http') ? contacts.whatsapp : `https://wa.me/${(contacts?.whatsapp || '917738169410').replace(/[^\d]/g, '')}`}
            target="_blank" rel="noopener noreferrer"
            className="absolute rounded-full hover:bg-white/30 transition-colors"
            style={{ top: '62%', right: '0.8%', width: '4%', height: '8%' }}
            title="WhatsApp"
          />
        </div>
      </ResponsiveHeroBanner>

      {/* How to Reach Section */}
      <section className="pt-4 pb-6 bg-[#FFFDF7] px-4 border-b border-[#F2E5D5]/50 relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-center gap-3 mb-8">
            <GiLotus className="text-[#D35400] text-xl opacity-80" />
            <h2 className="text-2xl font-bold text-[#5C4033] font-serif">आश्रम तक पहुँचने के मार्ग</h2>
            <GiLotus className="text-[#D35400] text-xl opacity-80" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Card 1: Train */}
            <div className="bg-white rounded-3xl border-t-4 border-t-blue-500 border-x border-b border-gold/20 p-6 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-blue-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_15px_rgba(37,99,235,0.15)] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <FaTrain className="text-blue-500 text-3xl group-hover:text-blue-600 transition-colors" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="font-bold text-[#3D2B20] text-lg leading-tight mb-0.5">रेल मार्ग से</span>
                <span className="text-blue-500 text-[9px] uppercase font-bold tracking-widest mb-4">By Train</span>

                <div className="w-full bg-[#FDF8F3] rounded-xl p-3 mb-4 border border-gold/10 group-hover:border-blue-100 transition-colors">
                  <span className="text-[#8B7355] text-[11px] font-bold uppercase block mb-0.5">निकटतम रेलवे स्टेशन</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase block mb-1">Nearest Station</span>
                  <span className="text-[#5C4033] font-bold text-[14px]">प्रयागराज जंक्शन</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold mt-auto border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt />
                  <div className="flex flex-col items-start">
                    <span className="leading-none">दूरी: 35 KM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Plane */}
            <div className="bg-white rounded-3xl border-t-4 border-t-sky-500 border-x border-b border-gold/20 p-6 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(14,165,233,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-sky-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_15px_rgba(14,165,233,0.15)] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <FaPlane className="text-sky-500 text-3xl -rotate-45 group-hover:text-sky-600 transition-colors" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="font-bold text-[#3D2B20] text-lg leading-tight mb-0.5">वायु मार्ग से</span>
                <span className="text-sky-500 text-[9px] uppercase font-bold tracking-widest mb-4">By Air</span>

                <div className="w-full bg-[#FDF8F3] rounded-xl p-3 mb-4 border border-gold/10 group-hover:border-sky-100 transition-colors">
                  <span className="text-[#8B7355] text-[11px] font-bold uppercase block mb-0.5">निकटतम एयरपोर्ट</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase block mb-1">Nearest Airport</span>
                  <span className="text-[#5C4033] font-bold text-[14px]">प्रयागराज एयरपोर्ट</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full text-xs font-bold mt-auto border border-sky-100 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt />
                  <div className="flex flex-col items-start">
                    <span className="leading-none">दूरी: 30 KM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Bus */}
            <div className="bg-white rounded-3xl border-t-4 border-t-orange-500 border-x border-b border-gold/20 p-6 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_15px_rgba(249,115,22,0.15)] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <FaBus className="text-orange-500 text-3xl group-hover:text-orange-600 transition-colors" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="font-bold text-[#3D2B20] text-lg leading-tight mb-0.5">बस मार्ग से</span>
                <span className="text-orange-500 text-[9px] uppercase font-bold tracking-widest mb-4">By Bus</span>

                <div className="w-full bg-[#FDF8F3] rounded-xl p-3 mb-4 border border-gold/10 group-hover:border-orange-100 transition-colors">
                  <span className="text-[#8B7355] text-[11px] font-bold uppercase block mb-0.5">निकटतम बस स्टैंड</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase block mb-1">Nearest Bus Stand</span>
                  <span className="text-[#5C4033] font-bold text-[14px]">हंडिया बस स्टैंड</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold mt-auto border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt />
                  <div className="flex flex-col items-start">
                    <span className="leading-none">दूरी: 12 KM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Car */}
            <div className="bg-white rounded-3xl border-t-4 border-t-green-500 border-x border-b border-gold/20 p-6 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(34,197,94,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-green-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_15px_rgba(34,197,94,0.15)] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <FaCar className="text-green-500 text-3xl group-hover:text-green-600 transition-colors" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center h-full">
                <span className="font-bold text-[#3D2B20] text-lg leading-tight mb-0.5">सड़क मार्ग से</span>
                <span className="text-green-500 text-[9px] uppercase font-bold tracking-widest mb-4">By Road</span>

                <div className="w-full bg-[#FDF8F3] rounded-xl p-3 mb-4 border border-gold/10 group-hover:border-green-100 transition-colors flex-1 flex flex-col justify-center">
                  <span className="text-[#8B7355] text-[11px] font-bold uppercase block mb-0.5">प्रयागराज शहर से</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase block mb-1">From Prayagraj City</span>
                  <span className="text-[#5C4033] font-bold text-[13px] leading-tight mt-1">सड़क मार्ग द्वारा सीधा</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold mt-auto border border-green-100 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt />
                  <div className="flex flex-col items-start">
                    <span className="leading-none">कनेक्टिविटी उपलब्ध</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Timing and Meeting Section */}
      <section className="pt-10 pb-4 bg-[#FFFDF7] px-4 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Ashram Darshan Timing */}
          <div className="bg-white rounded-3xl border-t-[5px] border-t-saffron border-x border-b border-gold/20 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(211,84,0,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-saffron/20 transition-colors duration-500"></div>

            <h3 className="text-[#5C4033] font-bold text-xl mb-8 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center group-hover:bg-saffron group-hover:text-white transition-all duration-300 shrink-0">
                <FaClock className="text-saffron group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span>आश्रम दर्शन समय</span>
                <span className="text-[10px] text-saffron-dark uppercase tracking-widest font-bold mt-0.5">Ashram Darshan Timings</span>
              </div>
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-8 relative z-10">
              <div className="bg-gradient-to-br from-[#FFFDF7] to-[#FDF8F3] rounded-2xl p-4 sm:p-5 text-center border border-saffron/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-amber-100/50 rounded-full flex items-center justify-center mb-3">
                  <FaSun className="text-amber-500 text-2xl animate-[spin_10s_linear_infinite]" />
                </div>
                <div className="flex flex-col items-center mb-2">
                  <span className="font-bold text-[#3D2B20] text-sm leading-none">प्रातः काल</span>
                  <span className="text-[#8B7355] text-[10px] uppercase font-bold mt-1 tracking-wider">Morning</span>
                </div>
                <span className="text-saffron-dark text-xs sm:text-[13px] font-bold">05:00 AM - 12:00 PM</span>
              </div>

              <div className="bg-gradient-to-br from-[#FFFDF7] to-[#FDF8F3] rounded-2xl p-4 sm:p-5 text-center border border-saffron/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-orange-100/50 rounded-full flex items-center justify-center mb-3">
                  <GiSunset className="text-orange-500 text-3xl" />
                </div>
                <div className="flex flex-col items-center mb-2">
                  <span className="font-bold text-[#3D2B20] text-sm leading-none">सायंकाल</span>
                  <span className="text-[#8B7355] text-[10px] uppercase font-bold mt-1 tracking-wider">Evening</span>
                </div>
                <span className="text-saffron-dark text-xs sm:text-[13px] font-bold">04:00 PM - 09:00 PM</span>
              </div>
            </div>

            <div className="mt-auto bg-green-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 border border-green-100 relative z-10">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600 text-lg shrink-0" />
                <span className="text-green-800 text-[13px] sm:text-sm font-bold text-center">सोमवार से रविवार (सभी दिन खुला)</span>
              </div>
              <span className="text-green-700/80 text-[10px] uppercase font-bold tracking-widest mt-0.5 text-center">Monday to Sunday (Open All Days)</span>
            </div>
          </div>

          {/* Card 2: Guruji Meeting Info */}
          <div className="bg-white rounded-3xl border-t-[5px] border-t-[#D35400] border-x border-b border-gold/20 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(211,84,0,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D35400]/5 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-[#D35400]/10 transition-colors duration-500"></div>

            <h3 className="text-[#5C4033] font-bold text-xl mb-4 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#D35400]/10 flex items-center justify-center group-hover:bg-[#D35400] group-hover:text-white transition-all duration-300 shrink-0">
                <FaRegHandshake className="text-[#D35400] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span>गुरुजी से भेंट की जानकारी</span>
                <span className="text-[10px] text-[#D35400]/80 uppercase tracking-widest font-bold mt-0.5">Guruji Meeting Info</span>
              </div>
            </h3>

            <div className="inline-flex flex-col bg-red-50 text-red-600 px-4 py-2.5 rounded-xl border border-red-100 mb-6 relative z-10 self-start">
              <span className="text-xs font-bold leading-tight">⚠️ भेंट के लिए पूर्व अनुमति आवश्यक है।</span>
              <span className="text-[10px] font-bold opacity-80 mt-1 pl-5">Prior permission is required.</span>
            </div>

            <div className="space-y-4 sm:space-y-5 mb-8 relative z-10 flex-1">
              <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-cream-light/50 transition-colors border border-transparent hover:border-gold/10">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <FaCalendarAlt className="text-saffron text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8B7355] text-[11px] uppercase tracking-wider font-bold mb-0.5">भेंट के दिन (Meeting Days)</span>
                  <span className="text-[#3D2B20] text-sm font-bold">प्रतिदिन (सोमवार से रविवार)</span>
                  <span className="text-gray-500 text-xs font-bold mt-0.5">Everyday (Monday to Sunday)</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-cream-light/50 transition-colors border border-transparent hover:border-gold/10">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <FaClock className="text-saffron text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8B7355] text-[11px] uppercase tracking-wider font-bold mb-0.5">भेंट का समय (Meeting Time)</span>
                  <span className="text-[#3D2B20] text-xs sm:text-[13px] font-bold leading-tight">प्रातः 08:00 AM - 11:00 AM (Morning)</span>
                  <span className="text-[#3D2B20] text-xs sm:text-[13px] font-bold leading-tight mt-1">सायं 05:00 PM - 07:00 PM (Evening)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <FaPhoneVolume className="text-blue-500 text-lg shrink-0 animate-pulse mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-blue-900 text-[11px] sm:text-xs font-bold">कृपया पहले से संपर्क कर समय निश्चित करें।</span>
                  <span className="text-blue-700/80 text-[10px] font-bold mt-0.5">Please contact in advance to schedule a time.</span>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10 w-full">
              <button onClick={() => setShowMeetModal(true)} className="w-full bg-gradient-to-r from-[#D35400] to-[#E67E22] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(211,84,0,0.3)] hover:shadow-[0_8px_25px_rgba(211,84,0,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn">
                <div className="flex flex-col items-center">
                  <span>भेंट के लिए अनुरोध करें</span>
                  <span className="text-[10px] font-medium opacity-90">Request a Meeting</span>
                </div>
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform ml-1" />
              </button>
            </div>
          </div>

        </div>
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

              {/* Ashram Facilities Section */}
              <div className="mt-8 bg-[#FEFAF6] rounded-2xl border border-gold/20 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="text-[#5C4033] font-bold text-lg mb-5 border-b border-gold/10 pb-3 flex items-center gap-2">
                  <GiLotus className="text-saffron text-xl opacity-80" />
                  आश्रम की सुविधाएँ
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* Facility 1 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <FaParking className="text-gray-600 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">पार्किंग सुविधा</span>
                      <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Parking</span>
                    </div>
                  </div>

                  {/* Facility 2 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                      <FaRestroom className="text-slate-600 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">स्वच्छ शौचालय</span>
                      <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Restrooms</span>
                    </div>
                  </div>

                  {/* Facility 3 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(211,84,0,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors">
                      <GiBowlOfRice className="text-[#D35400] text-xl group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">प्रसाद व्यवस्था</span>
                      <span className="text-[#D35400]/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">Prasad</span>
                    </div>
                  </div>

                  {/* Facility 4 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <FaBed className="text-blue-500 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">आवास व्यवस्था</span>
                      <span className="text-blue-500/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">Stay</span>
                    </div>
                  </div>

                  {/* Facility 5 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(56,189,248,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-400 transition-colors">
                      <FaTint className="text-sky-500 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">शुद्ध पेयजल</span>
                      <span className="text-sky-500/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">Water</span>
                    </div>
                  </div>

                  {/* Facility 6 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(220,38,38,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <FaFirstAid className="text-red-500 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">चिकित्सा सहायता</span>
                      <span className="text-red-500/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">First Aid</span>
                    </div>
                  </div>

                  {/* Facility 7 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                      <FaWheelchair className="text-zinc-600 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">व्हीलचेयर सुविधा</span>
                      <span className="text-zinc-500/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">Wheelchair</span>
                    </div>
                  </div>

                  {/* Facility 8 */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_15px_rgba(22,163,74,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <FaLeaf className="text-green-500 text-lg group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#3D2B20] text-[11px] sm:text-xs font-bold text-center">हरित वातावरण</span>
                      <span className="text-green-600/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">Greenery</span>
                    </div>
                  </div>
                </div>
              </div>

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">पिनकोड (Pincode)</label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="text"
                            required
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full bg-cream-light/55 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-saffron text-dark"
                            placeholder="6-digit Pincode"
                            maxLength="6"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-dark-light mb-1.5 uppercase">स्थान (Location - Auto-filled)</label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-saffron/60 text-sm" />
                          <input
                            type="text"
                            readOnly disabled
                            value={formData.state ? [formData.state, formData.district, formData.village].filter(Boolean).join(', ') : ''}
                            className="w-full bg-gray-100 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                            placeholder="Location auto-fills"
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
                <div className="animate-fade-in-up relative z-50">
                  <BookingForm />
                </div>
              )}

              {/* Seva Opportunities Section (Inside Right Column) */}
              <div className="mt-12 bg-[#FEFAF6] rounded-3xl p-6 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F2E5D5] hover:shadow-[0_12px_30px_rgba(211,84,0,0.08)] transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#5C4033] font-serif mb-8 text-center">सेवा के अवसर</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 mb-10">

                  {/* Service 1: Annadan */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <GiBowlOfRice className="text-[#D35400] text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">अन्नदान सेवा</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Food Donation</span>
                    </div>
                  </div>

                  {/* Service 2: Gau Seva */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <GiCow className="text-[#D35400] text-2xl sm:text-[30px] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">गौ सेवा</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Cow Service</span>
                    </div>
                  </div>

                  {/* Service 3: Yajna */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <FaFire className="text-[#D35400] text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">यज्ञ सेवा</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Yajna Service</span>
                    </div>
                  </div>

                  {/* Service 4: Shiksha */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <FaBookReader className="text-[#D35400] text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">शिक्षा सेवा</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Education</span>
                    </div>
                  </div>

                  {/* Service 5: Volunteer */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <FaHandsHelping className="text-[#D35400] text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">स्वयंसेवक बनें</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Volunteer</span>
                    </div>
                  </div>

                  {/* Service 6: Donate */}
                  <div className="bg-white rounded-xl border border-gold/10 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D35400]/5 rounded-bl-[40px] group-hover:bg-[#D35400]/15 transition-colors duration-500"></div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#D35400] transition-colors duration-300 relative z-10 border border-orange-100 group-hover:border-transparent">
                      <FaHandHoldingHeart className="text-[#D35400] text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col items-center relative z-10 mt-1">
                      <span className="text-[#3D2B20] text-[12px] sm:text-[13px] font-bold text-center group-hover:text-[#D35400] transition-colors duration-300 leading-tight">दान / सहयोग करें</span>
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 group-hover:text-[#D35400]/70 transition-colors duration-300 text-center leading-tight">Contribute</span>
                    </div>
                  </div>

                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowSevaModal(true)}
                    className="px-8 py-2 rounded-lg border border-[#D35400] text-[#D35400] font-bold text-sm hover:bg-[#D35400] hover:text-white transition-all duration-300"
                  >
                    सेवा से जुड़ें
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Location Details 3-Card Section */}
      <section className="py-12 bg-[#FFFDF7] px-4 border-t border-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Ashram Address */}
            <div className="bg-white rounded-2xl border border-gold/20 p-6 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-gold opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-[#5C4033] font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center group-hover:bg-saffron/10 transition-colors">
                  <FaMapMarkerAlt className="text-saffron group-hover:scale-110 transition-transform duration-300" />
                </span>
                आश्रम का पता
              </h3>

              <div className="flex flex-col gap-1 mb-6 pl-2 border-l-2 border-saffron/20 group-hover:border-saffron/60 transition-colors duration-300">
                <h4 className="font-bold text-dark text-base mb-1">राज राजेश्वरी महाशक्ति पीठ आश्रम</h4>
                <p className="text-dark-light text-sm leading-relaxed">
                  चकसुदर्शनपुरी, धनपुर, हंडिया,<br />
                  प्रयागराज, उत्तर प्रदेश - 221503<br />
                  भारत
                </p>
              </div>

              <div className="mt-auto">
                <button className="w-full border-2 border-saffron/80 text-saffron px-5 py-2.5 rounded-xl font-bold hover:bg-saffron hover:text-white transition-all duration-300 text-sm flex items-center justify-center group-hover:shadow-md">
                  पूरी जानकारी देखें
                </button>
              </div>
            </div>

            {/* Card 2: Google Maps Location */}
            <div className="bg-white rounded-2xl border border-gold/20 p-6 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3A8834] to-[#5cb856] opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-[#5C4033] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center group-hover:bg-[#3A8834]/10 transition-colors">
                  <FaMapMarkerAlt className="text-[#3A8834] group-hover:scale-110 transition-transform duration-300" />
                </span>
                Google Maps लोकेशन
              </h3>

              <div className="w-full h-[160px] bg-cream-light rounded-xl overflow-hidden mb-5 relative border border-gold/20 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-all duration-300">
                <iframe
                  src="https://maps.google.com/maps?q=%E0%A4%B0%E0%A4%BE%E0%A4%9C+%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A5%87%E0%A4%B6%E0%A5%8D%E0%A4%B5%E0%A4%B0%E0%A5%80+%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B6%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A4%BF%E0%A4%AA%E0%A5%80%E0%A4%A0+%E0%A4%86%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%AE+%E0%A4%9A%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%B8%E0%A5%81%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%E0%A4%AA%E0%A5%82%E0%A4%B0%E0%A5%80+%E0%A4%A7%E0%A4%A8%E0%A5%81%E0%A4%AA%E0%A5%81%E0%A4%B0+%E0%A4%B9%E0%A4%82%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A4%BE+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%AF%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A4%BE%E0%A4%9C+221503&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Raj Rajeshwari Mahashakti Peeth Ashram Map"
                ></iframe>
              </div>

              <div className="flex gap-3 mt-auto">
                <a href="https://maps.google.com/maps?q=Raj+Rajeshwari+Mahashaktipeeth+Ashram" target="_blank" rel="noreferrer" className="flex-1 bg-[#3A8834] text-white text-center py-2.5 rounded-xl font-bold hover:bg-[#2e6b29] hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex items-center justify-center">
                  रास्ता देखें
                </a>
                <a href="https://maps.google.com/maps?q=Raj+Rajeshwari+Mahashaktipeeth+Ashram" target="_blank" rel="noreferrer" className="flex-1 bg-saffron text-white text-center py-2.5 rounded-xl font-bold hover:bg-saffron-dark hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex items-center justify-center">
                  Google Maps
                </a>
              </div>
            </div>

            {/* Card 3: QR Code */}
            <div className="bg-white rounded-2xl border border-gold/20 p-6 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(211,84,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 to-gray-400 opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-[#5C4033] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <FaMobileAlt className="text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                </span>
                QR कोड स्कैन करें
              </h3>

              <div className="flex-1 flex items-center justify-center gap-4 sm:gap-6 py-2">
                {/* QR Image Box */}
                <div className="bg-white p-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gold/10 shrink-0 group-hover:shadow-[0_5px_15px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-all duration-500">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.google.com/maps?q=Raj+Rajeshwari+Mahashaktipeeth+Ashram"
                    alt="Ashram Location QR Code"
                    className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] mix-blend-multiply"
                  />
                </div>

                {/* 3D Map Phone Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
                    <img
                      src={mapPhoneIcon}
                      alt="Map Phone Icon"
                      className="w-full h-auto drop-shadow-md rounded-xl mix-blend-multiply"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gold/10 text-center bg-cream-light/30 rounded-lg pb-2">
                <p className="text-[#5C4033] text-sm font-medium">आश्रम का पता पाने के लिए</p>
                <p className="text-saffron text-sm font-bold mt-1 tracking-wide">QR Code स्कैन करें</p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Seva Form Modal */}
      {showSevaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSevaModal(false)}></div>

          <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-fade-in-up border border-gold/20 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-saffron to-[#D35400] p-5 sm:p-6 text-white text-center relative shrink-0">
              <button
                onClick={() => setShowSevaModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-saffron transition-all duration-300"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">सेवा से जुड़ें</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">अपना विवरण दें ताकि हम आपसे संपर्क कर सकें</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSevaFormSubmit} className="p-5 sm:p-8 space-y-4 overflow-y-auto custom-scrollbar">

              <div>
                <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">सेवा चुनें (Select Seva)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                    <FaHandsHelping className="text-sm" />
                  </div>
                  <select
                    name="sevaType"
                    value={sevaFormData.sevaType}
                    onChange={handleSevaFormChange}
                    className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark font-medium cursor-pointer"
                  >
                    <option value="अन्नदान सेवा">अन्नदान सेवा (Food Donation)</option>
                    <option value="गौ सेवा">गौ सेवा (Cow Service)</option>
                    <option value="यज्ञ सेवा">यज्ञ सेवा (Yajna Service)</option>
                    <option value="शिक्षा सेवा">शिक्षा सेवा (Education Service)</option>
                    <option value="स्वयंसेवक बनें">स्वयंसेवक बनें (Become a Volunteer)</option>
                    <option value="दान / सहयोग करें">दान / सहयोग करें (Donate / Contribute)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">नाम (First Name)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="firstName" value={sevaFormData.firstName} onChange={handleSevaFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">उपनाम (Last Name)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="lastName" value={sevaFormData.lastName} onChange={handleSevaFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">मोबाइल (Mobile)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMobileAlt className="text-sm" />
                    </div>
                    <input
                      type="tel" required
                      name="mobile" value={sevaFormData.mobile} onChange={handleSevaFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Mobile No."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">ईमेल (Email)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <input
                      type="email" required
                      name="email" value={sevaFormData.email} onChange={handleSevaFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">पिनकोड (Pincode)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="pincode" value={sevaFormData.pincode} onChange={handleSevaFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Enter 6-digit Pincode"
                      maxLength="6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">स्थान (Location - Auto-filled)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <input
                      type="text" readOnly disabled
                      value={sevaFormData.state ? [sevaFormData.state, sevaFormData.district, sevaFormData.village].filter(Boolean).join(', ') : ''}
                      className="w-full bg-gray-100 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                      placeholder="Location will auto-fill from Pincode"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#D35400] hover:bg-[#a64200] text-white py-3 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(211,84,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp पर भेजें (Send on WhatsApp)
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Meet Form Modal */}
      {showMeetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMeetModal(false)}></div>

          <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-fade-in-up border border-gold/20 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#D35400] to-saffron p-5 sm:p-6 text-white text-center relative shrink-0">
              <button
                onClick={() => setShowMeetModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#D35400] transition-all duration-300"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">भेंट के लिए अनुरोध</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">अपना विवरण दें ताकि हम आपका समय सुनिश्चित कर सकें</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleMeetFormSubmit} className="p-5 sm:p-8 space-y-4 overflow-y-auto custom-scrollbar">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">नाम (First Name)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="firstName" value={meetFormData.firstName} onChange={handleMeetFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">उपनाम (Last Name)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="lastName" value={meetFormData.lastName} onChange={handleMeetFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">मोबाइल (Mobile)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMobileAlt className="text-sm" />
                    </div>
                    <input
                      type="tel" required
                      name="mobile" value={meetFormData.mobile} onChange={handleMeetFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Mobile No."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">ईमेल (Email)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <input
                      type="email" required
                      name="email" value={meetFormData.email} onChange={handleMeetFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">पिनकोड (Pincode)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <input
                      type="text" required
                      name="pincode" value={meetFormData.pincode} onChange={handleMeetFormChange}
                      className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark"
                      placeholder="Enter 6-digit Pincode"
                      maxLength="6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">स्थान (Location - Auto-filled)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <input
                      type="text" readOnly disabled
                      value={meetFormData.state ? [meetFormData.state, meetFormData.district, meetFormData.village].filter(Boolean).join(', ') : ''}
                      className="w-full bg-gray-100 border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                      placeholder="Location will auto-fill from Pincode"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">भेंट का दिन (Day)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <select
                    name="day"
                    value={meetFormData.day}
                    onChange={handleMeetFormChange}
                    className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark font-medium cursor-pointer"
                  >
                    <option value="सोमवार (Monday)">सोमवार (Monday)</option>
                    <option value="मंगलवार (Tuesday)">मंगलवार (Tuesday)</option>
                    <option value="बुधवार (Wednesday)">बुधवार (Wednesday)</option>
                    <option value="गुरुवार (Thursday)">गुरुवार (Thursday)</option>
                    <option value="शुक्रवार (Friday)">शुक्रवार (Friday)</option>
                    <option value="शनिवार (Saturday)">शनिवार (Saturday)</option>
                    <option value="रविवार (Sunday)">रविवार (Sunday)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase">भेंट का समय (Meeting Time)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D35400]/60">
                    <FaClock className="text-sm" />
                  </div>
                  <select
                    name="timeSlot"
                    value={meetFormData.timeSlot}
                    onChange={handleMeetFormChange}
                    className="w-full bg-cream-light/50 border border-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D35400] text-dark font-medium cursor-pointer"
                  >
                    <option value="08:00 AM - 09:00 AM">प्रातः 08:00 AM - 09:00 AM</option>
                    <option value="09:00 AM - 10:00 AM">प्रातः 09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">प्रातः 10:00 AM - 11:00 AM</option>
                    <option value="05:00 PM - 06:00 PM">सायं 05:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 07:00 PM">सायं 06:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#D35400] hover:bg-[#a64200] text-white py-3 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(211,84,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp पर भेजें (Send on WhatsApp)
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}
