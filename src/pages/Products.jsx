import React, { useState } from 'react'
import Layout from '../components/Layout'
import ProductModal from '../components/ProductModal'
import { useData } from '../contexts/DataContext'
import { Plus, Edit, Trash2, Download } from 'lucide-react'

const Products = () => {
  const { products, deleteProduct } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Products</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {products.length > 0 ? (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Downloads</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </td>
                      <td className="capitalize">{product.category}</td>
                      <td>${product.price?.toFixed(2)}</td>
                      <td>
                        {product.discount ? `$${product.discount.toFixed(2)}` : '-'}
                      </td>
                      <td>{product.download_count || 0} / {product.download_limit}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status || 'active'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <Download size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first digital product</p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={handleCloseModal}
        product={editingProduct}
      />
    </Layout>
  )
}

export default Products
