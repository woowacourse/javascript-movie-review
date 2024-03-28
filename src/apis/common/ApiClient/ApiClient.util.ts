import ApiClient from './ApiClient';

export const isErrorStatusCode = (status: number): status is keyof typeof ApiClient.ERROR_MESSAGES_MAP => {
  return status in ApiClient.ERROR_MESSAGES_MAP;
};
