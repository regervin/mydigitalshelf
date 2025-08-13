import React from 'react'
import { Plus, UserCheck } from 'lucide-react'
import './Memberships.css'

const Memberships = () => {
  return (
    <div className="memberships-page">
      <div className="page-header">
        <h1 className="page-title">Memberships</h1>
        <button className="action-button primary">
          <Plus size={16} />
          Create Membership
        </button>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <UserCheck size={64} />
        </div>
        <h3>No memberships yet</h3>
        <p>Create membership plans to offer recurring access to your content.</p>
        <button className="action-button primary">
          <Plus size={16} />
          Create Your First Membership
        </button>
      </div>
    </div>
  )
}

export default Memberships
