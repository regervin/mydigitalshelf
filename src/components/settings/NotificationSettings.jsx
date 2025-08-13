import React, { useState } from 'react'
import { Bell, Save } from 'lucide-react'

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailCustomers: true,
    emailMarketing: false,
    pushSales: true,
    pushCustomers: false,
    pushMarketing: false,
    weeklyReport: true,
    monthlyReport: true
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
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
        <Bell size={24} />
        <h2>Notification Settings</h2>
      </div>

      {success && (
        <div className="success-message">
          Notification preferences updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-subsection">
          <h3>Email Notifications</h3>
          <p>Choose which email notifications you'd like to receive</p>
          
          <div className="notification-options">
            <label className="notification-option">
              <input
                type="checkbox"
                name="emailSales"
                checked={notifications.emailSales}
                onChange={handleChange}
              />
              <div>
                <strong>New Sales</strong>
                <p>Get notified when someone purchases your products</p>
              </div>
            </label>

            <label className="notification-option">
              <input
                type="checkbox"
                name="emailCustomers"
                checked={notifications.emailCustomers}
                onChange={handleChange}
              />
              <div>
                <strong>New Customers</strong>
                <p>Get notified when new customers sign up</p>
              </div>
            </label>

            <label className="notification-option">
              <input
                type="checkbox"
                name="emailMarketing"
                checked={notifications.emailMarketing}
                onChange={handleChange}
              />
              <div>
                <strong>Marketing Updates</strong>
                <p>Receive tips and updates about growing your business</p>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-subsection">
          <h3>Push Notifications</h3>
          <p>Manage browser push notifications</p>
          
          <div className="notification-options">
            <label className="notification-option">
              <input
                type="checkbox"
                name="pushSales"
                checked={notifications.pushSales}
                onChange={handleChange}
              />
              <div>
                <strong>New Sales</strong>
                <p>Instant notifications for new purchases</p>
              </div>
            </label>

            <label className="notification-option">
              <input
                type="checkbox"
                name="pushCustomers"
                checked={notifications.pushCustomers}
                onChange={handleChange}
              />
              <div>
                <strong>New Customers</strong>
                <p>Instant notifications for new customer registrations</p>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-subsection">
          <h3>Reports</h3>
          <p>Automated reports sent to your email</p>
          
          <div className="notification-options">
            <label className="notification-option">
              <input
                type="checkbox"
                name="weeklyReport"
                checked={notifications.weeklyReport}
                onChange={handleChange}
              />
              <div>
                <strong>Weekly Report</strong>
                <p>Summary of your sales and performance</p>
              </div>
            </label>

            <label className="notification-option">
              <input
                type="checkbox"
                name="monthlyReport"
                checked={notifications.monthlyReport}
                onChange={handleChange}
              />
              <div>
                <strong>Monthly Report</strong>
                <p>Detailed monthly business analytics</p>
              </div>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="action-button primary"
          disabled={loading}
        >
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Notification Settings'}
        </button>
      </form>
    </div>
  )
}

export default NotificationSettings
