import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function CustomCalendar({ calendarDates, onDateSelect, selectedDate }) {
  // Initialize to the selected date if provided, otherwise current month/year
  const initialDate = selectedDate ? new Date(selectedDate) : new Date()
  const [currentDate, setCurrentDate] = useState(initialDate)

  // Sync with selectedDate prop if it changes externally
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate))
    }
  }, [selectedDate])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayIndex = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevTotalDays = new Date(year, month, 0).getDate()

  const handlePrevMonth = (e) => {
    e.preventDefault()
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = (e) => {
    e.preventDefault()
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const daysArr = []
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    daysArr.push({ day: prevTotalDays - i, isCurrentMonth: false })
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArr.push({ day: i, isCurrentMonth: true })
  }

  const getStatusForDay = (day) => {
    const formattedMonth = String(month + 1).padStart(2, '0')
    const formattedDay = String(day).padStart(2, '0')
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`
    const match = calendarDates ? calendarDates.find(item => item.date === dateStr) : null
    return match ? match.status : null
  }

  const yearStr = String(year)
  const formattedMonthIndex = String(month + 1).padStart(2, '0')

  return (
    <div className="bg-white border-0 shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-full transition-all rounded-xl overflow-hidden font-sans">
      
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#E05A10] to-[#D4AF37]"></div>

      <div className="p-5 lg:p-7">
        {/* Header Section (Ribbon + Year + Navigation) */}
        <div className="flex items-start justify-between mb-8">
          
          {/* Left Ribbon Area */}
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* Month Number Box */}
              <div 
                className="bg-[#E05A10] text-white font-black text-xl md:text-2xl px-3 py-1.5 flex items-center justify-center relative z-10"
                style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)', paddingRight: '20px' }}
              >
                {formattedMonthIndex}
              </div>
              
              {/* Month Name Box */}
              <div 
                className="bg-[#2A2A2A] text-white font-black text-xl md:text-2xl px-5 py-1.5 flex items-center justify-center -ml-3"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)', paddingLeft: '24px' }}
              >
                {monthNames[month].toUpperCase()}
                
                {/* Decorative dots mimicking the image */}
                <div className="flex gap-0.5 ml-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E05A10]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                </div>
              </div>
            </div>
            {/* Sub-badge under month */}
            <div className="bg-[#E05A10] text-white text-[9px] font-bold tracking-widest px-4 py-0.5 mt-0.5 w-max ml-8" style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}>
              BOOKING CALENDAR
            </div>
          </div>

          {/* Right Year Area + Navigation */}
          <div className="flex flex-col items-end">
            <div className="text-4xl md:text-5xl font-black tracking-tighter flex leading-none">
              <span className="text-[#E05A10]">{yearStr.substring(0, 2)}</span>
              <span className="text-[#D4AF37]">{yearStr.substring(2, 4)}</span>
            </div>
            
            {/* Navigation Buttons integrated under year */}
            <div className="flex gap-2 mt-2">
              <button 
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded bg-[#F5F5F5] text-[#2A2A2A] hover:bg-[#E05A10] hover:text-white flex items-center justify-center transition-colors focus:outline-none shadow-sm"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="w-7 h-7 rounded bg-[#F5F5F5] text-[#2A2A2A] hover:bg-[#E05A10] hover:text-white flex items-center justify-center transition-colors focus:outline-none shadow-sm"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center font-black text-[10px] md:text-xs uppercase text-white">
          <div className="bg-[#E05A10] py-1.5 rounded-sm shadow-sm">Sun</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Mon</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Tue</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Wed</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Thu</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Fri</div>
          <div className="bg-[#2A2A2A] py-1.5 rounded-sm shadow-sm">Sat</div>
        </div>

        {/* Days Grid */}
        <div className="bg-[#F5F5F5] rounded-lg p-2 md:p-3">
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-sm md:text-base">
            {daysArr.map((item, idx) => {
              const isSunday = idx % 7 === 0

              if (!item.isCurrentMonth) {
                return (
                  <div key={`empty-${idx}`} className="py-2.5 text-gray-300 cursor-default">
                    {String(item.day).padStart(2, '0')}
                  </div>
                )
              }

              const formattedMonth = String(month + 1).padStart(2, '0')
              const formattedDay = String(item.day).padStart(2, '0')
              const fullDateStr = `${year}-${formattedMonth}-${formattedDay}`
              const status = getStatusForDay(item.day)

              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const cellDate = new Date(year, month, item.day)
              const isPast = cellDate < today

              const isSelected = selectedDate === fullDateStr

              // Base style matching the image's clean grid
              let textClass = isSunday ? "text-[#E05A10]" : "text-[#2A2A2A]"
              let bgClass = "bg-transparent"
              let borderClass = "border-transparent"
              let cursorClass = "cursor-pointer hover:bg-white hover:shadow-sm"
              let indicatorDot = null

              if (isPast) {
                textClass = "text-gray-300"
                cursorClass = "cursor-not-allowed"
              } else if (status === 'Booked') {
                textClass = "text-white"
                bgClass = "bg-[#E53E3E]" // Red background
                cursorClass = "cursor-not-allowed shadow-sm"
                indicatorDot = <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#E53E3E]"></div>
              } else if (status === 'Confirmed' || status === 'Event') {
                textClass = "text-white"
                bgClass = "bg-[#38A169]" // Green background
                cursorClass = "cursor-pointer shadow-md hover:scale-105"
                indicatorDot = <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#38A169]"></div>
              } else if (isSelected) {
                textClass = "text-white"
                bgClass = "bg-[#E05A10]"
                cursorClass = "cursor-pointer shadow-md hover:scale-105"
              }

              return (
                <div key={`day-${item.day}`} className="py-2.5 flex items-center justify-center">
                  <div 
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isPast && status !== 'Booked') {
                        if(onDateSelect) onDateSelect(fullDateStr)
                      }
                    }}
                    className={`w-9 h-9 md:w-10 md:h-10 flex flex-col items-center justify-center rounded-full transition-all relative ${bgClass} ${textClass} ${borderClass} ${cursorClass}`}
                    title={isPast ? 'Past Date' : status === 'Booked' ? 'Fully Booked' : isSelected ? 'Selected Date' : 'Available for Booking'}
                  >
                    <span className="font-bold relative z-10">{String(item.day).padStart(2, '0')}</span>
                    {indicatorDot}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-6 text-[10px] font-bold text-[#2A2A2A] uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#38A169] relative shadow-sm block">
              <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#38A169]"></span>
            </span>
            <span>Event / Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#E53E3E] relative shadow-sm block">
              <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#E53E3E]"></span>
            </span>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  )
}
