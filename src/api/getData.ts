import { ERROR_MESSAGE } from '../constant/setting';

export const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error(ERROR_MESSAGE.UNAUTHORIZED);
      case 404:
        throw new Error(ERROR_MESSAGE.NOT_FOUND);
      case 500:
        throw new Error(ERROR_MESSAGE.INTERNAL_SERVER);
      case 503:
        throw new Error(ERROR_MESSAGE.SERVICE_UNAVAILABLE);
      default:
        throw new Error(ERROR_MESSAGE.UNKNOWN);
    }
  }
  return data;
};
