const API_KEY = import.meta.env.VITE_API_KEY;

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}
