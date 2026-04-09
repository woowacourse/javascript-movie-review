const API_KEY = import.meta.env.VITE_API_KEY;

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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

const API_PATH = {
  POPULAR_MOVIE: "https://api.themoviedb.org/3/movie/popular",
  SEARCH_MOVIE: "https://api.themoviedb.org/3/search/movie",
};

export async function getPopularMovies(
  pageNum: number,
): Promise<MoviesResponse> {
  const url = `${API_PATH.POPULAR_MOVIE}?page=${pageNum}&language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  handleResponseError(response);
  return response.json();
}

export async function getSearchMovies(
  query: string,
  pageNum: number,
): Promise<MoviesResponse> {
  const url = `${API_PATH.SEARCH_MOVIE}?query=${query}&page=${pageNum}&language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  handleResponseError(response);
  return response.json();
}
