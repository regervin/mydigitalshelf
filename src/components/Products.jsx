import React from 'react'
import { Plus, Package } from 'lucide-react'
import './Products.css'

const Products = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="action-button primary">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <Package size={64} />
        </div>
        <h3>No products yet</h3>
        <p>Start by adding your first digital product to begin selling.</p>
        <button className="action-button primary">
          <Plus size={16} />
          Add Your First Product
        </button>
      </div>
    </div>
  )
}

export default Products
