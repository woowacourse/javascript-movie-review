import { getMovies, getSearchMovie, IMovieList } from './api';

export async function usePopularMovie() {
  const popularMovieResponse = await getMovies();
  const { page, results } = popularMovieResponse;

  return { values: { page, results }, handlers: {} };
}

export async function useSearchedMovie(keyword: string) {
  const { page, results } = await getSearchMovie(keyword);

  return { values: { page, results } };
}
