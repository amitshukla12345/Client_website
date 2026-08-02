import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCog, FaUserShield, FaLock, FaEnvelope, FaSearch, 
  FaDatabase, FaBell, FaHashtag, FaTools, FaServer,
  FaSave, FaCamera, FaCheckCircle
} from 'react-icons/fa'

const TABS = [
  { id: 'general', label: 'General Settings', icon: <FaCog /> },
  { id: 'security', label: 'Security Settings', icon: <FaLock /> },
  { id: 'backup', label: 'Backup & Restore', icon: <FaDatabase /> },
  { id: 'notification', label: 'Notification Settings', icon: <FaBell /> },
]

export default function SettingsTab({ adminProfile, updateAdminProfile, changeAdminPassword }) {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate save for the remaining tabs
    alert('सेटिंग्स सफलतापूर्वक सहेज ली गई हैं! (Settings saved successfully!)');
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#3D2B20] border-b border-[#EAD8C8] pb-3">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website Name</label>
                <input type="text" defaultValue="Shrimad Bhagwat Katha" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website Language</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website Logo Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <FaCamera className="mx-auto text-2xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">Click to upload logo</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website Favicon Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <FaCamera className="mx-auto text-2xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">Click to upload favicon</span>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Footer Copyright Text</label>
                <input type="text" defaultValue="© 2026 Shrimad Bhagwat Katha. All rights reserved." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Website Timezone</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50">
                  <option>Asia/Kolkata (IST)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Date Format</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50">
                  <option>DD-MM-YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#3D2B20] border-b border-[#EAD8C8] pb-3">Security Settings</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800">Two Factor Authentication (2FA)</h4>
                  <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800">Enable Email Verification</h4>
                  <p className="text-xs text-gray-500 mt-1">Require email verification for new sub-admins.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Auto Logout Time</label>
                  <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Maximum Login Attempts</label>
                  <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors bg-gray-50/50">
                    <option>3 Attempts</option>
                    <option>5 Attempts</option>
                    <option>10 Attempts</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <h4 className="text-md font-bold text-[#3D2B20] mb-2">Session Management</h4>
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-center">
                  <div>
                    <span className="font-bold text-sm block">Current Session</span>
                    <span className="text-xs text-gray-500">Windows • Chrome • IP: 192.168.1.1</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Active</span>
                </div>
              </div>
              <div>
                <button type="button" className="text-sm text-[#E67E22] font-bold hover:underline">Generate Backup Codes</button>
              </div>
            </div>
          </div>
        )
      case 'backup':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#3D2B20] border-b border-[#EAD8C8] pb-3">Backup & Restore</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800">Automatic Daily Backup</h4>
                  <p className="text-xs text-gray-500 mt-1">Backup database and files at midnight.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" className="p-4 border border-[#D4AF37]/30 bg-[#FFFDF5] rounded-xl text-center space-y-2 hover:bg-[#D4AF37]/10 transition-colors group">
                  <FaDatabase className="text-2xl text-[#D4AF37] mx-auto group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold block text-[#3D2B20]">Download Database Backup</span>
                  <span className="text-xs text-gray-500 block">.sql format</span>
                </button>
                <button type="button" className="p-4 border border-[#E67E22]/30 bg-[#FFF7ED] rounded-xl text-center space-y-2 hover:bg-[#E67E22]/10 transition-colors group">
                  <FaServer className="text-2xl text-[#E67E22] mx-auto group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold block text-[#3D2B20]">Download Website Backup</span>
                  <span className="text-xs text-gray-500 block">.zip format (Includes uploads)</span>
                </button>
              </div>
              
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h4 className="text-md font-bold text-[#3D2B20] mb-4">Restore Backup</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <FaDatabase className="mx-auto text-2xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">Click to upload .sql or .zip file to restore</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'notification':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#3D2B20] border-b border-[#EAD8C8] pb-3">Notification Settings</h3>
            <div className="space-y-4 max-w-2xl">
              {[
                { title: 'Booking Email Notification', desc: 'Receive email when a new booking is requested.', on: true },
                { title: 'WhatsApp Notification', desc: 'Send automated WhatsApp messages to users.', on: false },
                { title: 'Upcoming Event Reminder', desc: 'Send reminders 24h before an event starts.', on: true },
                { title: 'Contact Form Notification', desc: 'Receive email when someone fills the contact form.', on: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.on} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#3D2B20]">Platform Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all aspects of your spiritual platform from one place.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-72 flex-shrink-0 bg-white rounded-2xl p-4 border border-[#EAD8C8] shadow-sm h-fit">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-[#E67E22] to-[#D4AF37] text-white shadow-md' 
                    : 'text-gray-600 hover:bg-[#FAF6F0] hover:text-[#E67E22]'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Pane */}
        <form onSubmit={handleSave} className="flex-grow flex flex-col bg-white rounded-2xl border border-[#EAD8C8] shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Fixed Footer for Save Button */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-[#EAD8C8] flex justify-end items-center sticky bottom-0">
            <AnimatePresence>
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-green-600 font-bold flex items-center space-x-2 mr-4"
                >
                  <FaCheckCircle />
                  <span>Settings Saved Successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-gradient-to-r from-[#E67E22] to-[#D4AF37] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:shadow-lg hover:opacity-90 transition-all flex items-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <FaSave />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
