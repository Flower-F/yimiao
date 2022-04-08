import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from './containers/Home';
import Header from './components/Header';
import Loading from './components/Loading';

const User = lazy(() => import('./containers/User'));

const avatarUrl =
  'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ';

const bannerSource =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

function App() {
  return (
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
  );
}

export default App;
