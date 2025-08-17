import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { User, Globe, Bell, Shield, CreditCard } from 'lucide-react'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    website: '',
    bio: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        email: user.email || '',
        website: user.user_metadata?.website || '',
        bio: user.user_metadata?.bio || ''
      })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await updateProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        website: profileData.website,
        bio: profileData.bio
      })
      
      // Simulate save animation
      setTimeout(() => {
        setSaving(false)
      }, 1000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'store', label: 'Store Settings', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
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
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6">Profile Information</h2>
                  <form onSubmit={handleSave}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={profileData.first_name}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={profileData.last_name}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        className="form-input"
                        disabled
                      />
                      <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <button
                      type="submit"
                      className={`btn-save ${saving ? 'saving' : ''}`}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'store' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6">Store Settings</h2>
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Store Name</label>
                      <input type="text" className="form-input" placeholder="My Digital Store" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Store Description</label>
                      <textarea className="form-textarea" placeholder="Describe your store..."></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Custom Domain</label>
                      <input type="text" className="form-input" placeholder="store.yourdomain.com" />
                    </div>
                    <button className="btn-save">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New Sales</div>
                        <div className="text-sm text-gray-600">Get notified when you make a sale</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New Customers</div>
                        <div className="text-sm text-gray-600">Get notified about new customer registrations</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Weekly Reports</div>
                        <div className="text-sm text-gray-600">Receive weekly sales and analytics reports</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <button className="btn-save">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-input" />
                    </div>
                    <button className="btn-save">Update Password</button>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6">Billing & Payments</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-2">Current Plan: Free</div>
                      <div className="text-sm text-gray-600">You're currently on the free plan</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Method</label>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-gray-600">No payment method added</div>
                      </div>
                    </div>
                    <button className="btn-primary">Add Payment Method</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
