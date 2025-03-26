import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import searchPageLoadingTemplate from './loadingTemplate';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScrollEvent, handleBottomScroll } from '../../util/web/scroll';

class SearchPage {
  #container;
  #movieListData: MovieData[] = [];
  #isLoading: boolean = true;
  #query: string;
  #currentPage = 1;
  #totalPage = 0;
  #isFetching: boolean = false;
  #unbindScrollEvent: () => void;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('search-page');

    this.#isFetching;

    const params = new URLSearchParams(window.location.search);

    this.#query = params.get('query') ?? '';
    this.init();

    this.#unbindScrollEvent = bindScrollEvent(() => handleBottomScroll(() => this.#guardedLoadMore()));
  }

  async init() {
    this.#isLoading = true;
    this.render();

    if (this.#query) {
      const { movieListData, totalPage } = await extractedData(MOVIE_API.getSearchUrl(this.#query, this.#currentPage));
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
    this.#container.appendChild(this.#movieGridElement());
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData }).element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(MOVIE_API.getSearchUrl(this.#query, this.#currentPage));
    this.#movieListData = movieListData;
    this.renderDynamicSection();
  };

  async #guardedLoadMore() {
    if (this.#currentPage >= this.#totalPage) return;
    if (this.#isFetching) return;

    this.#isFetching = true;
    await this.#loadMoreData();
    this.#isFetching = false;
  }

  #titleElement() {
    return new Title({ text: `"${this.#query}" 검색 결과` }).element;
  }

  destroy() {
    this.#unbindScrollEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchPage;
