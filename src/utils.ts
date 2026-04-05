import { ERROR, FETCH_OPTION, FETCH_TIMEOUT_MS } from "./constants";
import { APIError, UnknownError } from "./error";
import { showErrorToast } from "./toast";
import { MovieListResponse, TMDBAPIEndpoint } from "./type";

export function getURLSearchParam(name: string, defaultValue: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) ?? defaultValue
}

export function setURLSearchParam(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}

export function getQuery() {
  return getURLSearchParam("query", "");
}

export function getPage() {
  const pageStr = getURLSearchParam("page", "1");
  const pageNum = Number(pageStr)
  const page = isNaN(pageNum) || pageNum % 1 || pageNum < 1 ? 1 : pageNum;
  return page;
}

export function setQuery(query: string) {
  setURLSearchParam("query", query)
}

export function setPage(page: number) {
  setURLSearchParam("page", page.toString())
}

export function throttle<T extends (...args: any[]) => void>(callback: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) return;

    callback(...args);

    timer = setTimeout(() => {
      timer = null;
    }, ms);
  };
};

export function handleError(catchedError: unknown): void {
  const error = catchedError instanceof Error ? catchedError : new UnknownError("에러 객체를 찾을 수 없습니다.");
  const title = (error.name in ERROR) ? ERROR[error.name as keyof typeof ERROR] : error.name;
  const message = error.message ?? "에러 메시지가 없습니다.";
  showErrorToast({ title, message });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetcher<T>(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new APIError('API 응답이 올바르지 않습니다.')
  }

  return response.json() as Promise<T>
}

export async function fetchMovies(endpoint: "/search/movie", params: { query: string, page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: "/movie/popular", params: { page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: TMDBAPIEndpoint, params: Record<string, any>): Promise<MovieListResponse> {
  const queryParams = new URLSearchParams({
    language: "ko-KR",
    ...params
  });

  try {
    const fetchPromise = fetcher<MovieListResponse>(`${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`, FETCH_OPTION);
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new APIError(`API 응답 시간이 ${FETCH_TIMEOUT_MS}ms를 초과했습니다.`));
      }, FETCH_TIMEOUT_MS);
    })

    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    throw (error instanceof Error) ? error : new APIError('API 요청중 에러가 발생했습니다.')
  }
}


export async function fetchMoviesByPageRange(endpoint: "/movie/popular", startPage: number, endPage: number): Promise<MovieListResponse[]>
export async function fetchMoviesByPageRange(endpoint: "/search/movie", startPage: number, endPage: number, query: string): Promise<MovieListResponse[]>
export async function fetchMoviesByPageRange(endpoint: TMDBAPIEndpoint, startPage: number, endPage: number, query?: string): Promise<MovieListResponse[]> {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);

      if (endpoint === '/search/movie') {
        return fetchMovies(endpoint, { page: startPage + index + 1, query: query! });
      }

      return fetchMovies(endpoint, { page: startPage + index + 1 });
    },
  );

  return Promise.all(promises);
}