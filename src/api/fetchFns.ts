export interface IFetchParams {
  url: string;
  page: number;
  query?: string;
}

export default function fetchMovies(params: IFetchParams) {
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
