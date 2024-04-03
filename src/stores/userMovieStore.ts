import LocalStorageService from '../services/LocalStorageService';

const UserMovieStore: UserMovieStore = {
  userMovies: LocalStorageService.get('userMovies') as UserMovie[],

  get(id: number) {
    const targetMovie = this.userMovies.find((movie) => movie.id === id);

    if (!targetMovie) return { id, userRating: 0 };
    return targetMovie;
  },

  add({ id, userRating }: UserMovie) {
    const isExistMovie = this.userMovies.find((movie) => movie.id === id);
    if (isExistMovie) {
      return this.update({ id, userRating });
    }

    this.userMovies.push({ id, userRating });

    LocalStorageService.set('userMovies', [...this.userMovies]);
  },

  update({ id, userRating }: UserMovie) {
    const idx = this.userMovies.findIndex((movie) => movie.id === id);

    this.userMovies[idx].userRating = userRating;

    LocalStorageService.set('userMovies', [...this.userMovies]);
  },
};

export default UserMovieStore;
