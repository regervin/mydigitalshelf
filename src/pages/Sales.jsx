import React from 'react'
import Layout from '../components/Layout'
import { useData } from '../contexts/DataContext'
import { TrendingUp, DollarSign, ShoppingCart, Calendar } from 'lucide-react'

const Sales = () => {
  const { sales, products } = useData()

  // Calculate sales stats
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
  const todaySales = sales.filter(sale => {
    const today = new Date().toDateString()
    const saleDate = new Date(sale.created_at).toDateString()
    return today === saleDate
  })
  const thisMonthSales = sales.filter(sale => {
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    return new Date(sale.created_at) >= monthAgo
  })

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId)
    return product?.name || 'Unknown Product'
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Sales</h1>
        </div>

        {/* Sales Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card text-center">
            <DollarSign size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          
          <div className="card text-center">
            <ShoppingCart size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{sales.length}</div>
            <div className="text-gray-600">Total Sales</div>
          </div>
          
          <div className="card text-center">
            <Calendar size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{todaySales.length}</div>
            <div className="text-gray-600">Today's Sales</div>
          </div>
          
          <div className="card text-center">
            <TrendingUp size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{thisMonthSales.length}</div>
            <div className="text-gray-600">This Month</div>
          </div>
        </div>

        {/* Sales Table */}
        {sales.length > 0 ? (
          <div className="card">
            <h2 className="text-xl font-bold text-primary mb-4">Recent Sales</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {sales
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((sale) => (
                    <tr key={sale.id}>
                      <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                      <td>{getProductName(sale.product_id) || sale.product_name}</td>
                      <td>{sale.customer_email}</td>
                      <td>${sale.amount?.toFixed(2)}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sale.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : sale.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {sale.status || 'completed'}
                        </span>
                      </td>
                      <td>{sale.payment_method || 'Card'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <TrendingUp size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No sales yet</h3>
            <p className="text-gray-500">Sales will appear here when customers make purchases</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Sales
