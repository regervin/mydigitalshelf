import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Save } from 'lucide-react'

const ProfileSettings = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <User size={24} />
        <h2>Profile Settings</h2>
      </div>

      {success && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-with-icon">
            <Mail size={18} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
          />
        </div>

        <button 
          type="submit" 
          className="action-button primary"
          disabled={loading}
        >
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default ProfileSettings
