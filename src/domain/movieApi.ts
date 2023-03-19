import { removeMoreButton } from "../components/movieListHandler";
import { ApiResponse, Movie } from "../type";
import { movieStore } from "./movieStore";

export const movieApi = {
  page: 1,
  total_page: 2,
  last_keyword: "",

  showPopularMovies() {
    fetchMovieInfo("movie/popular", "");
  },

  showSearchedMovies(keyword: string) {
    fetchMovieInfo("search/movie", keyword);
  },
};

const fetchMovieInfo = async (endpoint: string, keyword: string) => {
  const url = buildUrl(endpoint, keyword);
  const response = await fetch(url);
  catchError(response.status);

  handleMovieInfoResponse(response);
};

const buildUrl = (endpoint: string, keyword: string) =>
  `https://api.themoviedb.org/3/${endpoint}?api_key=${
    process.env.API_KEY
  }&language=ko&page=${movieApi.page}${
    keyword === "" ? "" : `&query=${keyword}`
  }`;

const catchError = (status: number) => {
  try {
    if (status !== 200) throw new Error("서버가 불안정합니다.");
  } catch (error) {
    if (error instanceof Error) return alert(error.message);
  }
};

const handleMovieInfoResponse = async (response: Response) => {
  const { results, total_pages } = await response.json();
  movieApi.total_page = total_pages;

  saveMoviesAndRemoveMoreButton(results);
};

const saveMoviesAndRemoveMoreButton = (results: Array<ApiResponse>) => {
  movieStore.appendMovies(convertApiResponseToMovieList(results));

  if (movieApi.page === movieApi.total_page) removeMoreButton();
};

const convertApiResponseToMovieList = (
  results: Array<ApiResponse>
): Array<Movie> => {
  return results.map((movie) => {
    return {
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};

export const resetMoviesAndPages = () => {
  movieStore.movies = [];
  movieApi.page = 1;
  movieApi.total_page = 2;
};
