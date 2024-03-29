type QueryType = 'popular' | 'search';

interface SetMoviesProps {
  value: MovieItem[];
  callback?: (param?: MovieItem[]) => void;
}

interface MovieStoreType {
  type: QueryType;

  popular: {
    movies: MovieItem[];
    page: number;
  };

  search: {
    movies: MovieItem[];
    page: number;
    query: string;
  };

  readonly movies: readonly MovieItem[];
  readonly page: number;
  readonly query: string;
  setPage(value: number): void;
  setMovies({ value, callback }: SetMoviesProps): void;
  setQuery(value: string): void;
}
