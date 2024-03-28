import { URL } from '../consts/common';
import { getUrlParams, setUrlParams } from './queryString';

export type UrlParams = {
  [key: string]: string | number;
};

export const generateMovieApiUrl = (url: string, params?: UrlParams) => {
  const API_KEY = process.env.API_KEY;
  const queryParams = new URLSearchParams({
    api_key: API_KEY as string,
    language: 'ko-KR',
    ...params,
  });

  return `${url}?${queryParams.toString()}`;
};

export const setDefaultPageUrl = () => {
  setUrlParams(URL.MODE, 'popular');
  setUrlParams(URL.QUERY, '');
  setUrlParams(URL.PAGES, '1');
};

export const increaseUrlPage = () => {
  const currentPage = Number(getUrlParams(URL.PAGES) ?? '1');
  setUrlParams(URL.PAGES, String(currentPage + 1));
};

export const getCurrentPage = (): number => {
  return Number(getUrlParams(URL.PAGES) ?? '1');
};

export const getCurrentQuery = (): string => {
  return getUrlParams(URL.QUERY) ?? '';
};

export const getCurrentMode = (): string => {
  return getUrlParams(URL.MODE) ?? 'popular';
};
