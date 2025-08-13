import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronDown 
} from 'lucide-react'
import './TopNavigation.css'

const TopNavigation = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleDashboard = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="top-navigation">
      <div className="nav-container">
        <div className="nav-left">
          <button 
            className="logo-button"
            onClick={() => navigate('/')}
          >
            MyDigitalShelf
          </button>
        </div>
        
        <div className="nav-right">
          <button 
            className="nav-button dashboard-button"
            onClick={handleDashboard}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          
          <div className="profile-section" ref={profileMenuRef}>
            {user ? (
              <>
                <button 
                  className="profile-button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="profile-avatar">
                    <User size={16} />
                  </div>
                  <span className="profile-name">{user.name}</span>
                  <ChevronDown size={14} className={`chevron ${showProfileMenu ? 'rotated' : ''}`} />
                </button>
                
                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <div className="profile-info">
                        <div className="profile-avatar large">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="profile-menu-name">{user.name}</div>
                          <div className="profile-menu-email">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="profile-menu-divider"></div>
                    
                    <button className="profile-menu-item">
                      <Settings size={16} />
                      Account Settings
                    </button>
                    
                    <button 
                      className="profile-menu-item"
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    
                    <div className="profile-menu-divider"></div>
                    
                    <button 
                      className="profile-menu-item logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button 
                className="login-button"
                onClick={handleLogin}
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation
