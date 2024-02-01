import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../util';
import Cookies from 'js-cookie';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const retrieveUser = getUser()
    const token = Cookies.get('Authorization')
  return  retrieveUser!=null && retrieveUser.isLoggedIn && token!=undefined ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace />
  );
};

export { PrivateRoute };

