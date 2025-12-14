import { useEffect, useState } from 'react'
import { fetchSweets, purchaseSweet } from '../services/sweets'

function Sweets() {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    min_price: '',
    max_price: ''
  })

  useEffect(() => {
    loadSweets()
  }, [])

  const buildQueryParams = (data) =>
    Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '' && v !== null)
    )

  const loadSweets = async (customFilters = filters) => {
    setLoading(true)
    try {
      const data = await fetchSweets(buildQueryParams(customFilters))
      setSweets(data)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (id) => {
    await purchaseSweet(id, 1)
    loadSweets()
  }

  if (loading) return <p className="text-center mt-5">Loading sweets...</p>

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🍬 Available Sweets</h2>

      {/* Filters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            {['name', 'category'].map((f) => (
              <div className="col-md-3" key={f}>
                <input
                  className="form-control"
                  placeholder={f}
                  value={filters[f]}
                  onChange={(e) =>
                    setFilters({ ...filters, [f]: e.target.value })
                  }
                />
              </div>
            ))}
            {['min_price', 'max_price'].map((f) => (
              <div className="col-md-2" key={f}>
                <input
                  type="number"
                  className="form-control"
                  placeholder={f}
                  value={filters[f]}
                  onChange={(e) =>
                    setFilters({ ...filters, [f]: e.target.value })
                  }
                />
              </div>
            ))}
            <div className="col-md-2 d-grid">
              <button className="btn btn-dark" onClick={() => loadSweets()}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="row">
        {sweets.map((sweet) => (
          <div className="col-md-4 mb-4" key={sweet.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5>{sweet.name}</h5>
                <p className="text-muted">{sweet.category}</p>
                <p>₹ {sweet.price}</p>
                <p>Stock: {sweet.quantity}</p>

                <button
                  className="btn btn-primary w-100"
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet.id)}
                >
                  {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sweets