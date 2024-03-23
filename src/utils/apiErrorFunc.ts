import { API_ERROR_MESSAGE } from '../constants';

export const makeErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return API_ERROR_MESSAGE.notFound;
    case 404:
      return API_ERROR_MESSAGE.badRequest;
    case 500:
      return API_ERROR_MESSAGE.serverError;
    default:
      return API_ERROR_MESSAGE.default;
  }
};

export const checkAPIStatus = (response: Response) => {
  if (!response.ok) {
    const message = makeErrorMessage(response.status);
    throw new Error(message);
  }
};

export const checkInvalidJSON = (error: unknown | Error) => {
  if (!(error instanceof Error)) return;
  if (error.message.includes('Unexpected end of JSON input')) {
    return new Error(API_ERROR_MESSAGE.inValidJSON);
  }

  return error;
};
