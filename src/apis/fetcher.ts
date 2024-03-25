import { ERROR_MESSAGE } from '../constants/message';
import { BadRequestError, InvalidRequestError, NotFoundError, ServerError, UnAuthorizedError } from '../errors/error';

const fetcher = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });

    this.handleError(response.status);
    return await response.json();
  },

  handleError(status: number) {
    if (status === 400) throw new BadRequestError(ERROR_MESSAGE.BAD_REQUEST);
    else if (status === 401) throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
    else if (status === 404) throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    else if (status === 500 || status === 501 || status === 502 || status === 503)
      throw new ServerError(ERROR_MESSAGE.SERVER_ERROR);
    else if (status !== 200) throw new InvalidRequestError(ERROR_MESSAGE.INVALID_REQUEST);
  },
};

export default fetcher;
