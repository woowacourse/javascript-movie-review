import { FETCH_OPTION, RATING_OPTIONS } from "./constants";
import { APIError } from "./error";
import { MovieDetail, MovieListResponse, TMDBAPIEndpoint } from "./type";

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

export async function fetchMovieDetail(movieId: number) {
  const queryParams = new URLSearchParams({
    language: "ko-KR"
  });

  return fetcher<MovieDetail>(`${import.meta.env.VITE_API_BASE_URL}/movie/${movieId}?${queryParams}`, FETCH_OPTION);
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

export function fetchMyRating(movieId: number) {
  const myRatingsJSON = localStorage.getItem("my-ratings");
  const myRatingsObj = JSON.parse(myRatingsJSON ?? "{}");
  const myRating = Number(myRatingsObj[movieId]);
  return RATING_OPTIONS.includes(myRating) ? myRating : undefined;
}

export function updateMyRating(movieId: number, rating: number) {
  const myRatingsJSON = localStorage.getItem("my-ratings");
  const myRatingsObj = JSON.parse(myRatingsJSON ?? "{}");
  // TODO: 객체 구조 유효성 검증
  if (RATING_OPTIONS.includes(rating)) myRatingsObj[movieId] = rating
  localStorage.setItem("my-ratings", JSON.stringify(myRatingsObj));
}
