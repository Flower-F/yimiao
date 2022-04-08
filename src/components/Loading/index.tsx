import { SpinLoading } from 'antd-mobile';
import styles from './style.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <SpinLoading color='default' />
    </div>
  );
};
export default Loading;
