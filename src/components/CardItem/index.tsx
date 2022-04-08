import { Button, Card } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { FC } from 'react';
import { OperationTypes } from './types';
import styles from './style.module.scss';

export interface ICardItemProps {
  status: string;
  title: string;
  type: string;
  operation: OperationTypes;
}

const CardItem: FC<ICardItemProps> = ({ status, title, type, operation }) => {
  const getStatusButton = () => {
    switch (operation) {
      case OperationTypes.FOLLOW:
        return <Button color='primary'>关注疫苗</Button>;
      case OperationTypes.SUBSCRIBE:
        return <Button color='success'>预约疫苗</Button>;
      case OperationTypes.FOLLOWED:
        return (
          <Button color='primary' disabled>
            您已关注
          </Button>
        );
      case OperationTypes.SUBSCRIBED:
        return (
          <Button color='success' disabled>
            您已预约
          </Button>
        );
      default:
        return <Button color='danger'>系统出错</Button>;
    }
  };

  return (
    <Card
      title={<h3 style={{ fontWeight: 'normal' }}>{title}</h3>}
      extra={<RightOutline />}
      className={styles.card}
    >
      <div className={styles.content}>
        <p>疫苗类型：{type}</p>
        <p>状态：{status}</p>
      </div>
      <div className={styles.footer}>
        {getStatusButton()}
      </div>
    </Card>
  );
};
export default CardItem;
