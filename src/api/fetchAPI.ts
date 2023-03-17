import HTTPError from './HTTPError';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../constants';

async function fetchAPI(endpoint: string) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    if (
      response.status >= HTTP_STATUS_BAD_REQUEST &&
      response.status < HTTP_STATUS_INTERNAL_SERVER_ERROR
    ) {
      throw new HTTPError(HTTP_STATUS_BAD_REQUEST);
    } else if (response.status >= HTTP_STATUS_INTERNAL_SERVER_ERROR) {
      throw new HTTPError(HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }
  }

  const data = await response.json();

  return data;
}

export { fetchAPI };
