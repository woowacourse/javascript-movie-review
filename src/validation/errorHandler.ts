import { ErrorCode, ERROR_CODE } from './../constants/errors';
import { STATUS_CODE } from '../constants/errors';

const { STATUS_400, STATUS_401, STATUS_403, STATUS_404, STATUS_500 } = STATUS_CODE;

export const handleStatusCode = (status: number): keyof ErrorCode => {
  switch (status) {
    case STATUS_400:
      return ERROR_CODE.STATUS_400;
    case STATUS_401:
      return ERROR_CODE.STATUS_401;
    case STATUS_403:
      return ERROR_CODE.STATUS_403;
    case STATUS_404:
      return ERROR_CODE.STATUS_404;
    case STATUS_500:
      return ERROR_CODE.STATUS_500;
    default:
      return ERROR_CODE.UNEXPECTED_ERROR;
  }
};
