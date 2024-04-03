import movieStateMethod from '../store/movieStore';
import fetchErrorCheck from './fetchErrorCheck';

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

// TODO: await와 에러 체크 그리고 json 반환을 해주는 함수를 분리할 수 있겠다.
async function fetchMovies() {
  const response = await movieFetcher({
    url: movieStateMethod.getUrl(),
    page: movieStateMethod.getPage(),
    query: movieStateMethod.getQuery(),
  });
  fetchErrorCheck(response.status);
  return response.json();
}

export default fetchMovies;
