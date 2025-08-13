import React from 'react'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-header">
            <h3>Revenue Trend</h3>
            <TrendingUp size={20} />
          </div>
          <div className="chart-placeholder">
            <p>Revenue chart would go here</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3>Customer Growth</h3>
            <Users size={20} />
          </div>
          <div className="chart-placeholder">
            <p>Customer growth chart would go here</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3>Product Performance</h3>
            <BarChart3 size={20} />
          </div>
          <div className="chart-placeholder">
            <p>Product performance chart would go here</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3>Sales by Category</h3>
            <DollarSign size={20} />
          </div>
          <div className="chart-placeholder">
            <p>Sales category chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
