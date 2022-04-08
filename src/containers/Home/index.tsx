import { Image } from 'antd-mobile';
import { FC } from 'react';
import { OperationTypes } from '../../components/CardItem/types';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
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

const avatarUrl =
  'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ';

const Home: FC<IHomeProps> = ({ bannerSource }) => {
  return (
    <div className={styles.home}>
      <Header avatarUrl={avatarUrl} />
      <Image src={bannerSource} className={styles.banner} />
      <CardList list={list} className={styles.cardList} />
    </div>
  );
};

export default Home;
