import React from 'react'
import { ShoppingCart } from 'lucide-react'
import './shared.css'

const Sales = () => {
  return (
    <div className="sales-page">
      <div className="page-header">
        <h1 className="page-title">Sales</h1>
      </div>

      <div className="sales-stats">
        <div className="stat-card">
          <ShoppingCart size={24} />
          <div>
            <h3>Total Sales</h3>
            <p>0</p>
          </div>
        </div>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <ShoppingCart size={64} />
        </div>
        <h3>No sales yet</h3>
        <p>Your sales transactions will appear here once customers start purchasing your products.</p>
      </div>
    </div>
  )
}

export default Sales
