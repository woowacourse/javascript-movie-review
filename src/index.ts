import '../css/reset.css';
import '../css/common.css';
import { movie, proxy } from './state/state';
import { initProxy } from './domains/proxy';
import { getPopularMovieList } from './domains/movieApi';
import { generateMovieListTemplate } from './components/templates/movieList';
import MovieContainer from './components/MovieContainer';
import CustomHeader from './components/CustomHeader';
import { initObserver } from './domains/observer';
import MovieModal from './components/MovieModal';
import Main from './components/Main';
import { isMovieRoot } from './types/typeGuards';

const App = {
  init() {
    this.initRender();

    initProxy();
    this.initState();

    initObserver();
  },

  initRender() {
    customElements.define('custom-header', CustomHeader);
    CustomHeader.render();

    Main.render();

    customElements.define('movie-container', MovieContainer);
    MovieContainer.render();

    customElements.define('movie-modal', MovieModal);
    MovieModal.render();
  },

  async initState() {
    const root = await getPopularMovieList();

    if (isMovieRoot(root)) {
      const movieResults = root.results;
      movie.totalPages = root.total_pages;
      proxy.movie.list = [generateMovieListTemplate(movieResults)];
    }
  },
};

const app = App;
app.init();
