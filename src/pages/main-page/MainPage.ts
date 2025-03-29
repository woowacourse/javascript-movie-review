import MainBanner from '../../component/domain/main-banner/MainBanner';
import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScrollEvent, handleBottomScroll } from '../../util/web/scroll';
import { Modal } from '../../component/common/modal/Modal';
import { MovieDetail } from '../../component/domain/movie-detail/MovieDetail';
import { DEBUG_ERROR } from '../../constants/debugErrorMessage';

export class MainPage {
  #container: HTMLElement;
  #modal: Modal | null = null;
  #movieGrid: MovieGrid | null = null;
  #mainBanner: MainBanner | null = null;

  #movieListData: MovieData[] = [];
  #currentPage = 1;
  #modalData: MovieData = {
    id: 0,
    imgUrl: '/',
    score: 10,
    title: '',
    description: '',
    category: [''],
    releasedDate: new Date().getFullYear(),
  };

  #isFetching: boolean = false;

  #unbindScrollEvent: () => void = () => {};

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.#isFetching;

    this.init();
  }

  get element() {
    return this.#container;
  }

  async init() {
    this.render();

    if (!this.#movieGrid) {
      throw new Error(DEBUG_ERROR.getNoComponentMessage('MovieGrid'));
    }
    if (!this.#mainBanner) {
      throw new Error(DEBUG_ERROR.getNoComponentMessage('MainBanner'));
    }

    this.#movieGrid.appendSkeletonItems();

    this.#movieGrid.setStatus('loading');
    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = movieListData;
    this.setGridStatus();

    this.#movieGrid.replaceLastNItems(movieListData);

    this.#mainBanner.setData(this.#movieListData[0]);

    this.#unbindScrollEvent = bindScrollEvent(() => handleBottomScroll(() => this.#guardedLoadMore()));
    this.#bindMovieSelectEvent();
  }

  render() {
    this.#container.innerHTML = '';
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#titleElement());
    this.#container.appendChild(this.#modalElement());

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
  }

  #titleElement() {
    return new Title({ text: '지금 인기 있는 영화' }).element;
  }

  #mainBannerElement() {
    this.#mainBanner = new MainBanner();
    return this.#mainBanner.element;
  }

  #movieGridElement() {
    this.#movieGrid = new MovieGrid();
    return this.#movieGrid.element;
  }

  #modalElement() {
    this.#modal = new Modal();
    return this.#modal.element;
  }

  #loadMoreData = async () => {
    if (!this.#movieGrid) {
      throw new Error(DEBUG_ERROR.getNoComponentMessage('MovieGrid'));
    }
    this.#currentPage += 1;
    this.#movieGrid.appendSkeletonItems();

    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = [...this.#movieListData, ...movieListData];
    this.#movieGrid.replaceLastNItems(movieListData);
  };

  #guardedLoadMore() {
    if (this.#isFetching) return;
    this.#isFetching = true;
    this.#loadMoreData().finally(() => {
      this.#isFetching = false;
    });
  }

  destroy() {
    this.#unbindScrollEvent();
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
}
