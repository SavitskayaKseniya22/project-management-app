import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState, useTypedSelector } from '../../store';

export type AuthRouteProps = {
  onlyPublic?: boolean;
};

function ProtectedRoute({ onlyPublic = false }: AuthRouteProps) {
  const accessToken = useTypedSelector((state: RootState) => state.authSlice.accessToken);
  const location = useLocation();

  if (onlyPublic) {
    if (accessToken) {
      return <Navigate replace to={{ pathname: '/' }} state={{ from: location }} />;
    }
    return <Outlet />;
  }

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate replace to={{ pathname: '/signin' }} state={{ from: location }} />;
}

export default ProtectedRoute;
