import '../css/reset.css';
import '../css/common.css';
import { initProxy, proxy } from './domains/proxy';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';
import { getPopularMovieList } from './domains/movieApi';

const App = {
  state: {
    movie: { list: '', query: '', currentPage: 1, totalPages: 1 },
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

  initState() {
    getPopularMovieList(proxy.movie.currentPage).then(movieRoot => {
      const movieResults = movieRoot.results;
      proxy.movie.totalPages = movieRoot.total_pages;
      proxy.movie.list = generateMovieListTemplate(movieResults);
    });
  },
};

const app = App;
app.init();
