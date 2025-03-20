import fetchMovies from "../api/http";
import { Movie } from "../../types/movie";
import { popularApiUrl, searchApiUrl } from "../api/config";
import { mapToMovie } from "../utils/mapper";

const moviesState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
};

const isLastPage = (): boolean => {
  return moviesState.currentPage === moviesState.totalPages;
};

const fetchPopularMovies = async (page = 1) => {
  try {
    const data = await fetchMovies(`${popularApiUrl}&page=${page}`);

    moviesState.list = data.results.map((item: any) => mapToMovie(item));
    moviesState.currentPage = page;
    moviesState.totalPages = data.total_pages;

    // console.log(moviesState.list);

    return moviesState.list;
  } catch (error) {
    console.error("Error fetching movies:", error);
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
    const movies = data.results.map((item: any) => mapToMovie(item));

    return movies;
  } catch (error) {
    console.error("Error fetching searched movies:", error);
    throw error;
  }
};

export { moviesState, fetchPopularMovies, isLastPage, fetchSearchedMovies };
