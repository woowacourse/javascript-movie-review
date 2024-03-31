import { COMMON_PARAMS } from '../constants/requests';

export interface Params {
  [key: string]: string | number | boolean;
}

export const generateUrl = (baseURL: string, params?: Params): string => {
  const queryParams = new URLSearchParams({
    ...COMMON_PARAMS,
    ...params,
  });
  return `${baseURL}${queryParams}`;
};
