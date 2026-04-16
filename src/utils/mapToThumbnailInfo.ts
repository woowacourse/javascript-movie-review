import { Movie } from "../../types/movie";
export const mapToThumbnailInfo = (movies: Movie[]) => {
  return movies.map((movie) => ({
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    id: movie.id,
  }));
};
