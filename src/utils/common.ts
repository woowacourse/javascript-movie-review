import { GetFetchURLParams, GetQueriesParams } from '../types/utils';

export const $ = <E extends Element>(selector: string): E | null => document.querySelector(selector);

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('정보를 불러올 수 없습니다.');
  }

  return response.json();
};

export const createUniqueId = (): string => {
  return 'id' + Math.random().toString(16).slice(2);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getFetchURL = ({ baseUrl, path, query }: GetFetchURLParams): string => `${baseUrl}${path}${query}`;

export const getQueries = ({ baseQueries, optionQueries }: GetQueriesParams): string =>
  `${baseQueries}&${optionQueries}`;

export const convertQuerystring = (params: Record<string, string>): string => {
  const URLParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    URLParams.append(key, params[key]);
  });

  return URLParams.toString();
};

export const convertHourAndMinute = (minute: number): string => {
  const hour = minute / 60;
  const remainingMinutes = minute % 60;

  const hourText = hour.toFixed(0) !== '0' ? `${hour.toFixed(0)}시간` : '';
  const minuteText = remainingMinutes !== 0 ? `${remainingMinutes}분` : '';

  if (minute === 0) {
    return '';
  }

  return `${hourText} ${minuteText}`;
};
