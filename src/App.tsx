import { Suspense, lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { initAuthClient } from '@authing/react-ui-components';
import Home from './containers/Home';
import Login from './containers/Login';
import Header from './components/Header';
import Loading from './components/Loading';
import { getLoginStatus } from './utils/login';
import { ErrorBlock } from 'antd-mobile';

const Form = lazy(() => import('./containers/Form'));
const User = lazy(() => import('./containers/User'));
const Detail = lazy(() => import('./containers/Detail'));
const Success = lazy(() => import('./containers/Success'));

initAuthClient({
  appId: '625053a3aa0ec8dbd0381ba1',
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
            path='detail'
            element={
              <Suspense fallback={<Loading />}>
                <Detail />
              </Suspense>
            }
          />
          <Route
            path='form'
            element={
              <Suspense fallback={<Loading />}>
                <Form />
              </Suspense>
            }
          />
          <Route
            path='success'
            element={
              <Suspense fallback={<Loading />}>
                <Success />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <main>
                <ErrorBlock status='default' fullPage />
              </main>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
