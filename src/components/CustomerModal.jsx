import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { X } from 'lucide-react'

const CustomerModal = ({ isOpen, onClose, customer = null }) => {
  const { addCustomer, updateCustomer } = useData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    first_name: customer?.first_name || '',
    last_name: customer?.last_name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || '',
    state: customer?.state || '',
    zip_code: customer?.zip_code || '',
    country: customer?.country || '',
    notes: customer?.notes || ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (customer) {
        const { error } = await updateCustomer(customer.id, formData)
        if (error) throw error
      } else {
        const { error } = await addCustomer(formData)
        if (error) throw error
      }
      
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Address Information</h3>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="NY"
                />
              </div>

              <div className="form-group">
                <label className="form-label">ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                placeholder="United States"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Additional Information</h3>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Additional notes about this customer..."
                rows="3"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Saving...' : (customer ? 'Update Customer' : 'Add Customer')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerModal
