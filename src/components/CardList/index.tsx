import { Button, Empty, Picker } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker-view';
import { FC, useState } from 'react';
import CardItem, { ICardItemProps } from '../CardItem';
import styles from './style.module.scss';

interface ICardListProps {
  list: ICardItemProps[];
  className: string;
}

const columnsData = [
  [
    { label: '新冠疫苗', value: '新冠疫苗' },
    { label: '九价疫苗', value: '九价疫苗' },
    { label: '二价疫苗', value: '二价疫苗' },
    { label: '四价疫苗', value: '四价疫苗' },
  ],
  [
    { label: '小谷围街社区卫生服务中心', value: '小谷围街社区卫生服务中心' },
    { label: '华工社区卫生服务中心', value: '华工社区卫生服务中心' },
    { label: '中山大学南校园门诊部', value: '中山大学南校园门诊部' },
  ],
];

const CardList: FC<ICardListProps> = ({ list: originalList, className }) => {
  const [selections, setSelections] = useState<PickerValue[] | undefined>([]);
  const [list, setList] = useState(originalList);
  const [visible, setVisible] = useState(false);

  return (
    <div className={`${styles.cardList} ${className}`}>
      <div className={styles.selection}>
        <Button onClick={() => setVisible(true)} color='default'>
          选择类型
        </Button>

        <Picker
          columns={columnsData}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={selections}
          onConfirm={(val, extend) => {
            const selectionTitle = extend.items[1]?.value;
            const selectionType = extend.items[0]?.value;

            const newList: ICardItemProps[] = [];
            originalList.forEach((item) => {
              if (
                item.title === selectionTitle &&
                item.type === selectionType
              ) {
                newList.push(item);
              }
            });

            setList(newList);
            setSelections(val);
          }}
        />

        <div className={styles.result}>{selections?.join(',') || '未选择'}</div>
      </div>

      <ul>
        {list.length > 0 ? (
          list.map((item) => {
            return (
              <li key={item.id} className={styles.cardItem}>
                <CardItem {...item} />
              </li>
            );
          })
        ) : (
          <Empty description='暂无数据' />
        )}
      </ul>
    </div>
  );
};

export default CardList;
