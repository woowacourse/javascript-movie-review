export type Movie = {
  id: string;
  title: string;
  voteAverage: number;
  posterPath: string;
  overview: string;
};

export type MovieDetail = Movie & {
  genres: string[];
};
