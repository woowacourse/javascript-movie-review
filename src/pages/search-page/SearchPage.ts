import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import searchPageLoadingTemplate from './loadingTemplate';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScrollEvent, handleBottomScroll } from '../../util/web/scroll';
import { Modal } from '../../component/common/modal/Modal';
import { MovieDetail } from '../../component/domain/movie-detail/MovieDetail';

class SearchPage {
  #container: HTMLElement;
  #modal: Modal | null = null;

  #movieListData: MovieData[] = [];
  #isLoading: boolean = true;
  #query: string;
  #currentPage = 1;
  #totalPage = 0;
  #isFetching: boolean = false;
  #unbindScrollEvent: () => void;

  #modalData: MovieData = {
    imgUrl: '/',
    score: 10,
    title: '',
    description: '',
    category: [''],
    releasedDate: new Date().getFullYear(),
  };

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
    this.#bindMovieSelectEvent();
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
    this.#container.appendChild(this.#modalElement());
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

  #modalElement() {
    this.#modal = new Modal();
    return this.#modal.element;
  }

  #bindMovieSelectEvent() {
    this.#container.addEventListener('movieSelect', (event) => {
      this.#modalData = (event as CustomEvent).detail;
      const movieDetail = new MovieDetail({ data: this.#modalData }).element;

      if (!this.#modal) return;

      this.#modal.setContent(movieDetail);
      this.#modal.open();
    });
  }

  destroy() {
    this.#unbindScrollEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchPage;
