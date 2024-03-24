export type Movie = {
  id: number;
  title: string;
  genreIds: number[];
  overview: string;
  posterPath: string;
  voteAverage: number;
};

export type MoviePage = {
  page: number;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
};
