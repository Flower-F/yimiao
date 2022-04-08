import { FC } from 'react';
import CardItem, { ICardItemProps } from '../CardItem';
import styles from './style.module.scss';

interface ICardListProps {
  list: ICardItemProps[];
  className: string;
}

const CardList: FC<ICardListProps> = ({ list, className }) => {
  return (
    <ul className={`${styles.cardList} ${className}`}>
      {list.map((properties, index) => {
        return (
          <li key={index} className={styles.cardItem}>
            <CardItem {...properties} />
          </li>
        );
      })}
    </ul>
  );
};
export default CardList;
