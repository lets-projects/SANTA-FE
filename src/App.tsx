// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import './styles/_global.scss';
import Main from './pages/Main'; //레이아웃 테스트
import Layout from './utils/Layout';

function App() {
  return (
    <div className="app">
      <div id="wrapper">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Main />} />
            <Route path="/rank" element={<Main />} />
            <Route path="/challenge" element={<Main />} />
          </Route>
          <Route path="/myclub" element={<>내 모임 바로가기 페이지 입니다</>} />
          <Route path="/livechat" element={<>실시간 채팅 페이지 입니다</>} />
          <Route path="/createclub" element={<>모임 만들기 페이지 입니다</>} />
          <Route path="/setting" element={<>설정 페이지 입니다</>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
