import { UrlParamsType } from '../domain/services/API.type';

export const generateMovieApiUrl = (url: string, params: UrlParamsType) => {
  const API_KEY = process.env.API_KEY;
  const queryParams = new URLSearchParams({
    api_key: API_KEY as string,
    language: 'ko-KR',
    ...params,
  });

  return `${url}?${queryParams.toString()}`;
};
