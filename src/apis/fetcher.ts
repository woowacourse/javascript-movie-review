import { ERROR_MESSAGE } from '../constants/message';
import { BadRequestError, InvalidRequestError, NotFoundError, ServerError, UnAuthorizedError } from '../errors/error';

const fetcher = {
  async get<T>(url: string): Promise<T> {
    const result = fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    }).then(res => {
      if (!res.ok) this.handleFetchError(res.status);

      return res.json();
    });

    return result;
  },

  handleFetchError(status: number) {
    if (status === 400) throw new BadRequestError(ERROR_MESSAGE.BAD_REQUEST);
    else if (status === 401) throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
    else if (status === 404) throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    else if (status === 500 || status === 501 || status === 502 || status === 503)
      throw new ServerError(ERROR_MESSAGE.SERVER_ERROR);
    else throw new InvalidRequestError(ERROR_MESSAGE.INVALID_REQUEST);
  },
};

export default fetcher;
