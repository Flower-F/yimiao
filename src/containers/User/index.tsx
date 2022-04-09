import { getAuthClient } from '@authing/react-ui-components';
import { Button, Card, Input, List, Selector, Toast } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { ICardItemProps } from '../../components/CardItem';
import { OperationTypes } from '../../components/CardItem/types';
import { axiosInstance } from '../../request';
import { logout } from '../../utils/logout';
import styles from './style.module.scss';
import { EditFamilyTypes, EditTypes, EditUserTypes } from './types';

// const originalUser = {
//   name: '欠锅欠锅欠',
//   phone: '12345678901',
//   id: '123456789012345678',
// };

// const originalFamily = {
//   name: '欠儿',
//   phone: '12345678909',
// };

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

interface IUser {
  name: string;
  phone: string;
  id: string;
}

interface IFamily {
  name: string;
  phone: string;
}

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
  const [list, setList] = useState(originalList);
  const [selections, setSelections] = useState<string[]>([]);
  const [editUser, setEditUser] = useState(false);
  const [editFamily, setEditFamily] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);
  const [family, setFamily] = useState<IFamily | null>(null);

  useEffect(() => {
    axiosInstance
      .get('/getUserInfo')
      .then((res) => {
        const data = res?.data;
        if (data && data.code === 200) {
          setFamily({
            name: data.info.familyName,
            phone: data.info.familyPhone,
          });
          setUser({
            name: data.info.userName,
            phone: data.info.userPhone,
            id: data.info.identityCard,
          });
        }
      })
      .catch(() => {});
  }, []);

  const changeList = (arr: string[]) => {
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
  };

  const handleLogout = () => {
    getAuthClient()?.logout();
    logout();
    window.location.reload();
  };

  const changeEditStatus = (id: number) => {
    if (id === EditTypes.USER) {
      if (editFamily) {
        Toast.show({
          icon: 'fail',
          content: '请先保存修改内容',
        });
      } else {
        setEditUser(!editUser);
      }
    } else if (id === EditTypes.FAMILY) {
      if (editUser) {
        Toast.show({
          icon: 'fail',
          content: '请先保存修改内容',
        });
      } else {
        setEditFamily(!editFamily);
      }
    }
  };

  const changeUserInfo = (type: EditUserTypes, value: string) => {
    if (!user) {
      return;
    }
    if (type === EditUserTypes.NAME) {
      setUser({
        ...user,
        name: value,
      });
    } else if (type === EditUserTypes.ID) {
      setUser({
        ...user,
        id: value,
      });
    } else if (type === EditUserTypes.PHONE) {
      setUser({
        ...user,
        phone: value,
      });
    }
  };

  const changeFamilyInfo = (type: EditFamilyTypes, value: string) => {
    if (!family) {
      return;
    }
    if (type === EditFamilyTypes.NAME) {
      setFamily({
        ...family,
        name: value,
      });
    } else if (type === EditFamilyTypes.PHONE) {
      setFamily({
        ...family,
        phone: value,
      });
    }
  };

  return (
    <div className={styles.user}>
      <Card title='个人信息' className={styles.info}>
        <>
          {!editUser ? (
            <div>
              <p>姓名：{user?.name}</p>
              <p>联系方式：{user?.phone}</p>
              <p>身份证号码：{user?.id}</p>
            </div>
          ) : (
            <div>
              <div>
                姓名：
                <Input
                  value={user?.name}
                  placeholder='请输入姓名'
                  clearable
                  onChange={(name) => changeUserInfo(EditUserTypes.NAME, name)}
                />
              </div>
              <div>
                联系方式：
                <Input
                  value={user?.phone}
                  placeholder='请输入联系方式'
                  clearable
                  onChange={(phone) =>
                    changeUserInfo(EditUserTypes.PHONE, phone)
                  }
                />
              </div>
              <div>
                身份证号码：
                <Input
                  value={user?.id}
                  placeholder='请输入身份证号'
                  clearable
                  onChange={(id) => changeUserInfo(EditUserTypes.ID, id)}
                />
              </div>
            </div>
          )}
        </>
        <div className={styles.edit}>
          <Button onClick={() => changeEditStatus(EditTypes.USER)}>
            {!editUser ? '修改信息' : '保存信息'}
          </Button>
        </div>
      </Card>

      <Card title='家庭成员' className={styles.info}>
        {!editFamily ? (
          <div>
            <p>姓名：{family?.name}</p>
            <p>联系方式：{family?.phone}</p>
          </div>
        ) : (
          <div>
            <div>
              姓名：
              <Input
                defaultValue={family?.name}
                placeholder='请输入姓名'
                clearable
                onChange={(name) =>
                  changeFamilyInfo(EditFamilyTypes.NAME, name)
                }
              />
            </div>
            <div>
              联系方式：
              <Input
                defaultValue={family?.phone}
                placeholder='请输入联系方式'
                clearable
                onChange={(phone) =>
                  changeFamilyInfo(EditFamilyTypes.PHONE, phone)
                }
              />
            </div>
          </div>
        )}

        <div className={styles.edit}>
          <Button onClick={() => changeEditStatus(EditTypes.FAMILY)}>
            {!editFamily ? '修改信息' : '保存信息'}
          </Button>
        </div>
      </Card>

      <Card className={styles.selection}>
        <Selector options={options} value={selections} onChange={changeList} />

        <List className={styles.list}>
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

      <Button
        block
        color='danger'
        className={styles.logout}
        onClick={handleLogout}
      >
        退出登录
      </Button>
    </div>
  );
};

export default User;
