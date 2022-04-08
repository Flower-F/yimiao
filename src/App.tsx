import { Suspense, lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { initAuthClient } from '@authing/react-ui-components';
import Home from './containers/Home';
import Login from './containers/Login';
import Header from './components/Header';
import Loading from './components/Loading';
import { getLoginStatus } from './utils/login';

const User = lazy(() => import('./containers/User'));

initAuthClient({
  appId: '62110454c4fafbf8af15124a',
});

const avatarUrl = localStorage.getItem('photo') || '';

const bannerSource =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

function App() {
  const login = getLoginStatus();

  return !login ? (
    <Login />
  ) : (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Header avatarUrl={avatarUrl} />}>
          <Route index element={<Home bannerSource={bannerSource} />} />
          <Route path='home' element={<Home bannerSource={bannerSource} />} />
          <Route
            path='user'
            element={
              <Suspense fallback={<Loading />}>
                <User />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '30px',
                    marginTop: '20px',
                  }}
                >
                  404 Not Found
                </p>
              </main>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
