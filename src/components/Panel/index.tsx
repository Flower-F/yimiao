import { FC, useState } from 'react';
import { getStatusButton } from '../../utils/getStatusButton';
import { OperationTypes } from '../CardItem/types';
import styles from './style.module.scss';

interface ICollapseProps {
  id: string;
  name: string;
  batch: number;
  payment: number;
  production: string;
  amount: number;
  object: string;
  time: string;
  others: string;
  operation: OperationTypes;
}

const Panel: FC<ICollapseProps> = (item) => {
  const [operation, setOperation] = useState(item.operation);

  return (
    <div>
      <h3>{item.name}</h3>
      <div>
        <p>疫苗批次：{item.batch}</p>
        <p>疫苗费用：{item.payment}</p>
        <p>生产厂家：{item.production}</p>
        <p>疫苗数量：{item.amount}</p>
        <p>接种对象：{item.object}</p>
        <p>接种时间：{item.time}</p>
        <p>备注：{item.others}</p>
      </div>

      <div className={styles.button}>
        {getStatusButton(operation, setOperation)}
      </div>
    </div>
  );
};

export default Panel;
