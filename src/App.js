import { getPopularMovies, getSearchMovies } from './api';
import { changeTitle, clearList, renderList, resetSearchBox, show, hide } from './dom';

import movieService from './domain/movieService';

import { $ } from './utils/domUtils';

const App = {
  MAX_MOVIES_PER_PAGE: 20,
  currentPage: 1,
  query: '',

  refresh() {
    this.currentPage = 1;
    clearList();
    resetSearchBox();
    show('#load-more');
  },
};

export default App;
