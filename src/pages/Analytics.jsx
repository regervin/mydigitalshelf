import React from 'react'
import Layout from '../components/Layout'
import { useData } from '../contexts/DataContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, DollarSign, Users, Package } from 'lucide-react'

const Analytics = () => {
  const { sales, products, customers } = useData()

  // Prepare data for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  const dailySalesData = last7Days.map(date => {
    const daySales = sales.filter(sale => 
      sale.created_at.split('T')[0] === date
    )
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      sales: daySales.length,
      revenue: daySales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
    }
  })

  const productSalesData = products.map(product => {
    const productSales = sales.filter(sale => sale.product_id === product.id)
    return {
      name: product.name,
      sales: productSales.length,
      revenue: productSales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
    }
  }).filter(item => item.sales > 0)

  const categoryData = products.reduce((acc, product) => {
    const category = product.category || 'other'
    const productSales = sales.filter(sale => sale.product_id === product.id)
    const revenue = productSales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
    
    if (!acc[category]) {
      acc[category] = { name: category, value: 0 }
    }
    acc[category].value += revenue
    return acc
  }, {})

  const categoryChartData = Object.values(categoryData)

  const COLORS = ['#49274a', '#94618e', '#F4DECB', '#f8eee7', '#8884d8']

  // Calculate key metrics
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
  const avgOrderValue = sales.length > 0 ? totalRevenue / sales.length : 0
  const conversionRate = customers.length > 0 ? (sales.length / customers.length) * 100 : 0

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Analytics</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card text-center">
            <DollarSign size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          
          <div className="card text-center">
            <TrendingUp size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">${avgOrderValue.toFixed(2)}</div>
            <div className="text-gray-600">Avg Order Value</div>
          </div>
          
          <div className="card text-center">
            <Users size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{conversionRate.toFixed(1)}%</div>
            <div className="text-gray-600">Conversion Rate</div>
          </div>
          
          <div className="card text-center">
            <Package size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{products.length}</div>
            <div className="text-gray-600">Active Products</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily Sales Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-primary mb-4">Daily Sales (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#49274a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="card">
            <h2 className="text-xl font-bold text-primary mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#49274a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Performance */}
          {productSalesData.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-primary mb-4">Product Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productSalesData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#94618e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Category Breakdown */}
          {categoryChartData.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-primary mb-4">Revenue by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* No Data State */}
        {sales.length === 0 && (
          <div className="card text-center py-12">
            <BarChart size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No analytics data yet</h3>
            <p className="text-gray-500">Analytics will appear here once you start making sales</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Analytics
