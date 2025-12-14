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

  const buildQueryParams = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null
      )
    )
  }

  const loadSweets = async (customFilters = filters) => {
    setLoading(true)

    const queryParams = buildQueryParams(customFilters)

    try {
      const data = await fetchSweets(queryParams)
      setSweets(data)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (id) => {
    await purchaseSweet(id, 1)
    loadSweets()
  }

  if (loading) {
    return <p className="text-center mt-5">Loading sweets...</p>
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🍬 Available Sweets</h2>

      {/* Filters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min ₹"
                value={filters.min_price}
                onChange={(e) =>
                  setFilters({ ...filters, min_price: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max ₹"
                value={filters.max_price}
                onChange={(e) =>
                  setFilters({ ...filters, max_price: e.target.value })
                }
              />
            </div>

            <div className="col-md-2 d-grid">
              <button
                className="btn btn-dark"
                onClick={() => loadSweets()}
              >
                Apply
              </button>

              <button
                className="btn btn-outline-secondary mt-2"
                onClick={() => {
                  const empty = {
                    name: '',
                    category: '',
                    min_price: '',
                    max_price: ''
                  }
                  setFilters(empty)
                  loadSweets(empty)
                }}
              >
                Reset
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
                <p className="card-text text-muted">{sweet.category}</p>
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
