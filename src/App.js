import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import APIService from './domain/services/APIService';

class App {
  constructor() {
    this.init();
  }

  async init() {
    new Header();

    try {
      const popularMovieResult = await APIService.fetchPopularMovies(1);

      const popularMovieList = popularMovieResult.results.map(movie => ({
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      }));

      new MovieList(popularMovieList);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default App;
