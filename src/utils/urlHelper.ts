import { URL } from '../consts/common';
import { UrlParamsType } from '../domain/services/API.type';
import { getUrlParams, setUrlParams } from './queryString';

export const generateMovieApiUrl = (url: string, params: UrlParamsType) => {
  const API_KEY = process.env.API_KEY;
  const queryParams = new URLSearchParams({
    api_key: API_KEY as string,
    language: 'ko-KR',
    ...params,
  });

  return `${url}?${queryParams.toString()}`;
};

export const increaseUrlPage = () => {
  const currentPage = Number(getUrlParams(URL.PAGES) ?? '1');
  setUrlParams(URL.PAGES, String(currentPage + 1));
};
