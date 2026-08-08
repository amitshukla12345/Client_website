import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineChatAlt } from 'react-icons/hi'
import { FaCheckCircle } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import SearchableSelect from './SearchableSelect'
import CustomCalendar from './CustomCalendar'

export default function BookingForm() {
  const { addBooking, calendarDates } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    village: '',
    pincode: '',
    address: '',
    kathaType: 'Shrimad Bhagvat Katha',
    preferredDate: '',
    message: ''
  })
  
  const [showCalendar, setShowCalendar] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const dateParam = params.get('date')
    const typeParam = params.get('type')
    
    if (dateParam || typeParam) {
      setFormData(prev => ({ 
        ...prev, 
        ...(dateParam && { preferredDate: dateParam }),
        ...(typeParam && { kathaType: typeParam })
      }))
    }
  }, [location])

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
            city: postOffice.District || '',
            village: postOffice.Name || ''
          }))
        } else {
          setFormState(prev => ({ ...prev, state: '', city: '', village: '' }))
        }
      } catch (error) {
        console.error('Error fetching pincode details:', error)
      }
    } else {
       setFormState(prev => ({ ...prev, state: '', city: '', village: '' }))
    }
  }

  useEffect(() => {
    fetchPincodeDetails(formData.pincode, setFormData)
  }, [formData.pincode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Save booking request into AppContext
    addBooking(formData)
    // Simulate premium submission workflow
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const kathaTypes = [
    'Shrimad Bhagvat Katha (श्रीमद् भागवत कथा)',
    'Ram Katha (राम कथा)',
    'Shiv Mahapuran (शिव महापुराण)',
    'Devi Bhagwat (देवी भागवत)',
    'Sundarkand Path (सुंदरकांड पाठ)',
    'Bhajan Sandhya (भजन संध्या)',
    'Deeksha Application (दीक्षा आवेदन)'
  ]

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-gold-dark/20 shadow-premium"
      >
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-6xl text-saffron animate-bounce" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-dark mb-4">Radhe Radhe, Thank You!</h3>
        <p className="text-dark-light text-sm max-w-md mx-auto leading-relaxed mb-6">
          Your request to book **{formData.kathaType}** has been received successfully. Our ashram management team will contact you on **{formData.phone}** or **{formData.email}** within 24 hours to coordinate details.
        </p>
        <div className="bg-cream-dark p-4 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 border border-gold/15 mb-6">
          <p><strong className="text-dark">Devotee Name:</strong> {formData.name}</p>
          <p><strong className="text-dark">Preferred Date:</strong> {formData.preferredDate}</p>
          <p><strong className="text-dark">Location:</strong> {formData.city}</p>
        </div>
        <button 
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: '',
              phone: '',
              email: '',
              state: '',
              city: '',
              village: '',
              pincode: '',
              address: '',
              kathaType: 'Shrimad Bhagvat Katha',
              preferredDate: '',
              message: ''
            })
          }}
          className="btn-premium-saffron"
        >
          Book Another Katha
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-4 sm:p-10 rounded-3xl border border-amber-500/10 shadow-premium space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold text-dark-light">Book your Katha</h3>
        <p className="text-xs text-saffron uppercase font-semibold tracking-widest mt-1">Fill the details for divine organization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Your Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlineUser className="text-lg" />
            </span>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rajesh Kumar"
              className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Mobile Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlinePhone className="text-lg" />
            </span>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digit number"
              className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlineMail className="text-lg" />
            </span>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com"
              className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Pincode */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Pincode (पिनकोड)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlineLocationMarker className="text-lg" />
            </span>
            <input
              type="text"
              required
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit Pincode"
              maxLength={6}
              pattern="\d{6}"
              title="Please enter a valid 6-digit Pincode"
              className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Location Auto-fill */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Location (स्थान)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlineLocationMarker className="text-lg" />
            </span>
            <input
              type="text"
              readOnly disabled
              value={formData.state ? [formData.state, formData.city, formData.village].filter(Boolean).join(', ') : ''}
              className="w-full bg-gray-100 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-500 cursor-not-allowed transition-all"
              placeholder="Location auto-fills"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="relative">
        <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Full Address (Venue)</label>
        <div className="relative">
          <span className="absolute top-3.5 left-0 pl-3.5 flex items-start text-gold pointer-events-none">
            <HiOutlineLocationMarker className="text-lg" />
          </span>
          <textarea
            name="address"
            required
            rows="2"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete venue details where Katha is proposed to be held"
            className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Katha Type Select */}
        <div className="relative">
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Select Katha Type (कथा का प्रकार)</label>
          <SearchableSelect
            options={kathaTypes}
            value={formData.kathaType}
            onChange={(val) => setFormData(prev => ({ ...prev, kathaType: val }))}
            placeholder="Select Type"
            showSearch={false}
          />
        </div>

        {/* Preferred Date */}
        <div className={`relative ${showCalendar ? 'z-[100]' : 'z-10'}`}>
          <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Preferred Date</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
              <HiOutlineCalendar className="text-lg" />
            </span>
            <div 
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-saffron cursor-pointer flex items-center justify-between transition-all"
            >
              <span className={formData.preferredDate ? "text-dark" : "text-gray-400"}>
                {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-GB') : "Select an available date"}
              </span>
              <span className="text-gold opacity-70">▼</span>
            </div>
            
            <input
              type="text"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={() => {}}
              className="hidden"
            />
            
            {showCalendar && (
              <div className="absolute z-50 top-full mt-2 w-[340px] sm:w-[380px] left-0 shadow-2xl rounded-2xl animate-fade-in-up origin-top-left -ml-2 sm:ml-0">
                <CustomCalendar 
                  calendarDates={calendarDates} 
                  selectedDate={formData.preferredDate}
                  onDateSelect={(dateStr) => {
                    setFormData({...formData, preferredDate: dateStr})
                    setShowCalendar(false)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="relative">
        <label className="block text-xs font-semibold text-dark-light mb-2 uppercase tracking-wider">Special Requirements / Message</label>
        <div className="relative">
          <span className="absolute top-3.5 left-0 pl-3.5 flex items-start text-gold pointer-events-none">
            <HiOutlineChatAlt className="text-lg" />
          </span>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Specify any additional information, devotee strength, seating arrangements, etc."
            className="w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder-dark-light/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-saffron-dark via-saffron to-gold-dark text-white font-serif tracking-wider text-base py-3.5 px-6 rounded-xl hover:from-saffron hover:to-gold shadow-premium hover:shadow-saffron-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Request...</span>
            </>
          ) : (
            <span>Submit Divine Booking Request</span>
          )}
        </button>
      </div>
    </form>
  )
}
