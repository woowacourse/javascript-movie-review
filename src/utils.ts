import { FETCH_OPTION } from "./constants";
import { APIError } from "./error";
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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetcher<T>(url: string, { timeoutMs, ...options }: RequestInit & { timeoutMs?: number }) {
  const response = fetch(url, options).then(res => {
    if (!res.ok) {
      throw new APIError(`API 응답 에러: ${res.status}`, res)
    }

    return res.json() as Promise<T>
  })

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new APIError(`API 응답 시간 초과: ${timeoutMs}ms 초과`));
    }, timeoutMs);
  })

  return timeoutMs ? Promise.race([response, timeoutPromise]) : response
}

export async function fetchMovies(endpoint: "/search/movie", params: { query: string, page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: "/movie/popular", params: { page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: TMDBAPIEndpoint, params: Record<string, any>): Promise<MovieListResponse> {
  const queryParams = new URLSearchParams({
    language: "ko-KR",
    ...params
  });

  const response = await fetcher<MovieListResponse>(`${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`, FETCH_OPTION);

  return response;
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