import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Deeksha from '../pages/Deeksha'
import Services from '../pages/Services'
import Events from '../pages/Events'
import Gallery from '../pages/Gallery'
import Live from '../pages/Live'
import BookKatha from '../pages/BookKatha'
import Testimonials from '../pages/Testimonials'
import Contact from '../pages/Contact'
import AdminLogin from '../pages/admin/Login'
import AdminDashboard from '../pages/admin/Dashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/deeksha" element={<Deeksha />} />
      <Route path="/services" element={<Services />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/live" element={<Live />} />
      <Route path="/book" element={<BookKatha />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}
