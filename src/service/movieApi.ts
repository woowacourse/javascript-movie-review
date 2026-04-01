import { Movie } from "../view/movieListView";

export const fetchDefaultMovieList = async (
  pageNumber: number,
): Promise<Movie[]> => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNumber}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};

export const fetchSearchMovieList = async (
  searchBarText: string,
): Promise<Movie[]> => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(searchBarText)}&language=ko-KR`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};
