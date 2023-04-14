import {Outlet, Navigate} from 'react-router-dom'

export default function ProtectedRoute({isAuth, navigateTo}) {
  return isAuth ? <Outlet /> : <Navigate to={navigateTo} />
}
