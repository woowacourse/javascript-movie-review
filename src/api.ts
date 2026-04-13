import { FETCH_OPTION, RATING_OPTIONS } from "./constants";
import { APIError, ParseError, StorageError, TimeoutError } from "./error";
import { MovieDetail, MovieListResponse, TMDBAPIEndpoint } from "./type";

function fetcher<T>(url: string, { timeoutMs, ...options }: RequestInit & { timeoutMs?: number }) {
  const response = fetch(url, options).then(async res => {
    if (!res.ok) {
      throw new APIError(res);
    }

    const text = await res.text();

    try {
      return JSON.parse(text) as T;
    } catch (cause) {
      throw new ParseError({ type: "json", sourceName: "API 응답", raw: text }, cause);
    }
  })

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(url, timeoutMs!));
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

  return fetcher<MovieListResponse>(`${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`, FETCH_OPTION);
}

export function fetchMyRating(movieId: number) {
  let raw: string | null;
  try {
    raw = localStorage.getItem("my-ratings");
  } catch (cause) {
    throw new StorageError({ key: "my-ratings", action: "read" }, cause);
  }

  try {
    const parsed = JSON.parse(raw ?? "{}");
    const myRating = Number(parsed[movieId]);
    return RATING_OPTIONS.includes(myRating) ? myRating : undefined;
  } catch (cause) {
    throw new ParseError({ type: "json", sourceName: "평점 데이터", raw: raw }, cause);
  }
}

export function updateMyRating(movieId: number, rating: number) {
  let raw: string | null;

  try {
    raw = localStorage.getItem("my-ratings");
  } catch (cause) {
    throw new StorageError({ key: "my-ratings", action: "read" }, cause);
  }

  let parsed: Record<string, unknown>;

  try {
    parsed = JSON.parse(raw ?? "{}");
  } catch (cause) {
    throw new ParseError({ type: "json", sourceName: "평점 데이터", raw: raw }, cause);
  }

  try {
    if (RATING_OPTIONS.includes(rating)) parsed[movieId] = rating;
    localStorage.setItem("my-ratings", JSON.stringify(parsed));
  } catch (cause) {
    throw new StorageError({ key: "my-ratings", action: "write" }, cause);
  }
}
