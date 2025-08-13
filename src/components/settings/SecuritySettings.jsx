import React, { useState } from 'react'
import { Shield, Eye, EyeOff, Save, Lock } from 'lucide-react'

const SecuritySettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [twoFactor, setTwoFactor] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess(false)
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleTwoFactorToggle = () => {
    setTwoFactor(!twoFactor)
    // In a real app, this would trigger 2FA setup/disable process
  }

  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <Shield size={24} />
        <h2>Security Settings</h2>
      </div>

      {success && (
        <div className="success-message">
          Security settings updated successfully!
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="settings-subsection">
        <h3>Change Password</h3>
        <p>Update your account password</p>

        <form onSubmit={handlePasswordSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-input">
              <Lock size={18} className="input-icon" />
              <input
                type={showPasswords.current ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input">
              <Lock size={18} className="input-icon" />
              <input
                type={showPasswords.new ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input">
              <Lock size={18} className="input-icon" />
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="action-button primary"
            disabled={loading}
          >
            <Save size={16} />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="settings-subsection">
        <h3>Two-Factor Authentication</h3>
        <p>Add an extra layer of security to your account</p>

        <div className="two-factor-setting">
          <div className="setting-info">
            <strong>Two-Factor Authentication</strong>
            <p>Secure your account with 2FA using an authenticator app</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={handleTwoFactorToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {twoFactor && (
          <div className="two-factor-info">
            <p>Two-factor authentication is enabled. Use your authenticator app to generate codes when logging in.</p>
          </div>
        )}
      </div>

      <div className="settings-subsection">
        <h3>Login Sessions</h3>
        <p>Manage your active login sessions</p>
        
        <div className="session-item">
          <div className="session-info">
            <strong>Current Session</strong>
            <p>Chrome on Windows • Active now</p>
          </div>
          <span className="session-status current">Current</span>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings
