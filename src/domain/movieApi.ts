import { removeMoreButton } from "../components/movieListHandler";
import { ApiResponse, Movie } from "../type";
import { movieStore } from "./movieStore";
import { API, PATH } from "../constants";
const { URL: API_URL, LANGUAGE } = API;
const { POPULAR_MOVIE } = PATH;

export const movieApi = {
  url: new URL(API_URL),
  urlParams: new URLSearchParams(),
  totalPage: 2,

  showMovies(endpoint: string = POPULAR_MOVIE, keyword: string = "") {
    fetchMovieInfo(endpoint, keyword);
  },
};

const fetchMovieInfo = async (endpoint: string, keyword: string) => {
  const url = buildMovieUrl(endpoint, keyword);
  const response = await fetch(url);
  catchError(response.status);

  handleMovieInfoResponse(response);
};

const buildMovieUrl = (endpoint: string, keyword: string) => {
  movieApi.url = new URL(endpoint, API_URL);
  const urlParams = new URLSearchParams(`api_key=${process.env.API_KEY}`);

  urlParams.set("language", LANGUAGE);
  urlParams.set("page", movieApi.urlParams.get("page") ?? "1");
  urlParams.set("query", keyword);

  movieApi.urlParams = urlParams;

  return `${movieApi.url}?${urlParams}`;
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
  movieApi.totalPage = total_pages;

  saveMoviesAndRemoveMoreButton(results);
};

const saveMoviesAndRemoveMoreButton = (results: Array<ApiResponse>) => {
  movieStore.appendMovies(convertApiResponseToMovieList(results));

  const currentPage = Number(movieApi.urlParams.get("page"));
  if (currentPage === movieApi.totalPage) removeMoreButton();
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
  movieApi.urlParams.set("page", "1");
  movieApi.totalPage = 2;
};
