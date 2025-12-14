import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Sweets from './pages/Sweets'
import Admin from './pages/Admin'

function App() {
  const isAdmin = () => localStorage.getItem('role') === 'admin'
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Sweets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route
          path="/admin"
          element={
            isAdmin() ? <Admin /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  )
}

export default App