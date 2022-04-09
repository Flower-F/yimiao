import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { OperationTypes } from './types';
import { getStatusButton } from '../../utils/getStatusButton';
import styles from './style.module.scss';

export interface ICardItemProps {
  id: string;
  time: string;
  title: string;
  type: string;
  operation: OperationTypes;
}

const CardItem: FC<ICardItemProps> = ({
  time,
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

  const mapEnglishMonthToChinese = (month: string) => {
    switch (month) {
      case 'Jan':
        return '01';
      case 'Feb':
        return '02';
      case 'Mar':
        return '03';
      case 'Apr':
        return '04';
      case 'May':
        return '05';
      case 'Jun':
        return '06';
      case 'Jul':
        return '07';
      case 'Aug':
        return '08';
      case 'Sept':
        return '09';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
      case 'Dec':
        return '12';
    }
  };

  const getStandardTime = (time: string) => {
    const date = new Date(time).toString();
    const timeArray = date.split(' ');

    return `${timeArray[3]}-${mapEnglishMonthToChinese(timeArray[1])}-${
      timeArray[2]
    } ${timeArray[4]}`;
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
        <p>状态：{getStandardTime(time)} 开放预约</p>
      </div>
      <div className={styles.footer}>{Button}</div>
    </Card>
  );
};

export default CardItem;
