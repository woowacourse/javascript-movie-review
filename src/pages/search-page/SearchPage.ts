import Button from '../../component/button/Button';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { Title } from '../../component/title/Title';
import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { extractedMovieData } from '../../domain/APIManager';
import searchPageLoadingTemplate from './loadingTemplate';

class SearchPage {
  #container;
  #movieListData = [];
  #isLoading: boolean = true;
  #query: string;
  #currentPage = 1;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('search-page');

    const params = new URLSearchParams(window.location.search);

    this.#query = params.get('query') ?? '';
    this.init();
  }

  async init() {
    this.#isLoading = true;
    this.render();

    if (this.#query) {
      this.#movieListData = await extractedMovieData(SYSTEM_CONSTANTS.SEARCH_URL(this.#query, 1));
    }
    this.#isLoading = false;
    this.render();
  }

  render() {
    this.#container.innerHTML = '';
    if (this.#isLoading) {
      this.#container.innerHTML = searchPageLoadingTemplate(this.#query);
      return;
    }
    console.log('render return 이후');
    this.#container.appendChild(this.#titleElement());
    this.renderDynamicSection();
  }

  renderDynamicSection() {
    console.log('renderDynamicSection 작동');
    const loadMoreButton = document.querySelector('.button--medium');
    if (loadMoreButton) {
      loadMoreButton.remove();
    }

    this.#container.appendChild(this.#movieGridElement());
    this.#container.appendChild(this.#loadMoreButtonElement());
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData }).element;
  }

  #loadMoreButtonElement() {
    return new Button({ cssType: 'medium', innerText: '더보기', onClick: this.#loadMoreData }).element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    this.#movieListData = await extractedMovieData(SYSTEM_CONSTANTS.SEARCH_URL(this.#query, this.#currentPage));
    this.renderDynamicSection();
  };

  #titleElement() {
    console.log('title Element');
    return new Title({ text: `"${this.#query}" 검색 결과` }).element;
  }

  get element() {
    return this.#container;
  }
}

export default SearchPage;
