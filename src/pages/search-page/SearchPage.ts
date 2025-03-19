import MovieGrid from '../../component/movie-grid/MovieGrid';
import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { extractedMovieData } from '../../domain/APIManager';

class SearchPage {
  #container;
  #movieListData = [];

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('search-page');

    this.init();
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      this.#movieListData = await extractedMovieData(SYSTEM_CONSTANTS.SEARCH_URL(query, 1));
    }
    this.render();
  }

  render() {
    this.renderDynamicSection();
  }

  renderDynamicSection() {
    const loadMoreButton = document.querySelector('.button--medium');
    if (loadMoreButton) {
      loadMoreButton.remove();
    }
    this.#container.appendChild(this.#movieGridElement());
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData }).element;
  }

  get element() {
    return this.#container;
  }
}

export default SearchPage;
