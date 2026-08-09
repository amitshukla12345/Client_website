import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaCheck, FaTimes, FaTrash, FaEye, FaChevronDown, 
  FaFilter, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserCircle,
  FaBookOpen, FaInfoCircle, FaClock, FaCommentDots, FaDownload, FaWhatsapp,
  FaEllipsisV
} from 'react-icons/fa';

export default function BookingsManager({ 
  bookings, 
  updateBookingStatus, 
  deleteBooking, 
  selectedBookings, 
  setSelectedBookings, 
  setPrefillEventData, 
  setActiveTab 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [kathaFilter, setKathaFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null); // For Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [waModalConfig, setWaModalConfig] = useState({ isOpen: false, bookingId: null, message: '', isDrawer: false });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // KPIs
  const { total, pending, confirmed, cancelled, thisMonth } = useMemo(() => {
    const now = new Date();
    let p = 0, c = 0, cancel = 0, tm = 0;
    
    bookings.forEach(b => {
      if (b.status === 'Pending') p++;
      else if (b.status === 'Confirmed') c++;
      else if (b.status === 'Cancelled') cancel++;
      
      if (b.createdAt) {
        const d = new Date(b.createdAt);
        if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) tm++;
      }
    });
    return { total: bookings.length, pending: p, confirmed: c, cancelled: cancel, thisMonth: tm };
  }, [bookings]);

  // Dynamic Katha types for filter
  const kathaTypes = useMemo(() => {
    const types = new Set(bookings.map(b => b.kathaType).filter(Boolean));
    return ['All', ...Array.from(types)];
  }, [bookings]);

  // Katha Stats Summary
  const kathaStats = useMemo(() => {
    const counts = {};
    bookings.forEach(b => {
      const type = b.kathaType || 'Other';
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [bookings]);

  // Filtering
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    // Status Filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    // Katha Filter
    if (kathaFilter !== 'All') {
      filtered = filtered.filter(b => b.kathaType === kathaFilter);
    }

    // Date Filter (Simple implementation)
    if (dateFilter !== 'All') {
      const now = new Date();
      filtered = filtered.filter(b => {
        if (!b.createdAt) return false;
        const d = new Date(b.createdAt);
        if (dateFilter === 'Today') {
          return d.toDateString() === now.toDateString();
        }
        if (dateFilter === 'This Week') {
          const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
          return d >= firstDay;
        }
        if (dateFilter === 'This Month') {
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }
        return true;
      });
    }

    // Search
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(b => 
        (b.name || '').toLowerCase().includes(term) ||
        (b.email || '').toLowerCase().includes(term) ||
        (b.phone || '').toLowerCase().includes(term) ||
        (b.kathaType || '').toLowerCase().includes(term) ||
        (b.city || '').toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [bookings, debouncedSearch, statusFilter, kathaFilter, dateFilter]);

  // Sorting
  const sortedBookings = useMemo(() => {
    let sortableItems = [...filteredBookings];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'createdAt' || sortConfig.key === 'preferredDate') {
          aVal = new Date(aVal || 0).getTime();
          bVal = new Date(bVal || 0).getTime();
        } else {
          aVal = (aVal || '').toString().toLowerCase();
          bVal = (bVal || '').toString().toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBookings, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  // Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedBookings(currentItems.map(b => b.id));
    else setSelectedBookings([]);
  };

  const handleSelectOne = (id) => {
    if (selectedBookings.includes(id)) setSelectedBookings(prev => prev.filter(bId => bId !== id));
    else setSelectedBookings(prev => [...prev, id]);
  };

  // Actions
  const handleConfirm = (id, isDrawer = false) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;
    
    // Format date nicely if available
    let dateStr = '';
    if (booking.preferredDate) {
      dateStr = new Date(booking.preferredDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    const defaultMsg = `जय श्री कृष्णा 🕉️\n\nनमस्ते *${booking.name}* जी,\nआपकी *${booking.kathaType}* की बुकिंग ${dateStr ? `(${dateStr}) ` : ''}सफलतापूर्वक कंफर्म हो गई है! 🙏\n\nअधिक जानकारी के लिए हम जल्द ही आपसे संपर्क करेंगे।\n\n- श्रीमद् भागवत कथा समिति`;
    
    setWaModalConfig({ isOpen: true, bookingId: id, message: defaultMsg, isDrawer });
  };

  const executeConfirm = async (sendWhatsapp = false) => {
    const { bookingId, message, isDrawer } = waModalConfig;
    await updateBookingStatus(bookingId, 'Confirmed');
    showToast("Booking confirmed successfully.");
    
    if (isDrawer && selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({...selectedBooking, status: 'Confirmed'});
    }
    
    if (sendWhatsapp) {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking && booking.phone) {
        let phone = booking.phone.replace(/\D/g, '');
        if (phone.length === 10) phone = '91' + phone; // Default to India code
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    }
    setWaModalConfig({ isOpen: false, bookingId: null, message: '', isDrawer: false });
  };

  const handleCancel = async (id, isDrawer = false) => {
    if (window.confirm("Cancel this Katha booking?")) {
      await updateBookingStatus(id, 'Cancelled');
      showToast("Booking cancelled successfully.", "error");
      if (isDrawer && selectedBooking) setSelectedBooking({...selectedBooking, status: 'Cancelled'});
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this request permanently?")) {
      await deleteBooking(id);
      showToast("Booking deleted successfully.");
      setIsDrawerOpen(false);
    }
  };

  const handleBulkAction = async (action) => {
    if (action === 'Confirm') {
      if(window.confirm(`Confirm ${selectedBookings.length} selected bookings?`)) {
        await Promise.all(selectedBookings.map(id => updateBookingStatus(id, 'Confirmed')));
        showToast(`${selectedBookings.length} bookings confirmed.`);
        setSelectedBookings([]);
      }
    } else if (action === 'Cancel') {
      if(window.confirm(`Cancel ${selectedBookings.length} selected bookings?`)) {
        await Promise.all(selectedBookings.map(id => updateBookingStatus(id, 'Cancelled')));
        showToast(`${selectedBookings.length} bookings cancelled.`);
        setSelectedBookings([]);
      }
    } else if (action === 'Delete') {
      if(window.confirm(`Delete ${selectedBookings.length} selected bookings permanently?`)) {
        await Promise.all(selectedBookings.map(id => deleteBooking(id)));
        showToast(`${selectedBookings.length} bookings deleted.`);
        setSelectedBookings([]);
      }
    }
  };

  const handleExportExcel = () => {
    if (filteredBookings.length === 0) {
      showToast("No data to export.");
      return;
    }
    const headers = ['Name', 'Phone', 'Email', 'Location', 'Katha Type', 'Requested Date', 'Submitted On', 'Status', 'Message'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(b => {
        const date = b.preferredDate ? new Date(b.preferredDate).toLocaleDateString() : '';
        const created = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '';
        const msg = b.message ? b.message.replace(/,/g, ';').replace(/\n/g, ' ') : '';
        const loc = `${b.city || ''} ${b.state || ''} ${b.pincode || ''}`.trim();
        return `"${b.name}","${b.phone}","${b.email}","${loc}","${b.kathaType}","${date}","${created}","${b.status}","${msg}"`;
      })
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bookings_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export downloaded successfully.");
  };

  const openDrawer = (booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 max-w-full font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-bold ${
              toast.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {toast.type === 'error' ? <FaTimes /> : <FaCheck />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>


      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-[#EAD8C8] shadow-sm flex flex-col min-h-[500px]">
        
        {/* Header & Controls */}
        <div className="p-4 sm:p-6 border-b border-[#FAF0E6] flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2B20] uppercase tracking-wide flex items-center gap-2">
                Customer Booking Inquiries
                <span className="bg-[#E05A10] text-white text-xs px-2 py-0.5 rounded-full">{total}</span>
              </h3>
              <span className="text-xs text-[#3D2B20]/60">Manage and track all Katha requests</span>
            </div>
            
            {/* Search & Export */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D2B20]/40 text-sm" />
                <input
                  type="text"
                  placeholder="Search by customer, phone, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all"
                />
              </div>
              <button 
                onClick={handleExportExcel}
                className="bg-[#28a745] hover:bg-green-700 text-white rounded-xl shadow-sm transition-colors flex items-center justify-center h-[38px] px-4 gap-2"
                title="Download Excel/CSV"
              >
                <FaDownload className="text-sm" /> <span className="text-xs font-bold hidden sm:block">EXCEL</span>
              </button>
            </div>
          </div>

          {/* Filters & Bulk Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value); setCurrentPage(1);}} className="text-xs px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FAF6F0]/50 outline-none focus:border-[#E05A10] text-[#3D2B20] font-medium">
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select value={kathaFilter} onChange={e => {setKathaFilter(e.target.value); setCurrentPage(1);}} className="text-xs px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FAF6F0]/50 outline-none focus:border-[#E05A10] text-[#3D2B20] font-medium max-w-[150px] truncate">
                {kathaTypes.map(k => <option key={k} value={k}>{k === 'All' ? 'All Katha' : k}</option>)}
              </select>
              <select value={dateFilter} onChange={e => {setDateFilter(e.target.value); setCurrentPage(1);}} className="text-xs px-3 py-2 rounded-lg border border-[#EAD8C8] bg-[#FAF6F0]/50 outline-none focus:border-[#E05A10] text-[#3D2B20] font-medium">
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

            <AnimatePresence>
              {selectedBookings.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200"
                >
                  <span className="text-[10px] font-bold text-[#E05A10]">SELECTED: {selectedBookings.length}</span>
                  <button onClick={() => handleBulkAction('Confirm')} className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded shadow-sm hover:bg-green-600">CONFIRM</button>
                  <button onClick={() => handleBulkAction('Cancel')} className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm hover:bg-red-600">CANCEL</button>
                  <button onClick={() => handleBulkAction('Delete')} className="px-2 py-1 bg-gray-600 text-white text-[10px] font-bold rounded shadow-sm hover:bg-gray-700">DELETE</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Table (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0] text-[#8A2900] font-bold text-[10px] uppercase tracking-wider border-b border-[#EAD8C8]">
                <th className="px-4 py-3 w-10 text-center">
                  <input type="checkbox" className="rounded text-[#E05A10] focus:ring-[#E05A10]" onChange={handleSelectAll} checked={currentItems.length > 0 && selectedBookings.length === currentItems.length} />
                </th>
                <th className="px-4 py-3 cursor-pointer hover:bg-orange-50/50" onClick={() => requestSort('name')}>CLIENT {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-orange-50/50" onClick={() => requestSort('kathaType')}>KATHA {sortConfig.key === 'kathaType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-orange-50/50" onClick={() => requestSort('preferredDate')}>REQUESTED DATE {sortConfig.key === 'preferredDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                <th className="px-4 py-3">LOCATION</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-orange-50/50" onClick={() => requestSort('createdAt')}>SUBMITTED ON {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-orange-50/50" onClick={() => requestSort('status')}>STATUS {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                <th className="px-4 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF0E6]">
              {currentItems.length > 0 ? currentItems.map((item) => (
                <tr key={item.id} className={`hover:bg-[#FAF6F0]/60 transition-colors group ${selectedBookings.includes(item.id) ? 'bg-orange-50/30' : ''}`}>
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="rounded text-[#E05A10] focus:ring-[#E05A10]" checked={selectedBookings.includes(item.id)} onChange={() => handleSelectOne(item.id)} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-sm text-[#3D2B20] uppercase">{item.name}</div>
                    <div className="text-[10px] text-[#3D2B20]/60 mt-1 flex items-center gap-1.5"><FaPhoneAlt className="text-[#3D2B20]/40" /> {item.phone}</div>
                    <div className="text-[10px] text-[#3D2B20]/60 mt-0.5 truncate max-w-[150px] flex items-center gap-1.5"><FaEnvelope className="text-[#3D2B20]/40" /> {item.email}</div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#E05A10] text-xs flex items-center gap-1.5"><FaCalendarAlt className="text-[#E05A10]/40" /> {item.kathaType}</td>
                  <td className="px-4 py-4 text-xs font-medium text-[#3D2B20]">
                    {item.preferredDate ? new Date(item.preferredDate).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}) : '-'}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#3D2B20]/80">
                    <div className="font-bold">{item.city}</div>
                  </td>
                  <td className="px-4 py-4 text-[11px] text-[#3D2B20]/60">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}) : '-'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                      item.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openDrawer(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <FaEye className="text-sm" />
                      </button>
                      {item.status === 'Pending' && (
                        <>
                          <button onClick={() => handleConfirm(item.id)} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded" title="Confirm">
                            <FaCheck className="text-sm" />
                          </button>
                          <button onClick={() => handleCancel(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Cancel">
                            <FaTimes className="text-sm" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-[#3D2B20]/40">
                      <FaCalendarAlt className="text-4xl mb-3 opacity-30" />
                      <span className="text-sm font-medium">No booking requests found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (Visible only on small screens) */}
        <div className="md:hidden flex flex-col px-4 py-2 space-y-3 pb-24">
          {currentItems.length > 0 ? currentItems.map(item => (
            <div key={item.id} className="bg-white border border-[#EAD8C8] rounded-xl p-4 shadow-sm flex flex-col relative overflow-hidden">
               {/* Header */}
               <div className="flex items-start justify-between mb-4">
                 <div className="flex gap-3 items-start">
                   <input type="checkbox" className="mt-1 rounded text-[#E05A10] h-4 w-4" checked={selectedBookings.includes(item.id)} onChange={() => handleSelectOne(item.id)} />
                   <div>
                     <h4 className="font-bold text-[#3D2B20] text-sm uppercase leading-tight">{item.name}</h4>
                     <p className="text-[11px] text-[#3D2B20]/60 mt-1 font-medium">{item.phone}</p>
                   </div>
                 </div>
                 <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider shrink-0 ${
                      item.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-[#A44200]'
                  }`}>
                    {item.status}
                 </span>
               </div>
               
               {/* Info */}
               <div className="space-y-2 mb-4">
                 <div className="flex items-center gap-2.5 text-xs text-[#3D2B20]">
                    <FaBookOpen className="text-[13px] opacity-70 shrink-0" />
                    <span className="font-semibold text-[#3D2B20]">{item.kathaType}</span>
                 </div>
                 <div className="flex items-center gap-2.5 text-xs text-[#3D2B20]/80">
                    <FaCalendarAlt className="text-[13px] opacity-70 shrink-0" /> 
                    {item.preferredDate ? new Date(item.preferredDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}) : '-'}
                 </div>
                 <div className="flex items-start gap-2.5 text-xs text-[#3D2B20]/80">
                    <FaMapMarkerAlt className="text-[13px] opacity-70 mt-0.5 shrink-0" /> 
                    <span className="truncate leading-tight">{item.city}{item.state ? `, ${item.state}` : ''}</span>
                 </div>
               </div>

               {/* Submitted Date & Msg */}
               <div className="mb-4">
                 <p className="text-[10px] text-[#3D2B20]/50 font-medium">Requested: {item.createdAt ? new Date(item.createdAt).toLocaleString('en-GB', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'Unknown'}</p>
                 {item.message && <p className="text-[10px] text-[#E05A10]/70 font-medium mt-1">Message available →</p>}
               </div>
               
               {/* Actions */}
               <div className="flex items-center gap-2 pt-4 border-t border-[#FAF0E6]">
                 <button onClick={() => openDrawer(item)} className="flex-[1] py-3 text-xs font-bold text-[#3D2B20] border border-[#EAD8C8] rounded-xl text-center hover:bg-[#FAF6F0] flex items-center justify-center gap-2 transition-colors">
                   <FaEye className="text-sm" /> VIEW
                 </button>
                 {item.status === 'Pending' ? (
                   <button onClick={() => handleConfirm(item.id)} className="flex-[1] py-3 text-xs font-bold text-white bg-green-600 rounded-xl text-center hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-colors">
                     <FaCheck className="text-sm" /> CONFIRM
                   </button>
                 ) : (
                   <button onClick={() => openDrawer(item)} className="px-4 py-3 text-xs font-bold text-[#3D2B20]/60 border border-[#EAD8C8] rounded-xl text-center hover:bg-[#FAF6F0] flex items-center justify-center transition-colors">
                     <FaEllipsisV />
                   </button>
                 )}
               </div>
            </div>
          )) : (
            <div className="bg-white border border-[#EAD8C8] rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <FaCalendarAlt className="text-4xl mb-4 text-[#3D2B20]/20" />
              <h4 className="font-bold text-[#3D2B20] mb-1">No booking requests yet</h4>
              <p className="text-xs text-[#3D2B20]/60">New Katha booking requests will appear here.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 sm:px-6 py-4 border-t border-[#FAF0E6] bg-[#FAF6F0]/30 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-[#3D2B20]/60">
            <span className="hidden sm:inline">Showing {currentItems.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} entries</span>
            <div className="hidden sm:flex items-center gap-2">
              <span>Rows:</span>
              <select value={itemsPerPage} onChange={e => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}} className="bg-transparent font-bold outline-none cursor-pointer">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          
          {totalPages > 1 && (
            <>
              {/* Desktop Pagination */}
              <div className="hidden sm:flex items-center gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2.5 py-1 rounded border border-[#EAD8C8] text-xs font-bold hover:bg-[#E05A10] hover:text-white disabled:opacity-50 transition-colors">Prev</button>
                {Array.from({length: totalPages}, (_, i) => {
                  if(totalPages > 5 && i !== 0 && i !== totalPages - 1 && Math.abs(currentPage - 1 - i) > 1) {
                     if(i === 1 || i === totalPages - 2) return <span key={i} className="px-1 text-gray-400">...</span>;
                     return null;
                  }
                  return (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded border flex items-center justify-center text-xs font-bold ${currentPage === i + 1 ? 'bg-[#E05A10] text-white border-transparent' : 'border-[#EAD8C8] hover:bg-[#FAF0E6]'}`}>
                      {i + 1}
                    </button>
                  )
                })}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2.5 py-1 rounded border border-[#EAD8C8] text-xs font-bold hover:bg-[#E05A10] hover:text-white disabled:opacity-50 transition-colors">Next</button>
              </div>

              {/* Mobile Pagination */}
              <div className="sm:hidden flex items-center justify-between w-full">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg border border-[#EAD8C8] bg-white text-xs font-bold hover:bg-[#FAF6F0] disabled:opacity-50 transition-colors flex items-center gap-1 shadow-sm text-[#3D2B20]">
                  ← Prev
                </button>
                <span className="text-xs font-bold text-[#3D2B20]">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg border border-[#EAD8C8] bg-white text-xs font-bold hover:bg-[#FAF6F0] disabled:opacity-50 transition-colors flex items-center gap-1 shadow-sm text-[#3D2B20]">
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Katha Booking Summary */}
      <div className="bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
        <h4 className="text-xs font-bold text-[#8A2900] uppercase tracking-wider mb-4">Katha Booking Summary</h4>
        <div className="space-y-3">
          {kathaStats.map(([name, count]) => {
            const max = Math.max(...kathaStats.map(s => s[1]));
            const width = Math.max(5, (count / max) * 100);
            return (
              <div key={name} className="flex items-center gap-4">
                <span className="w-32 sm:w-40 text-xs font-bold text-[#3D2B20] truncate" title={name}>{name}</span>
                <div className="flex-1 h-3 sm:h-4 bg-[#FAF0E6] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} className="h-full bg-gradient-to-r from-[#EAD8C8] to-[#E05A10] rounded-full" />
                </div>
                <span className="w-8 text-xs font-black text-[#E05A10] text-right">{count}</span>
              </div>
            )
          })}
          {kathaStats.length === 0 && <div className="text-xs text-[#3D2B20]/50">No summary data available.</div>}
        </div>
      </div>

      {/* Booking Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[500px] max-h-[90vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-[#FAF0E6] flex items-center justify-between bg-white shrink-0">
                <h3 className="font-serif font-bold text-xl text-[#3D2B20] tracking-wide">BOOKING DETAILS</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-[#3D2B20] transition-colors p-1">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider block mb-1">CUSTOMER</span>
                  <div className="text-2xl font-black text-[#3D2B20] uppercase flex items-center gap-3">
                    <FaUserCircle className="text-[#E05A10] text-[28px]" />
                    {selectedBooking.name}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-3">
                    <a href={`tel:${selectedBooking.phone}`} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"><FaPhoneAlt className="text-xs"/> {selectedBooking.phone}</a>
                    <a href={`mailto:${selectedBooking.email}`} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"><FaEnvelope className="text-xs"/> {selectedBooking.email}</a>
                  </div>
                </div>

                <div className="h-px bg-[#FAF0E6] w-full" />

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FaBookOpen className="text-[13px] opacity-70" /> KATHA</span>
                    <div className="text-base font-bold text-[#E05A10]">{selectedBooking.kathaType}</div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FaInfoCircle className="text-[13px] opacity-70" /> STATUS</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                      selectedBooking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      selectedBooking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FaCalendarAlt className="text-[13px] opacity-70" /> REQUESTED DATE</span>
                    <div className="text-[15px] font-medium text-[#3D2B20]">{selectedBooking.preferredDate ? new Date(selectedBooking.preferredDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : 'Not specified'}</div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FaClock className="text-[13px] opacity-70" /> SUBMITTED</span>
                    <div className="text-[15px] font-medium text-[#3D2B20]">{selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString('en-GB', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'Unknown'}</div>
                  </div>
                </div>
                
                <div>
                    <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider block mb-1.5">LOCATION</span>
                    <div className="text-[15px] font-medium text-[#3D2B20] flex items-start gap-2.5">
                       <FaMapMarkerAlt className="mt-1 text-[#E05A10]/60 shrink-0" />
                       <span>{selectedBooking.city}{selectedBooking.state ? `, ${selectedBooking.state}` : ''}{selectedBooking.pincode ? ` - ${selectedBooking.pincode}` : ''}</span>
                    </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider mb-2 flex items-center gap-1.5"><FaCommentDots className="text-[13px] opacity-70" /> MESSAGE</span>
                  <div className="bg-[#FAF6F0]/50 p-4 rounded-xl border border-[#EAD8C8] text-sm text-[#3D2B20]/80 italic font-medium min-h-[80px]">
                    "{selectedBooking.message || 'No additional message provided.'}"
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#FAF0E6] bg-gray-50 flex flex-col gap-3 shrink-0 rounded-b-2xl mb-1">
                {selectedBooking.status === 'Pending' && (
                  <>
                    <button onClick={() => handleConfirm(selectedBooking.id, true)} className="w-full py-4 bg-[#28a745] hover:bg-green-700 text-white text-[15px] font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 tracking-wide">
                      <FaCheck className="text-lg" /> CONFIRM BOOKING
                    </button>
                    <button onClick={() => handleCancel(selectedBooking.id, true)} className="w-full py-4 bg-white hover:bg-red-50 text-[#dc3545] border border-[#ffb3b3] text-[15px] font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 tracking-wide">
                      <FaTimes className="text-lg" /> CANCEL BOOKING
                    </button>
                  </>
                )}
                {selectedBooking.status !== 'Pending' && (
                  <button onClick={() => setIsDrawerOpen(false)} className="w-full py-4 bg-white border border-[#EAD8C8] hover:bg-[#FAF6F0] text-[#3D2B20] text-[15px] font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 tracking-wide">
                    <FaTimes className="text-lg" /> CLOSE
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Preview Modal */}
      <AnimatePresence>
        {waModalConfig.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setWaModalConfig({ isOpen: false, bookingId: null, message: '', isDrawer: false })}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-[#EAD8C8]"
            >
              <div className="px-6 py-4 border-b border-[#FAF0E6] flex items-center justify-between bg-[#FAF6F0]/50">
                <h3 className="font-serif font-bold text-lg text-[#3D2B20] tracking-wide flex items-center gap-2">
                  <FaWhatsapp className="text-[#25D366] text-xl" /> WhatsApp Preview
                </h3>
                <button onClick={() => setWaModalConfig({ isOpen: false, bookingId: null, message: '', isDrawer: false })} className="text-gray-400 hover:text-[#3D2B20] transition-colors p-1">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#A44200] uppercase tracking-wider block mb-2">Message to send</span>
                  <textarea 
                    value={waModalConfig.message}
                    onChange={(e) => setWaModalConfig({...waModalConfig, message: e.target.value})}
                    className="w-full bg-[#FAF6F0]/50 border border-[#EAD8C8] rounded-xl p-4 text-[14px] text-[#3D2B20] font-medium outline-none focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] transition-all min-h-[160px] resize-y"
                  />
                  <p className="text-[10px] text-[#3D2B20]/60 mt-2 font-medium">You can edit the message above before sending. The booking will be marked as Confirmed.</p>
                </div>
              </div>

              <div className="p-6 border-t border-[#FAF0E6] bg-gray-50 flex flex-col sm:flex-row gap-3">
                <button onClick={() => executeConfirm(false)} className="flex-1 py-3 bg-white hover:bg-[#FAF6F0] text-[#3D2B20] border border-[#EAD8C8] text-sm font-bold rounded-xl shadow-sm transition-colors tracking-wide">
                  JUST CONFIRM
                </button>
                <button onClick={() => executeConfirm(true)} className="flex-[2] py-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-sm font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 tracking-wide">
                  <FaWhatsapp className="text-lg" /> CONFIRM & SEND WHATSAPP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bulk Actions */}
      <AnimatePresence>
        {selectedBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-16 sm:bottom-0 left-0 right-0 z-[45] bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 border-t border-[#EAD8C8] flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#E05A10]">SELECTED: {selectedBookings.length}</span>
              <button onClick={() => setSelectedBookings([])} className="text-[10px] font-bold text-[#3D2B20]/60 underline">CLEAR ALL</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleBulkAction('Confirm')} className="flex-1 py-2 bg-green-500 text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-green-600 transition-colors">CONFIRM</button>
              <button onClick={() => handleBulkAction('Cancel')} className="flex-1 py-2 bg-red-500 text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-red-600 transition-colors">CANCEL</button>
              <button onClick={() => handleBulkAction('Delete')} className="flex-1 py-2 bg-gray-600 text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-gray-700 transition-colors">DELETE</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
