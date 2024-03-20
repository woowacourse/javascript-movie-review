const movieStore = {
  _movies: [] as Movie[],

  get movies(): readonly Movie[] {
    return this._movies;
  },

  setMovies(value: Movie[], callback: () => void) {
    this._movies = value;
    callback();
  },
};

export default movieStore;
