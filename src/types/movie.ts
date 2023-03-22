export type MovieItem = {
  title: string;
  posterPath: string;
  voteAverage: number;
};

export type Movie = {
  page: number;
  movies: MovieItem[];
  totalPages: number;
};
