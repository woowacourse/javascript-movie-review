interface Movie {
  list: string;
  currentPage: number;
  query: string;
}

export type MovieProxy = Movie & Record<string, string | number>;

export interface CustomProxy {
  movie: Movie;
}
