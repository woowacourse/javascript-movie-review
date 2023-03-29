export type MovieItem = {
  title: string;
  posterPath: string;
  voteAverage: number;
  id: number;
};

export type Movie = {
  page: number;
  movies: MovieItem[];
  totalPages: number;
};

export type MovieRating = 0 | 2 | 4 | 6 | 8;
