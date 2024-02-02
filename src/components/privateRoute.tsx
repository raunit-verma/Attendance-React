import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUser } from '../util';

const PrivateRoute = () => {
    const token = Cookies.get('Authorization')
  return  token ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace />
  );
};

const PrivateRoutePrincipal = () => {
  const token = Cookies.get('Authorization')
  const role = Cookies.get('Role')
return  token && role == "principal" ? (
  <Outlet/>
) : (
  <Navigate to="/" replace />
);
};

export { PrivateRoute, PrivateRoutePrincipal };

