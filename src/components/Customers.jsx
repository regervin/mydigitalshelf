import React from 'react'
import { Users } from 'lucide-react'
import './shared.css'

const Customers = () => {
  return (
    <div className="customers-page">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <Users size={64} />
        </div>
        <h3>No customers yet</h3>
        <p>Your customers will appear here once you start making sales.</p>
      </div>
    </div>
  )
}

export default Customers
