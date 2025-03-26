import fetchMovies from "../api/http";
import { Movie, MovieType } from "../../types/movie";
import { popularApiUrl, searchApiUrl } from "../api/config";
import { mapToMovie } from "../utils/mapper";

type PagedMovieList = {
  list: Movie[];
  currentPage: number;
  totalPages: number;
};

const popularMovieList: PagedMovieList = {
  list: [],
  currentPage: 1,
  totalPages: 0,
};

const searchedMovieList: PagedMovieList = {
  list: [],
  currentPage: 0,
  totalPages: 0,
};

const isLastPage = (movieType: MovieType): boolean => {
  if (movieType === "popular") {
    return popularMovieList.currentPage === popularMovieList.totalPages;
  }

  if (movieType === "search") {
    return searchedMovieList.currentPage === searchedMovieList.totalPages;
  }

  return false;
};

const fetchPopularMovies = async (page = 1): Promise<Movie[]> => {
  try {
    const data = await fetchMovies(`${popularApiUrl}&page=${page}`);

    popularMovieList.list = [
      ...popularMovieList.list,
      ...data.results.map((item: any) => mapToMovie(item)),
    ];
    popularMovieList.currentPage = page;
    popularMovieList.totalPages = data.total_pages;

    return popularMovieList.list;
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

    if (page === searchedMovieList.currentPage) return searchedMovieList.list;

    searchedMovieList.list = [
      ...searchedMovieList.list,
      ...data.results.map((item: any) => mapToMovie(item)),
    ];
    searchedMovieList.currentPage = page;
    searchedMovieList.totalPages = data.total_pages;

    return searchedMovieList.list;
  } catch (error) {
    console.error("Error fetching searched movies:", error);
    alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
    throw error;
  }
};

const movieState: { mode: MovieType; query: string } = {
  mode: "popular",
  query: "",
};

export {
  popularMovieList,
  searchedMovieList,
  fetchPopularMovies,
  isLastPage,
  fetchSearchedMovies,
  movieState,
};
