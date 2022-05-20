import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../store';
import { getAccessTokenSelector } from '../../store/selectors';

export type AuthRouteProps = {
  onlyPublic?: boolean;
};

function ProtectedRoute({ onlyPublic = false }: AuthRouteProps) {
  const accessToken = useTypedSelector(getAccessTokenSelector);
  const location = useLocation();

  if (onlyPublic) {
    if (accessToken) {
      return <Navigate replace to={{ pathname: '/main' }} state={{ from: location }} />;
    }
    return <Outlet />;
  }

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate replace to={{ pathname: '/signin' }} state={{ from: location }} />;
}

export default ProtectedRoute;
