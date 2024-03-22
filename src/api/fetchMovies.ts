import movieStateMethod from '../store/movieStore';

export interface IFetchParams {
  url: string;
  page: number;
  query?: string;
}

// eslint-disable-next-line max-lines-per-function
function handleError(status: number) {
  if (status === 200) return;

  // eslint-disable-next-line default-case
  switch (status) {
    case 401:
      throw new Error(`${status} 유효하지 않은 접근입니다.`);
    case 403:
      throw new Error(`${status} 접근 권한이 없습니다.`);
    case 404:
      throw new Error(`${status} 컨텐츠를 찾을 수 없습니다.`);
    case 500:
      throw new Error(`${status} 서버에서 문제가 발생했습니다.`);
    case 503:
      throw new Error(`${status} 서버에서 문제가 발생했습니다.`);
  }
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
    url: movieStateMethod.getUrl(),
    page: movieStateMethod.getPage(),
    query: movieStateMethod.getQuery(),
  })
    .then((response) => {
      handleError(response.status);
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });
}

export default fetchMovies;
