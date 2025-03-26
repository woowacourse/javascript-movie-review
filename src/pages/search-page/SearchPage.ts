// import Button from '../../component/button/Button';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { Title } from '../../component/title/Title';
import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { extractedData } from '../../domain/APIManager';
import { $ } from '../../utils/selector';
import searchPageLoadingTemplate from './loadingTemplate';

class SearchPage {
  #container;
  #movieListData: MovieData[] = [];
  #newMovies = [];
  #isLoading: boolean = true;
  #query: string;
  #currentPage = 1;
  #totalPage = 0;
  #movieGrid: MovieGrid | null = null;

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
      this.#newMovies = movieListData;
      this.#totalPage = totalPage;
    }
    this.#isLoading = false;
    this.render();
    this.#bindInfiniteScrollEvent();
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
    if ($loadMoreButton) $loadMoreButton.remove();
    this.#renderGridMovies();
  }

  #renderGridMovies() {
    if (!this.#movieGrid) {
      this.#container.appendChild(this.#movieGridElement());
      return;
    }
    const movieElements = this.#movieGrid.appendMovies(this.#newMovies);

    const list = $({ selector: '.thumbnail-list' });
    if (!list) throw new Error('thumbnail-list가 존재하지 않습니다.');

    movieElements.forEach((el) => list.appendChild(el));
  }

  #movieGridElement() {
    this.#movieGrid = new MovieGrid({ movieItems: this.#movieListData });
    return this.#movieGrid.element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(SYSTEM_CONSTANTS.SEARCH_URL(this.#query, this.#currentPage));
    console.log('here', movieListData);
    this.#newMovies = movieListData;
    this.#movieListData = [...this.#movieListData, ...movieListData];
    this.renderDynamicSection();
  };

  #titleElement() {
    return new Title({ text: `"${this.#query}" 검색 결과` }).element;
  }

  get element() {
    return this.#container;
  }

  #onScroll = () => {
    if (this.#isLoading || this.#currentPage === this.#totalPage) {
      return;
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      console.log('search');
      this.#loadMoreData();
    }
  };

  #bindInfiniteScrollEvent() {
    window.addEventListener('scroll', this.#onScroll); // 익명함수는 제거 되지 않ㅎ는다... 주의 ...
  }

  destroy() {
    window.removeEventListener('scroll', this.#onScroll);
  }
}

export default SearchPage;
