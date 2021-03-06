import { Image, SpinLoading } from 'antd-mobile';
import { FC, useEffect, useState } from 'react';
import { OperationTypes } from '../../components/CardItem/types';
import CardList from '../../components/CardList';
import { axiosInstance } from '../../request';
import { getOperation } from '../../utils/getOperation';
import styles from './style.module.scss';

interface IListItem {
  id: string;
  operation: OperationTypes;
  type: string;
  time: string;
  title: string;
  communityId: string;
}

interface IHomeProps {
  bannerSource: string;
}

const Home: FC<IHomeProps> = ({ bannerSource }) => {
  const [list, setList] = useState<IListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/getAllVac')
      .then((res) => {
        const data = res.data;
        if (data && data.code === 200) {
          const newList: IListItem[] = [];
          data.vacList.forEach(
            (item: {
              vacID: string;
              state: '1' | '2' | '3' | '4';
              vacKind: string;
              opentime: string;
              community: string;
              communityID: string;
            }) => {
              newList.push({
                id: item.vacID,
                operation: getOperation(item.state),
                type: item.vacKind,
                time: item.opentime,
                title: item.community,
                communityId: item.communityID,
              });
            }
          );

          setList(newList);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.dot}>
        <SpinLoading color='default' />
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <Image src={bannerSource} className={styles.banner} />
      <CardList list={list} className={styles.cardList} />
    </div>
  );
};

export default Home;
