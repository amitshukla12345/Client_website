import React, { useState } from 'react'
import { FaYoutube, FaShareAlt, FaHeart, FaVolumeUp } from 'react-icons/fa'

export default function LivePlayer() {
  const [likes, setLikes] = useState(1048)
  const [hasLiked, setHasLiked] = useState(false)

  // High quality premium live spiritual broadcast ID from YouTube
  // Using a beautiful divine music / temple livestream ID
  const youtubeVideoId = 'e2_Rk2eYwVw' // Spiritual live feed channel ID placeholder

  const toggleLike = () => {
    if (hasLiked) {
      setLikes(l => l - 1)
    } else {
      setLikes(l => l + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shrimad Bhagvat Katha Live Stream',
        text: 'Join us live for the divine Shrimad Bhagvat Katha by Pujya Guru Ji.',
        url: window.location.href,
      })
    } else {
      // Fallback
      alert('Link copied to clipboard!')
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1`}
          title="Shrimad Bhagvat Katha Live Stream"
          className="absolute inset-0 w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Live Badge Overlay */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg z-10 animate-pulse">
          <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
          <span>Live Stream</span>
        </div>

        {/* Viewer Count Overlay */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full z-10">
          2.4K Watching Now
        </div>
      </div>

      {/* Video Meta Info */}
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark mb-1">
            Day 3 - Shrimad Bhagvat Katha Mahotsav | Shri Vrindavan Dham
          </h3>
          <p className="text-xs text-saffron uppercase font-bold tracking-widest flex items-center space-x-1.5">
            <span>By Pujya Guru Ji Maharaj</span>
            <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
            <span className="text-dark-light">Devotion & Liberation</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${hasLiked
                ? 'bg-red-50 text-red-600 border-red-200 shadow-md'
                : 'bg-white text-dark-light border-gold/20 hover:bg-cream-dark'
              }`}
          >
            <FaHeart className={hasLiked ? 'text-red-500 scale-110' : ''} />
            <span>{likes}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-dark-light border border-gold/20 hover:bg-cream-dark text-sm font-medium transition-all"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>

          {/* YouTube Button */}
          <a
            href="https://youtube.com/@jagadguruhariprapannaacharyaji?si=yadkCLNnQMTk2qK8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-md transition-colors"
          >
            <FaYoutube />
            <span>YouTube Chat</span>
          </a>
        </div>
      </div>
    </div>
  )
}
