export interface IFetchParams {
  page: string;
  query?: string;
}

export default function fetchMovies(url: string, params: IFetchParams) {
  const searchParams = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: 'ko-KR',
    ...params,
  });

  return fetch(`${url}?${searchParams}`);
}
