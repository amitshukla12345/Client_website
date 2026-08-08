import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { GiLotus, GiFlame } from 'react-icons/gi'
import { statesAndDistricts } from '../../utils/indiaStates'
import SearchableSelect from '../../components/SearchableSelect'
import CustomCalendar from '../../components/CustomCalendar'
import { 
  FaSignOutAlt, FaBookOpen, FaImages, FaUserEdit, FaCalendarPlus, FaCalendarAlt, FaUsers,
  FaInfoCircle, FaClipboardList, FaCheck, FaTimes, FaTrash, FaPlus, FaChevronDown, FaSearch, FaBell,
  FaLink, FaSave, FaExternalLinkAlt, FaImage, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaYoutube, FaUser, FaLock, FaEye, FaEyeSlash, FaQuoteLeft, FaBars, FaCloudUploadAlt,
  FaHome, FaUserCircle, FaCalendarDay, FaPlayCircle, FaCog
} from 'react-icons/fa'
import logoImg from '../../assets/images/logo.jpeg'
import AdminBannerManager from './components/AdminBannerManager'
import AdminYajmanManager from './components/AdminYajmanManager'
import OverviewTab from './components/OverviewTab'
import SettingsTab from './components/SettingsTab'
import LiveTab from './components/LiveTab'

export default function Dashboard() {
  const {
    isAdminLoggedIn, logoutAdmin,
    contacts, updateContacts,
    about, updateAbout,
    timeline, setTimeline,
    achievements, setAchievements,
    banners, updateBanners,
    events, addEvent, deleteEvent,
    galleryPhotos, addPhoto, deletePhoto,
    galleryVideos, addVideo, deleteVideo,
    bookings, updateBookingStatus, deleteBooking,
    organizers, addOrganizer, updateOrganizer, deleteOrganizer,
    calendarDates, addCalendarDate, deleteCalendarDate,
    adminProfile, updateAdminProfile, changeAdminPassword,
    liveSettings
  } = useContext(AppContext)

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedBookings, setSelectedBookings] = useState([])
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [prefillEventData, setPrefillEventData] = useState(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const pendingBookings = bookings?.filter(b => b.status === 'Pending') || []
  const pendingBookingsCount = pendingBookings.length

  const headerMapping = {
    'Overview': { title: 'OVERVIEW DASHBOARD', subtitle: 'Manage details and bookings for the spiritual website' },
    'Bookings': { title: 'BOOKINGS', subtitle: 'Manage incoming Katha booking requests' },
    'Yajman': { title: 'YAJMAN MANAGEMENT', subtitle: 'Manage Yajman and devotee information' },
    'Banners': { title: 'HERO BANNERS', subtitle: 'Manage homepage hero banners and slider content' },
    'Biography': { title: 'GURU BIOGRAPHY', subtitle: 'Manage Guru Ji biography and profile information' },
    'Events': { title: 'UPCOMING EVENTS', subtitle: 'Manage and publish upcoming Katha events' },
    'Gallery': { title: 'GALLERY', subtitle: 'Manage website gallery images' },
    'Live': { title: 'LIVE KATHA', subtitle: 'Manage live Katha streaming information' },
    'Contact': { title: 'CONTACT & NOTICE', subtitle: 'Manage contact messages and website notices' },
    'Settings': { title: 'SETTINGS', subtitle: 'Manage administrator and website settings' }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedBookings.length} selected booking(s)?`)) {
      selectedBookings.forEach(id => deleteBooking(id))
      setSelectedBookings([])
    }
  }

  const downloadCSV = (statusFilter) => {
    const filteredBookings = bookings.filter(b => {
        if (statusFilter === 'Rejected') return b.status === 'Cancelled' || b.status === 'Rejected';
        return b.status === statusFilter;
    });

    if (filteredBookings.length === 0) {
      alert(`No ${statusFilter} bookings found to download.`);
      return;
    }

    const headers = ['Name', 'Phone', 'Email', 'City', 'Katha Type', 'Preferred Date', 'Status', 'Message'];
    
    const csvRows = filteredBookings.map(b => [
      `"${b.name || ''}"`,
      b.phone || '',
      `"${b.email || ''}"`,
      `"${b.city || ''}"`,
      `"${b.kathaType || ''}"`,
      b.preferredDate || '',
      b.status || '',
      `"${(b.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...csvRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${statusFilter}_Bookings.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login')
    }
  }, [isAdminLoggedIn, navigate])

  if (!isAdminLoggedIn) return null

  const navGroups = [
    {
      title: 'MAIN',
      items: [
        { id: 'Overview', label: 'Overview', icon: FaHome },
        { id: 'Bookings', label: 'Bookings', icon: FaClipboardList, badge: bookings?.filter(b => b.status === 'Pending').length || 0 },
        { id: 'Yajman', label: 'Yajman Management', icon: FaUsers },
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { id: 'Banners', label: 'Home Banner', icon: FaImages },
        { id: 'Biography', label: 'Guru Biography', icon: FaUserCircle },
        { id: 'Events', label: 'Upcoming Events', icon: FaCalendarDay, badge: events?.length || 0 },
        { id: 'Gallery', label: 'Gallery', icon: FaImage },
        { id: 'Live', label: 'Live Katha', icon: FaPlayCircle, isLiveIndicator: liveSettings?.isLive },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { id: 'Contact', label: 'Contact & Notice', icon: FaGlobe },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'Settings', label: 'Settings', icon: FaCog }
      ]
    }
  ]

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-[#3D2B20] font-sans overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* 1. SIDEBAR */}
      <aside className={`fixed md:relative top-0 left-0 h-[100dvh] ${isSidebarCollapsed ? 'w-20' : 'w-full md:w-[280px]'} transition-all duration-300 ease-in-out bg-[#FFFDF7] border-r border-[#EAD8C8] flex flex-col justify-between flex-shrink-0 z-[100] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Header */}
        <div className="h-[80px] border-b border-[#EAD8C8]/60 flex items-center justify-between px-4 sm:px-5 flex-shrink-0">
          <div 
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : 'space-x-3'} cursor-pointer hover:bg-[#FAF0E6] transition-colors p-2 rounded-xl`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title="Toggle Sidebar"
          >
            <div className="w-[45px] h-[45px] overflow-hidden rounded-full flex-shrink-0 border-2 border-[#D4AF37] shadow-sm">
              <img src={logoImg} alt="Swami Hariprapannacharya Ji" className="w-full h-full object-cover" />
            </div>
            {!isSidebarCollapsed && (
              <div className="whitespace-nowrap pl-1">
                <span className="font-serif text-[15px] font-black tracking-wide text-[#3D2B20] block leading-tight">स्वामी हरिप्रपन्नाचार्य जी</span>
                <span className="block text-[9px] tracking-widest text-[#E05A10] uppercase font-bold mt-0.5">Control Panel</span>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-400 hover:text-red-500 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="mb-6 last:mb-0">
              {!isSidebarCollapsed && (
                <h3 className="px-3 mb-2 text-[10px] font-bold text-[#8B7355]/60 uppercase tracking-widest">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center h-[50px] transition-all duration-200 group relative ${isSidebarCollapsed ? 'justify-center rounded-xl' : 'px-4 rounded-r-xl rounded-l-none justify-between'} ${
                      activeTab === item.id 
                        ? 'bg-[#E05A10]/10 text-[#E05A10] border-l-[3px] border-[#E05A10]' 
                        : 'text-[#3D2B20] hover:bg-[#FAF0E6] hover:text-[#E05A10] border-l-[3px] border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`text-[18px] flex-shrink-0 transition-colors ${activeTab === item.id ? 'text-[#E05A10]' : 'text-[#8B7355] group-hover:text-[#E05A10]'}`} />
                      {!isSidebarCollapsed && <span className="whitespace-nowrap font-semibold text-[14px] ml-3">{item.label}</span>}
                    </div>

                    {!isSidebarCollapsed && (
                      <div className="flex items-center">
                        {item.badge > 0 && (
                          <span className={`text-[10px] font-bold h-5 min-w-[20px] flex items-center justify-center px-1.5 rounded-full ${
                            activeTab === item.id ? 'bg-[#E05A10] text-white' : 'bg-[#EAD8C8] text-[#E05A10] group-hover:bg-[#E05A10] group-hover:text-white transition-colors'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {item.isLiveIndicator && (
                          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-[9px] font-bold text-red-600 tracking-wider">LIVE</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Collapsed Badges */}
                    {isSidebarCollapsed && item.badge > 0 && (
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${activeTab === item.id ? 'bg-[#E05A10]' : 'bg-[#EAD8C8]'}`}></div>
                    )}
                    {isSidebarCollapsed && item.isLiveIndicator && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-[#EAD8C8]/60 flex-shrink-0 bg-[#FFFDF7]">
          <button
            onClick={() => {
              logoutAdmin()
              navigate('/')
            }}
            className={`w-full flex items-center justify-center h-[48px] ${isSidebarCollapsed ? '' : 'space-x-2'} bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 font-bold text-[13px] uppercase tracking-widest rounded-xl transition-all duration-200 shadow-sm border border-red-100/50 group`}
            title={isSidebarCollapsed ? "Logout" : undefined}
          >
            <FaSignOutAlt className={`text-lg transition-transform group-hover:-translate-x-1`} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT SCREEN */}
      <main className="flex-grow flex flex-col overflow-hidden w-full relative">
        {/* Top Header */}
        <header className="bg-white border-b border-[#EAD8C8]/60 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between flex-shrink-0 gap-4 sm:gap-0 z-40 relative">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-[#3D2B20] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
            <div>
              <h2 className="font-sans text-[18px] sm:text-[22px] font-bold text-[#3D2B20] leading-tight uppercase tracking-wide truncate max-w-[200px] sm:max-w-none">
                {headerMapping[activeTab]?.title || `${activeTab} Dashboard`}
              </h2>
              <p className="text-xs text-[#3D2B20]/60 mt-0.5 hidden sm:block font-medium">
                {headerMapping[activeTab]?.subtitle || 'Manage details and bookings for the spiritual website'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-5 flex-wrap justify-end gap-y-2 w-full sm:w-auto mt-1 sm:mt-0">
            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-[#3D2B20]/70 hover:text-[#E05A10] transition-colors focus:outline-none"
                title="Notifications"
                aria-label="Notifications"
              >
                <FaBell className="text-[20px]" />
                {pendingBookingsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E05A10] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {pendingBookingsCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#EAD8C8] overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-[#FAF0E6] bg-[#FFFDF7]">
                        <h3 className="text-xs font-bold text-[#3D2B20] uppercase tracking-wider">Notifications</h3>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {pendingBookingsCount > 0 ? (
                          pendingBookings.slice(0, 5).map((booking, idx) => (
                            <div key={idx} className="p-4 border-b border-[#FAF0E6] last:border-0 hover:bg-[#FAF6F0] cursor-pointer transition-colors" onClick={() => { setActiveTab('Bookings'); setIsNotificationOpen(false); }}>
                              <p className="text-sm font-bold text-[#E05A10] truncate">{booking.kathaType || 'Katha Booking'}</p>
                              <p className="text-xs text-[#3D2B20]/70 mt-1">{booking.kathaStartDate ? new Date(booking.kathaStartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending Date'}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-[#3D2B20]/50 text-sm">
                            No new notifications
                          </div>
                        )}
                      </div>
                      {pendingBookingsCount > 0 && (
                        <div className="p-3 border-t border-[#FAF0E6] bg-[#FFFDF7] text-center">
                          <button onClick={() => { setActiveTab('Bookings'); setIsNotificationOpen(false); }} className="text-xs font-bold text-[#E05A10] hover:text-[#c74c0b] transition-colors">
                            View All Requests →
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/" 
              className="text-xs font-sans font-bold text-[#E05A10] hover:text-[#c74c0b] border border-[#E05A10]/30 hover:border-[#E05A10]/60 hover:bg-[#E05A10]/5 px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-sm active:scale-95"
              aria-label="Go to website"
            >
              <FaGlobe className="text-sm" />
              <span className="hidden sm:inline">GO TO WEBSITE</span>
            </Link>
            
            <div className="w-[1px] h-6 bg-[#EAD8C8] hidden sm:block mx-1"></div>
            
            {/* Admin Profile Dropdown */}
            <div className="relative flex items-center space-x-3 cursor-pointer group" onClick={() => setIsProfileOpen(!isProfileOpen)} aria-label="Admin account menu">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[13px] text-[#3D2B20] font-bold group-hover:text-[#E05A10] transition-colors">Admin</span>
                <span className="text-[10px] text-[#3D2B20]/60 font-medium -mt-0.5">Administrator</span>
              </div>
              <div className="w-[38px] h-[38px] rounded-full bg-[#FFFDF7] border-2 border-[#EAD8C8] flex items-center justify-center text-[15px] font-bold text-[#E05A10] group-hover:border-[#E05A10]/50 transition-colors shadow-sm">
                A
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsProfileOpen(false); }} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#EAD8C8] overflow-hidden z-50 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-[#FAF0E6] bg-[#FFFDF7]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E05A10] to-[#c74c0b] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            A
                          </div>
                          <div>
                            <p className="font-serif font-bold text-[#3D2B20] text-sm">{adminProfile?.fullname || 'Admin'}</p>
                            <p className="text-[10px] text-[#3D2B20]/60 truncate mt-0.5">{adminProfile?.email || 'admin@katha.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button onClick={() => { setIsProfileOpen(false); setIsEditProfileModalOpen(true); }} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#3D2B20]/80 hover:bg-[#FAF6F0] hover:text-[#E05A10] transition-colors">
                          <FaUserEdit className="text-base" />
                          <span>Profile</span>
                        </button>
                        <button onClick={() => { setIsProfileOpen(false); setIsChangePasswordModalOpen(true); }} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#3D2B20]/80 hover:bg-[#FAF6F0] hover:text-[#E05A10] transition-colors">
                          <FaLock className="text-base" />
                          <span>Settings</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Sub-Views Area */}
        <div className="flex-grow p-0 sm:p-0 overflow-y-auto bg-gray-50">
          {activeTab === 'Overview' && <div className="p-4 sm:p-8"><OverviewTab {...{ bookings, events, galleryPhotos, galleryVideos, setActiveTab }} /></div>}
          {activeTab === 'Bookings' && <div className="p-4 sm:p-8"><BookingsTab {...{ bookings, updateBookingStatus, deleteBooking, selectedBookings, setSelectedBookings, setPrefillEventData, setActiveTab }} /></div>}
          {activeTab === 'Yajman' && <AdminYajmanManager />}
          {activeTab === 'Banners' && <AdminBannerManager />}
          {activeTab === 'Biography' && <div className="p-4 sm:p-8"><BiographyTab {...{ about, updateAbout, timeline, setTimeline, achievements, setAchievements }} /></div>}
          {activeTab === 'Events' && <div className="p-4 sm:p-8"><EventsTab {...{ events, addEvent, deleteEvent, calendarDates, addCalendarDate, deleteCalendarDate, prefillEventData, setPrefillEventData }} /></div>}
          {activeTab === 'Calendar' && <div className="p-4 sm:p-8"><CalendarTab {...{ calendarDates, addCalendarDate, deleteCalendarDate }} /></div>}
          {activeTab === 'Organizers' && <div className="p-4 sm:p-8"><OrganizersTab {...{ organizers, addOrganizer, updateOrganizer, deleteOrganizer }} /></div>}
          {activeTab === 'Gallery' && <div className="p-4 sm:p-8"><GalleryTab {...{ galleryPhotos, addPhoto, deletePhoto, galleryVideos, addVideo, deleteVideo }} /></div>}
          {activeTab === 'Contact' && <div className="p-4 sm:p-8"><ContactTab {...{ contacts, updateContacts }} /></div>}
          {activeTab === 'Live' && <div className="p-4 sm:p-8"><LiveTab /></div>}
          {activeTab === 'Settings' && <div className="p-4 sm:p-8 h-full"><SettingsTab adminProfile={adminProfile} updateAdminProfile={updateAdminProfile} changeAdminPassword={changeAdminPassword} /></div>}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <EditProfileModal 
          onClose={() => setIsEditProfileModalOpen(false)} 
          adminProfile={adminProfile} 
          updateAdminProfile={updateAdminProfile} 
        />
      )}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal 
          onClose={() => setIsChangePasswordModalOpen(false)} 
          changeAdminPassword={changeAdminPassword} 
        />
      )}
    </div>
  )
}

function EditProfileModal({ onClose, adminProfile, updateAdminProfile }) {
  const [fullname, setFullname] = useState(adminProfile?.fullname || '')
  const [email, setEmail] = useState(adminProfile?.email || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await updateAdminProfile(fullname, email)
      alert('Profile updated successfully!')
      onClose()
    } catch (error) {
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0]/80 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(224,90,16,0.2)] w-full max-w-md overflow-hidden border border-[#EAD8C8]">
        <div className="bg-gradient-to-r from-[#FAF6F0] to-white px-8 py-6 border-b border-[#EAD8C8] flex justify-between items-center relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5">
            <GiLotus className="text-8xl text-[#E05A10] -mt-4 -mr-4" />
          </div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="bg-gradient-to-br from-[#E05A10] to-[#D4AF37] p-2 rounded-full shadow-md">
              <FaUserEdit className="text-white text-lg" />
            </div>
            <h3 className="font-serif text-xl font-black text-[#3D2B20] tracking-wide">Edit Profile</h3>
          </div>
          <button onClick={onClose} className="text-[#3D2B20]/40 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-full transition-all relative z-10 shadow-sm border border-transparent hover:border-red-100"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest block">Full Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E05A10]/50">
                <FaUser className="text-sm" />
              </span>
              <input type="text" required value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Enter full name" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#EAD8C8] bg-[#FAF6F0]/50 focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none text-sm text-[#3D2B20] font-medium transition-all" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest block">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E05A10]/50">
                <FaEnvelope className="text-sm" />
              </span>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#EAD8C8] bg-[#FAF6F0]/50 focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none text-sm text-[#3D2B20] font-medium transition-all" />
            </div>
          </div>
          <div className="pt-6 flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#FAF6F0] text-[#3D2B20]/70 hover:bg-[#EAD8C8] transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#E05A10] to-[#c94d0d] text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 disabled:opacity-50 transition-all hover:-translate-y-0.5 active:translate-y-0">Save Changes</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function ChangePasswordModal({ onClose, changeAdminPassword }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      return alert('New password and confirm password do not match!')
    }
    setIsSubmitting(true)
    try {
      await changeAdminPassword(oldPassword, newPassword)
      alert('Password changed successfully!')
      onClose()
    } catch (error) {
      alert('Failed to change password. Check your old password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0]/80 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(224,90,16,0.2)] w-full max-w-md overflow-hidden border border-[#EAD8C8]">
        <div className="bg-gradient-to-r from-[#FAF6F0] to-white px-8 py-6 border-b border-[#EAD8C8] flex justify-between items-center relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5">
            <GiLotus className="text-8xl text-[#E05A10] -mt-4 -mr-4" />
          </div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="bg-gradient-to-br from-[#E05A10] to-[#D4AF37] p-2 rounded-full shadow-md">
              <FaLock className="text-white text-lg" />
            </div>
            <h3 className="font-serif text-xl font-black text-[#3D2B20] tracking-wide uppercase">Change Password</h3>
          </div>
          <button onClick={onClose} className="text-[#3D2B20]/40 hover:text-red-500 bg-white hover:bg-red-50 p-2 rounded-full transition-all relative z-10 shadow-sm border border-transparent hover:border-red-100"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest block">Old Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E05A10]/50">
                <FaLock className="text-sm" />
              </span>
              <input type={showOldPassword ? "text" : "password"} required value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Enter old password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#EAD8C8] bg-[#FAF6F0]/50 focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none text-sm text-[#3D2B20] font-medium transition-all" />
              <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D2B20]/40 hover:text-[#E05A10] transition-colors focus:outline-none">
                {showOldPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest block">New Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E05A10]/50">
                <FaLock className="text-sm" />
              </span>
              <input type={showNewPassword ? "text" : "password"} required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#EAD8C8] bg-[#FAF6F0]/50 focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none text-sm text-[#3D2B20] font-medium transition-all" />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D2B20]/40 hover:text-[#E05A10] transition-colors focus:outline-none">
                {showNewPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#3D2B20]/70 uppercase tracking-widest block">Confirm New Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E05A10]/50">
                <FaLock className="text-sm" />
              </span>
              <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#EAD8C8] bg-[#FAF6F0]/50 focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none text-sm text-[#3D2B20] font-medium transition-all" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D2B20]/40 hover:text-[#E05A10] transition-colors focus:outline-none">
                {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>
          <div className="pt-6 flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#FAF6F0] text-[#3D2B20]/70 hover:bg-[#EAD8C8] transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:bg-red-700 disabled:opacity-50 transition-all hover:-translate-y-0.5 active:translate-y-0">Update Password</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

/* =========================================================================
   TAB: OVERVIEW
/* =========================================================================
   TAB: OVERVIEW
   ========================================================================= 
   (Moved to ./components/OverviewTab.jsx)
*/

/* =========================================================================
   TAB: BOOKINGS MANAGER
   ========================================================================= */
function BookingsTab({ bookings, updateBookingStatus, deleteBooking, selectedBookings, setSelectedBookings, setPrefillEventData, setActiveTab }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 10;
  
  const filteredBookings = React.useMemo(() => {
    if (!searchQuery.trim()) return bookings;
    const term = searchQuery.toLowerCase();
    return bookings.filter(b => 
      (b.name || '').toLowerCase().includes(term) ||
      (b.kathaType || '').toLowerCase().includes(term) ||
      (b.state || '').toLowerCase().includes(term) ||
      (b.city || '').toLowerCase().includes(term) ||
      (b.village || '').toLowerCase().includes(term) ||
      (b.pincode || '').toLowerCase().includes(term)
    );
  }, [bookings, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBookings(currentItems.map(b => b.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(prev => prev.filter(bId => bId !== id));
    } else {
      setSelectedBookings(prev => [...prev, id]);
    }
  };

  const handleConfirmAndPrefill = async (item) => {
    await updateBookingStatus(item.id, 'Confirmed');
    
    if (setPrefillEventData && setActiveTab) {
      const d = item.preferredDate ? new Date(item.preferredDate) : new Date();
      setPrefillEventData({
        title: item.kathaType || '',
        date: isNaN(d.getTime()) ? '' : d.getDate().toString(),
        month: isNaN(d.getTime()) ? '' : d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        year: isNaN(d.getTime()) ? '' : d.getFullYear().toString(),
        selectedState: item.state || '',
        district: item.city || '',
        pincode: item.pincode || '',
        venue: item.address || ''
      });
      setActiveTab('Events');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAD8C8] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      <div className="px-6 py-4 border-b border-[#FAF0E6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Customer Booking Inquiries</h3>
          <span className="text-xs text-[#3D2B20]/60">Total: {filteredBookings.length} requests</span>
        </div>
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D2B20]/40 text-sm" />
          <input
            type="text"
            placeholder="Search by name, location, katha..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all placeholder:text-[#3D2B20]/40"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF6F0] text-[#3D2B20]/70 font-semibold text-xs uppercase tracking-wider border-b border-[#EAD8C8]">
              <th className="px-6 py-4 w-12">
                <input 
                  type="checkbox" 
                  className="rounded text-[#E05A10] focus:ring-[#E05A10]"
                  onChange={handleSelectAll}
                  checked={currentItems.length > 0 && selectedBookings.length === currentItems.length}
                />
              </th>
              <th className="px-6 py-4">Client Detail</th>
              <th className="px-6 py-4">Katha Requested</th>
              <th className="px-6 py-4">Proposed Date / City</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FAF0E6] text-xs">
            {currentItems.map((item) => (
              <tr key={item.id} className={`hover:bg-[#FAF6F0]/30 transition-colors ${selectedBookings.includes(item.id) ? 'bg-orange-50/50' : ''}`}>
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded text-[#E05A10] focus:ring-[#E05A10]"
                    checked={selectedBookings.includes(item.id)}
                    onChange={() => handleSelectOne(item.id)}
                  />
                </td>
                <td className="px-6 py-4 space-y-1">
                  <div className="font-serif font-bold text-sm text-[#3D2B20]">{item.name}</div>
                  <div className="text-[10px] text-[#3D2B20]/60">Ph: {item.phone}</div>
                  <div className="text-[10px] text-[#3D2B20]/60">Email: {item.email}</div>
                </td>
                <td className="px-6 py-4 font-semibold text-[#E05A10]">{item.kathaType}</td>
                <td className="px-6 py-4 space-y-1">
                  <div className="font-bold text-[#3D2B20]">{item.city}{item.state ? `, ${item.state}` : ''}</div>
                  {(item.village || item.pincode) && (
                    <div className="text-[10px] text-[#3D2B20]/60">
                      {item.village && `Vill: ${item.village}`} {item.village && item.pincode && '|'} {item.pincode && `PIN: ${item.pincode}`}
                    </div>
                  )}
                  <div className="text-[10px] text-[#3D2B20]/50">{item.preferredDate}</div>
                </td>
                <td className="px-6 py-4 max-w-[200px] whitespace-normal leading-relaxed text-[#3D2B20]/75">{item.message}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.status === 'Confirmed' ? 'bg-green-50 text-green-700' :
                    item.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    {item.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleConfirmAndPrefill(item)}
                          className="p-1.5 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white rounded-lg transition-colors border border-green-200"
                          title="Confirm Booking & Add Event"
                        >
                          <FaCheck className="text-[10px]" />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(item.id, 'Cancelled')}
                          className="p-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-colors border border-red-200"
                          title="Cancel Booking"
                        >
                          <FaTimes className="text-[10px]" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        if (confirm('Delete this request permanent?')) deleteBooking(item.id)
                      }}
                      className="p-1.5 bg-gray-50 hover:bg-gray-700 text-gray-500 hover:text-white rounded-lg transition-colors border border-gray-200"
                      title="Delete Request"
                    >
                      <FaTrash className="text-[10px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="py-12 text-center text-sm text-[#3D2B20]/40">No booking requests available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-[#FAF0E6] flex items-center justify-between bg-[#FAF6F0]/30 mt-auto">
          <div className="text-xs text-[#3D2B20]/60">
            Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to <span className="font-bold">{Math.min(indexOfLastItem, bookings.length)}</span> of <span className="font-bold">{bookings.length}</span> entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-[#EAD8C8] text-xs font-bold text-[#3D2B20] hover:bg-[#E05A10] hover:text-white hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#E05A10] text-white border-transparent'
                    : 'border-[#EAD8C8] text-[#3D2B20] hover:bg-[#EAD8C8]/30'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-[#EAD8C8] text-xs font-bold text-[#3D2B20] hover:bg-[#E05A10] hover:text-white hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   TAB: HOMEPAGE BANNERS
   ========================================================================= */
function BannersTab({ banners, updateBanners }) {
  const [list, setList] = useState(banners)
  const [success, setSuccess] = useState(false)

  const handleEdit = (idx, field, value) => {
    const newList = [...list]
    newList[idx][field] = value
    setList(newList)
  }

  const handleDeleteSlide = (idx) => {
    if(window.confirm('Are you sure you want to delete this slide? (क्या आप इस स्लाइड को हटाना चाहते हैं?)')) {
      const newList = list.filter((_, i) => i !== idx)
      setList(newList)
    }
  }

  const handleBannerFileChange = (idx, e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Please upload only JPG, PNG or WEBP images!')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please select a smaller image.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        handleEdit(idx, 'image', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    updateBanners(list)
    alert('होमपेज बैनर सफलतापूर्वक सहेज लिए गए हैं! (Homepage banners saved successfully!)');
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Homepage Banner Slides</h3>
        <button
          onClick={handleSave}
          className="bg-[#E05A10] hover:bg-[#c94d0d] text-white text-xs font-serif font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center space-x-2 shadow transition-all active:scale-95"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
          Banner content updated successfully! (बैनर सफलतापूर्वक अपडेट हो गया)
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {list.map((slide, idx) => (
          <div key={slide.id} className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-[#FAF0E6] pb-2">
              <h4 className="font-serif font-bold text-sm text-[#E05A10]">Slide {idx + 1}</h4>
              {list.length > 1 && (
                <button 
                  onClick={() => handleDeleteSlide(idx)}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <FaTrash className="text-[10px]" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#3D2B20]/75 block">Banner Title (शिरोलेख)</label>
                <SearchableSelect
                  value={slide.title}
                  onChange={(val) => handleEdit(idx, 'title', val)}
                  placeholder="Select Katha Type (कथा चुनें)"
                  showSearch={false}
                  options={[
                    { value: "श्रीमद् भागवत कथा", label: "श्रीमद् भागवत कथा (Shrimad Bhagvat Katha)" },
                    { value: "श्री राम कथा", label: "श्री राम कथा (Ram Katha)" },
                    { value: "श्री शिव महापुराण", label: "श्री शिव महापुराण (Shiv Mahapuran)" },
                    { value: "श्री देवी भागवत कथा", label: "श्री देवी भागवत कथा (Devi Bhagvat)" },
                    { value: "सुंदरकांड पाठ", label: "सुंदरकांड पाठ (Sundarkand Path)" },
                    { value: "भजन संध्या", label: "भजन संध्या (Bhajan Sandhya)" }
                  ]}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#3D2B20]/75 block">Tagline Description (उपशीर्षक)</label>
                <textarea
                  value={slide.tagline}
                  rows="2"
                  placeholder="उदा. परम पूज्य गुरु जी के मुखारविंद से अमृतमयी कथा का श्रवण करें"
                  onChange={(e) => handleEdit(idx, 'tagline', e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#3D2B20]/75 block">Select Banner Image (चित्र फ़ाइल चुनें - JPG/PNG)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#EAD8C8] border-dashed rounded-xl cursor-pointer bg-[#FAF6F0] hover:bg-[#FAF0E6] transition-colors relative overflow-hidden group">
                    {slide.image ? (
                      <img src={slide.image} alt={`Slide ${idx + 1} Preview`} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <FaImage className="text-2xl text-[#E05A10] mb-1.5" />
                        <span className="text-[10px] text-[#3D2B20]/60 font-semibold block">Click to upload JPG or PNG</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg, image/webp" 
                      onChange={(e) => handleBannerFileChange(idx, e)}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#3D2B20]/75 block">Button 1 Text</label>
                  <input
                    type="text"
                    value={slide.btnText1 || ''}
                    placeholder="उदा. BOOK YOUR KATHA"
                    onChange={(e) => handleEdit(idx, 'btnText1', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#3D2B20]/75 block">Button 2 Text</label>
                  <input
                    type="text"
                    value={slide.btnText2 || ''}
                    placeholder="उदा. WATCH LIVE"
                    onChange={(e) => handleEdit(idx, 'btnText2', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#3D2B20]/75 block">Katha Day (कौन सा दिन है?)</label>
                  <input
                    type="text"
                    value={slide.kathaDay || ''}
                    placeholder="उदा. पहला दिन (Day 1)"
                    onChange={(e) => handleEdit(idx, 'kathaDay', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#3D2B20]/75 block">Katha Topic (आज का प्रसंग)</label>
                  <input
                    type="text"
                    value={slide.kathaTopic || ''}
                    placeholder="उदा. श्री राम जन्म प्रसंग"
                    onChange={(e) => handleEdit(idx, 'kathaTopic', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            const newSlide = {
              id: Date.now(), // temporary ID
              title: '',
              tagline: '',
              image: ''
            }
            setList([...list, newSlide])
          }}
          className="border-2 border-dashed border-[#E05A10] text-[#E05A10] hover:bg-[#E05A10] hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center space-x-2 transition-all"
        >
          <FaPlus />
          <span>Add New Banner Slide</span>
        </button>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB: BIOGRAPHY EDITOR
   ========================================================================= */
function BiographyTab({ about, updateAbout, timeline, setTimeline, achievements, setAchievements }) {
  const [bio, setBio] = useState(about.bio)
  const [image, setImage] = useState(about.image)
  const [name, setName] = useState(about.name)
  const [stats, setStats] = useState(about.stats || [])
  
  // Custom Achievements/Timeline fields
  const [newTimeline, setNewTimeline] = useState({ year: '', title: '', desc: '' })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setBio(about.bio || '')
    setImage(about.image || '')
    setName(about.name || '')
    setStats(about.stats || [])
  }, [about])

  const handleStatsChange = (idx, field, value) => {
    const newStats = [...stats]
    newStats[idx][field] = value
    setStats(newStats)
  }

  const handleSave = () => {
    updateAbout({ bio, image, name, stats })
    alert('कथावाचक का परिचय सफलतापूर्वक सहेज लिया गया है! (About details saved successfully!)');
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Please upload only JPG, PNG or WEBP images!')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please select a smaller image.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTimeline = () => {
    if (newTimeline.year && newTimeline.title) {
      setTimeline(prev => [...prev, newTimeline])
      setNewTimeline({ year: '', title: '', desc: '' })
    }
  }

  const handleDeleteTimeline = (idx) => {
    setTimeline(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Guru Ji Biography Details</h3>
        <button
          onClick={handleSave}
          className="bg-[#E05A10] hover:bg-[#c94d0d] text-white text-xs font-serif font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center space-x-2 shadow transition-all"
        >
          <FaSave />
          <span>Save About Details</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
          Biography bio text and stats updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar and text settings */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Guru Ji Full Name (पूर्ण नाम)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Avatar Image (गुरु जी का चित्र)</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleAvatarFileChange}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E05A10]/10 file:text-[#E05A10] hover:file:bg-[#E05A10]/20 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Biography Text (संक्षिप्त जीवनी - हिंदी)</label>
              <textarea
                value={bio}
                rows="6"
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Stats counters */}
          <div className="pt-4 border-t border-[#FAF0E6]">
            <h4 className="font-serif font-bold text-xs text-[#3D2B20] mb-3">Stat Counters (सांख्यिकी)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {stats.map((st, idx) => (
                <div key={idx} className="space-y-1.5 p-3 bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl">
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => handleStatsChange(idx, 'value', e.target.value)}
                    className="w-full bg-white font-serif font-black text-center text-[#E05A10] border border-[#EAD8C8] rounded py-1"
                  />
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => handleStatsChange(idx, 'label', e.target.value)}
                    className="w-full bg-white text-[9px] text-center text-[#3D2B20]/60 border border-[#EAD8C8] rounded py-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline elements builder */}
        <div className="lg:col-span-5 space-y-6">
          {/* Avatar Preview Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm flex flex-col items-center">
            <h4 className="font-serif font-bold text-xs text-[#3D2B20]/60 uppercase tracking-widest mb-4">Image Preview</h4>
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#FAF0E6] shadow shadow-[#E05A10]/10">
              <img src={image} alt="Guru Ji Preview" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Timeline Management */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-xs text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center space-x-2">
              <FaClipboardList className="text-[#E05A10]" />
              <span>Timeline of Devotion</span>
            </h4>

            {/* Timeline builder list */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between bg-[#FAF6F0] p-3 rounded-xl border border-[#EAD8C8] text-xs">
                  <div>
                    <span className="font-serif font-bold text-[#E05A10] bg-white px-2 py-0.5 rounded border border-[#EAD8C8] inline-block mb-1">{item.year}</span>
                    <h5 className="font-bold text-[#3D2B20]">{item.title}</h5>
                    <p className="text-[10px] text-[#3D2B20]/60 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  <button onClick={() => handleDeleteTimeline(idx)} className="text-red-500 hover:text-red-700 p-1"><FaTrash className="text-[10px]" /></button>
                </div>
              ))}
            </div>

            {/* Add Timeline Item Form */}
            <div className="bg-[#FAF6F0]/50 p-4 border border-[#EAD8C8] rounded-xl text-xs space-y-2">
              <h5 className="font-bold text-[#E05A10]">Add Timeline Milestone</h5>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  value={newTimeline.year}
                  onChange={(e) => setNewTimeline(prev => ({ ...prev, year: e.target.value }))}
                  className="bg-white border border-[#EAD8C8] rounded p-2 text-center"
                />
                <input
                  type="text"
                  placeholder="Milestone Title"
                  value={newTimeline.title}
                  onChange={(e) => setNewTimeline(prev => ({ ...prev, title: e.target.value }))}
                  className="col-span-3 bg-white border border-[#EAD8C8] rounded p-2"
                />
              </div>
              <input
                type="text"
                placeholder="Brief description"
                value={newTimeline.desc}
                onChange={(e) => setNewTimeline(prev => ({ ...prev, desc: e.target.value }))}
                className="w-full bg-white border border-[#EAD8C8] rounded p-2"
              />
              <button
                type="button"
                onClick={handleAddTimeline}
                className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold tracking-widest text-[10px] uppercase py-2 rounded flex items-center justify-center space-x-1.5 transition-colors"
              >
                <FaPlus />
                <span>Add Milestone</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB: UPCOMING EVENTS
   ========================================================================= */
function EventsTab({ events, addEvent, deleteEvent, calendarDates, addCalendarDate, deleteCalendarDate, prefillEventData, setPrefillEventData }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [selectedState, setSelectedState] = useState('')
  const [district, setDistrict] = useState('')
  const [pincode, setPincode] = useState('')
  const [time, setTime] = useState('')
  const [image, setImage] = useState('')
  const [type, setType] = useState('Katha')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (prefillEventData) {
      setTitle(prefillEventData.title || '')
      setDate(prefillEventData.date || '')
      setEndDate(prefillEventData.endDate || '')
      setMonth(prefillEventData.month || '')
      setYear(prefillEventData.year || new Date().getFullYear().toString())
      setSelectedState(prefillEventData.selectedState || '')
      setDistrict(prefillEventData.district || '')
      setPincode(prefillEventData.pincode || '')
      if (setPrefillEventData) {
        setPrefillEventData(null);
      }
    }
  }, [prefillEventData, setPrefillEventData]);

  // Search state
  const [eventSearchQuery, setEventSearchQuery] = useState('')

  // Pagination and Filtering states
  const [currentEventPage, setCurrentEventPage] = useState(1)
  const eventsPerPage = 5

  const filteredEvents = events.filter(evt => {
    if (!eventSearchQuery) return true
    const title = evt?.title || ''
    return title.toLowerCase().includes(eventSearchQuery.toLowerCase())
  })

  const totalEventPages = Math.ceil(filteredEvents.length / eventsPerPage) || 1
  const currentEvents = filteredEvents.slice((currentEventPage - 1) * eventsPerPage, currentEventPage * eventsPerPage)

  const handleSubmit = (e) => {
    e.preventDefault()
    const venue = `${district}, ${selectedState}${pincode ? ` - ${pincode}` : ''}`
    if (!title || !date || !month || !year || !selectedState || !district || !time) return

    addEvent({
      title,
      date,
      endDate,
      month: `${month} ${year}`,
      venue,
      time,
      image: image || 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
      type
    })

    if (addCalendarDate && title) {
      const monthIndex = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(month)
      if (monthIndex !== -1) {
        const startDay = parseInt(date, 10)
        const endDay = endDate ? parseInt(endDate, 10) : startDay
        const y = parseInt(year, 10)
        
        const start = new Date(y, monthIndex, startDay)
        const end = new Date(y, monthIndex, endDay)
        
        if (end >= start) {
          const currentDate = new Date(start)
          while (currentDate <= end) {
            const formattedMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
            const formattedDay = String(currentDate.getDate()).padStart(2, '0')
            const dateStr = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`
            
            addCalendarDate({ date: dateStr, status: 'Booked' })
            currentDate.setDate(currentDate.getDate() + 1)
          }
        }
      }
    }

    setTitle('')
    setDate('')
    setEndDate('')
    setMonth('')
    setYear(new Date().getFullYear().toString())
    setSelectedState('')
    setDistrict('')
    setPincode('')
    setTime('')
    setImage('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Please upload only JPG, PNG or WEBP images!')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please select a smaller image.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Panel: Events List */}
      <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <div className="border-b border-[#FAF0E6] pb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Active Events Calendar</h3>
          <span className="text-xs text-[#3D2B20]/60">Total: {filteredEvents.length} upcoming</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-[#3D2B20]/40" />
          </div>
          <input
            type="text"
            value={eventSearchQuery}
            onChange={(e) => {
              setEventSearchQuery(e.target.value)
              setCurrentEventPage(1) // Reset pagination on search
            }}
            placeholder="Search by event name (e.g. Ram Katha)..."
            className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl pl-10 pr-24 py-2.5 outline-none font-medium text-xs transition-colors"
          />
          {eventSearchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="bg-[#E05A10] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                {filteredEvents.length} Found
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {currentEvents.map((evt) => (
            <div key={evt.id} className="flex items-center space-x-3 sm:space-x-4 bg-[#FAF6F0] p-3 sm:p-4 rounded-xl border border-[#EAD8C8] relative group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E05A10] text-white rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow shadow-orange-500/10">
                <span className="text-sm sm:text-base font-black leading-none">{evt.date}</span>
                <span className="text-[8px] uppercase tracking-widest mt-0.5 leading-none font-bold">{evt.month}</span>
              </div>
              <div className="flex-grow space-y-0.5 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#3D2B20]">{evt.title}</h4>
                <div className="text-[10px] text-[#3D2B20]/60">Location: {evt.venue}</div>
                <div className="text-[10px] text-[#3D2B20]/60">Schedule: {evt.time}</div>
              </div>
              <button
                onClick={() => {
                  if (confirm('Delete this event?')) deleteEvent(evt.id)
                }}
                className="text-gray-400 hover:text-red-600 transition-colors p-2"
                title="Delete Event"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="py-12 text-center text-xs text-[#3D2B20]/40">No upcoming events cataloged.</div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalEventPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-[#FAF0E6]">
            <button
              onClick={() => setCurrentEventPage(prev => Math.max(prev - 1, 1))}
              disabled={currentEventPage === 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentEventPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
              }`}
            >
              Previous
            </button>
            <span className="text-xs font-bold text-[#3D2B20]/60">
              Page {currentEventPage} of {totalEventPages}
            </span>
            <button
              onClick={() => setCurrentEventPage(prev => Math.min(prev + 1, totalEventPages))}
              disabled={currentEventPage === totalEventPages}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentEventPage === totalEventPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Right Panel: Add New Event Form */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center space-x-2">
          <FaCalendarPlus className="text-[#E05A10]" />
          <span>Add Upcoming Katha</span>
        </h3>

        {success && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
            Event added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block">Katha Event Title</label>
            <SearchableSelect
              value={title}
              onChange={(val) => setTitle(val)}
              placeholder="Select Katha Type (कथा चुनें)"
              options={[
                "श्रीमद् भागवत कथा (Shrimad Bhagvat Katha)",
                "राम कथा (Ram Katha)",
                "शिव महापुराण (Shiv Mahapuran)",
                "देवी भागवत (Devi Bhagwat)",
                "सुंदरकांड पाठ (Sundarkand Path)",
                "भजन संध्या (Bhajan Sandhya)"
              ]}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">From Date (से)</label>
              <SearchableSelect
                value={date}
                onChange={(val) => setDate(val)}
                placeholder="Date"
                options={Array.from({ length: 31 }, (_, i) => String(i + 1))}
                showSearch={false}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">To Date (तक) - Opt</label>
              <SearchableSelect
                value={endDate}
                onChange={(val) => setEndDate(val)}
                placeholder="End Date"
                options={Array.from({ length: 31 }, (_, i) => String(i + 1))}
                showSearch={false}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Month (महीना)</label>
              <SearchableSelect
                value={month}
                onChange={(val) => setMonth(val)}
                placeholder="Month"
                options={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']}
                showSearch={false}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Year (वर्ष)</label>
              <SearchableSelect
                value={year}
                onChange={(val) => setYear(val)}
                placeholder="Year"
                options={Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i))}
                showSearch={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">State (राज्य)</label>
              <SearchableSelect
                value={selectedState}
                onChange={(val) => {
                  setSelectedState(val)
                  setDistrict('')
                }}
                placeholder="Select State"
                options={Object.keys(statesAndDistricts)}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">District / City (शहर)</label>
              <SearchableSelect
                value={district}
                onChange={(val) => setDistrict(val)}
                placeholder="Select District"
                disabled={!selectedState}
                options={selectedState ? statesAndDistricts[selectedState] : []}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block">Pincode (पिनकोड) - Optional</label>
            <input
              type="text"
              placeholder="e.g. 400001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              maxLength={6}
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block">Schedule Time</label>
            <SearchableSelect
              value={time}
              onChange={(val) => setTime(val)}
              placeholder="Select Schedule Time"
              options={[
                "Morning (9:00 AM - 1:00 PM)",
                "Afternoon (1:00 PM - 5:00 PM)",
                "Evening (5:00 PM - 9:00 PM)",
                "Night (8:00 PM - 11:00 PM)",
                "Full Day (9:00 AM - 6:00 PM)"
              ]}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#3D2B20]/75 block">Event Banner Image (Optional)</label>
              <span className="text-[10px] text-[#E05A10] font-medium bg-[#E05A10]/10 px-2 py-0.5 rounded-full">Recommended: 1200x600 | Max: 5MB</span>
            </div>
            <div className="flex items-center space-x-4 pt-1">
              {image && (
                <div className="w-16 h-16 rounded-xl border border-[#EAD8C8] overflow-hidden flex-shrink-0">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageFileChange}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E05A10]/10 file:text-[#E05A10] hover:file:bg-[#E05A10]/20 cursor-pointer"
              />
            </div>
            {image && (
               <button
                 type="button"
                 onClick={() => setImage('')}
                 className="text-xs text-red-600 font-bold hover:underline mt-1 inline-block"
               >
                 Remove Image
               </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow transition-all mt-2"
          >
            Create Event (कथा जोड़ें)
          </button>
        </form>
      </div>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB: GALLERY & MEDIA MANAGER
   ========================================================================= */
function GalleryTab({ galleryPhotos, addPhoto, deletePhoto, galleryVideos, addVideo, deleteVideo }) {
  // Photo State
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [photoSuccess, setPhotoSuccess] = useState(false)

  // Pagination for Photos
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1)
  const photosPerPage = 8
  const indexOfLastPhoto = currentPhotoPage * photosPerPage
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
  const currentPhotos = galleryPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto)
  const totalPhotoPages = Math.ceil(galleryPhotos.length / photosPerPage) || 1

  // Video State
  const [videoTitle, setVideoTitle] = useState('')
  const [youtubeId, setYoutubeId] = useState('')
  const [videoSuccess, setVideoSuccess] = useState(false)
  const [videoSearchQuery, setVideoSearchQuery] = useState('')
  const [currentVideoPage, setCurrentVideoPage] = useState(1)

  const bilingualMap = {
    "ram": "राम", "राम": "ram",
    "shiv": "शिव", "शिव": "shiv",
    "katha": "कथा", "कथा": "katha",
    "bhagvat": "भागवत", "भागवत": "bhagvat",
    "bhagwat": "भागवत", "भागवत": "bhagwat",
    "sundarkand": "सुंदरकांड", "सुंदरकांड": "sundarkand",
    "krishna": "कृष्ण", "कृष्ण": "krishna",
    "devi": "देवी", "देवी": "devi",
    "bhajan": "भजन", "भजन": "bhajan",
    "day": "दिन", "दिन": "day",
    "shrimad": "श्रीमद्", "श्रीमद्": "shrimad"
  };

  const filteredVideos = galleryVideos.filter(vid => {
    if (!videoSearchQuery) return true;
    const q = videoSearchQuery.toLowerCase().trim();
    const t = vid.title.toLowerCase();
    
    // Direct match
    if (t.includes(q)) return true;

    // Translated match (word by word)
    const translatedQuery = q.split(' ').map(word => bilingualMap[word] || word).join(' ');
    if (translatedQuery !== q && t.includes(translatedQuery)) return true;

    return false;
  });
  const videosPerPage = 4
  const indexOfLastVideo = currentVideoPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalVideoPages = Math.ceil(filteredVideos.length / videosPerPage) || 1

  const extractYoutubeId = (url) => {
    if (!url) return null;
    url = url.trim();
    
    // If they just pasted an 11-character ID
    if (url.length === 11 && !url.includes('=')) {
      return url;
    }

    // Comprehensive regex for YouTube URLs
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|live\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
    
    // Fallback: search for any 11-character alphanumeric string (plus - and _)
    const fallbackMatch = url.match(/(?<![a-zA-Z0-9_-])([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/);
    if (fallbackMatch && fallbackMatch[1]) {
      return fallbackMatch[1];
    }
    
    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Please upload only JPG, PNG or WEBP images!')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please select a smaller image.')
        return
      }
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault()
    if (!photoPreview) return
    addPhoto(photoPreview)
    setPhotoFile(null)
    setPhotoPreview('')
    setPhotoSuccess(true)
    setTimeout(() => setPhotoSuccess(false), 2000)
  }

  const handleVideoSubmit = (e) => {
    e.preventDefault()
    if (!videoTitle || !youtubeId) return
    
    const extractedId = extractYoutubeId(youtubeId);
    if (!extractedId) {
      alert("Invalid YouTube Link or ID! Please paste the full valid URL of the video (e.g. https://www.youtube.com/watch?v=R-709087yAw)");
      return;
    }

    addVideo({ title: videoTitle, videoId: extractedId })
    setVideoTitle('')
    setYoutubeId('')
    setVideoSuccess(true)
    setTimeout(() => setVideoSuccess(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT AREA: PHOTO & VIDEO LISTS */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* 1. Photos Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
          <div className="border-b border-[#FAF0E6] pb-2 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#3D2B20]">Gallery Photo Catalog</h3>
            <span className="text-xs text-[#3D2B20]/60">Total: {galleryPhotos.length} photos</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pr-1">
            {currentPhotos.map((photo, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl border border-[#EAD8C8] overflow-hidden group shadow-sm">
                <img src={photo.url} alt="Gallery Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#3D2B20]/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <button
                    onClick={() => {
                      if (confirm('Delete this photo?')) deletePhoto(photo.id)
                    }}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    title="Delete Photo"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
            {currentPhotos.length === 0 && (
              <div className="col-span-full py-8 text-center text-[#3D2B20]/40 text-xs">No photos available.</div>
            )}
          </div>
          
          {totalPhotoPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-[#FAF0E6]">
              <button
                onClick={() => setCurrentPhotoPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPhotoPage === 1}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentPhotoPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
                }`}
              >
                Previous
              </button>
              <span className="text-xs font-bold text-[#3D2B20]/60">
                Page {currentPhotoPage} of {totalPhotoPages}
              </span>
              <button
                onClick={() => setCurrentPhotoPage(prev => Math.min(prev + 1, totalPhotoPages))}
                disabled={currentPhotoPage === totalPhotoPages}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentPhotoPage === totalPhotoPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* 2. Videos Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
          <div className="border-b border-[#FAF0E6] pb-2 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#3D2B20]">YouTube Live Katha Videos</h3>
            <span className="text-xs text-[#3D2B20]/60">Total: {galleryVideos.length} recorded streams</span>
          </div>

          {/* Search Bar for Videos */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#3D2B20]/40" />
            </div>
            <input
              type="text"
              value={videoSearchQuery}
              onChange={(e) => {
                setVideoSearchQuery(e.target.value)
                setCurrentVideoPage(1)
              }}
              placeholder="Search video by title..."
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl pl-10 pr-4 py-2 outline-none font-medium text-xs transition-colors"
            />
          </div>

          <div className="space-y-3 pr-1">
            {currentVideos.map((vid) => (
              <div key={vid.id} className="flex items-center justify-between bg-[#FAF6F0] p-3 rounded-xl border border-[#EAD8C8] text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-10 bg-black rounded overflow-hidden border border-[#EAD8C8] flex-shrink-0">
                    <img src={vid.image || `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`} alt={vid.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-[#3D2B20] leading-snug">{vid.title}</h5>
                    <span className="text-[10px] text-[#3D2B20]/50 block mt-0.5">YouTube ID: {vid.videoId}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete this video from list?')) deleteVideo(vid.id)
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  title="Remove Video"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
            {currentVideos.length === 0 && (
              <div className="py-8 text-center text-[#3D2B20]/40 text-xs">No videos found.</div>
            )}
          </div>
          
          {totalVideoPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-[#FAF0E6]">
              <button
                onClick={() => setCurrentVideoPage(prev => Math.max(prev - 1, 1))}
                disabled={currentVideoPage === 1}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentVideoPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
                }`}
              >
                Previous
              </button>
              <span className="text-xs font-bold text-[#3D2B20]/60">
                Page {currentVideoPage} of {totalVideoPages}
              </span>
              <button
                onClick={() => setCurrentVideoPage(prev => Math.min(prev + 1, totalVideoPages))}
                disabled={currentVideoPage === totalVideoPages}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentVideoPage === totalVideoPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT AREA: UPLOAD FORMS */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Photo Upload Form */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-xs text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center space-x-2">
            <FaImage className="text-[#E05A10]" />
            <span>Upload Gallery Photo</span>
          </h4>

          {photoSuccess && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center animate-pulse">
              Photo added successfully!
            </div>
          )}

          <form onSubmit={handlePhotoSubmit} className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#3D2B20]/75 block">Select Image File (चित्र फ़ाइल चुनें - JPG/PNG)</label>
                <span className="text-[10px] text-[#E05A10] font-medium bg-[#E05A10]/10 px-2 py-0.5 rounded-full">Max Size: 5MB</span>
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#EAD8C8] border-dashed rounded-xl cursor-pointer bg-[#FAF6F0] hover:bg-[#FAF0E6] transition-colors relative overflow-hidden group">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Upload Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaCloudUploadAlt className="text-4xl text-[#E05A10] mb-2" />
                      <p className="text-[10px] text-[#3D2B20]/60 font-medium">Click to upload JPG or PNG image</p>
                      <p className="text-[8px] text-[#3D2B20]/45 mt-0.5">Maximum size: 5MB</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    onChange={handleFileChange}
                    className="hidden" 
                    required={!photoPreview}
                  />
                </label>
              </div>
            </div>

            {photoPreview && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoFile(null)
                    setPhotoPreview('')
                  }}
                  className="text-xs text-red-600 font-bold hover:underline animate-fade-in"
                >
                  Clear Selection
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!photoPreview}
              className={`w-full font-serif font-bold tracking-widest text-xs uppercase py-3 rounded-xl shadow transition-all ${
                photoPreview 
                  ? 'bg-[#E05A10] hover:bg-[#c94d0d] text-white cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add To Photo Gallery
            </button>
          </form>
        </div>

        {/* Video Upload Form */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-xs text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center space-x-2">
            <FaLink className="text-[#E05A10]" />
            <span>Add YouTube Livestream Video</span>
          </h4>

          {videoSuccess && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
              Video added successfully!
            </div>
          )}

          <form onSubmit={handleVideoSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Stream/Video Title (शीर्षक)</label>
              <input
                type="text"
                placeholder="e.g. Day 3 - Shrimad Bhagvat Katha Vrindavan"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">YouTube Link or ID (वीडियो लिंक या आईडी)</label>
              <input
                type="text"
                placeholder="e.g. https://www.youtube.com/watch?v=R-709087yAw"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
                required
              />
              <span className="text-[10px] text-[#3D2B20]/45 block mt-1">Paste the full YouTube video link or just the Video ID. (आप यहाँ पूरा यूट्यूब लिंक पेस्ट कर सकते हैं)</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold tracking-widest text-xs uppercase py-3 rounded-xl shadow transition-colors"
            >
              Add To Live Streams List
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

/* =========================================================================
   TAB: GLOBAL CONTACT INFO
   ========================================================================= */
function ContactTab({ contacts, updateContacts }) {
  const [phone, setPhone] = useState(contacts.phone)
  const [email, setEmail] = useState(contacts.email)
  const [address, setAddress] = useState(contacts.address)
  const [whatsapp, setWhatsapp] = useState(contacts.whatsapp)
  const [facebook, setFacebook] = useState(contacts.facebook)
  const [youtube, setYoutube] = useState(contacts.youtube)
  const [instagram, setInstagram] = useState(contacts.instagram)
  const [announcement, setAnnouncement] = useState(contacts.announcement || '|| हरि: ॐ ||')
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(contacts.isAnnouncementActive ?? true)
  const [liveKathaLink, setLiveKathaLink] = useState(contacts.liveKathaLink || '')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setPhone(contacts.phone || '')
    setEmail(contacts.email || '')
    setAddress(contacts.address || '')
    setWhatsapp(contacts.whatsapp || '')
    setFacebook(contacts.facebook || '')
    setYoutube(contacts.youtube || '')
    setInstagram(contacts.instagram || '')
    setAnnouncement(contacts.announcement || '|| हरि: ॐ ||')
    setIsAnnouncementActive(contacts.isAnnouncementActive ?? true)
    setLiveKathaLink(contacts.liveKathaLink || '')
  }, [contacts])

  const handleSave = async (e) => {
    e.preventDefault()
    const result = await updateContacts({ phone, email, address, whatsapp, facebook, youtube, instagram, announcement, isAnnouncementActive, liveKathaLink })
    if (result && result.success) {
      alert('संपर्क विवरण सफलतापूर्वक सहेज लिया गया है! (Contact details saved successfully!)');
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } else {
      alert('त्रुटि (Error): ' + (result?.error || 'Unknown Error'));
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-[#EAD8C8] shadow-sm max-w-4xl space-y-6">
      <div className="border-b border-[#FAF0E6] pb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Global Contact Info Settings</h3>
        <p className="text-xs text-[#3D2B20]/50 mt-1">Modifying these fields updates Navbar topbar, Footer details and Contact form page instantly.</p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
          Contact parameters and social accounts updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Top Header Announcement */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-bold text-[#3D2B20]/75 block">Top Header Announcement Message (घोषणा पट्टी संदेश)</label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${isAnnouncementActive ? 'text-green-600' : 'text-gray-400'}`}>
                {isAnnouncementActive ? 'ON' : 'OFF'}
              </span>
              <button
                type="button"
                onClick={() => setIsAnnouncementActive(!isAnnouncementActive)}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${isAnnouncementActive ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            disabled={!isAnnouncementActive}
            className={`w-full border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none font-medium ${isAnnouncementActive ? 'bg-[#FAF6F0]' : 'bg-gray-100 text-gray-400'}`}
            placeholder="e.g. || हरि: ॐ ||"
            required={isAnnouncementActive}
          />
        </div>

        {/* Core contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaPhoneAlt className="text-[#E05A10]" />
              <span>Contact Hotline Number</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaEnvelope className="text-[#E05A10]" />
              <span>Contact email Account</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
            <FaMapMarkerAlt className="text-[#E05A10]" />
            <span>Vrindavan Ashram / Office Address</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none font-medium"
            required
          />
        </div>

        {/* Social account details */}
        <div className="pt-6 border-t border-[#FAF0E6] space-y-4">
          <h4 className="font-serif font-bold text-xs text-[#3D2B20] mb-4">Linked Social Channels</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">WhatsApp Hotline Number (e.g. +919876543210)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">YouTube Channel Link</label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Facebook Profile Link</label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#3D2B20]/75 block">Instagram Account Link</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Katha YouTube Link */}
        <div className="pt-6 border-t border-[#FAF0E6] space-y-2">
          <h4 className="font-serif font-bold text-xs text-[#3D2B20] flex items-center space-x-2">
            <FaYoutube className="text-red-600" />
            <span>Live Katha YouTube Link (लाइव कथा लिंक)</span>
          </h4>
          <p className="text-[10px] text-[#3D2B20]/50">यह लिंक "Live Katha" पेज पर दिखेगा। जो भी इस पर क्लिक करेगा वह सीधे YouTube चैनल पर redirect हो जाएगा।</p>
          <input
            type="url"
            value={liveKathaLink}
            onChange={(e) => setLiveKathaLink(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl p-3 outline-none font-medium text-xs"
            placeholder="e.g. https://www.youtube.com/@channelname/live"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow transition-colors mt-2"
        >
          Save Contact Parameters
        </button>
      </form>
    </div>
  )
}

/* =========================================================================
   TAB: CALENDAR MANAGER
   ========================================================================= */
function CalendarTab({ calendarDates = [], addCalendarDate, deleteCalendarDate }) {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [status, setStatus] = useState('Booked')
  const [success, setSuccess] = useState(false)
  const [showFromCalendar, setShowFromCalendar] = useState(false)
  const [showToCalendar, setShowToCalendar] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter dates by search query (date or month)
  const searchFilteredDates = calendarDates.filter(item => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    const dateStr = item?.date || ''
    const d = new Date(dateStr)
    const monthShort = isNaN(d) ? '' : d.toLocaleString('en-US', { month: 'short' }).toLowerCase()
    const monthLong = isNaN(d) ? '' : d.toLocaleString('en-US', { month: 'long' }).toLowerCase()
    return dateStr.includes(q) || monthShort.includes(q) || monthLong.includes(q)
  })

  // Apply status filter
  const filteredDates = searchFilteredDates.filter(item => {
    if (statusFilter === 'All') return true
    return item.status === statusFilter
  })

  // Pagination calculation
  // We sort by date descending so the newest/latest dates appear first.
  const sortedDates = [...filteredDates].sort((a, b) => new Date(b.date) - new Date(a.date))
  const totalPages = Math.ceil(sortedDates.length / itemsPerPage) || 1
  const currentDates = sortedDates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fromDate || !toDate) {
      alert("Please select both start and end dates.")
      return
    }

    const start = new Date(fromDate)
    const end = new Date(toDate)
    
    if (end < start) {
      alert("End date cannot be before start date.")
      return
    }

    const currentDate = new Date(start)
    while (currentDate <= end) {
      const formattedMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
      const formattedDay = String(currentDate.getDate()).padStart(2, '0')
      const dateStr = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`
      
      addCalendarDate({ date: dateStr, status })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    setFromDate('')
    setToDate('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left panel: List of custom dates */}
      <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <div className="border-b border-[#FAF0E6] pb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Managed Calendar Dates</h3>
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => {
                setStatusFilter(prev => prev === 'Booked' ? 'All' : 'Booked')
                setCurrentPage(1)
              }}
              className={`flex items-center space-x-1.5 text-xs font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all ${statusFilter === 'Booked' || statusFilter === 'All' ? 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100 shadow-sm ring-1 ring-red-200 ring-offset-1' : 'text-gray-400 bg-gray-50 border-gray-200 hover:bg-red-50 hover:text-red-500'}`}
              title="Filter by Booked"
            >
              <span className={`w-2 h-2 rounded-full block ${statusFilter === 'Booked' || statusFilter === 'All' ? 'animate-pulse bg-red-500' : 'bg-gray-400'}`}></span>
              <span>{searchFilteredDates.filter(d => d.status === 'Booked').length}</span>
            </div>
            <div 
              onClick={() => {
                setStatusFilter(prev => prev === 'Available' ? 'All' : 'Available')
                setCurrentPage(1)
              }}
              className={`flex items-center space-x-1.5 text-xs font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all ${statusFilter === 'Available' || statusFilter === 'All' ? 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100 shadow-sm ring-1 ring-green-200 ring-offset-1' : 'text-gray-400 bg-gray-50 border-gray-200 hover:bg-green-50 hover:text-green-600'}`}
              title="Filter by Available"
            >
              <span className={`w-2 h-2 rounded-full block ${statusFilter === 'Available' || statusFilter === 'All' ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`}></span>
              <span>{searchFilteredDates.filter(d => d.status === 'Available').length}</span>
            </div>
            <span className="text-xs font-bold text-[#3D2B20]/60 border-l border-[#EAD8C8] pl-4">Total: {searchFilteredDates.length}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-[#3D2B20]/40" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset pagination on search
            }}
            placeholder="Search by date (e.g. 2026-07) or month (e.g. July)..."
            className="w-full bg-[#FAF6F0] border border-[#EAD8C8] focus:border-[#E05A10] rounded-xl pl-10 pr-24 py-2.5 outline-none font-medium text-xs transition-colors"
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="bg-[#E05A10] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                {filteredDates.length} Found
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 min-h-[300px] pr-2 custom-scrollbar text-xs">
          {currentDates.map((item) => {
            const dateObj = new Date(item.date)
            const day = String(dateObj.getDate()).padStart(2, '0')
            const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase()
            const yearStr = dateObj.getFullYear()
            const isBooked = item.status === 'Booked'

            return (
              <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border relative group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${isBooked ? 'bg-red-50/30 border-red-100 hover:border-red-300' : 'bg-green-50/30 border-green-100 hover:border-green-300'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg shadow-sm flex-shrink-0 ${isBooked ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                    <span className="text-sm font-black leading-none">{day}</span>
                    <span className="text-[8px] font-bold tracking-widest mt-0.5">{monthStr}</span>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-[#3D2B20] text-sm">{yearStr}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`w-2 h-2 rounded-full block animate-pulse ${isBooked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isBooked ? 'text-red-700' : 'text-green-700'}`}>{item.status}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete this calendar date highlight?')) deleteCalendarDate(item.id)
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#EAD8C8] text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm group-hover:scale-110"
                  title="Remove Entry"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            )
          })}
          {calendarDates.length === 0 && (
            <div className="py-12 text-center text-xs text-[#3D2B20]/40 flex flex-col items-center justify-center space-y-2 bg-[#FAF6F0] rounded-xl border border-dashed border-[#EAD8C8]">
              <FaCalendarAlt className="text-3xl text-[#EAD8C8]" />
              <span>No calendar overrides managed yet.</span>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-[#FAF0E6]">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
              }`}
            >
              Previous
            </button>
            <span className="text-xs font-bold text-[#3D2B20]/60">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#FAF6F0] text-[#E05A10] hover:bg-[#E05A10] hover:text-white border border-[#EAD8C8]'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Right panel: Add entry form */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center space-x-2">
          <FaCalendarPlus className="text-[#E05A10]" />
          <span>Add Date Highlight Range</span>
        </h3>

        {success && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
            Calendar status updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1 relative">
            <label className="font-bold text-[#3D2B20]/75 block">From Date (से)</label>
            <div 
              onClick={() => { setShowFromCalendar(!showFromCalendar); setShowToCalendar(false); }}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none cursor-pointer flex justify-between items-center"
            >
              <span>{fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : "Select Start Date"}</span>
              <FaChevronDown className="text-[#E05A10]" />
            </div>
            
            {showFromCalendar && (
              <div className="absolute z-50 top-full mt-2 w-full shadow-2xl rounded-2xl bg-white animate-fade-in-up">
                <CustomCalendar 
                  calendarDates={calendarDates} 
                  selectedDate={fromDate}
                  onDateSelect={(dateStr) => {
                    setFromDate(dateStr)
                    setShowFromCalendar(false)
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1 relative">
            <label className="font-bold text-[#3D2B20]/75 block">To Date (तक)</label>
            <div 
              onClick={() => { setShowToCalendar(!showToCalendar); setShowFromCalendar(false); }}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none cursor-pointer flex justify-between items-center"
            >
              <span>{toDate ? new Date(toDate).toLocaleDateString('en-GB') : "Select End Date"}</span>
              <FaChevronDown className="text-[#E05A10]" />
            </div>
            
            {showToCalendar && (
              <div className="absolute z-50 top-full mt-2 w-full shadow-2xl rounded-2xl bg-white animate-fade-in-up">
                <CustomCalendar 
                  calendarDates={calendarDates} 
                  selectedDate={toDate}
                  onDateSelect={(dateStr) => {
                    setToDate(dateStr)
                    setShowToCalendar(false)
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1 relative">
            <label className="font-bold text-[#3D2B20]/75 block">Availability Status (उपलब्धता स्थिति)</label>
            <div className="relative">
              <div
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none cursor-pointer flex justify-between items-center"
              >
                <span>{status === 'Booked' ? 'Booked (व्यस्त - लाल घेरा)' : status}</span>
                <FaChevronDown className={`text-[#E05A10] transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
              </div>
              
              {showStatusDropdown && (
                <div className="absolute z-50 top-full mt-2 w-full shadow-lg rounded-xl bg-white border border-[#EAD8C8] overflow-hidden animate-fade-in-up">
                  <div 
                    onClick={() => {
                      setStatus('Booked')
                      setShowStatusDropdown(false)
                    }}
                    className="p-3 cursor-pointer hover:bg-[#FAF6F0] hover:text-[#E05A10] transition-colors text-[#3D2B20]"
                  >
                    Booked (व्यस्त - लाल घेरा)
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold tracking-widest text-xs uppercase py-3.5 rounded-xl shadow transition-colors"
          >
            Apply Calendar Status
          </button>
        </form>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB: ORGANIZERS MANAGEMENT
   ========================================================================= */
function OrganizersTab({ organizers = [], addOrganizer, updateOrganizer, deleteOrganizer }) {
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [cityState, setCityState] = useState('')
  const [about, setAbout] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [success, setSuccess] = useState(false)

  const handleEditClick = (org) => {
    setEditingId(org.id)
    setName(org.name)
    setAddress(org.address || '')
    setCityState(org.cityState)
    setAbout(org.about)
    setPhotoPreview(org.image && org.image.startsWith('http') ? org.image : (org.image || ''))
    setPhotoFile(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setName('')
    setAddress('')
    setCityState('')
    setAbout('')
    setPhotoPreview('')
    setPhotoFile(null)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Please upload only JPG, PNG or WEBP images!')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please select a smaller image.')
        return
      }
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !cityState || !about) return
    const payload = { 
      name, 
      address,
      cityState,
      about,
      image: photoPreview || 'https://images.unsplash.com/photo-1544790181-37288bde4d16?auto=format&fit=crop&w=600&q=80' 
    }
    
    let success = false;
    if (editingId) {
      success = await updateOrganizer(editingId, payload)
    } else {
      await addOrganizer(payload)
      success = true; // Assuming addOrganizer doesn't return false yet, but we'll assume it worked
    }
    
    if (success !== false) {
      cancelEdit()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left panel: List of Organizers */}
      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <div className="border-b border-[#FAF0E6] pb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Katha Organizers Directory</h3>
          <span className="text-xs text-[#3D2B20]/60">Total Registered: {organizers.length} organizers</span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0] text-[#3D2B20]/75 font-semibold border-b border-[#EAD8C8]">
                <th className="px-4 py-3 w-16">Photo</th>
                <th className="px-4 py-3">Full Name (पूरा नाम)</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">City & State</th>
                <th className="px-4 py-3 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF0E6]">
              {organizers.map((org) => (
                <tr key={org.id} className="hover:bg-[#FAF6F0]/20 transition-colors">
                  <td className="px-4 py-3">
                    <img 
                      src={org.image || 'https://images.unsplash.com/photo-1544790181-37288bde4d16?auto=format&fit=crop&w=150&q=80'} 
                      alt={org.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#EAD8C8] flex-shrink-0"
                    />
                  </td>
                  <td className="px-4 py-3 font-bold text-[#3D2B20] text-sm">{org.name}</td>
                  <td className="px-4 py-3 text-[#3D2B20]/80">{org.address}</td>
                  <td className="px-4 py-3 text-[#3D2B20]/80">{org.cityState}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(org)}
                        className="text-gray-400 hover:text-[#E05A10] transition-colors p-1"
                        title="Edit Organizer"
                      >
                        <FaUserEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete organizer "${org.name}" permanently?`)) deleteOrganizer(org.id)
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Delete Organizer"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {organizers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-[#3D2B20]/40">No organizer profiles cataloged yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right panel: Add Organizer Form */}
      <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#3D2B20] border-b border-[#FAF0E6] pb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaUsers className="text-[#E05A10]" />
            <span>{editingId ? 'Edit Organizer' : 'Register Organizer'}</span>
          </div>
          {editingId && (
            <button onClick={cancelEdit} className="text-[10px] bg-[#FAF6F0] hover:bg-[#EAD8C8] px-2 py-1 rounded text-[#3D2B20] font-bold">
              Cancel Edit
            </button>
          )}
        </h3>

        {success && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
            Organizer registered successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaUser className="text-[#E05A10]/70" />
              <span>यजमान का नाम *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Your Name (आपका नाम)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              required
            />
          </div>


          {/* File Upload Selector */}
          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaImage className="text-[#E05A10]/70" />
              <span>यजमान की फोटो</span>
            </label>
            <div className="flex items-center space-x-4">
              {!photoPreview ? (
                <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-[#EAD8C8] hover:border-[#E05A10] bg-[#FAF6F0] rounded-xl p-4 cursor-pointer transition-colors">
                  <FaImage className="text-xl text-[#3D2B20]/40 mb-1" />
                  <span className="text-[10px] text-[#3D2B20]/60 text-center font-semibold">Click to select JPG / PNG / WEBP</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center space-x-3 w-full bg-[#FAF6F0] p-2 rounded-xl border border-[#EAD8C8]">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-[#EAD8C8] flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-[10px] font-bold text-[#3D2B20] truncate">{photoFile ? photoFile.name : 'Uploaded File'}</p>
                    <p className="text-[9px] text-[#3D2B20]/50">Size: {photoFile ? `${(photoFile.size / 1024).toFixed(1)} KB` : 'N/A'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors flex-shrink-0"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[#E05A10]/70" />
              <span>निवास स्थान (गाँव/शहर, जिला, राज्य) *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Varanasi, UP (वाराणसी, उत्तर प्रदेश)"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[#E05A10]/70" />
              <span>पूरा पता (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Full Address (पूरा पता यहाँ लिखें)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
            />
          </div>


          <div className="space-y-1">
            <label className="font-bold text-[#3D2B20]/75 block flex items-center space-x-2">
              <FaQuoteLeft className="text-[#E05A10]/70" />
              <span>संक्षिप्त परिचय *</span>
            </label>
            <textarea
              rows="3"
              placeholder="Write a short intro... (संस्था या परिवार के बारे में संक्षेप में लिखें...)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAD8C8] rounded-xl p-3 outline-none"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full bg-[#E05A10] hover:bg-[#c94d0d] text-white font-serif font-bold tracking-widest text-xs uppercase py-3.5 rounded-xl shadow transition-colors"
          >
            {editingId ? 'Update Organizer Profile' : 'Add Organizer Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
