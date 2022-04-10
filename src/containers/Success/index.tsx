import { Button, Card, Divider, NoticeBar, SpinLoading } from 'antd-mobile';
import { useEffect, useMemo, useState } from 'react';
import { axiosInstance } from '../../request';
import { getParams } from '../../request/getParams';
import styles from './style.module.scss';

interface IInfo {
  title: string;
  subscribedId: string;
  subscribedTime: string;
  payment: string;
  place: string;
  vaccinatedTime: string;
}

const Success = () => {
  const [info, setInfo] = useState<IInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useMemo(() => getParams(), []) || null;

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/addOrd?vaccineID=${params.vaccineID || ''}`)
      .then(() => {
        return axiosInstance.get(
          `getUserOrder?vacID=${params.vaccineID || ''}`
        );
      })
      .then((res) => {
        const data = res.data;
        if (data && data.code === 200) {
          setInfo({
            title: data.details.title,
            subscribedId: data.details.orderID,
            subscribedTime: data.details.orderTime,
            payment: data.details.vacCost,
            place: data.details.community,
            vaccinatedTime: data.details.vacTime,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return (
      <div className={styles.dot}>
        <SpinLoading color='default' />
      </div>
    );
  }

  return (
    <div className={styles.success}>
      <NoticeBar content='您已预约成功' color='info' />
      <Card className={styles.card}>
        <h3>{info?.title}</h3>
        <p>预约编号：{info?.subscribedId}</p>
        <p>预约时间：{info?.subscribedTime}</p>
        <Divider />
        <p>疫苗费用：{info?.payment}</p>
        <p>接种地点：{info?.place}</p>
        <p>接种时间：{info?.vaccinatedTime}</p>
        <Divider />
        <p>接种人：{params?.name}</p>
        <p>联系方式：{params?.phone}</p>
        <p>身份证号码：{params?.id}</p>
      </Card>
      <div className={styles.button}>
        <Button>返回</Button>
      </div>
    </div>
  );
};

export default Success;
