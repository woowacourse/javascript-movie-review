import { movieApi } from "../api/movieApi";
import { mapToMovie } from "./movieMapper";
import { getState, updateState } from "./movieStore";

export const fetchMovies = async (
  page: number,
  query?: string,
  isFirstLoad = false
) => {
  try {
    updateState({ isLoading: true });

    if (isFirstLoad) {
      updateState({ list: [] });
    }

    const response = !query
      ? await movieApi.fetchPopularMovies(page)
      : await movieApi.fetchSearchedMovies(query, page);

    const movies = response.results.map(mapToMovie);
    const { list } = getState();

    updateState({
      list: page === 1 ? movies : [...list, ...movies],
      currentPage: page,
      totalPages: response.total_pages,
      query: query || "",
      isLoading: false,
    });

    return response;
  } catch (error) {
    console.error("영화 로딩 중 오류 발생:", error);
    updateState({ isLoading: false });
    throw error;
  }
};

export const fetchMovieDetail = async (movieId: number) => {
  return await movieApi.fetchMovieDetail(movieId).then(mapToMovie);
};
