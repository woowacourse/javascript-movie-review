import movieStateMethod from '../store/movieStore';
import { fetchFetcherFunction } from './utils';

export interface IFetchParams {
  url: string;
  page: number;
  query?: string;
}

// eslint-disable-next-line max-lines-per-function
function movieFetcher(params: IFetchParams) {
  const searchParams = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: 'ko-KR',
    page: String(params.page),
  });

  if (params.query) {
    searchParams.append('query', params.query);
  }

  return fetch(`${params.url}?${searchParams}`);
}

// eslint-disable-next-line max-lines-per-function
async function fetchMovies() {
  const fetchParams = {
    url: movieStateMethod.getUrl(),
    page: movieStateMethod.getPage(),
    query: movieStateMethod.getQuery(),
  };
  const fetchData = await fetchFetcherFunction<IFetchParams>({
    fetcherFunction: movieFetcher,
    fetchParams,
  });
  return fetchData;
}

export default fetchMovies;
