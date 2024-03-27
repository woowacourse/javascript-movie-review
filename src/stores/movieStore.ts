interface SetMoviesProps {
  value: MovieItem[];
  callback?: (param?: MovieItem[]) => void;
}

export const popularMovieStore = {
  _movies: [] as MovieItem[],

  _page: 1 as number,

  get movies(): readonly MovieItem[] {
    return this._movies;
  },

  setMovies({ value, callback }: SetMoviesProps) {
    this._movies = value;
    if (callback) callback();
  },

  get page(): number {
    return this._page;
  },

  setPage(value: number) {
    this._page = value;
  },
};

export const searchMovieStore = {
  _movies: [] as MovieItem[],

  _page: 1 as number,

  get movies(): readonly MovieItem[] {
    return this._movies;
  },

  setMovies({ value, callback }: SetMoviesProps) {
    this._movies = value;
    if (callback) callback();
  },

  get page(): number {
    return this._page;
  },

  setPage(value: number) {
    this._page = value;
  },
};
