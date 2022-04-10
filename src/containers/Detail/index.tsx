import { Card, Collapse, Image } from 'antd-mobile';
import { useEffect, useMemo, useState } from 'react';
import { OperationTypes } from '../../components/CardItem/types';
import Panel from '../../components/Panel';
import { axiosInstance } from '../../request';
import { getParams } from '../../request/getParams';
import { getOperation } from '../../utils/getOperation';
import styles from './style.module.scss';

interface IInfo {
  url: string;
  title: string;
  phone: string;
  gzh: string;
  address: string;
  others: string;
}

interface IListItem {
  id: string;
  name: string;
  batch: string;
  payment: string;
  production: string;
  amount: number;
  object: string;
  time: string;
  others: string;
  operation: OperationTypes;
}

const Detail = () => {
  const [info, setInfo] = useState<IInfo | null>(null);
  const [list, setList] = useState<IListItem[]>([]);
  const params = useMemo(() => getParams(), []);

  useEffect(() => {
    axiosInstance
      .get(
        `/getVacInfo?communityID=${params.communityID}&vaccineID=${params.vaccineID}`
      )
      .then((res) => {
        const data = res.data;
        // console.log(data);
        if (data && data.code === 200) {
          const comInfo = data.comInfo;
          const newInfo: IInfo = {
            url: comInfo.comPic,
            title: comInfo.comName,
            phone: comInfo.comPhone,
            gzh: comInfo.comWx,
            address: comInfo.comAddress,
            others: comInfo.comNote,
          };
          setInfo(newInfo);

          const newList: IListItem[] = [];
          data.vacInfo.forEach(
            (item: {
              vacID: string;
              vacKind: string;
              vacBatch: string;
              vacCost: string;
              vacManufacturer: string;
              vacCount: number;
              vacPerson: string;
              vacTime: string;
              note: string;
              state: '1' | '2' | '3' | '4';
            }) => {
              newList.push({
                id: item.vacID,
                name: item.vacKind,
                batch: item.vacBatch,
                payment: item.vacCost,
                production: item.vacManufacturer,
                amount: item.vacCount,
                object: item.vacPerson,
                time: item.vacTime,
                others: item.note,
                operation: getOperation(item.state),
              });
            }
          );

          setList(newList);
        }
      })
      .catch(() => {});
  }, [params]);

  return (
    <div className={styles.detail}>
      <Card>
        <Image src={info?.url || ''} />
        <div className={styles.content}>
          <h3>{info?.title}</h3>
          <p>联系电话：{info?.phone}</p>
          <p>公众号：{info?.gzh}</p>
          <p>地址：{info?.address}</p>
          <p>备注信息：{info?.others}</p>
        </div>
      </Card>

      {list.length > 0 ? (
        <Collapse defaultActiveKey={[list[0].id]} className={styles.collapse}>
          {list.map((item) => (
            <div key={item.id}>
              <Panel {...item} />
            </div>
          ))}
        </Collapse>
      ) : null}
    </div>
  );
};

export default Detail;
