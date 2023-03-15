import Header from './components/Header';
import MovieList from './components/MovieList';

import MovieListMaker from './domain/MovieListMaker';

import { $, getParsedData } from './utils';

const App = {
  render() {
    new Header($('#app')).render();

    new MovieList($('main')).render().renderMovieCards(App.getPopularMovieList());
  },

  async getPopularMovieList() {
    const url = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    const data = await getParsedData(url);
    const moviesData = data.results;
    const movieList = MovieListMaker(moviesData);

    return movieList;
  },
};

export default App;
