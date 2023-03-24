import { Movie } from './movie.type';

export type Vote = {
  movieId: Movie['id'];
  value: number;
};
