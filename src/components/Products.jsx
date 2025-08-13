import React from 'react'
import { Plus, Package, Edit, Trash2, Eye } from 'lucide-react'
import './Products.css'

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Digital Marketing Course',
      type: 'Course',
      price: '$99',
      sales: 45,
      status: 'Active'
    },
    {
      id: 2,
      name: 'E-book Bundle',
      type: 'E-book',
      price: '$29',
      sales: 123,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Premium Template Pack',
      type: 'Template',
      price: '$49',
      sales: 67,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Photography Course',
      type: 'Course',
      price: '$149',
      sales: 23,
      status: 'Draft'
    }
  ]

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="action-button primary">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <div className="product-icon">
                <Package size={24} />
              </div>
              <span className={`product-status ${product.status.toLowerCase()}`}>
                {product.status}
              </span>
            </div>
            
            <h3 className="product-name">{product.name}</h3>
            <p className="product-type">{product.type}</p>
            
            <div className="product-stats">
              <div className="stat">
                <span className="stat-label">Price</span>
                <span className="stat-value">{product.price}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Sales</span>
                <span className="stat-value">{product.sales}</span>
              </div>
            </div>
            
            <div className="product-actions">
              <button className="icon-button">
                <Eye size={16} />
              </button>
              <button className="icon-button">
                <Edit size={16} />
              </button>
              <button className="icon-button danger">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
