import { FETCH_OPTION, FETCH_TIMEOUT_MS } from "./constants";
import { MovieDetail, MovieListResponse, TMDBAPIEndpoint } from "./type";

type QueryParams = Record<string, string | number>;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`요청 시간이 ${ms}ms를 초과했습니다.`));
    }, ms);
  });
}

function createApiError(endpoint: string, error: unknown): Error {
  const newError = new Error();
  newError.name = "API 요청중 에러가 발생했습니다.";
  newError.message = `${error instanceof Error ? (error.message ?? "not found error message") : "not found error"} (${endpoint})`;

  return newError;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.status_message ?? `${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

function createQueryParams(params: QueryParams = {}): URLSearchParams {
  const queryParams = new URLSearchParams({
    language: "ko-KR",
    ...params
  });

  return queryParams;
}

async function requestTMDB<T>(endpoint: string, params: QueryParams = {}): Promise<T> {
  try {
    const queryParams = createQueryParams(params);
    const fetchPromise = fetch(
      `${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`,
      FETCH_OPTION,
    ).then((response) => parseJsonResponse<T>(response));

    return await Promise.race([fetchPromise, createTimeout(FETCH_TIMEOUT_MS)]);
  } catch (error) {
    throw createApiError(endpoint, error);
  }
}

async function fetchMoviesByPageRange(
  startPage: number,
  endPage: number,
  callback: (page: number) => Promise<MovieListResponse>,
): Promise<MovieListResponse[]> {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);
      return callback(startPage + index + 1);
    },
  );

  return Promise.all(promises);
}

export async function fetchMovies(endpoint: "/search/movie", params: { query: string, page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: "/movie/popular", params: { page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: TMDBAPIEndpoint, params: QueryParams): Promise<MovieListResponse> {
  return requestTMDB<MovieListResponse>(endpoint, params);
}

export async function fetchPopularMoviesByPageRange(startPage: number, endPage: number) {
  return fetchMoviesByPageRange(
    startPage,
    endPage,
    (page) => fetchMovies("/movie/popular", { page }),
  );
}

export async function fetchSearchMoviesByPageRange(startPage: number, endPage: number, query: string) {
  return fetchMoviesByPageRange(
    startPage,
    endPage,
    (page) => fetchMovies("/search/movie", { query, page }),
  );
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  return requestTMDB<MovieDetail>(`/movie/${id}`);
}
