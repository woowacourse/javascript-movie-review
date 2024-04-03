import { ERROR_MESSAGE } from '../../../consts/message';

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;

    switch (true) {
      case statusCode >= 500:
        this.name = 'SERVER_ERROR';
        this.message = ERROR_MESSAGE.SERVER_ERROR;
        break;
      case statusCode === 404:
        this.name = 'NOT_FOUND';
        this.message = ERROR_MESSAGE.RESOURCE_NOT_FOUND;
        break;
      case statusCode === 401:
        this.name = 'AUTHENTICATION_FAILED';
        this.message = ERROR_MESSAGE.AUTHENTICATION_FAILED;
        break;
      case statusCode >= 400:
        this.name = 'NETWORK_ERROR';
        this.message = ERROR_MESSAGE.NETWORK_ERROR;
        break;
      default:
        this.name = 'FETCHING_ERROR';
        this.message = ERROR_MESSAGE.FETCH_FAILED;
        break;
    }
  }
}

export default CustomError;
