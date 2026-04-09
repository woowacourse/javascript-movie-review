import { fetcher } from "./utils";
import { MoviesResponse, MoviesResponseDTO } from "./dtos";

const API_KEY = import.meta.env.VITE_API_KEY;

const API_PATH = {
  POPULAR_MOVIE: "https://api.themoviedb.org/3/movie/popular",
  SEARCH_MOVIE: "https://api.themoviedb.org/3/search/movie",
};

export async function getPopularMovies(arg: {
  pageNum: number;
  onSuccess?: (data: MoviesResponse) => void;
  onError: (error: Error) => void;
  onLoading?: () => void;
}) {
  const { pageNum, onSuccess, onError, onLoading } = arg;
  return fetcher<MoviesResponse>({
    fn: async () => {
      const url = new URL(API_PATH.POPULAR_MOVIE);
      url.searchParams.set("page", String(pageNum));
      url.searchParams.set("language", "ko-KR");
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      return MoviesResponseDTO.from(data);
    },
    onSuccess,
    onError,
    onLoading,
  });
}

export async function getSearchMovies(arg: {
  query: string;
  pageNum: number;
  onSuccess?: (data: MoviesResponse) => void;
  onError: (error: Error) => void;
  onLoading: () => void;
}) {
  const { query, pageNum, onSuccess, onError, onLoading } = arg;
  return fetcher<MoviesResponse>({
    fn: async () => {
      const url = new URL(API_PATH.SEARCH_MOVIE);
      url.searchParams.set("query", query);
      url.searchParams.set("page", String(pageNum));
      url.searchParams.set("language", "ko-KR");
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return MoviesResponseDTO.from(data);
    },
    onSuccess,
    onError,
    onLoading,
  });
}
