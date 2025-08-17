import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Crown, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  HardDrive,
  ChevronDown,
  User,
  Moon,
  Sun,
  LogOut,
  Bell
} from 'lucide-react'

const Layout = ({ children }) => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const sidebarItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/memberships', icon: Crown, label: 'Memberships' },
    { path: '/sales', icon: TrendingUp, label: 'Sales' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'
  const userInitial = firstName.charAt(0).toUpperCase()

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="sidebar-modern">
        {/* Logo Section */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="logo-icon">
              <Package size={28} className="text-white" />
            </div>
            <span className="logo-text">MyDigitalShelf</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <div className="sidebar-item-icon">
                  <Icon size={20} />
                </div>
                <span className="sidebar-item-text">{item.label}</span>
                {isActive && <div className="sidebar-item-indicator"></div>}
              </Link>
            )
          })}
        </nav>

        {/* Storage Info */}
        <div className="sidebar-footer">
          <div className="storage-info">
            <div className="storage-header">
              <HardDrive size={16} className="text-slate-500" />
              <span className="storage-title">Storage</span>
            </div>
            <div className="storage-details">
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: '0%' }}></div>
              </div>
              <div className="storage-text">0 GB of 10 GB used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Top Navigation */}
        <header className="top-nav-modern">
          <div className="nav-left">
            <h1 className="page-title">
              {sidebarItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="nav-right">
            {/* Notifications */}
            <button className="nav-icon-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {/* User Dropdown */}
            <div className="dropdown">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="user-profile-btn"
              >
                <div className="user-avatar">
                  {userInitial}
                </div>
                <div className="user-info">
                  <span className="user-name">{firstName}</span>
                  <span className="user-status">Online</span>
                </div>
                <ChevronDown size={16} className="dropdown-arrow" />
              </button>
              
              {dropdownOpen && (
                <div className="dropdown-menu-modern">
                  <div className="dropdown-header">
                    <div className="user-avatar-large">
                      {userInitial}
                    </div>
                    <div>
                      <div className="dropdown-user-name">{firstName}</div>
                      <div className="dropdown-user-email">{user?.email}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link
                    to="/settings"
                    className="dropdown-item-modern"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>Account Settings</span>
                  </Link>
                  
                  <button
                    onClick={toggleDarkMode}
                    className="dropdown-item-modern"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button
                    onClick={handleSignOut}
                    className="dropdown-item-modern text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
