import { getAuthClient } from '@authing/react-ui-components';
import {
  Button,
  Card,
  Input,
  List,
  Selector,
  SpinLoading,
  Toast,
} from 'antd-mobile';
import { useEffect, useState } from 'react';
import { ICardItemProps } from '../../components/CardItem';
import { OperationTypes } from '../../components/CardItem/types';
import { axiosInstance } from '../../request';
import { logout } from '../../utils/logout';
import { EditFamilyTypes, EditTypes, EditUserTypes } from './types';
import styles from './style.module.scss';

interface IListItem {
  id: string;
  operation: OperationTypes;
  title: string;
  type: string;
  communityId: string;
}

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
  const [originalList, setOriginalList] = useState<IListItem[]>([]);
  const [list, setList] = useState<IListItem[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [editUser, setEditUser] = useState(false);
  const [editFamily, setEditFamily] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);
  const [family, setFamily] = useState<IFamily | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const p1 = axiosInstance.get('/getUserInfo');
    const p2 = axiosInstance.get('/getUserVac');

    Promise.all([p1, p2])
      .then((values) => {
        const data1 = values[0].data;

        if (data1 && data1.code === 200) {
          setFamily({
            name: data1.info.familyName,
            phone: data1.info.familyPhone,
          });
          setUser({
            name: data1.info.userName,
            phone: data1.info.userPhone,
            id: data1.info.identityCard,
          });
        }

        const data2 = values[1].data;
        if (data2 && data2.code === 200) {
          const newList: IListItem[] = [];
          data2.vacList.forEach(
            (item: {
              vacID: string;
              state: '1' | '2';
              community: string;
              name: string;
              communityId: string;
            }) => {
              newList.push({
                id: item.vacID,
                operation:
                  item.state === '1'
                    ? OperationTypes.FOLLOWED
                    : OperationTypes.SUBSCRIBED,
                title: item.community,
                type: item.name,
                communityId: item.communityId,
              });
            }
          );
          setList(newList);
          setOriginalList(newList);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const changeList = (arr: string[]) => {
    setSelections(arr);

    const selection = arr[0];
    const newList: Omit<ICardItemProps, 'time'>[] = [];

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
        if (editUser) {
          axiosInstance
            .post('/updateUser', {
              userName: user?.name,
              identityCard: user?.id,
            })
            .catch(() => {});
        }
        setEditUser(!editUser);
      }
    } else if (id === EditTypes.FAMILY) {
      if (editUser) {
        Toast.show({
          icon: 'fail',
          content: '请先保存修改内容',
        });
      } else {
        if (editFamily) {
          axiosInstance
            .post('/updateFamily', {
              familyName: family?.name,
              familyPhone: family?.phone,
            })
            .catch(() => {});
        }
        setEditFamily(!editFamily);
      }
    }
  };

  const changeUserInfo = (type: EditUserTypes, value: string) => {
    if (!user) {
      return;
    }
    let newUser = null;
    if (type === EditUserTypes.NAME) {
      newUser = {
        ...user,
        name: value,
      };
    } else if (type === EditUserTypes.ID) {
      newUser = {
        ...user,
        id: value,
      };
    } else if (type === EditUserTypes.PHONE) {
      newUser = {
        ...user,
        phone: value,
      };
    }

    setUser(newUser);
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

  if (loading) {
    return (
      <div className={styles.dot}>
        <SpinLoading color='default' />
      </div>
    );
  }

  return (
    <div className={styles.user}>
      <Card title='个人信息' className={styles.info}>
        <>
          {!editUser ? (
            <div>
              <p>姓名：{user?.name}</p>
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
