const movieStore = {
  _movies: [] as Movie[],

  _page: 1 as number,

  get movies(): readonly Movie[] {
    return this._movies;
  },

  setMovies(value: Movie[], callback: () => void) {
    this._movies = value;
    callback();
  },

  get page(): number {
    return this._page;
  },

  setPage(value: number) {
    this._page = value;
  },
};

export default movieStore;
