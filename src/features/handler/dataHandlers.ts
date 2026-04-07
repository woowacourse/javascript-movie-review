import { fetchPopularMovies, fetchSearchMovies } from "../api/fetchMoviesApi";
import MovieList from "../UI/MovieList";
import { Movie } from "../../../types/types";

const movieListInstance = new MovieList();

export async function handleMoreMovie(page: number, searchMovie: string) {
  try {
    const data: { results: Movie[]; total_pages: number } = searchMovie
      ? await fetchSearchMovies(page, searchMovie)
      : await fetchPopularMovies(page);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleMovie(page: number): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    movieListInstance.renderSkeleton();
    const data: { results: Movie[]; total_pages: number } =
      await fetchPopularMovies(page);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleSearchMovie(
  page: number,
  searchMovie: string,
): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    movieListInstance.renderSkeleton();
    const data: { results: Movie[]; total_pages: number } =
      await fetchSearchMovies(page, searchMovie);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
