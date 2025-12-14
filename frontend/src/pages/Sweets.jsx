import { useEffect, useState } from 'react'
import { fetchSweets, purchaseSweet } from '../services/sweets'

function Sweets() {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSweets()
  }, [])

  const loadSweets = async () => {
    try {
      const data = await fetchSweets()
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

      <div className="row">
        {sweets.map(sweet => (
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
