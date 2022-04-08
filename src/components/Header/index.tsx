import { FC, useEffect } from 'react';
import { Avatar } from 'antd-mobile';
import { HeartOutline } from 'antd-mobile-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

interface IHeaderProps {
  avatarUrl: string;
}

const Header: FC<IHeaderProps> = ({ avatarUrl }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToUserPage = () => {
    if (pathname !== '/user') {
      navigate('/user');
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, [pathname, navigate]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <HeartOutline /> 易苗
        </div>
        <div className={styles.avatar}>
          <Avatar src={avatarUrl} onClick={goToUserPage} />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
