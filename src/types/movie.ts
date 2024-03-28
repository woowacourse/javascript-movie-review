export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface MovieDetail {
  title: string;
  posterPath: string;
  voteAverage: number;
  genres: string[];
  overview: string;
}
