import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/_global.scss';
import './styles/_reset.scss';
import Layout from './utils/Layout';
import JoinPage from './pages/join/JoinPage';
import GatheringMainPage from './pages/gathering/GatheringMainPage';
import MainPage from './pages/main/MainPage';
import RankPage from './pages/rank/RankPage';
import { GatheringSearchPage } from './pages/gathering/GatheringSearchPage';
import { ParticipatingGroupPage } from './pages/gathering/ParticipatingGroupPage';
import { PostPage } from './pages/gathering/PostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <> hi dveloper🙃 im error page </>,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/profile', element: <>프로필 페이지 입니다</> },
      { path: '/rank', element: <RankPage /> },
      { path: '/challenge', element: <>챌린지 페이지 입니다</> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/join', element: <JoinPage /> },
      { path: '/livechat', element: <>실시간 채팅 페이지 입니다</> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/gathering/search', element: <GatheringSearchPage /> },
      { path: '/gathering/participate', element: <ParticipatingGroupPage /> },
      { path: '/gathering/post', element: <PostPage /> },
    ],
  },
  {
    path: '/login',
    element: <>로그인 페이지 입니다</>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
