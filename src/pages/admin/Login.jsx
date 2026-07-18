import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { GiLotus, GiFlame, GiFlowerEmblem } from 'react-icons/gi'
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaOm } from 'react-icons/fa'
import adminArt from '../../assets/images/admin_login_spiritual_art_.png'

export default function Login() {
  const { loginAdmin, isAdminLoggedIn } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin/dashboard')
    }
  }, [isAdminLoggedIn, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const success = loginAdmin(username, password)
    if (success) {
      navigate('/admin/dashboard')
    } else {
      setError('अमान्य उपयोगकर्ता नाम या पासवर्ड (Invalid Username or Password)')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EBE1] px-4 py-20 sm:py-12 relative overflow-hidden selection:bg-[#E05A10] selection:text-white">
      {/* Decorative background grid and ornaments */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:top-10 sm:left-10 z-50 whitespace-nowrap">
        <Link to="/" className="flex items-center space-x-2 text-[#3D2B20] bg-white/70 backdrop-blur-md sm:bg-transparent px-3 py-2 sm:px-0 sm:py-0 rounded-lg hover:text-[#E05A10] transition-all text-xs sm:text-sm font-semibold shadow-sm sm:shadow-none border border-[#EAD8C8]/50 sm:border-transparent">
          <FaArrowLeft className="text-xs" />
          <span>मुख्य वेबसाइट (Back to Home)</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl w-full bg-[#FAF3EA] rounded-3xl shadow-[0_20px_50px_rgba(61,43,32,0.1)] border border-[#EAD8C8] relative z-10 flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left Side / Top Side: Spiritual Art Panel */}
        <div className="flex w-full lg:w-1/2 bg-[#FAF0E6] flex-col items-center justify-center p-4 lg:p-0 relative h-72 xs:h-80 sm:h-96 lg:h-auto">
          <img 
            src={adminArt} 
            alt="Spiritual Art" 
            className="w-full h-full object-contain lg:object-cover lg:object-center"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 bg-[#FAF3EA]">
          {/* Brand Header */}
          <div className="text-center space-y-4 mb-8 lg:mt-4">
            <div className="lg:hidden bg-gradient-to-br from-[#E05A10] to-[#D4AF37] p-3.5 rounded-full inline-flex shadow-lg shadow-[#E05A10]/20 mb-2">
              <GiLotus className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-[#3D2B20] tracking-wide">
                Shrimat Bhagvat Katha
              </h1>
            <span className="block text-[10px] tracking-[0.2em] font-semibold text-[#E05A10] uppercase mt-0.5">
              प्रशासक लॉगिन (ADMIN PORTAL)
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#3D2B20]/70 uppercase tracking-wider block">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2B20]/40">
                <FaUser className="text-xs" />
              </span>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] focus:ring-4 focus:ring-[#E05A10]/15 rounded-xl py-3 pl-11 pr-4 text-sm text-[#3D2B20] font-medium outline-none transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#3D2B20]/70 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2B20]/40">
                <FaLock className="text-xs" />
              </span>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] focus:ring-4 focus:ring-[#E05A10]/15 rounded-xl py-3 pl-11 pr-12 text-sm text-[#3D2B20] font-medium outline-none transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#3D2B20]/60 hover:text-[#E05A10] transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl shadow-lg shadow-[#E05A10]/20 hover:shadow-[#E05A10]/40 transition-all duration-300 mt-2 hover:scale-[1.02] active:scale-95"
          >
            Log In (प्रवेश करें)
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={() => alert("Please contact your Developer/System Administrator to get a temporary password. You can change it after logging in.")}
              className="text-xs font-bold text-[#3D2B20]/60 hover:text-[#E05A10] transition-colors underline-offset-4 hover:underline"
            >
              Forgot Password? (पासवर्ड भूल गए?)
            </button>
          </div>
        </form>

        {/* Portal Info Footer */}
          <div className="text-center mt-8 pt-6 border-t border-[#FAF0E6]">
            <p className="text-[10px] text-[#3D2B20]/50 font-medium">
              Authorized admin access only. All activities are monitored.
            </p>
            <p className="text-[10px] text-[#E05A10] font-semibold mt-1">
              Default Credentials: admin / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
