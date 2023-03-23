import '../css/reset.css';
import '../css/common.css';
import { initProxy, proxy } from './domains/proxy';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';
import { getPopularMovieList } from './domains/movieApi';

const App = {
  state: {
    movie: { list: '', currentPage: 1, query: '' },
  },

  init() {
    initProxy(this.state);
    this.initRender();
    this.initState();
  },

  initRender() {
    customElements.define('custom-header', CustomHeader);
    customElements.define('movie-container', MovieContainer);
    CustomHeader.render();
    MovieContainer.initRender();
  },

  async initState() {
    const movieResults = (await getPopularMovieList(proxy.movie.currentPage)).results;
    proxy.movie.list = generateMovieListTemplate(movieResults);
  },
};

const app = App;
app.init();
