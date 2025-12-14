import { useState } from 'react'
import { register } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await register({ email, password })
      navigate('/login')
    } catch {
      setError('Registration failed')
    }
  }

  return (
    <div className="container py-4 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-lg border border-secondary-subtle rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center fw-semibold mb-1">
                Create Account
              </h3>
              <p className="text-center text-muted mb-4">
                Join Sweet Shop in seconds
              </p>

              {error && (
                <div className="alert alert-danger text-center py-2">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-success btn-lg w-100">
                  Register
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Already have an account?</span>{' '}
                <Link to="/login" className="fw-semibold">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register