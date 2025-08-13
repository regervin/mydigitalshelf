import React from 'react'
import { Settings as SettingsIcon, User, CreditCard, Bell, Shield } from 'lucide-react'

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-header">
            <User size={24} />
            <h3>Profile Settings</h3>
          </div>
          <p>Manage your account information and preferences</p>
        </div>

        <div className="settings-card">
          <div className="settings-header">
            <CreditCard size={24} />
            <h3>Payment Settings</h3>
          </div>
          <p>Configure payment gateways and payout methods</p>
        </div>

        <div className="settings-card">
          <div className="settings-header">
            <Bell size={24} />
            <h3>Notifications</h3>
          </div>
          <p>Manage email and push notification preferences</p>
        </div>

        <div className="settings-card">
          <div className="settings-header">
            <Shield size={24} />
            <h3>Security</h3>
          </div>
          <p>Update password and security settings</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
