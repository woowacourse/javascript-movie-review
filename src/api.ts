const API_KEY = import.meta.env.VITE_API_KEY;

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

function handleResponseError(response: Response) {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("인증에 실패했습니다. API 키를 확인해주세요.");
    }
    if (response.status === 404) {
      throw new Error("요청한 정보를 찾을 수 없습니다");
    }
    if (response.status >= 500) {
      throw new Error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: "en-US";
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Genre[];
}

const API_PATH = {
  POPULAR_MOVIE: "https://api.themoviedb.org/3/movie/popular",
  DETAIL_MOVIE: "https://api.themoviedb.org/3/movie",
  SEARCH_MOVIE: "https://api.themoviedb.org/3/search/movie",
  GENRE: "https://api.themoviedb.org/3/genre/movie/list",
};

const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function getPopularMovies(
  pageNum: number,
): Promise<MoviesResponse> {
  const url = `${API_PATH.POPULAR_MOVIE}?page=${pageNum}&language=ko-KR`;
  const response = await fetch(url, defaultOptions);
  handleResponseError(response);
  return response.json();
}

export async function getMovieDetail(
  movieId: number,
): Promise<MovieDetail> {
  const url = `${API_PATH.DETAIL_MOVIE}/${movieId}?language=ko-KR`;
  const response = await fetch(url, defaultOptions);
  handleResponseError(response);
  return response.json();
}

export async function getSearchMovies(
  query: string,
  pageNum: number,
): Promise<MoviesResponse> {
  const url = `${API_PATH.SEARCH_MOVIE}?query=${query}&page=${pageNum}&language=ko-KR`;
  const response = await fetch(url, defaultOptions);
  handleResponseError(response);
  return response.json();
}
