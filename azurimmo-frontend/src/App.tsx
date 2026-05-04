import { Routes, Route, Navigate } from 'react-router-dom'
import ListAppartement from './components/ListAppartement'
import AppartementDetail from './components/AppartementDetail'
import LoginPage from './pages/LoginPage'
import GerantDashboard from './pages/GerantDashboard'
import GerantBatiments from './pages/GerantBatiments'
import GerantAppartements from './pages/GerantAppartements'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListAppartement onSelectAppartement={() => {}} />} />
      <Route path="/appartements/:id" element={<AppartementDetail />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/gerant" element={<ProtectedRoute />}>
        <Route path="dashboard"    element={<GerantDashboard />} />
        <Route path="batiments"    element={<GerantBatiments />} />
        <Route path="appartements" element={<GerantAppartements />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App