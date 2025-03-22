import Button from '../../component/button/Button';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { Title } from '../../component/title/Title';
import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { extractedData } from '../../domain/APIManager';
import { $ } from '../../utils/selector';
import searchPageLoadingTemplate from './loadingTemplate';

class SearchPage {
  #container;
  #movieListData = [];
  #isLoading: boolean = true;
  #query: string;
  #currentPage = 1;
  #totalPage = 0;

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
      const { movieListData, totalPage } = await extractedData(
        SYSTEM_CONSTANTS.SEARCH_URL(this.#query, this.#currentPage),
      );
      this.#movieListData = movieListData;
      this.#totalPage = totalPage;
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
    this.#container.appendChild(this.#titleElement());
    this.renderDynamicSection();
  }

  renderDynamicSection() {
    const $loadMoreButton = $({ selector: '.button--medium' });
    if ($loadMoreButton) {
      $loadMoreButton.remove();
    }
    this.#container.appendChild(this.#movieGridElement());
    if (this.#currentPage !== this.#totalPage) this.#container.appendChild(this.#loadMoreButtonElement());
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData }).element;
  }

  #loadMoreButtonElement() {
    return new Button({ cssType: 'medium', innerText: '더보기', onClick: this.#loadMoreData }).element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(SYSTEM_CONSTANTS.SEARCH_URL(this.#query, this.#currentPage));
    this.#movieListData = movieListData;
    this.renderDynamicSection();
  };

  #titleElement() {
    return new Title({ text: `"${this.#query}" 검색 결과` }).element;
  }

  get element() {
    return this.#container;
  }
}

export default SearchPage;
