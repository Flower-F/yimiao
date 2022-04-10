import { OperationTypes } from "../components/CardItem/types";

export const getOperation = (status: '1' | '2' | '3' | '4') => {
  switch (status) {
    case '1':
      return OperationTypes.FOLLOWED;
    case '2':
      return OperationTypes.SUBSCRIBED;
    case '3':
      return OperationTypes.FOLLOW;
    case '4':
      return OperationTypes.SUBSCRIBE;
  }
};