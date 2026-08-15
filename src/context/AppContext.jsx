import React, { createContext, useState, useEffect } from 'react'
import { getSessionSubmissions, removeSessionSubmission, saveSessionSubmission, updateSessionSubmission } from '../utils/sessionSubmissions'

export const AppContext = createContext()

const API_BASE_URL = 'http://localhost:8080/api';

const DEFAULT_TIMELINE = [
  { year: '2008', title: 'The Spiritual Awakening', desc: 'Left formal studies to spend years in deep meditation and scriptural learning at Vrindavan ashrams.' },
  { year: '2012', title: 'First Shrimad Bhagvat Katha', desc: 'Narrated the first public saptah katha, which was appreciated for its simple delivery and beautiful bhajans.' },
  { year: '2016', title: 'Establishment of Mission', desc: 'Founded the Spiritual Mission to organize structured kathas, distribute literature, and run gaushalas.' },
  { year: '2022', title: 'Global Broadcasting', desc: 'Started live satellite and digital streaming of kathas, reaching millions of devotees worldwide.' }
]

const DEFAULT_ACHIEVEMENTS = [
  { title: 'Vedic Shastra Acharya', desc: 'Completed Acharya degree in Vedic literature and philosophies from Sampurnanand Sanskrit Vishwavidyalaya, Varanasi.', icon: 'FaGraduationCap' },
  { title: 'Vrindavan Gaurav Samman', desc: 'Awarded for outstanding contributions to scriptural propagation and spiritual education in 2021.', icon: 'FaAward' },
  { title: 'Devotion and Social Welfare', desc: 'Organized free medical camps, gaushala support programs, and educational drives for rural children.', icon: 'FaHeart' }
]



const DEFAULT_LIVE_SETTINGS = {
  bgImage: 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&w=1920&q=80',
  guruImage: '',
  bannerTitle: 'LIVE KATHA DARSHAN',
  bannerSubtitle: 'पूज्य गुरु जी के श्रीमुखारविंद से अमृतमयी कथा का श्रवण करें।',
  topText: '|| जय श्री राम ||',
  primaryBtnText: 'LIVE देखें',
  primaryBtnUrl: '#',
  secondaryBtnText: 'YOUTUBE CHANNEL',
  secondaryBtnUrl: '#',
  textAlign: 'center',
  guruPos: 'right',
  overlayOpacity: 30,
  bgBrightness: 100,
  heroEnabled: true,
  isLive: false,
  youtubeUrl: '',
  eventDay: '',
  eventDate: '',
  eventTime: '',
  eventLocation: '',
  marqueeText: 'LIVE NOW • श्रीमद भागवत कथा का सीधा प्रसारण जारी है • YouTube Channel पर जुड़ें • जय श्री राम',
  marqueeEnabled: true
}

const DEMO_CONTENT_KEY = 'katha_demo_content'
const DEFAULT_DEMO_CONTENT = {
  contacts: { phone: '+91 77381 69410', whatsapp: '+91 77381 69410', email: 'amitshukla22509@gmail.com', announcement: 'Demo: bookings and enquiries are stored for this browser session.', isAnnouncementActive: true, youtube: 'https://youtube.com', facebook: 'https://facebook.com', instagram: 'https://instagram.com' },
  about: { name: 'Pujya Swami Hariprapannacharya Ji Maharaj', bio: 'A humble servant of Sanatan Dharma, sharing the teachings of Shrimad Bhagvat with devotees across India.', image: '/images/spiritual_bg.png', fatherName: 'Shri Ramcharan Das Ji', guruDiksha: 'Vrindavan Dham', firstKatha: '2012', kathaYatra: '500+ spiritual programmes', stats: [{ label: 'Years of Service', value: '18+' }, { label: 'Katha Programmes', value: '500+' }, { label: 'Devotees', value: '1 Lakh+' }] },
  banners: [
    { id: 'demo-banner-1', status: 'Published', title: 'Shrimad Bhagvat Katha', subtitle: 'Seven days of divine wisdom, bhajan and satsang', date: '15–21 September 2026', time: '4:00 PM onwards', venue: 'Prayagraj, Uttar Pradesh', image: '/images/spiritual_bg.png', btn1Text: 'Book Katha', btn1Url: '/contact', btn2Text: 'Watch Live', btn2Url: '/live', theme: 'WARM GOLD' },
    { id: 'demo-banner-2', status: 'Published', title: 'Divine Satsang', subtitle: 'Join the weekly spiritual discourse', date: 'Every Sunday', time: '10:00 AM', venue: 'Ashram Hall', image: '/images/services-bg.png', btn1Text: 'Contact Us', btn1Url: '/contact', btn2Text: 'Live Darshan', btn2Url: '/live', theme: 'SAFFRON' }
  ],
  events: [
    { id: 'demo-event-1', title: 'Shrimad Bhagvat Katha Mahotsav', date: '15', month: 'September 2026', time: '04:00 PM – 07:00 PM', location: 'Prayagraj, Uttar Pradesh', image: '/images/spiritual_bg.png', description: 'A seven-day celebration of devotion, wisdom and bhajans.' },
    { id: 'demo-event-2', title: 'Sundarkand Path', date: '28', month: 'September 2026', time: '06:00 PM – 08:00 PM', location: 'Ashram Satsang Hall', image: '/images/services-bg.png', description: 'Collective recitation and divine satsang.' }
  ],
  galleryPhotos: [
    { id: 'demo-photo-1', url: '/images/spiritual_bg.png' }, { id: 'demo-photo-2', url: '/images/services-bg.png' }, { id: 'demo-photo-3', url: '/images/katha_map_infographic.jpg' }
  ],
  galleryVideos: [
    { id: 'demo-video-1', title: 'Bhagvat Katha – Day 1', videoId: 'dQw4w9WgXcQ', image: '/images/spiritual_bg.png' }, { id: 'demo-video-2', title: 'Morning Satsang', videoId: 'dQw4w9WgXcQ', image: '/images/services-bg.png' }
  ],
  calendarDates: [
    { id: 'demo-date-1', date: '2026-09-15', status: 'Available' }, { id: 'demo-date-2', date: '2026-09-21', status: 'Booked' }, { id: 'demo-date-3', date: '2026-10-05', status: 'Available' }
  ],
  organizers: [
    { id: 'demo-org-1', name: 'Ramesh Sharma', phone: '9876543210', email: 'ramesh@example.com', city: 'Prayagraj', role: 'Event Coordinator' }, { id: 'demo-org-2', name: 'Sita Devi', phone: '9123456780', email: 'sita@example.com', city: 'Varanasi', role: 'Volunteer Lead' }
  ]
}

const getDemoContent = () => {
  try {
    const saved = sessionStorage.getItem(DEMO_CONTENT_KEY)
    if (!saved) return DEFAULT_DEMO_CONTENT

    const savedContent = JSON.parse(saved)
    const oldContactValues = ['+91 89602 92928', '+91 8960292928', 'demo@shrimadkatha.in', 'shrimadbhagwatkatha@gmail.com', 'contact@shrimadkatha.com']
    const hasOldContact = oldContactValues.includes(savedContent.contacts?.phone)
      || oldContactValues.includes(savedContent.contacts?.whatsapp)
      || oldContactValues.includes(savedContent.contacts?.email)

    return {
      ...DEFAULT_DEMO_CONTENT,
      ...savedContent,
      contacts: hasOldContact ? DEFAULT_DEMO_CONTENT.contacts : { ...DEFAULT_DEMO_CONTENT.contacts, ...savedContent.contacts }
    }
  } catch {
    return DEFAULT_DEMO_CONTENT
  }
}

export const AppProvider = ({ children }) => {
  const [demoContent] = useState(getDemoContent)
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('katha_admin_logged_in') === 'true'
  })

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false)
    sessionStorage.removeItem('katha_admin_logged_in')
    sessionStorage.removeItem('katha_admin_token')
  }

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('katha_admin_token')}`
  })

  const handleResponse = async (res) => {
    if (res.status === 401 || res.status === 403) {
      logoutAdmin();
      throw new Error('Unauthorized');
    }
    return res;
  }

  // Data States
  const [contacts, setContacts] = useState(demoContent.contacts)
  const [about, setAbout] = useState(demoContent.about)
  
  // Static content that doesn't have a backend table yet
  const [timeline, setTimeline] = useState(DEFAULT_TIMELINE)
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS)

  const [banners, setBanners] = useState(demoContent.banners)
  const [events, setEvents] = useState(demoContent.events)
  const [galleryPhotos, setGalleryPhotos] = useState(demoContent.galleryPhotos)
  const [galleryVideos, setGalleryVideos] = useState(demoContent.galleryVideos)
  const [bookings, setBookings] = useState(() =>
    getSessionSubmissions().filter(submission => submission.formType === 'Katha Booking')
  )
  const [calendarDates, setCalendarDates] = useState(demoContent.calendarDates)
  const [organizers, setOrganizers] = useState(demoContent.organizers)
  const [yajman, setYajman] = useState(null)
  const [successor, setSuccessor] = useState(null)
  
  // Hero Banners State
  const [pageHeroBanners, setPageHeroBanners] = useState([])

  const [liveSettings, setLiveSettings] = useState(() => {
    const saved = localStorage.getItem('katha_live_settings')
    return saved ? JSON.parse(saved) : DEFAULT_LIVE_SETTINGS
  })

  const updateLiveSettings = async (newSettings) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/live-settings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSettings)
      })
      await handleResponse(res)
      if (res.ok) {
        const savedSettings = await res.json()
        setLiveSettings(savedSettings)
        localStorage.setItem('katha_live_settings', JSON.stringify(savedSettings))
      } else {
        setLiveSettings(newSettings)
      }
    } catch(e) { 
      console.error("Backend fetch failed, updating live settings locally", e) 
      setLiveSettings(newSettings)
      localStorage.setItem('katha_live_settings', JSON.stringify(newSettings))
    }
  }

  const deleteLiveSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/live-settings/clear`, {
        method: 'POST',
        headers: getAuthHeaders()
      })
      await handleResponse(res)
      if (res.ok) {
        setLiveSettings(DEFAULT_LIVE_SETTINGS)
        localStorage.setItem('katha_live_settings', JSON.stringify(DEFAULT_LIVE_SETTINGS))
        return true;
      }
    } catch(e) {
      console.error("Failed to delete live settings", e)
    }
    return false;
  }
  
  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({ username: '', fullname: '', email: '', role: '' })

  // Synchronize States to Local Storage on Change (Fallback)
  useEffect(() => {
    localStorage.setItem('katha_contacts', JSON.stringify(contacts))
  }, [contacts])

  useEffect(() => {
    sessionStorage.setItem(DEMO_CONTENT_KEY, JSON.stringify({ contacts, about, banners, events, galleryPhotos, galleryVideos, calendarDates, organizers }))
  }, [contacts, about, banners, events, galleryPhotos, galleryVideos, calendarDates, organizers])

  // Fetch Data from Spring Boot Backend
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/data`);
        if (response.ok) {
          const data = await response.json();
          if (data.contacts && data.contacts.length > 0) {
            let fetchedContacts = { ...data.contacts[0] };
            
            // Decode hidden announcement
            if (fetchedContacts.announcement && fetchedContacts.announcement.startsWith('[HIDDEN]')) {
              fetchedContacts.isAnnouncementActive = false;
              fetchedContacts.announcement = fetchedContacts.announcement.substring(8);
            } else {
              fetchedContacts.isAnnouncementActive = true;
            }
            
            setContacts(fetchedContacts);
          }
          if (data.about && data.about.length > 0) setAbout(data.about[0]);
          if (data.events && data.events.length > 0) setEvents(data.events);
          if (data.banners && data.banners.length > 0) setBanners(data.banners);
          if (data.galleryPhotos && data.galleryPhotos.length > 0) setGalleryPhotos([...data.galleryPhotos].sort((a, b) => b.id - a.id));
          if (data.galleryVideos && data.galleryVideos.length > 0) setGalleryVideos([...data.galleryVideos].sort((a, b) => b.id - a.id));
          if (data.bookings && data.bookings.length > 0) setBookings(data.bookings);
          if (data.organizers && data.organizers.length > 0) setOrganizers(data.organizers);
          if (data.calendarDates && data.calendarDates.length > 0) setCalendarDates(data.calendarDates);
          if (data.yajman && data.yajman.length > 0) {
            setYajman(data.yajman[data.yajman.length - 1]);
          }
          if (data.liveSettings && data.liveSettings.length > 0) {
            setLiveSettings(data.liveSettings[data.liveSettings.length - 1]);
            localStorage.setItem('katha_live_settings', JSON.stringify(data.liveSettings[data.liveSettings.length - 1]));
          }
          if (data.successor && data.successor.length > 0) {
            setSuccessor(data.successor[data.successor.length - 1]);
          }
          if (data.pageHeroBanners && data.pageHeroBanners.length > 0) {
            setPageHeroBanners(data.pageHeroBanners);
          }
        }
      } catch (error) {
        console.warn('Backend not reachable, falling back to local storage defaults.');
      }
      
      if (isAdminLoggedIn) {
        try {
          await fetchAdminProfile();
        } catch (error) {
          console.error("Error fetching admin profile:", error);
        }
      }
    };
    
    fetchBackendData();
  }, [isAdminLoggedIn]);

  // Admin Profile Functions
  const fetchAdminProfile = async () => {
    const res = await fetch(`${API_BASE_URL}/admin/profile`, { headers: getAuthHeaders() });
    await handleResponse(res);
    if (res.ok) setAdminProfile(await res.json());
  };

  const updateAdminProfile = async (fullname, email) => {
    const res = await fetch(`${API_BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ fullname, email })
    });
    await handleResponse(res);
    if (res.ok) await fetchAdminProfile();
    return res;
  };

  // Update Page Hero Banner API
  const updatePageHeroBanner = async (bannerData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/hero-banners`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bannerData)
      });
      await handleResponse(res);
      if (res.ok) {
        const savedBanner = await res.json();
        setPageHeroBanners(prev => {
          const index = prev.findIndex(b => b.pageName === savedBanner.pageName);
          if (index >= 0) {
            const newArray = [...prev];
            newArray[index] = savedBanner;
            return newArray;
          }
          return [...prev, savedBanner];
        });
        return { success: true, data: savedBanner };
      }
      return { success: false, error: 'Save failed' };
    } catch (e) {
      console.error('updatePageHeroBanner error', e);
      return { success: false, error: e.message };
    }
  }

  const changeAdminPassword = async (oldPassword, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/admin/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword })
    });
    await handleResponse(res);
    return res;
  };

  // Fetch admin-only data (like bookings) when logged in
  useEffect(() => {
    if (isAdminLoggedIn) {
      const fetchAdminData = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/admin/bookings`, { headers: getAuthHeaders() });
          await handleResponse(res);
          if (res.ok) setBookings(await res.json());
        } catch (e) { console.error('Failed to fetch admin data', e); }
      };
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);


  // Authentication Actions
  const loginAdmin = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('katha_admin_token', data.token);
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('katha_admin_logged_in', 'true');
        return true;
      }
    } catch (error) {
      console.error('Login API failed:', error);
    }

    // Lets the existing displayed demo credentials open the dashboard when the API is not running.
    if (username === 'admin' && password === 'admin') {
      setIsAdminLoggedIn(true)
      sessionStorage.setItem('katha_admin_logged_in', 'true')
      return true
    }
    return false;
  }


  // Content Mutators
  const updateContacts = async (newContacts) => {
    try {
      const payload = { ...contacts, ...newContacts }
      delete payload.id // Remove ID to force backend to create a new row
      
      // Encode hidden announcement before saving to DB
      if (payload.isAnnouncementActive === false) {
        payload.announcement = '[HIDDEN]' + (payload.announcement || '');
      }
      
      const res = await fetch(`${API_BASE_URL}/admin/contact`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      })
      await handleResponse(res)
      if (res.ok) {
        const savedData = await res.json();
        // Decode before setting state
        if (savedData.announcement && savedData.announcement.startsWith('[HIDDEN]')) {
          savedData.isAnnouncementActive = false;
          savedData.announcement = savedData.announcement.substring(8);
        } else {
          savedData.isAnnouncementActive = true;
        }
        setContacts(savedData);
        return { success: true }
      } else {
        const errorText = await res.text()
        return { success: false, error: `HTTP ${res.status}: ${errorText}` }
      }
    } catch(e) { 
      console.error(e)
      return { success: false, error: e.toString() }
    }
  }

  const updateAbout = async (newAbout) => {
    try {
      const payload = { ...about, ...newAbout }
      delete payload.id // Remove ID to force backend to create a new row

      const res = await fetch(`${API_BASE_URL}/admin/about`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      })
      await handleResponse(res)
      if (res.ok) setAbout(await res.json())
    } catch(e) { console.error(e) }
  }

  const updateSuccessor = async (newSuccessor) => {
    try {
      const payload = { ...successor, ...newSuccessor }
      delete payload.id

      const res = await fetch(`${API_BASE_URL}/admin/successor`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json();
        setSuccessor(saved);
        return { success: true };
      } else {
        const errorText = await res.text();
        return { success: false, error: `HTTP ${res.status}: ${errorText}` };
      }
    } catch(e) { 
      console.error(e);
      return { success: false, error: e.toString() };
    }
  }

  const addEvent = async (event) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/events`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(event)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json();
        setEvents(prev => [...prev, saved]);
      }
    } catch(e) { console.error(e) }
  }

  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/events/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      await handleResponse(res)
      if (res.ok) setEvents(prev => prev.filter(evt => evt.id !== id))
    } catch(e) { console.error(e) }
  }

  const addPhoto = async (url) => {
    if (url) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/photos`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ url })
        })
        await handleResponse(res)
        if (res.ok) {
          const saved = await res.json();
          setGalleryPhotos(prev => [saved, ...prev]);
        }
      } catch(e) { console.error(e) }
    }
  }

  const deletePhoto = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/photos/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      await handleResponse(res)
      if (res.ok) setGalleryPhotos(prev => prev.filter(img => img.id !== id))
    } catch(e) { console.error(e) }
  }

  const addVideo = async (video) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/videos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(video)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json();
        setGalleryVideos(prev => [saved, ...prev]);
      }
    } catch(e) { console.error(e) }
  }

  const deleteVideo = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/videos/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      await handleResponse(res)
      if (res.ok) setGalleryVideos(prev => prev.filter(vid => vid.id !== id))
    } catch(e) { console.error(e) }
  }

  const addBooking = async (booking) => {
    const demoBooking = saveSessionSubmission('Katha Booking', booking)
    setBookings(prev => [demoBooking, ...prev.filter(item => item.id !== demoBooking.id)])

    try {
      const response = await fetch(`${API_BASE_URL}/public/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (response.ok) {
        const savedBooking = await response.json();
        setBookings(prev => [savedBooking, ...prev.filter(item => item.id !== demoBooking.id)]);
      }
    } catch (e) {
      console.warn("Failed to save booking to backend");
    }
  }

  const updateBookingStatus = async (id, status) => {
    if (String(id).startsWith('demo-')) {
      updateSessionSubmission(id, { status })
      setBookings(prev => prev.map(booking => booking.id === id ? { ...booking, status } : booking))
      return
    }
    try {
      const token = sessionStorage.getItem('katha_admin_token');
      const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      await handleResponse(res)
      if (res.ok) {
        setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
        
        const booking = bookings.find(b => b.id === id);
        if (booking && booking.phone) {
          let message = '';
          const kathaName = booking.kathaType || 'Katha';
          
          let deityEng = 'Lord Shri Krishna';
          let deityHin = 'श्रीकृष्ण जी';
          if (kathaName.includes('Ram Katha')) {
            deityEng = 'Lord Shri Ram';
            deityHin = 'श्रीराम जी';
          } else if (kathaName.includes('Shiv')) {
            deityEng = 'Lord Shiva';
            deityHin = 'महादेव जी';
          } else if (kathaName.includes('Devi')) {
            deityEng = 'Maa Bhagwati';
            deityHin = 'माँ भगवती';
          } else if (kathaName.includes('Sundarkand')) {
            deityEng = 'Lord Hanuman';
            deityHin = 'हनुमान जी';
          } else if (kathaName.includes('Bhajan')) {
            deityEng = 'the Almighty';
            deityHin = 'ईश्वर';
          }

          if (status === 'Confirmed') {
            message = `🙏 Radhe Radhe, ${booking.name} Ji,\n\nWe are pleased to inform you that your ${kathaName} booking request has been confirmed successfully.\n\nOur team will contact you shortly to discuss the event details and further arrangements.\n\nThank you for choosing us. We pray that ${deityEng} blesses you and your family with peace, happiness, and prosperity.\n\n🌸 Shrimad Bhagvat Katha Management Team\n\n🙏 राधे राधे, ${booking.name} जी,\n\nहमें यह बताते हुए हर्ष हो रहा है कि आपकी ${kathaName} की बुकिंग सफलतापूर्वक स्वीकृत (Confirmed) कर दी गई है।\n\nहमारी टीम शीघ्र ही आपसे संपर्क करेगी तथा कथा से संबंधित सभी आवश्यक जानकारी साझा करेगी।\n\n${deityHin} की कृपा आप और आपके परिवार पर सदैव बनी रहे।\n\n🌸 श्रीमद्भागवत कथा प्रबंधन समिति`;
          } else if (status === 'Cancelled' || status === 'Rejected') {
            message = `🙏 Radhe Radhe, ${booking.name} Ji,\n\nThank you for your interest in booking ${kathaName}.\n\nWe regret to inform you that your booking request could not be confirmed at this time due to scheduling or availability constraints.\n\nWe sincerely apologize for the inconvenience. Please feel free to contact us for an alternative date or any further assistance.\n\nWe look forward to serving you in the future.\n\nWe pray that ${deityEng} blesses you and your family with peace, happiness, and prosperity.\n\n🌸 Shrimad Bhagvat Katha Management Team\n\n🙏 राधे राधे, ${booking.name} जी,\n\n${kathaName} के लिए आपकी बुकिंग अनुरोध के लिए धन्यवाद।\n\nहमें खेद है कि वर्तमान समय में उपलब्धता या निर्धारित कार्यक्रम के कारण आपकी बुकिंग स्वीकृत नहीं की जा सकी।\n\nकृपया किसी अन्य तिथि के लिए हमसे संपर्क करें। हमें भविष्य में आपकी सेवा करने का अवसर मिलने की आशा है।\n\n${deityHin} की कृपा आप और आपके परिवार पर सदैव बनी रहे।\n\n🌸 श्रीमद्भागवत कथा प्रबंधन समिति`;
          }

          if (message) {
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/91${booking.phone}?text=${encodedMessage}`, '_blank');
          }
        }
      }
    } catch (e) {
      console.warn("Failed to update status on backend");
    }
  }

  const deleteBooking = async (id) => {
    if (String(id).startsWith('demo-')) {
      removeSessionSubmission(id)
      setBookings(prev => prev.filter(booking => booking.id !== id))
      return
    }
    try {
      const token = sessionStorage.getItem('katha_admin_token');
      const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await handleResponse(res)
      if (res.ok) setBookings(prev => prev.filter(b => b.id !== id));
    } catch (e) {
      console.warn("Failed to delete from backend");
    }
  }

  const updateBanners = async (newBanners) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/banners/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newBanners)
      })
      await handleResponse(res)
      if (res.ok) {
        setBanners(await res.json())
      } else {
        setBanners(newBanners)
      }
    } catch(e) { 
      console.error("Backend fetch failed, updating banners locally", e) 
      setBanners(newBanners)
    }
  }

  const addOrganizer = async (org) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/organizers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(org)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json();
        setOrganizers(prev => [...prev, saved]);
      }
    } catch(e) { console.error(e) }
  }

  const updateOrganizer = async (id, updatedOrg) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/organizers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedOrg)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json();
        setOrganizers(prev => prev.map(org => org.id === id ? saved : org));
        return true;
      } else {
        alert("Failed to update! Please make sure your backend is restarted.");
        return false;
      }
    } catch(e) { 
      console.error(e);
      alert("Failed to connect to backend! Please restart the backend server.");
      return false;
    }
  }

  const deleteOrganizer = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/organizers/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      await handleResponse(res)
      if (res.ok) setOrganizers(prev => prev.filter(org => org.id !== id))
    } catch(e) { console.error(e) }
  }

  const addCalendarDate = async (dateEntry) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/calendar`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(dateEntry)
      })
      await handleResponse(res)
      if (res.ok) {
        const saved = await res.json()
        setCalendarDates(prev => {
          const filtered = prev.filter(item => item.date !== saved.date)
          return [...filtered, saved]
        })
      }
    } catch(e) { console.error(e) }
  }

  const deleteCalendarDate = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/calendar/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      await handleResponse(res)
      if (res.ok) setCalendarDates(prev => prev.filter(item => item.id !== id))
    } catch(e) { console.error(e) }
  }

  return (
    <AppContext.Provider
      value={{
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        contacts,
        updateContacts,
        about,
        updateAbout,
        timeline,
        setTimeline,
        achievements,
        setAchievements,
        banners,
        updateBanners,
        events,
        addEvent,
        deleteEvent,
        galleryPhotos,
        addPhoto,
        deletePhoto,
        galleryVideos,
        addVideo,
        deleteVideo,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        calendarDates,
        addCalendarDate,
        deleteCalendarDate,
        organizers,
        addOrganizer,
        updateOrganizer,
        deleteOrganizer,
        adminProfile,
        updateAdminProfile,
        changeAdminPassword,
        getAuthHeaders,
        handleResponse,
        yajman, setYajman,
        successor, updateSuccessor,
        liveSettings,
        updateLiveSettings,
        deleteLiveSettings,
        pageHeroBanners,
        updatePageHeroBanner
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
