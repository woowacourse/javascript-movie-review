import { FETCH_OPTION, FETCH_TIMEOUT_MS } from "./constans";
import { MovieListResponse, TMDBAPIEndpoint } from "./type";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timeoutFn(ms: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`요청 시간이 ${ms}ms를 초과했습니다.`));
    }, ms);
  })
}

export async function fetchMovies(endpoint: "/search/movie", params: { query: string, page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: "/movie/popular", params: { page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: TMDBAPIEndpoint, params: Record<string, any>): Promise<MovieListResponse> {
  const queryParams = new URLSearchParams({
    language: "ko-KR",
    ...params
  });

  try {
    const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`, FETCH_OPTION).then(async res => {
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.status_message ?? `${res.status} ${res.statusText}`);
      }
      return res.json();
    });
    return await Promise.race([fetchPromise, timeoutFn(FETCH_TIMEOUT_MS)]);
  } catch (error) {
    const newError = new Error();
    newError.name = "API 요청중 에러가 발생했습니다."
    newError.message = `${error instanceof Error ? (error.message ?? "not found error message") : "not found error"} (${endpoint})`
    throw newError
  }
}

export async function fetchPopularMoviesByPageRange(startPage: number, endPage: number) {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);
      return fetchMovies('/movie/popular', { page: startPage + index + 1 });
    },
  );

  return Promise.all(promises);
}

export async function fetchSearchMoviesByPageRange(startPage: number, endPage: number, query: string) {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);
      return fetchMovies('/search/movie', { query, page: startPage + index + 1 });
    },
  );

  return Promise.all(promises);
}
