import { GetFetchURLParams, GetQueriesParams } from '../types/utils';

export const $ = <E extends Element>(selector: string): E | null => document.querySelector(selector);

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('정보를 불러올 수 없습니다.');
  }

  return response.json();
};

export const createUniqueId = () => {
  return 'id' + Math.random().toString(16).slice(2);
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getFetchURL = ({ baseUrl, path, query }: GetFetchURLParams): string => `${baseUrl}${path}${query}`;

export const getQueries = ({ baseQueries, optionQueries }: GetQueriesParams) => `${baseQueries}&${optionQueries}`;

export const convertQuerystring = (params: Record<string, string>): string => {
  const URLParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    URLParams.append(key, params[key]);
  });

  return URLParams.toString();
};

export const sliceSting = (word: string) => {
  const LIMIT = 27;
  if (word.length > LIMIT) {
    return `${word.slice(0, LIMIT)}···`;
  }

  return word;
};

export const sliceScore = (score: string) => {
  const SLICE_START = 0;
  const SLICE_END = 3;

  return score.slice(SLICE_START, SLICE_END);
};
