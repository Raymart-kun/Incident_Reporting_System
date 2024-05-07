import {user$} from '@/lib/states/userState';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { observer } from "@legendapp/state/react"

const publicRoute = ["/sign-in", "/sign-up"]

const  PrivateRoute = observer(() => {
  const {pathname} = useLocation()
  const isLoggedIn = user$.isLoggedIn.get()
  
  if (isLoggedIn) {
    if(!publicRoute.includes(pathname)) {
      return <Navigate to={pathname} />
    }
    return <Navigate to="/create-report" />
  }

  if (!isLoggedIn) {
    if(publicRoute.includes(pathname)) {
      return <Navigate to={pathname} />
    }
    return <Navigate to="/sign-in" />
  }
})

export default PrivateRoute;