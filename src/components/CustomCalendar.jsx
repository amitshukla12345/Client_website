import React, { useState, useEffect } from 'react'

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

  return (
    <div className="bg-white border border-gold/20 rounded-2xl p-4 shadow-sm w-full">
      {/* Calendar Month Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-full border border-gold/30 bg-cream-light text-saffron hover:bg-saffron hover:text-white flex items-center justify-center transition-all"
        >
          ◀
        </button>
        <h3 className="font-serif text-lg font-bold text-dark">
          {monthNames[month]} {year}
        </h3>
        <button 
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-full border border-gold/30 bg-cream-light text-saffron hover:bg-saffron hover:text-white flex items-center justify-center transition-all"
        >
          ▶
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center font-bold text-[10px] uppercase tracking-wider text-dark-light">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysArr.map((item, idx) => {
          if (!item.isCurrentMonth) {
            return (
              <div key={`empty-${idx}`} className="py-2 text-dark-light/20 cursor-default">
                {item.day}
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

          return (
            <div key={`day-${item.day}`} className="py-1 flex items-center justify-center">
              <div 
                onClick={(e) => {
                  e.preventDefault()
                  if (!isPast && status !== 'Booked') {
                    if(onDateSelect) onDateSelect(fullDateStr)
                  }
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-all relative ${
                  isPast 
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed' 
                    : status === 'Booked' 
                      ? 'bg-red-600 text-white border-2 border-red-700 shadow-md cursor-not-allowed' 
                      : isSelected
                        ? 'bg-saffron text-white border-2 border-saffron-dark shadow-md cursor-pointer'
                        : 'bg-green-50 text-green-700 border border-green-200 cursor-pointer hover:bg-green-100 hover:scale-105'
                }`}
                title={isPast ? 'Past Date' : status === 'Booked' ? 'Booked' : isSelected ? 'Selected' : 'Available'}
              >
                {item.day}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend Indicators */}
      <div className="mt-4 pt-3 border-t border-gold/10 flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold text-dark-light">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-50 border border-green-300 block"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-700 block shadow-sm"></span>
          <span>Booked</span>
        </div>
      </div>
    </div>
  )
}
