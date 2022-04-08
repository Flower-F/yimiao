import { Image } from 'antd-mobile';
import { FC } from 'react';
import { OperationTypes } from '../../components/CardItem/types';
import CardList from '../../components/CardList';
import styles from './style.module.scss';

const list = [
  {
    operation: OperationTypes.SUBSCRIBE,
    title: '小谷围社区',
    type: '新冠疫苗',
    status: '2014-12-24 14:27:00 开放预约',
  },
  {
    operation: OperationTypes.SUBSCRIBED,
    title: '小谷围社区',
    type: '新冠疫苗',
    status: '2014-12-24 14:27:00 开放预约',
  },
  {
    operation: OperationTypes.FOLLOW,
    title: 'C5 427',
    type: '九价疫苗',
    status: '2014-12-24 14:27:00 开放预约',
  },
  {
    operation: OperationTypes.FOLLOWED,
    title: '北京路',
    type: '四价疫苗',
    status: '2014-12-24 14:27:00 开放预约',
  },
];

interface IHomeProps {
  bannerSource: string;
}

const Home: FC<IHomeProps> = ({ bannerSource }) => {
  return (
    <div className={styles.home}>
      <Image src={bannerSource} className={styles.banner} />
      <CardList list={list} className={styles.cardList} />
    </div>
  );
};

export default Home;
