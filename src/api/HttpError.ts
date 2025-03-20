import { STATUS_MESSAGE } from '../constants/errorStatus';

export default class HttpError extends Error {
  public readonly status: number | undefined;

  constructor(status: number) {
    if (!Object.hasOwnProperty.call(STATUS_MESSAGE, status)) {
      throw new Error(`Invalid status code: ${status}`);
    }

    super(STATUS_MESSAGE[status as keyof typeof STATUS_MESSAGE]);
  }
}
