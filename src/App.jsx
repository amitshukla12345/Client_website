import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRoutes from './routes/Index'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </Router>
      </AppProvider>
    </LanguageProvider>
  )
}
