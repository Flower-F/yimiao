import styles from './style.module.scss';
import { HeartOutline } from 'antd-mobile-icons';
import { FC } from 'react';
import { Avatar } from 'antd-mobile';

interface IHeaderProps {
  avatarUrl: string;
}

const Header: FC<IHeaderProps> = ({ avatarUrl }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <HeartOutline /> 易苗
      </div>
      <div className={styles.avatar}>
        <Avatar src={avatarUrl} />
      </div>
    </div>
  );
};
export default Header;
