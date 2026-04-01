import { fetcher } from "./utils";

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
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// TODO: add pageNum default value
export async function getPopularMovies(arg: {
  pageNum: number;
  onSuccess: (data: MoviesResponse) => void;
  onError: (error: Error) => void;
  onLoading: () => void;
}) {
  const { pageNum, onSuccess, onError, onLoading } = arg;
  fetcher<MoviesResponse>({
    fn: async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?page=${pageNum}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const data = (await response.json()) as unknown as MoviesResponse;
      return data;
    },
    onSuccess,
    onError,
    onLoading,
  });
}

export async function getSearchMovies(arg: {
  query: string;
  pageNum: number;
  onSuccess: (data: MoviesResponse) => void;
  onError: (error: Error) => void;
  onLoading: () => void;
}) {
  const { query, pageNum, onSuccess, onError, onLoading } = arg;
  fetcher<MoviesResponse>({
    fn: async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageNum}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const data = (await response.json()) as unknown as MoviesResponse;
      return data;
    },
    onSuccess,
    onError,
    onLoading,
  });
}
