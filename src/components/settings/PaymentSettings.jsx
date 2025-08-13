import React, { useState } from 'react'
import { CreditCard, Save } from 'lucide-react'

const PaymentSettings = () => {
  const [payoutSettings, setPayoutSettings] = useState({
    method: 'bank',
    bankAccount: '',
    routingNumber: '',
    paypalEmail: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePayoutChange = (e) => {
    setPayoutSettings({
      ...payoutSettings,
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
        <CreditCard size={24} />
        <h2>Payment Settings</h2>
      </div>

      {success && (
        <div className="success-message">
          Payment settings updated successfully!
        </div>
      )}

      <div className="settings-subsection">
        <h3>Payment Gateways</h3>
        <p>Configure how customers can pay for your products</p>
        
        <div className="payment-gateways">
          <div className="gateway-option">
            <input type="checkbox" id="stripe" defaultChecked />
            <label htmlFor="stripe">Stripe</label>
            <span className="gateway-status active">Active</span>
          </div>
          <div className="gateway-option">
            <input type="checkbox" id="paypal" />
            <label htmlFor="paypal">PayPal</label>
            <span className="gateway-status inactive">Inactive</span>
          </div>
        </div>
      </div>

      <div className="settings-subsection">
        <h3>Payout Method</h3>
        <p>Choose how you want to receive payments</p>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Payout Method</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="method"
                  value="bank"
                  checked={payoutSettings.method === 'bank'}
                  onChange={handlePayoutChange}
                />
                Bank Transfer
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="method"
                  value="paypal"
                  checked={payoutSettings.method === 'paypal'}
                  onChange={handlePayoutChange}
                />
                PayPal
              </label>
            </div>
          </div>

          {payoutSettings.method === 'bank' && (
            <>
              <div className="form-group">
                <label htmlFor="bankAccount">Bank Account Number</label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  value={payoutSettings.bankAccount}
                  onChange={handlePayoutChange}
                  placeholder="Enter your bank account number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="routingNumber">Routing Number</label>
                <input
                  type="text"
                  id="routingNumber"
                  name="routingNumber"
                  value={payoutSettings.routingNumber}
                  onChange={handlePayoutChange}
                  placeholder="Enter your routing number"
                />
              </div>
            </>
          )}

          {payoutSettings.method === 'paypal' && (
            <div className="form-group">
              <label htmlFor="paypalEmail">PayPal Email</label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                value={payoutSettings.paypalEmail}
                onChange={handlePayoutChange}
                placeholder="Enter your PayPal email"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="action-button primary"
            disabled={loading}
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Payout Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentSettings
