import { dataProcessors } from '../domains/processMovieData';

export type MovieItem = {
  title: string;
  posterPath: string;
  voteAverage: number;
  id: number;
};

export type Movie = ReturnType<typeof dataProcessors.processMovieData>;

export type MovieDetail = ReturnType<typeof dataProcessors.processMovieDetailData>;
