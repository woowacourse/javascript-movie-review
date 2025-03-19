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
    // this.#movieListData = await extractedMovieData(SYSTEM_CONSTANTS.SEARCH_URL(searchValue, page));
    this.render();
  }

  render() {
    console.log('fpsejfld e');
    // this.renderDynamicSection();
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
