import React from 'react'
import { Users, Mail, Calendar } from 'lucide-react'

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joined: '2024-01-15',
      purchases: 3,
      total: '$177'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      joined: '2024-02-20',
      purchases: 1,
      total: '$29'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joined: '2024-01-08',
      purchases: 5,
      total: '$345'
    }
  ]

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
      </div>

      <div className="customers-table">
        <div className="table-header">
          <div className="header-cell">Customer</div>
          <div className="header-cell">Email</div>
          <div className="header-cell">Joined</div>
          <div className="header-cell">Purchases</div>
          <div className="header-cell">Total Spent</div>
        </div>
        
        {customers.map((customer) => (
          <div key={customer.id} className="table-row">
            <div className="table-cell">
              <div className="customer-info">
                <div className="customer-avatar">
                  <Users size={16} />
                </div>
                <span className="customer-name">{customer.name}</span>
              </div>
            </div>
            <div className="table-cell">
              <div className="email-info">
                <Mail size={14} />
                {customer.email}
              </div>
            </div>
            <div className="table-cell">
              <div className="date-info">
                <Calendar size={14} />
                {customer.joined}
              </div>
            </div>
            <div className="table-cell">{customer.purchases}</div>
            <div className="table-cell font-weight-bold">{customer.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers
