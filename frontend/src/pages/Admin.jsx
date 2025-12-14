import { useEffect, useState } from 'react'
import {
  fetchSweets,
  createSweet,
  deleteSweet,
  restockSweet
} from '../services/sweets'

function Admin() {
  const [sweets, setSweets] = useState([])
  const [newSweet, setNewSweet] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  })

  useEffect(() => {
    loadSweets()
  }, [])

  const loadSweets = async () => {
    const data = await fetchSweets()
    setSweets(data)
  }

  const handleAddSweet = async () => {
    await createSweet(newSweet)
    setNewSweet({ name: '', category: '', price: '', quantity: '' })
    loadSweets()
  }

  return (
    <div className="container py-5">
      <h2 className="mb-3 text-center">🛠 Admin Dashboard</h2>

      {/* Add Sweet */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">➕ Add New Sweet</h5>
          <div className="row g-2">
            {['name', 'category', 'price', 'quantity'].map((field) => (
              <div className="col-md-3" key={field}>
                <input
                  type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                  className="form-control"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newSweet[field]}
                  onChange={(e) =>
                    setNewSweet({ ...newSweet, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <div className="col-md-3 d-grid">
              <button className="btn btn-success" onClick={handleAddSweet}>
                Add Sweet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="row">
        {sweets.map((sweet) => (
          <div className="col-md-4 mb-4" key={sweet.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{sweet.name}</h5>
                <p className="text-muted">{sweet.category}</p>
                <p>₹ {sweet.price}</p>
                <p>Stock: {sweet.quantity}</p>

                <button
                  className="btn btn-warning w-100 mb-2"
                  onClick={async () => {
                    const amount = prompt('Enter restock amount')
                    if (amount) {
                      await restockSweet(sweet.id, Number(amount))
                      loadSweets()
                    }
                  }}
                >
                  Restock
                </button>

                <button
                  className="btn btn-danger w-100"
                  onClick={async () => {
                    if (window.confirm('Delete this sweet?')) {
                      await deleteSweet(sweet.id)
                      loadSweets()
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin