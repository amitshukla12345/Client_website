import React, { createContext, useState, useEffect } from 'react'

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



export const AppProvider = ({ children }) => {
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('katha_admin_logged_in') === 'true'
  })

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem('katha_admin_logged_in')
    localStorage.removeItem('katha_admin_token')
  }

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('katha_admin_token')}`
  })

  const handleResponse = async (res) => {
    if (res.status === 401 || res.status === 403) {
      logoutAdmin();
      throw new Error('Unauthorized');
    }
    return res;
  }

  // Data States
  const [contacts, setContacts] = useState({})
  const [about, setAbout] = useState({})
  
  // Static content that doesn't have a backend table yet
  const [timeline, setTimeline] = useState(DEFAULT_TIMELINE)
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS)

  const [banners, setBanners] = useState([])
  const [events, setEvents] = useState([])
  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [galleryVideos, setGalleryVideos] = useState([])
  const [bookings, setBookings] = useState([])
  const [calendarDates, setCalendarDates] = useState([])
  const [organizers, setOrganizers] = useState([])
  const [yajman, setYajman] = useState(null)
  
  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({ username: '', fullname: '', email: '', role: '' })

  // Synchronize States to Local Storage on Change (Fallback)
  useEffect(() => {
    localStorage.setItem('katha_contacts', JSON.stringify(contacts))
  }, [contacts])

  // Fetch Data from Spring Boot Backend
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/data`);
        if (response.ok) {
          const data = await response.json();
          if (data.contacts && data.contacts.length > 0) {
            let fetchedContacts = { ...data.contacts[0] };
            // Override with user requested social links
            fetchedContacts.facebook = 'https://www.facebook.com/share/1HLEzxvCT3/';
            fetchedContacts.instagram = 'https://swamiraghavacharyaji.in/';
            fetchedContacts.youtube = 'https://youtube.com/@jagadguruhariprapannaacharyaji';
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
        localStorage.setItem('katha_admin_token', data.token);
        setIsAdminLoggedIn(true);
        localStorage.setItem('katha_admin_logged_in', 'true');
        return true;
      }
    } catch (error) {
      console.error('Login API failed:', error);
    }
    return false;
  }


  // Content Mutators
  const updateContacts = async (newContacts) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/contact`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...contacts, ...newContacts })
      })
      await handleResponse(res)
      if (res.ok) setContacts(await res.json())
    } catch(e) { console.error(e) }
  }

  const updateAbout = async (newAbout) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/about`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...about, ...newAbout })
      })
      await handleResponse(res)
      if (res.ok) setAbout(await res.json())
    } catch(e) { console.error(e) }
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
    try {
      const response = await fetch(`${API_BASE_URL}/public/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (response.ok) {
        const savedBooking = await response.json();
        setBookings(prev => [savedBooking, ...prev]);
      }
    } catch (e) {
      console.warn("Failed to save booking to backend");
    }
  }

  const updateBookingStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('katha_admin_token');
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
    try {
      const token = localStorage.getItem('katha_admin_token');
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
        yajman, setYajman
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
