import HTTPError from './HTTPError';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../constants';
import { INVALID_JSON_RESPONSE } from '../constants/invalidMessage';

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

  const contentType = response.headers.get('Content-Type');

  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(INVALID_JSON_RESPONSE);
  }

  const data = await response.json();

  return data;
}

export { fetchAPI };
