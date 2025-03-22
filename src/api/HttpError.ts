import { STATUS_MESSAGE } from '../constants/errorStatus';

export default class HttpError extends Error {
  public readonly status: number | undefined;

  constructor(status: number) {
    if (!(status in STATUS_MESSAGE)) {
      throw new Error(`에러가 발생했어요. ${status}`);
    }

    super(STATUS_MESSAGE[status as keyof typeof STATUS_MESSAGE]);
  }
}
