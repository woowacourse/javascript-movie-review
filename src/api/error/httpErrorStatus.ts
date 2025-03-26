import { ERROR } from '../constant';

export const httpErrorStatus = (status: number) => {
  switch (status) {
    case 400:
    case 422:
      throw new Error(ERROR.VALID_INPUT);

    case 401:
    case 403:
      throw new Error(ERROR.VALID_AUTHENTICATION);

    case 404:
      throw new Error(ERROR.NOT_FOUND);

    case 429:
      throw new Error(ERROR.TOO_MANY_REQUEST);

    case 500:
    case 502:
    case 503:
    case 504:
      throw new Error(ERROR.SERVER_REQUEST);

    default:
      throw new Error(ERROR.UNEXPECTED);
  }
};
