interface Movie {
  list: string;
  query: string;
  currentPage: number;
  totalPages: number;
}

export type MovieProxy = Movie & Record<string, string | number>;

export interface CustomProxy {
  movie: Movie;
}
