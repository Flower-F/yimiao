import { Button } from 'antd-mobile';
import { OperationTypes } from '../components/CardItem/types';

export const getStatusButton = (operation: OperationTypes) => {
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
