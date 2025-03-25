import fetchMovies from "../api/http";
import { Movie, MovieType } from "../../types/movie";
import { popularApiUrl, searchApiUrl } from "../api/config";
import { mapToMovie } from "./movieMapper.ts";

const moviesPopularState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
};

const moviesSearchedState: typeof moviesPopularState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
};

const isLastPage = (movieType: MovieType) => {
  if (movieType === "popular") {
    return moviesPopularState.currentPage === moviesPopularState.totalPages;
  }

  if (movieType === "search") {
    return moviesSearchedState.currentPage === moviesSearchedState.totalPages;
  }

  return false;
};

const fetchPopularMovies = async (page = 1) => {
  try {
    const data = await fetchMovies(`${popularApiUrl}&page=${page}`);

    moviesPopularState.list = data.results.map(mapToMovie);
    moviesPopularState.currentPage = page;
    moviesPopularState.totalPages = data.total_pages;

    return moviesPopularState.list;
  } catch (error) {
    throw error;
  }
};

const fetchSearchedMovies = async (
  searchQuery: string,
  page = 1
): Promise<Movie[]> => {
  try {
    const url = `${searchApiUrl}query=${encodeURIComponent(
      searchQuery
    )}&page=${page}&language=ko-KR&region=ko-KR&include_adult=false`;

    const data = await fetchMovies(url);

    moviesSearchedState.list = data.results.map((item: any) =>
      mapToMovie(item)
    );
    moviesSearchedState.currentPage = page;
    moviesSearchedState.totalPages = data.total_pages;

    return moviesSearchedState.list;
  } catch (error) {
    throw error;
  }
};

export {
  moviesPopularState,
  moviesSearchedState,
  fetchPopularMovies,
  isLastPage,
  fetchSearchedMovies,
};
