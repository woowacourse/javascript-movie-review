import globalStateMethod from '../globalState';

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
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return movieFetcher({
    url: globalStateMethod.getUrl(),
    page: globalStateMethod.getPage(),
    query: globalStateMethod.getQuery(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('❌ 잠시후에 시도해주세요.');
      }
      return response.json();
    })
    .catch((error) => console.error(error.message));
}

export default fetchMovies;
