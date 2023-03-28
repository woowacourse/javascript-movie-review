import { fetchWithValidation } from "./fetch";
import { URL } from "./url";

export const getMostPopularMovies = async (pageNumber: number) => {
  const fetchURL = `${URL.GET_POPULAR_MOVIES}&page=${pageNumber}`;
  const result = await fetchWithValidation(fetchURL);

  return result;
};

export const getSearchMovies = async (query: string, pageNumber: number) => {
  const fetchURL = `${URL.GET_SEARCH_MOVIES}&page=${pageNumber}&query=${query}`;
  const result = await fetchWithValidation(fetchURL);

  return result;
};

export const getMovieGenres = async () => {
  const fetchURL = `${URL.GET_MOVIE_GENRES}`;
  const result = await fetchWithValidation(fetchURL);

  return result;
};
