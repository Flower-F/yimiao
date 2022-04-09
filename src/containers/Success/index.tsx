import { Button, Card, Divider, NoticeBar } from 'antd-mobile';
import styles from './style.module.scss';

const info = {
  title: '宫颈癌九价疫苗',
  subscribedId: '123123123',
  subscribedTime: '2022.4.11',
  payment: 1200,
  place: '小谷围社区',
  vaccinatedTime: '2022.5.1',
  name: 'aaa',
  phone: '12345678909',
  id: '123456789012345678',
};

const Success = () => {
  return (
    <div className={styles.success}>
      <NoticeBar content='您已预约成功' color='info' />
      <Card className={styles.card}>
        <h3>{info.title}</h3>
        <p>预约编号：{info.subscribedId}</p>
        <p>预约时间：{info.subscribedTime}</p>
        <Divider />
        <p>疫苗费用：{info.payment}</p>
        <p>接种地点：{info.place}</p>
        <p>接种时间：{info.vaccinatedTime}</p>
        <Divider />
        <p>接种人：{info.name}</p>
        <p>联系方式：{info.phone}</p>
        <p>身份证号码：{info.id}</p>
      </Card>
      <div className={styles.button}>
        <Button>返回</Button>
      </div>
    </div>
  );
};

export default Success;
