import { STATUS_MESSAGE, StatusCode } from '../constants/errorStatus';

export const isValidStatusCode = (status: number): status is StatusCode => {
  return Object.keys(STATUS_MESSAGE).includes(status.toString());
};

export default class HttpError extends Error {
  public readonly status: number | undefined;

  constructor(status: number) {
    const message = isValidStatusCode(status)
      ? STATUS_MESSAGE[status]
      : '알 수 없는 오류가 발생했습니다.';
    super(message);
    this.status = status;
  }
}
