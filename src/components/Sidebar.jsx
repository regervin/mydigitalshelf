import React from 'react'
import { 
  Home,
  LayoutDashboard, 
  Package, 
  Users, 
  UserCheck, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HardDrive 
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ activeSection, setActiveSection, onHome }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'memberships', label: 'Memberships', icon: <UserCheck size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'sales', label: 'Sales', icon: <ShoppingCart size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive size={20} /> },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">MyDigitalShelf</h2>
        <button className="home-button" onClick={onHome}>
          <Home size={16} />
          Home
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
