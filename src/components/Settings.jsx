import React, { useState } from 'react'
import { User, CreditCard, Bell, Shield, ArrowLeft } from 'lucide-react'
import ProfileSettings from './settings/ProfileSettings'
import PaymentSettings from './settings/PaymentSettings'
import NotificationSettings from './settings/NotificationSettings'
import SecuritySettings from './settings/SecuritySettings'
import './shared.css'

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null)

  const settingsOptions = [
    {
      id: 'profile',
      icon: <User size={24} />,
      title: 'Profile Settings',
      description: 'Manage your account information and preferences'
    },
    {
      id: 'payment',
      icon: <CreditCard size={24} />,
      title: 'Payment Settings',
      description: 'Configure payment gateways and payout methods'
    },
    {
      id: 'notifications',
      icon: <Bell size={24} />,
      title: 'Notifications',
      description: 'Manage email and push notification preferences'
    },
    {
      id: 'security',
      icon: <Shield size={24} />,
      title: 'Security',
      description: 'Update password and security settings'
    }
  ]

  const renderSettingsSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />
      case 'payment':
        return <PaymentSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'security':
        return <SecuritySettings />
      default:
        return null
    }
  }

  if (activeSection) {
    return (
      <div className="settings-page">
        <div className="settings-header-nav">
          <button 
            className="back-button"
            onClick={() => setActiveSection(null)}
          >
            <ArrowLeft size={16} />
            Back to Settings
          </button>
        </div>
        {renderSettingsSection()}
      </div>
    )
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="settings-grid">
        {settingsOptions.map((option) => (
          <button
            key={option.id}
            className="settings-card clickable"
            onClick={() => setActiveSection(option.id)}
          >
            <div className="settings-header">
              {option.icon}
              <h3>{option.title}</h3>
            </div>
            <p>{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Settings
