import { convertQuerystring, getFetchURL, getQueries } from '../utils/common';
import { DetailParams, PopularParams, SearchParams } from './tmdbType';

export const BASE_URL = 'https://api.themoviedb.org/3/';
const POPULAR_PATH = 'movie/popular?';
const SEARCH_PATH = 'search/movie?';

const detailPath = (id: number): string => `/movie/${id}?`;

const BASE_PARAMS = {
  api_key: process.env.API_KEY as string,
  language: 'ko',
  include_adult: 'false',
};

const baseQueriesString = convertQuerystring(BASE_PARAMS);

export const getPopularUrl = ({ pageIndex }: PopularParams): string => {
  const params = popularParams({ pageIndex });
  const popularQueriesString = convertQuerystring(params);

  const popularQueries = getQueries({ baseQueries: baseQueriesString, optionQueries: popularQueriesString });

  return getFetchURL({ baseUrl: BASE_URL, path: POPULAR_PATH, query: popularQueries });
};

const popularParams = ({ pageIndex }: PopularParams): { page: string } => {
  return {
    page: pageIndex.toString(),
  };
};

export const getSearchUrl = ({ pageIndex, word }: SearchParams): string => {
  const params = searchParams({ pageIndex, word });
  const searchQueriesString = convertQuerystring(params);

  const searchQuries = getQueries({ baseQueries: baseQueriesString, optionQueries: searchQueriesString });

  return getFetchURL({ baseUrl: BASE_URL, path: SEARCH_PATH, query: searchQuries });
};

const searchParams = ({ word, pageIndex }: SearchParams) => {
  return {
    query: word,
    page: pageIndex.toString(),
  };
};

export const getDetailUrl = ({ id }: DetailParams): string => {
  const detailQuries = getQueries({ baseQueries: baseQueriesString, optionQueries: '' });

  return getFetchURL({ baseUrl: BASE_URL, path: detailPath(id), query: detailQuries });
};
