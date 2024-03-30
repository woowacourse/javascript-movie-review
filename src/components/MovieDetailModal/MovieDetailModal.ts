import { Genre, TMDBMovieDetailResponse } from '../../types/tmdb';
import movieDetailModalEventHandler from './eventHandler';
import renderHandler from './render';

type MovieDetailProps = {
  id: number;
  title: string;
  poster_path: string;
  genres: Genre[];
  vote_average: number;
  overview: string;
};

const MovieDetailModal = ({ id, title, poster_path, genres, vote_average, overview }: MovieDetailProps) => {
  const movieDetailModal = renderHandler({ id, title, poster_path, genres, vote_average, overview });
  movieDetailModalEventHandler();

  return movieDetailModal;
};

export default MovieDetailModal;
