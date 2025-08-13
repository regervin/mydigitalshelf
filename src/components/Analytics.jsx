import React from 'react'
import { BarChart3 } from 'lucide-react'
import './shared.css'

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <BarChart3 size={64} />
        </div>
        <h3>No analytics data yet</h3>
        <p>Start selling products to see detailed analytics and insights about your business performance.</p>
      </div>
    </div>
  )
}

export default Analytics
