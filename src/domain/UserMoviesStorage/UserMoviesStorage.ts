import { STORAGE_KEY } from '../../constants/INFORMATION';
import DetailMovieData from '../../interfaces/DetailMovieData';

const UserMoviesStorage = {
  setUserMovies(userMovies: DetailMovieData[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userMovies));
  },

  getUserMovies(): DetailMovieData[] {
    const userMoviesInStorage = localStorage.getItem(STORAGE_KEY);

    if (userMoviesInStorage != null) return JSON.parse(userMoviesInStorage);
    return Array(0);
  },

  addUserMovie(userMovie: DetailMovieData) {
    const userMoviesLocalStorage = this.getUserMovies();

    this.setUserMovies([...userMoviesLocalStorage, userMovie]);
  },

  setMatchedUserMovie(userMovie: DetailMovieData): void {
    const userMoviesLocalStorage = this.getUserMovies();

    userMoviesLocalStorage.forEach((userMovieLocalStorage, index) => {
      if (userMovieLocalStorage.id === userMovie.id) {
        userMoviesLocalStorage[index] = userMovie;
      }
    });

    this.setUserMovies(userMoviesLocalStorage);
  },

  getMatchedUserMovie(userMovie: DetailMovieData): DetailMovieData | undefined {
    const userMoviesLocalStorage = this.getUserMovies();

    const matchedUserMovie = userMoviesLocalStorage.find(
      (userMovieLocalStorage) => userMovieLocalStorage.id === userMovie.id,
    );

    return matchedUserMovie;
  },
};

export default UserMoviesStorage;
