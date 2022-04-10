import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { OperationTypes } from '../components/CardItem/types';

export const useStatusButton = (
  operation: OperationTypes,
  setOperation: React.Dispatch<React.SetStateAction<OperationTypes>>,
  id: string
) => {
  const navigate = useNavigate();

  switch (operation) {
    case OperationTypes.FOLLOW:
      return (
        <Button
          color='primary'
          onClick={() => setOperation(OperationTypes.FOLLOWED)}
        >
          关注疫苗
        </Button>
      );
    case OperationTypes.SUBSCRIBE:
      return (
        <Button
          color='success'
          onClick={() => {
            navigate(`/form?vaccineID=${id}`);
            // navigate(`/form?communityID=${communityId}&vaccineID=${id}`);
            setOperation(OperationTypes.SUBSCRIBED);
          }}
        >
          预约疫苗
        </Button>
      );
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
