import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  LogIn
} from 'lucide-react'
import './TopNavigation.css'

const TopNavigation = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleDashboardClick = () => {
    navigate('/dashboard')
  }

  return (
    <nav className="top-navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>MyDigitalShelf</h2>
        </div>
        
        <div className="nav-actions">
          <button 
            className="nav-button"
            onClick={handleDashboardClick}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            className="nav-button primary"
            onClick={handleLoginClick}
          >
            <LogIn size={18} />
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation
