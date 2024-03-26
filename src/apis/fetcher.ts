import { ERROR_MESSAGE } from '../constants/message';
import {
  BadRequestError,
  InvalidRequestError,
  PageNotFoundError,
  ServerError,
  UnAuthorizedError,
} from '../errors/error';
import { dom } from '../utils/dom';

const fetcher = {
  async get<T>(url: string): Promise<T> {
    const result = fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    })
      .then(res => {
        this.handleError(res.status);
        return res.json();
      })
      .catch(error => {
        this.handleErrorToast(error);
        return { results: [], total_pages: 0, total_results: 0 };
      });

    return result;
  },

  handleError(status: number) {
    if (status === 400) throw new BadRequestError(ERROR_MESSAGE.BAD_REQUEST);
    else if (status === 401) throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
    else if (status === 404) throw new PageNotFoundError(ERROR_MESSAGE.NOT_FOUND);
    else if (status === 500 || status === 501 || status === 502 || status === 503)
      throw new ServerError(ERROR_MESSAGE.SERVER_ERROR);
    else if (status !== 200) throw new InvalidRequestError(ERROR_MESSAGE.INVALID_REQUEST);
  },

  handleErrorToast(errorMessage: string) {
    const $toastButton = dom.getElement<HTMLButtonElement>(document.body, '#toast-button');
    const clickEvent = new CustomEvent('onToast', {
      detail: errorMessage,
      bubbles: true,
    });

    $toastButton.dispatchEvent(clickEvent);
  },
};

export default fetcher;
