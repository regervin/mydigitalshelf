import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { User, Globe, Bell, Shield, CreditCard, Save, Check } from 'lucide-react'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
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
    setSaved(false)
    
    try {
      await updateProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        website: profileData.website,
        bio: profileData.bio
      })
      
      // Show success state
      setTimeout(() => {
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <div className="text-sm text-gray-600">
            Manage your account and preferences
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
                      <p className="text-gray-600">Update your personal details and preferences</p>
                    </div>
                  </div>

                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={profileData.first_name}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Enter your first name"
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
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        className="form-input bg-gray-50"
                        disabled
                      />
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                        <Shield size={14} />
                        Email cannot be changed for security reasons
                      </p>
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
                        placeholder="Tell us about yourself and your business..."
                        rows="4"
                      />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        className={`btn-save flex items-center gap-2 ${saving ? 'saving' : ''} ${saved ? 'bg-green-600' : ''}`}
                        disabled={saving || saved}
                      >
                        {saved ? (
                          <>
                            <Check size={16} />
                            Saved!
                          </>
                        ) : saving ? (
                          'Saving...'
                        ) : (
                          <>
                            <Save size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'store' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Globe size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Store Settings</h2>
                      <p className="text-gray-600">Configure your digital store preferences</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Store Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="My Digital Store"
                        defaultValue="MyDigitalShelf Store"
                      />
                      <p className="text-sm text-gray-500 mt-2">This will be displayed to your customers</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Store Description</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Describe what your store offers..."
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Custom Domain</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="store.yourdomain.com"
                      />
                      <p className="text-sm text-gray-500 mt-2">Connect your own domain (Premium feature)</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Store Currency</label>
                      <select className="form-input">
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="btn-save flex items-center gap-2">
                        <Save size={16} />
                        Save Store Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Bell size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Notification Preferences</h2>
                      <p className="text-gray-600">Choose what notifications you want to receive</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">New Sales</div>
                          <div className="text-sm text-gray-600">Get notified immediately when you make a sale</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">New Customers</div>
                          <div className="text-sm text-gray-600">Get notified about new customer registrations</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Weekly Reports</div>
                          <div className="text-sm text-gray-600">Receive weekly sales and analytics reports</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Product Updates</div>
                          <div className="text-sm text-gray-600">Get notified about platform updates and new features</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="btn-save flex items-center gap-2">
                        <Save size={16} />
                        Save Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Shield size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Security Settings</h2>
                      <p className="text-gray-600">Manage your account security and password</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-blue-600" />
                        <span className="font-medium text-blue-900">Account Security Status</span>
                      </div>
                      <p className="text-sm text-blue-700">Your account is secured with email authentication.</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Change Password</h3>
                      
                      <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="Enter your current password"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="Enter your new password"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="Confirm your new password"
                        />
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Password Requirements:</strong>
                        </p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Include at least one number</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="btn-save flex items-center gap-2">
                        <Save size={16} />
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <CreditCard size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Billing & Payments</h2>
                      <p className="text-gray-600">Manage your subscription and payment methods</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">Current Plan: Free</h3>
                          <p className="text-sm text-green-700">You're currently on the free plan</p>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Active
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Products:</span>
                          <span className="font-medium ml-2">Up to 5</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Storage:</span>
                          <span className="font-medium ml-2">1 GB</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Support:</span>
                          <span className="font-medium ml-2">Community</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Payment Method</h3>
                      <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg text-center">
                        <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                        <div className="text-gray-600 mb-4">No payment method added</div>
                        <button className="btn-primary">Add Payment Method</button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Upgrade Plans</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                          <h4 className="text-lg font-semibold mb-2">Pro Plan</h4>
                          <div className="text-2xl font-bold text-primary mb-4">$19<span className="text-sm font-normal">/month</span></div>
                          <ul className="space-y-2 text-sm text-gray-600 mb-6">
                            <li>• Unlimited products</li>
                            <li>• 10 GB storage</li>
                            <li>• Priority support</li>
                            <li>• Custom domain</li>
                          </ul>
                          <button className="btn-secondary w-full">Upgrade to Pro</button>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                          <h4 className="text-lg font-semibold mb-2">Enterprise</h4>
                          <div className="text-2xl font-bold text-primary mb-4">$49<span className="text-sm font-normal">/month</span></div>
                          <ul className="space-y-2 text-sm text-gray-600 mb-6">
                            <li>• Everything in Pro</li>
                            <li>• 100 GB storage</li>
                            <li>• Advanced analytics</li>
                            <li>• White-label solution</li>
                          </ul>
                          <button className="btn-secondary w-full">Upgrade to Enterprise</button>
                        </div>
                      </div>
                    </div>
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
