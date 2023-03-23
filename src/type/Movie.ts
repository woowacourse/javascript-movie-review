// Application interface
export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface DetailMovie extends Movie {
  genres: string;
  overview: string;
}
