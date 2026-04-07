import type { FetchMoviePageDataResponse } from "./apiTypes";

import type { Movie } from "../../types/movie";

export const mapFetchMoviePageDataResponse = (data: any): FetchMoviePageDataResponse => {
  const movies: Movie[] = data.results.map((movie: any): Movie => {
    return {
      id: movie.id,
      title: movie.title,
      rate: movie.vote_average,
      thumbnail_path: movie.poster_path,
      hero_path: movie.backdrop_path,
    };
  });

  return {
    currentPage: data.page ?? 0,
    totalPages: data.total_pages ?? 0,
    results: movies,
  };
};

