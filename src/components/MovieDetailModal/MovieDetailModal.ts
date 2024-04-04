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

const MovieDetailModal = (props: MovieDetailProps) => {
  const movieDetailModal = renderHandler(props);
  movieDetailModalEventHandler();

  return movieDetailModal;
};

export default MovieDetailModal;
