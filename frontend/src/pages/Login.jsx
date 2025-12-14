import { useState } from 'react'
import { login } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await login({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="container py-4 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-lg border border-secondary-subtle rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center fw-semibold mb-1">Welcome Back</h3>
              <p className="text-center text-muted mb-4">
                Login to continue to Sweet Shop
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-dark btn-lg w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Don’t have an account?</span>{' '}
                <Link to="/register" className="fw-semibold">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login