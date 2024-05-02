import { Outlet } from "react-router-dom"
import PrivateRoute from "../PrivateRoute"

const AuthPage = () => {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      <PrivateRoute />
      <Outlet />
    </div>
  )
}

export default AuthPage