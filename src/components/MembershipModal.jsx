import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { X } from 'lucide-react'

const MembershipModal = ({ isOpen, onClose, membership = null }) => {
  const { addMembership } = useData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: membership?.name || '',
    description: membership?.description || '',
    price: membership?.price || '',
    billing_cycle: membership?.billing_cycle || 'monthly',
    features: membership?.features || '',
    max_members: membership?.max_members || ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const membershipData = {
        ...formData,
        price: parseFloat(formData.price),
        max_members: formData.max_members ? parseInt(formData.max_members) : null,
        features: formData.features.split('\n').filter(f => f.trim())
      }

      const { error } = await addMembership(membershipData)
      if (error) throw error
      
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
            {membership ? 'Edit Membership' : 'Create New Membership'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Membership Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Billing Cycle</label>
              <select
                name="billing_cycle"
                value={formData.billing_cycle}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Features (one per line)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Access to premium content&#10;Priority support&#10;Monthly webinars"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Max Members (Optional)</label>
            <input
              type="number"
              name="max_members"
              value={formData.max_members}
              onChange={handleChange}
              className="form-input"
              min="1"
              placeholder="Leave empty for unlimited"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-4">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Creating...' : (membership ? 'Update Membership' : 'Create Membership')}
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

export default MembershipModal
