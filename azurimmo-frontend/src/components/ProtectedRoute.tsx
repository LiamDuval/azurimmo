import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const gerant = localStorage.getItem('gerant')

  if (!gerant) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}