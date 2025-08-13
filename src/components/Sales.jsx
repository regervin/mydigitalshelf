import React from 'react'
import { ShoppingCart, TrendingUp, Calendar } from 'lucide-react'

const Sales = () => {
  const sales = [
    {
      id: 1,
      product: 'Digital Marketing Course',
      customer: 'John Doe',
      amount: '$99',
      date: '2024-03-15',
      status: 'Completed'
    },
    {
      id: 2,
      product: 'E-book Bundle',
      customer: 'Sarah Smith',
      amount: '$29',
      date: '2024-03-14',
      status: 'Completed'
    },
    {
      id: 3,
      product: 'Premium Template Pack',
      customer: 'Mike Johnson',
      amount: '$49',
      date: '2024-03-13',
      status: 'Processing'
    }
  ]

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
            <p>1,247</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} />
          <div>
            <h3>This Month</h3>
            <p>89</p>
          </div>
        </div>
      </div>

      <div className="sales-table">
        <div className="table-header">
          <div className="header-cell">Product</div>
          <div className="header-cell">Customer</div>
          <div className="header-cell">Amount</div>
          <div className="header-cell">Date</div>
          <div className="header-cell">Status</div>
        </div>
        
        {sales.map((sale) => (
          <div key={sale.id} className="table-row">
            <div className="table-cell">{sale.product}</div>
            <div className="table-cell">{sale.customer}</div>
            <div className="table-cell font-weight-bold">{sale.amount}</div>
            <div className="table-cell">
              <div className="date-info">
                <Calendar size={14} />
                {sale.date}
              </div>
            </div>
            <div className="table-cell">
              <span className={`status ${sale.status.toLowerCase()}`}>
                {sale.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sales
