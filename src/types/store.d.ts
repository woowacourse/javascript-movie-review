// MovieStore
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
  setMovies({ value, callback }: SetMoviesProps): void;
  setPage(value: number): void;
  setQuery(value: string): void;
}

// UserMovieStore
interface UserMovie {
  id: number;
  userRating: number;
}

interface UserMovieStore {
  userMovies: UserMovie[];

  // setMovies({ id, userRating }: UserMovie): void;

  get(id: number): UserMovie;
  add({ id, userRating }: UserMovie): void;
  update({ id, userRating }: UserMovie): void;
}
