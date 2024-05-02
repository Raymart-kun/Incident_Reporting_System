import { Navigate, Outlet } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


export default function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated()
  console.log("Nka login ba?: ",isAuthenticated)
  return (
    !isAuthenticated ? <Outlet /> : <Navigate to="/create-report" />
  )
}