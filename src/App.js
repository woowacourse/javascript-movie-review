import { getPopularMovies, getSearchMovies } from './api';
import { changeTitle, clearList, renderList, resetSearchBox, show, hide } from './dom';

import movieService from './domain/movieService';

import { $ } from './utils/domUtils';

const App = {
  MAX_MOVIES_PER_PAGE: 20,
  currentPage: 1,
  query: '',

  async loadMovies(api, params) {
    let newMovies = [];
    show('#skeleton-list');

    try {
      const { results } = await api(...params);
      newMovies = results;
    } catch (error) {
      alert(error.message);
    }

    hide('#skeleton-list');
    return newMovies;
  },

  refresh() {
    this.currentPage = 1;
    clearList();
    resetSearchBox();
    show('#load-more');
  },
};

export default App;
