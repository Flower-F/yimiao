import { HeartOutline } from 'antd-mobile-icons';
import { FC, useEffect } from 'react';
import { Avatar } from 'antd-mobile';
import styles from './style.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface IHeaderProps {
  avatarUrl: string;
}

const Header: FC<IHeaderProps> = ({ avatarUrl }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
          <Avatar src={avatarUrl} />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
