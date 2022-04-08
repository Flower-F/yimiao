import { Button, Card, List, Selector } from 'antd-mobile';
import { useState } from 'react';
import { ICardItemProps } from '../../components/CardItem';
import { OperationTypes } from '../../components/CardItem/types';
import styles from './style.module.scss';

const user = {
  name: '欠锅欠锅欠',
  phone: '12345678901',
  id: '123456789012345678',
};

const family = {
  name: '欠儿',
  phone: '12345678909',
};

const originalList = [
  {
    id: '21313214',
    operation: OperationTypes.SUBSCRIBED,
    title: '小谷围社区',
    type: '新冠疫苗',
  },
  {
    id: '21313216',
    operation: OperationTypes.FOLLOWED,
    title: '北京路',
    type: '四价疫苗',
  },
];

const options = [
  {
    label: '已预约',
    value: '1',
  },
  {
    label: '已关注',
    value: '2',
  },
];

const User = () => {
  const [list, setList] =
    useState<Omit<ICardItemProps, 'status'>[]>(originalList);
  const [selections, setSelections] = useState<string[]>([]);

  return (
    <div className={styles.user}>
      <Card title='个人信息' className={styles.info}>
        <div>
          <p>姓名：{user.name}</p>
          <p>联系方式：{user.phone}</p>
          <p>身份证号码：{user.id}</p>
        </div>

        <Button className={styles.edit}>修改信息</Button>
      </Card>

      <Card title='家庭成员' className={styles.info}>
        <div>
          <p>姓名：{family.name}</p>
          <p>联系方式：{family.phone}</p>
        </div>

        <Button className={styles.edit}>修改信息</Button>
      </Card>

      <Card className={styles.list}>
        <Selector
          options={options}
          value={selections}
          onChange={(arr) => {
            setSelections(arr);

            const selection = arr[0];
            const newList: Omit<ICardItemProps, 'status'>[] = [];

            if (selection === '1') {
              // 已预约
              originalList.forEach((item) => {
                if (item.operation === OperationTypes.SUBSCRIBED) {
                  newList.push(item);
                }
              });
              setList(newList);
            } else if (selection === '2') {
              // 已预约
              originalList.forEach((item) => {
                if (item.operation === OperationTypes.FOLLOWED) {
                  newList.push(item);
                }
              });
              setList(newList);
            } else {
              setList(originalList);
            }
          }}
        />

        <List header='预约情况'>
          {list.map((item) => {
            return (
              <List.Item key={item.id}>
                <div className={styles.item}>
                  <div>
                    <h3>{item.type}</h3>
                    <p>{item.title}</p>
                  </div>
                  <div className={styles.detail}>
                    <Button>查看详情</Button>
                  </div>
                </div>
              </List.Item>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

export default User;
