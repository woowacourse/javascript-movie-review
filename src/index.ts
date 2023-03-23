import '../css/reset.css';
import '../css/common.css';
import { proxy } from './state/state';
import { initProxy } from './domains/proxy';
import { getPopularMovieList } from './domains/movieApi';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';

const App = {
  init() {
    initProxy();
    this.initRender();
    this.initState();
  },

  initRender() {
    customElements.define('custom-header', CustomHeader);
    customElements.define('movie-container', MovieContainer);
    CustomHeader.render();
    MovieContainer.initRender();
  },

  initState() {
    getPopularMovieList().then(movieRoot => {
      const movieResults = movieRoot.results;
      proxy.movie.totalPages = movieRoot.total_pages;
      proxy.movie.list = generateMovieListTemplate(movieResults);
    });
  },
};

const app = App;
app.init();
