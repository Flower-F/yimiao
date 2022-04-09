import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { OperationTypes } from './types';
import { getStatusButton } from '../../utils/getStatusButton';
import styles from './style.module.scss';

export interface ICardItemProps {
  id: string;
  status: string;
  title: string;
  type: string;
  operation: OperationTypes;
}

const CardItem: FC<ICardItemProps> = ({
  status,
  title,
  type,
  operation: originalOperation,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [operation, setOperation] = useState(originalOperation);

  const Button = getStatusButton(operation, setOperation);

  const goToDetail = () => {
    if (pathname !== '/detail') {
      navigate('/detail');
    }
  };

  return (
    <Card
      title={<h3 style={{ fontWeight: 'normal' }}>{title}</h3>}
      extra={<RightOutline />}
      className={styles.card}
      onHeaderClick={goToDetail}
    >
      <div className={styles.content}>
        <p>疫苗类型：{type}</p>
        <p>状态：{status}</p>
      </div>
      <div className={styles.footer}>{Button}</div>
    </Card>
  );
};

export default CardItem;
