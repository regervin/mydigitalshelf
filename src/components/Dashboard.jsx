import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'
import Products from './Products'
import Memberships from './Memberships'
import Customers from './Customers'
import Sales from './Sales'
import Analytics from './Analytics'
import Settings from './Settings'
import Storage from './Storage'
import './Dashboard.css'

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />
      case 'products':
        return <Products />
      case 'memberships':
        return <Memberships />
      case 'customers':
        return <Customers />
      case 'sales':
        return <Sales />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      case 'storage':
        return <Storage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onHome={() => navigate('/')}
      />
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  )
}

export default Dashboard
