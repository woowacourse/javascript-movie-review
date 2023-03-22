import '../css/reset.css';
import '../css/common.css';
import { initProxy, proxy } from './domains/proxy';
import { movieApi } from './domains/movieApi';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';

const App = {
  state: {
    movie: { list: '', currentPage: 1, query: '' },
  },

  init() {
    this.initRender();
    initProxy(this.state);
    this.initState();
  },

  initRender() {
    customElements.define('custom-header', CustomHeader);
    customElements.define('movie-container', MovieContainer);
    CustomHeader.render();
    MovieContainer.initRender();
  },

  async initState() {
    proxy.movie.list = generateMovieListTemplate((await movieApi.getPopularMovieList(proxy.movie.currentPage)).results);
  },
};

const app = App;
app.init();
