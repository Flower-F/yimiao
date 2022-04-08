import { Card, Collapse, Image } from 'antd-mobile';
import { OperationTypes } from '../../components/CardItem/types';
import { getStatusButton } from '../../utils/getStatusButton';
import styles from './style.module.scss';

const info = {
  url: 'https://cdn.jsdelivr.net/gh/Flower-F/picture@main/img/20220408215915.png',
  title: '小谷围社区',
  phone: '12345678901',
  gzh: '3123123212e',
  address: '广东省广州市番禺区小谷围 XXX 街道',
  others: '这是全大学城最好的小诊所',
};

const list = [
  {
    id: '123131312',
    name: '宫颈癌九价疫苗',
    batch: 1,
    payment: '100 元',
    production: '我是生产厂家',
    amount: 1000,
    object: '针对于 16 岁到 26 岁的青少年女性',
    time: '2022.5.1',
    others: '这是一段备注，不知道写什么，但是这是一段备注',
    operation: OperationTypes.FOLLOW,
  },
  {
    id: '2131312312',
    name: '宫颈癌九价疫苗',
    batch: 2,
    payment: '100 元',
    production: '我是生产厂家',
    amount: 1000,
    object: '针对于 16 岁到 26 岁的青少年女性',
    time: '2022.5.1',
    others: '这是一段备注，不知道写什么，但是这是一段备注',
    operation: OperationTypes.SUBSCRIBE,
  },
  {
    id: '12313123123',
    name: '宫颈癌九价疫苗',
    batch: 3,
    payment: '100 元',
    production: '我是生产厂家',
    amount: 1000,
    object: '针对于 16 岁到 26 岁的青少年女性',
    time: '2022.5.1',
    others: '这是一段备注，不知道写什么，但是这是一段备注',
    operation: OperationTypes.FOLLOWED,
  },
];

const Detail = () => {
  return (
    <div className={styles.detail}>
      <Card>
        <Image src={info.url} />
        <div className={styles.content}>
          <h3>{info.title}</h3>
          <p>联系电话：{info.phone}</p>
          <p>公众号：{info.gzh}</p>
          <p>地址：{info.address}</p>
          <p>备注信息：{info.others}</p>
        </div>
      </Card>

      <Collapse defaultActiveKey={[list[0].id]} className={styles.collapse}>
        {list.map((item) => (
          <Collapse.Panel key={item.id} title={item.name}>
            <div>
              <p>疫苗批次：{item.batch}</p>
              <p>疫苗费用：{item.payment}</p>
              <p>生产厂家：{item.production}</p>
              <p>疫苗数量：{item.amount}</p>
              <p>接种对象：{item.object}</p>
              <p>接种时间：{item.time}</p>
              <p>备注：{item.others}</p>
            </div>

            <div className={styles.btn}>{getStatusButton(item.operation)}</div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Detail;
