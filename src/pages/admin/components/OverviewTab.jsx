import React from 'react'
import { motion } from 'framer-motion'
import { FaClipboardList, FaCheck, FaTimes, FaCalendarPlus, FaImages, FaExternalLinkAlt, FaGlobe, FaUserEdit, FaTrash } from 'react-icons/fa'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line, ComposedChart
} from 'recharts'

export default function OverviewTab({ bookings, events, galleryPhotos, galleryVideos, setActiveTab }) {
  const pendingCount = bookings.filter(b => b.status === 'Pending').length
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length
  const rejectedCount = bookings.filter(b => b.status === 'Cancelled' || b.status === 'Rejected').length
  const totalBookings = bookings.length

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  // --- Dynamic Data for Charts (Real Database Data) ---
  const bookingTrendData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = months.map(m => ({ name: m, value: 0 }))
    bookings.forEach(b => {
      if (b.createdAt) {
        const d = new Date(b.createdAt)
        if (!isNaN(d)) {
          data[d.getMonth()].value += 1
        }
      }
    })
    // Sort to show last 12 months ending with current month
    const currentMonth = new Date().getMonth()
    const sortedData = []
    for (let i = 11; i >= 0; i--) {
      const idx = (currentMonth - i + 12) % 12
      sortedData.push(data[idx])
    }
    return sortedData
  }, [bookings])

  const topCitiesData = React.useMemo(() => {
    const cityCounts = {}
    bookings.forEach(b => {
      if (b.city) {
        const city = b.city.trim()
        cityCounts[city] = (cityCounts[city] || 0) + 1
      }
    })
    const sorted = Object.entries(cityCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7) // Top 7 cities
    return sorted.length > 0 ? sorted : [{ name: 'No Data', value: 0 }]
  }, [bookings])

  const bookingStatusData = [
    { name: 'Confirmed', value: confirmedCount, color: '#16A34A' },
    { name: 'Pending', value: pendingCount, color: '#EAB308' },
    { name: 'Rejected', value: rejectedCount, color: '#DC2626' }
  ].filter(d => d.value > 0)

  const kathaCategoryData = React.useMemo(() => {
    const typeCounts = {}
    bookings.forEach(b => {
      if (b.kathaType) {
        typeCounts[b.kathaType] = (typeCounts[b.kathaType] || 0) + 1
      }
    })
    
    const colors = ['#E05A10', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6']
    const sorted = Object.entries(typeCounts)
      .map(([name, value], index) => ({ name, value, color: colors[index % colors.length] }))
      .sort((a, b) => b.value - a.value)

    return sorted.length > 0 ? sorted : [{ name: 'No Bookings', value: 1, color: '#EAD8C8' }]
  }, [bookings])

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
      
      {/* 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-orange-500 mb-2">
            <FaClipboardList className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Pending</span>
          </div>
          <span className="text-4xl font-serif font-black text-orange-500">{pendingCount}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-green-100 hover:shadow-md hover:border-green-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <FaCheck className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Confirmed</span>
          </div>
          <span className="text-4xl font-serif font-black text-green-600">{confirmedCount}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <FaTimes className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Rejected</span>
          </div>
          <span className="text-4xl font-serif font-black text-red-600">{rejectedCount}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md hover:border-yellow-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
            <FaCalendarPlus className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Events</span>
          </div>
          <span className="text-4xl font-serif font-black text-[#D4AF37]">{events.length}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <FaImages className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Photos</span>
          </div>
          <span className="text-4xl font-serif font-black text-blue-600">{galleryPhotos.length}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-200 transition-all group flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center space-x-2 text-pink-600 mb-2">
            <FaExternalLinkAlt className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Videos</span>
          </div>
          <span className="text-4xl font-serif font-black text-pink-600">{galleryVideos.length}</span>
        </motion.div>
      </div>

      {/* 2. MAIN CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Line Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-6">Booking Trend (Last 12 Months)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSaffron" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E05A10" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E05A10" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <CartesianGrid vertical={false} stroke="#EAD8C8" strokeDasharray="3 3" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#E05A10', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#E05A10" strokeWidth={3} fillOpacity={1} fill="url(#colorSaffron)" activeDot={{ r: 6, strokeWidth: 0, fill: '#E05A10' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-2">Booking Status</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%" cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-gray-500 font-bold uppercase">Total</span>
              <span className="text-xl font-black text-[#3D2B20]">{totalBookings}</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {bookingStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <div className="font-bold text-[#3D2B20]">
                  {item.value} <span className="text-gray-400 font-normal ml-1">({totalBookings > 0 ? Math.round((item.value/totalBookings)*100) : 0}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. SECONDARY CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bar Chart (Top Cities) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-6">Top Booking Cities</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCitiesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={32}>
                <CartesianGrid vertical={false} stroke="#EAD8C8" strokeDasharray="3 3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} allowDecimals={false} />
                <RechartsTooltip cursor={{ fill: '#FAF6F0' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]}>
                  {topCitiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#E05A10' : '#FB923C'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm flex flex-col justify-between">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-2">Katha Category Breakdown</h3>
          <div className="flex-grow flex items-center">
            <div className="h-[200px] w-[50%]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kathaCategoryData}
                    cx="50%" cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {kathaCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[50%] pl-4 space-y-3">
              {kathaCategoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-600 font-medium truncate" title={item.name}>{item.name}</span>
                  </div>
                  <span className="font-bold text-[#3D2B20]">{totalBookings > 0 ? Math.round((item.value / totalBookings) * 100) : 0}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. BOTTOM WIDGETS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#FAF0E6] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#3D2B20]">Upcoming Events</h3>
            <button onClick={() => setActiveTab('Events')} className="text-[10px] text-[#E05A10] font-bold hover:underline uppercase tracking-wider">View All</button>
          </div>
          <div className="space-y-4">
            {events.slice(0, 3).map((evt, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-50 text-[#E05A10] rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-orange-100">
                  <span className="text-sm font-black leading-none">{evt.date}</span>
                  <span className="text-[8px] uppercase tracking-widest mt-0.5 font-bold">{(evt.month || '').split(' ')[0]}</span>
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#3D2B20] leading-tight">{evt.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{evt.month || ''} • {(evt.time || '').split(' ')[0]}</p>
                </div>
              </div>
            ))}
            {events.length === 0 && <div className="text-xs text-gray-400 text-center py-4">No events scheduled.</div>}
          </div>
        </motion.div>

        {/* Recent Activity Timeline */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-4 border-b border-[#FAF0E6] pb-3">Recent Bookings Activity</h3>
          <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            
            {(() => {
              const recentActivities = [...bookings]
                .filter(b => b.createdAt)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4);

              const getRelativeTime = (dateStr) => {
                const d = new Date(dateStr);
                if (isNaN(d)) return '';
                const diff = Math.floor((new Date() - d) / 1000);
                if (diff < 60) return `${diff || 1}s ago`;
                if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                return `${Math.floor(diff / 86400)}d ago`;
              };

              const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'];

              if (recentActivities.length === 0) {
                return <div className="text-xs text-gray-400 text-center py-4">No recent activities available.</div>;
              }

              return recentActivities.map((act, idx) => (
                <div key={act.id || idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-4 h-4 rounded-full border-2 border-white ${colors[idx % colors.length]} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] text-xs font-medium">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#3D2B20]">New booking received</span>
                      <span className="text-[10px] text-gray-400">{getRelativeTime(act.createdAt)}</span>
                    </div>
                    <p className="text-gray-500 text-[10px] leading-tight">
                      From {act.name || 'Unknown'} {(act.city) ? `(${act.city})` : ''} <br/>
                      <span className="text-[#E05A10] font-semibold">{act.kathaType}</span>
                    </p>
                  </div>
                </div>
              ));
            })()}

          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EAD8C8] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#3D2B20] mb-4 border-b border-[#FAF0E6] pb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveTab('Events')} className="p-4 border border-[#EAD8C8] rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:bg-[#FAF6F0] hover:border-orange-300 transition-all group">
              <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                <FaCalendarPlus className="text-lg text-[#E05A10]" />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Add Event</span>
            </button>
            <button onClick={() => setActiveTab('Gallery')} className="p-4 border border-[#EAD8C8] rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:bg-[#FAF6F0] hover:border-blue-300 transition-all group">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FaImages className="text-lg text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Upload Photos</span>
            </button>
            <button onClick={() => setActiveTab('Contact')} className="p-4 border border-[#EAD8C8] rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:bg-[#FAF6F0] hover:border-green-300 transition-all group">
              <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <FaGlobe className="text-lg text-green-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Update Contact</span>
            </button>
            <button onClick={() => setActiveTab('Biography')} className="p-4 border border-[#EAD8C8] rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:bg-[#FAF6F0] hover:border-yellow-300 transition-all group">
              <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                <FaUserEdit className="text-lg text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Edit Guru Bio</span>
            </button>
          </div>
        </motion.div>
      </div>

    </motion.div>
  )
}
