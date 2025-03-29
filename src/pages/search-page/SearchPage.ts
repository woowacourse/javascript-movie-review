import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScrollEvent, handleBottomScroll } from '../../util/web/scroll';
import { Modal } from '../../component/common/modal/Modal';
import { MovieDetail } from '../../component/domain/movie-detail/MovieDetail';
import { DEBUG_ERROR } from '../../constants/debugErrorMessage';

class SearchPage {
  #container: HTMLElement;
  #modal: Modal | null = null;
  #movieGrid: MovieGrid | null = null;

  #movieListData: MovieData[] = [];
  #query: string;
  #currentPage = 1;
  #totalPage = 0;
  #isFetching: boolean = false;
  #unbindScrollEvent: () => void = () => {};

  #modalData: MovieData = {
    id: 0,
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
    this.#movieListData;

    const params = new URLSearchParams(window.location.search);

    this.#query = params.get('query') ?? '';
    this.init();
  }

  async init() {
    this.render();

    if (!this.#movieGrid) {
      throw new Error(DEBUG_ERROR.getNoComponentMessage('MovieGrid'));
    }

    this.#movieGrid.appendSkeletonItems();
    this.#movieGrid.setStatus('loading');

    if (this.#query) {
      const { movieListData, totalPage } = await extractedData(MOVIE_API.getSearchUrl(this.#query, this.#currentPage));
      this.#movieListData = movieListData;
      this.setGridStatus();
      this.#movieGrid.replaceLastNItems(this.#movieListData);
      this.#totalPage = totalPage;
    }
    this.#unbindScrollEvent = bindScrollEvent(() => handleBottomScroll(() => this.#guardedLoadMore()));
    this.#bindMovieSelectEvent();
  }

  render() {
    this.#container.innerHTML = '';
    this.#container.appendChild(this.#titleElement());
    this.renderDynamicSection();
  }

  setGridStatus() {
    if (!this.#movieGrid) {
      throw new Error(DEBUG_ERROR.getNoComponentMessage('MovieGrid'));
    }

    if (this.#movieListData.length === 0) {
      this.#movieGrid.setStatus('empty');
      return;
    }
    this.#movieGrid.setStatus('loaded');
  }

  renderDynamicSection() {
    this.#container.appendChild(this.#movieGridElement());
    this.#container.appendChild(this.#modalElement());
  }

  #movieGridElement() {
    this.#movieGrid = new MovieGrid();
    return this.#movieGrid.element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;

    if (!this.#movieGrid) throw new Error(DEBUG_ERROR.getNoComponentMessage('MovieGrid'));

    this.#movieGrid.appendSkeletonItems();

    const { movieListData } = await extractedData(MOVIE_API.getSearchUrl(this.#query, this.#currentPage));
    this.#movieListData = movieListData;

    this.#movieGrid.replaceLastNItems(this.#movieListData);

    if (this.#currentPage === this.#totalPage) {
      this.#movieGrid.resetSkeletonItems();
      return;
    }
  };

  #guardedLoadMore() {
    if (this.#currentPage >= this.#totalPage) return;
    if (this.#isFetching) return;

    this.#isFetching = true;
    this.#loadMoreData().finally(() => {
      this.#isFetching = false;
    });
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

      if (!this.#modal) throw new Error(DEBUG_ERROR.getNoComponentMessage('Modal'));

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
