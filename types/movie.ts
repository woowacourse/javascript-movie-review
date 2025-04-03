export type Movie = {
  id: number;
  title: string;
  voteAverage: number;
  posterPath: string | null;
};

export type MovieType = "popular" | "search";

export type Genres = { id: number; name: string };

export type MovieDetail = Movie & {
  genres: Genres[];
  overview: string;
  release_date: string;
};
