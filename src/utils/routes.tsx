import { Navigate, Outlet } from 'react-router-dom';
import { paths } from './path';

import { getAccessToken, getIsUser } from '../services/auth';

//로그인하면 접근 가능
const PrivateRoutes: React.FC = () => {
  const isLogin = getAccessToken();

  return isLogin ? <Outlet /> : <Navigate to={paths.LOGIN} />;
};

//유저만 접근 가능
const PrivateUserRoutes: React.FC = () => {
  const isUser = getIsUser();

  return isUser ? <Outlet /> : <Navigate to={paths.LOGIN} />;
};

//누구나 접근 가능
const PublicRoutes: React.FC = () => {
  const isLogin = getAccessToken();

  return isLogin ? <Navigate to={paths.HOME} /> : <Outlet />;
};

export { PrivateRoutes, PublicRoutes, PrivateUserRoutes };
