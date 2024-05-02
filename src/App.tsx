import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/_global.scss';
import './styles/_reset.scss';
import { paths } from './utils/path';
import Layout from './utils/Layout';
import JoinPage from './pages/join/JoinPage';
import GatheringMainPage from './pages/gathering/GatheringMainPage';
import MainPage from './pages/main/MainPage';
import RankPage from './pages/rank/RankPage';
import { GatheringSearchPage } from './pages/gathering/GatheringSearchPage';
import { ParticipatingGroupPage } from './pages/gathering/ParticipatingGroupPage';
import { PostPage } from './pages/gathering/PostPage';
import { GatheringDetailPage } from './pages/gathering/GatheringDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChallengePage from './pages/challenge/ChallengePage';
import TrophyPage from './pages/trophy/TrophyPage';
import FindAccountPage from './pages/user/find/FindAccountPage';
import FindPasswordPage from './pages/user/find/FindPasswordPage';
import CategoryPage from './pages/user/category/CategoryPage';
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import { PrivateRoutes, PublicRoutes } from './utils/routes';
import ResetPasswordPage from './pages/user/find/ResetPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: paths.RANK, element: <RankPage /> },
      { path: paths.GATHERING, element: <GatheringMainPage /> },
      { path: '/livechat', element: <>실시간 채팅 페이지 입니다</> },
      { path: '/gathering/search', element: <GatheringSearchPage /> },
      { path: '/gathering/participate', element: <ParticipatingGroupPage /> },
      { path: '/gathering/post', element: <PostPage /> },
      { path: '/gathering/detail', element: <GatheringDetailPage /> },
      { path: paths.TROPHY, element: <TrophyPage /> },

      {
        element: <PrivateRoutes />,
        children: [
          { path: paths.PROFILE, element: <ProfilePage /> },
          { path: paths.CHALLENGE, element: <ChallengePage /> },
          { path: paths.CATEGORY, element: <CategoryPage /> },
        ],
      },
      {
        element: <PublicRoutes />,
        children: [
          { path: paths.JOIN, element: <JoinPage /> },
          { path: paths.FIND_ACCOUNT, element: <FindAccountPage /> },
          { path: paths.FIND_PASSWORD, element: <FindPasswordPage /> },
          { path: paths.RESET_PASSWORD, element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <PublicRoutes />,
    children: [{ path: paths.LOGIN, element: <LoginPage /> }],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
