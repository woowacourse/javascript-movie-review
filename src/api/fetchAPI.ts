import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../constants';
import { convertKeysToCamelCase } from '../utils/camelCaseConverter';
import HTTPError from './HTTPError';

async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

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

    return convertKeysToCamelCase(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    alert(error);
  }
}

export { fetchAPI };
