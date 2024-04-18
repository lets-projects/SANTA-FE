import { Route, Routes } from 'react-router-dom';

import './styles/_global.scss';
import './styles/_reset.scss';
import Navigation from './components/common/navigation/Navigation';
import MainPage from './MainPage';

function App() {
  return (
    <div className="app">
      <div id="wrapper">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPage></MainPage>
              </>
            }
          />
          <Route path="/porfile" />
          <Route path="/rank" />
          <Route path="/challenge" />
          <Route path="/myclub" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
