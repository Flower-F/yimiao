import { Guard, User } from '@authing/react-ui-components';
import '@authing/react-ui-components/lib/index.min.css';
import './style.scss';

const Login = () => {
  const appId = '625053a3aa0ec8dbd0381ba1';
  const onLogin = (userInfo: User) => {
    localStorage.token = userInfo.token;
    localStorage.tokenExpiredAt = userInfo.tokenExpiredAt;
    localStorage.photo = userInfo.photo;
    localStorage.id = userInfo.id;
    window.location.reload();
  };

  return <Guard appId={appId} onLogin={onLogin} />;
};

export default Login;
