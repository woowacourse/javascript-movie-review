import { BaseParams, SearchParams } from './tmdbType';

const convertQuerystring = (params: Record<string, string>): string => {
  const URLParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    URLParams.append(key, params[key]);
  });

  return URLParams.toString();
};

const getFetchURL =
  (baseUrl: string) =>
  (path: string) =>
  (query: string): string =>
    `${baseUrl}${path}${query}`;

const getQuerieURL =
  (baseQueries: string) =>
  (optionQueries: string): string =>
    `${baseQueries}&${optionQueries}`;

const baseParams = (pageIndex: number) => {
  return {
    api_key: process.env.API_KEY as string,
    language: 'ko',
    include_adult: 'false',
    page: pageIndex.toString(),
  };
};

const searchParams = (word: string) => {
  return {
    query: word,
  };
};

export const BASE_URL = 'https://api.themoviedb.org/3/';
const POPULAR_URL = 'movie/popular?';
const SEARCH_URL = 'search/movie?';

const baseUrl: (path: string) => (query: string) => string = getFetchURL(BASE_URL);
const popularUrl: (query: string) => string = baseUrl(POPULAR_URL);
const searchUrl: (query: string) => string = baseUrl(SEARCH_URL);

export const getPopularUrl = ({ pageIndex }: BaseParams): string => {
  const params = baseParams(pageIndex);

  const baseQueriesString = convertQuerystring(params);
  const baseQuires = getQuerieURL(baseQueriesString);

  const popularQuries = baseQuires('');

  return popularUrl(popularQuries);
};

export const getSearchUrl = ({ pageIndex, word }: SearchParams): string => {
  const params = baseParams(pageIndex);

  const baseQueriesString = convertQuerystring(params);
  const baseQuires = getQuerieURL(baseQueriesString);

  const searchValues = searchParams(word);
  const searchQueriesString = convertQuerystring(searchValues);
  const searchQuries = baseQuires(searchQueriesString);

  return searchUrl(searchQuries);
};
