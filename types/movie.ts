export type Movie = {
  id?: number;
  title: string;
  voteAverage: number;
  posterPath: string | null;
};

export type MovieType = "popular" | "search";

export type MovieState = {
  mode: MovieType;
  query: string;
};
