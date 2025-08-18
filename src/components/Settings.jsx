import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Save, User, Globe, Bell, CreditCard, Shield } from 'lucide-react'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    website: user?.user_metadata?.website || '',
    bio: user?.user_metadata?.bio || ''
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await updateProfile({
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      website: profileData.website,
      bio: profileData.bio
    })
    
    if (!error) {
      // Success feedback
      setTimeout(() => setSaving(false), 1000)
    } else {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h2>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="label">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="label">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    value={profileData.email}
                    disabled
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed from here
                  </p>
                </div>
                <div>
                  <label htmlFor="website" className="label">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="input"
                    value={profileData.website}
                    onChange={handleProfileChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="input"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className={`btn-primary flex items-center gap-2 ${
                    saving ? 'save-animation' : ''
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your sales</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">New Customer Alerts</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when you have new customers</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Weekly Reports</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly sales and analytics reports</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Billing & Subscription
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Current Plan</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      10 GB storage, unlimited products
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-gray-600 dark:text-gray-400">No payment method on file</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Security Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="input"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="input"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="input"
                    />
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
