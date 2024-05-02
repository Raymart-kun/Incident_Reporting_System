import {user$} from '@/lib/states/userState';
import { Navigate, useLocation } from 'react-router-dom';

const publicRoute = ["/sign-in", "/sign-up"]

const  PrivateRoute = () => {
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
}

export default PrivateRoute;