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

const fetchWithValidation = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return result;
};
