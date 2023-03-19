import { removeMoreButton } from "../components/movieListHandler";
import { Movie } from "../type";
import { movieStore } from "./movieStore";

interface MovieApiResponse {
  poster_path: string;
  title: string;
  vote_average: number;
}

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.API_KEY

export const movieApi = {
  page: 1,
  total_page: 2,
  last_keyword: "",

  showPopularMovies() {
    fetchMovieInfo(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${movieApi.page}`);
  },

  showSearchedMovies(keyword: string) {
    fetchMovieInfo(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=${movieApi.page}&query=${keyword}`);
  },
};

const fetchMovieInfo = async (url: string) => {
  const response = await fetch(url);
  catchError(response.status);

  handleMovieInfoResponse(response);
};

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

const saveMoviesAndRemoveMoreButton = (results: MovieApiResponse[]) => {
  movieStore.appendMovies(convertApiResponseToMovieList(results));

  if (movieApi.page === movieApi.total_page) removeMoreButton();
};

const convertApiResponseToMovieList = (results: MovieApiResponse[]): Movie[] => {
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
