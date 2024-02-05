import { Navigate, Outlet } from 'react-router-dom';
import { getAuthenticationStatus, getUser } from '../util';

const PrivateRoute = () => {
  return  getAuthenticationStatus() ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace />
  );
};

const PrivateRoutePrincipal = () => {
  const user =  JSON.parse(getUser())
  return  user.role == "principal" ? (
    <Outlet/>
  ) : (
    <Navigate to="/" replace />
  );
};

export { PrivateRoute, PrivateRoutePrincipal };

