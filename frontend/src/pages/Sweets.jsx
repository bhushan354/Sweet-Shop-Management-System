import { useEffect, useState } from 'react'
import { fetchSweets, purchaseSweet } from '../services/sweets'
import { useNavigate } from 'react-router-dom'

function Sweets() {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    min_price: '',
    max_price: ''
  })

  const navigate = useNavigate()
  const isAuth = !!localStorage.getItem('token')

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
    if (!isAuth) {
      const goToLogin = window.confirm(
        'You need to Login or Register to purchase sweets 🍬\n\nGo to Login page?'
      )

      if (goToLogin) {
        navigate('/login')
      }
      return
    }

    await purchaseSweet(id, 1)
    loadSweets()
  }

  if (loading) {
    return <p className="text-center mt-5 text-muted">Loading sweets…</p>
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-semibold">
        🍬 Available Sweets
      </h2>

      {/* Filters */}
      <div className="card mb-4 shadow-sm border border-secondary-subtle rounded-4">
        <div className="card-body bg-light rounded-4">
          <h6 className="text-muted mb-3 fw-semibold">
            Filter Sweets
          </h6>

          <div className="row g-3 align-items-end">
            {['name', 'category'].map((f) => (
              <div className="col-md-3" key={f}>
                <label className="form-label text-muted text-capitalize">
                  {f}
                </label>
                <input
                  className="form-control"
                  placeholder={`Search ${f}`}
                  value={filters[f]}
                  onChange={(e) =>
                    setFilters({ ...filters, [f]: e.target.value })
                  }
                />
              </div>
            ))}

            {['min_price', 'max_price'].map((f) => (
              <div className="col-md-2" key={f}>
                <label className="form-label text-muted">
                  {f === 'min_price' ? 'Min Price' : 'Max Price'}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="₹"
                  value={filters[f]}
                  onChange={(e) =>
                    setFilters({ ...filters, [f]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="col-md-2 d-grid">
              <button
                className="btn btn-dark"
                onClick={() => loadSweets()}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="row">
        {sweets.map((sweet) => (
          <div className="col-lg-4 col-md-6 mb-4" key={sweet.id}>
            <div className="card h-100 shadow-sm border border-secondary-subtle rounded-4">
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <h5 className="fw-semibold mb-1">
                    {sweet.name}
                  </h5>
                  <span className="badge bg-secondary-subtle text-dark">
                    {sweet.category}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="fs-5 fw-semibold">
                    ₹ {sweet.price}
                  </span>
                </div>

                <div className="mb-3">
                  <span
                    className={`badge ${
                      sweet.quantity > 0
                        ? 'bg-success-subtle text-success'
                        : 'bg-danger-subtle text-danger'
                    }`}
                  >
                    Stock: {sweet.quantity}
                  </span>
                </div>

                <button
                  className="btn btn-primary mt-auto"
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet.id)}
                >
                  {!isAuth
                    ? 'Login to Purchase'
                    : sweet.quantity === 0
                      ? 'Out of Stock'
                      : 'Purchase'}
                </button>
              </div>
            </div>
          </div>
        ))}

        {sweets.length === 0 && (
          <p className="text-center text-muted mt-5">
            No sweets found matching your filters.
          </p>
        )}
      </div>
    </div>
  )
}

export default Sweets