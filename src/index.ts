import '../css/reset.css';
import '../css/common.css';
import { movie, proxy } from './state/state';
import { initProxy } from './domains/proxy';
import { getPopularMovieList } from './domains/movieApi';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';
import { initObserver } from './domains/observer';

const App = {
  init() {
    this.initRender();
    initProxy();
    this.initState();
    initObserver();
  },

  initRender() {
    customElements.define('custom-header', CustomHeader);
    customElements.define('movie-container', MovieContainer);
    CustomHeader.render();
    MovieContainer.render();
  },

  initState() {
    getPopularMovieList().then(movieRoot => {
      const movieResults = movieRoot.results;
      movie.totalPages = movieRoot.total_pages;
      proxy.movie.list = [generateMovieListTemplate(movieResults)];
    });
  },
};

const app = App;
app.init();
