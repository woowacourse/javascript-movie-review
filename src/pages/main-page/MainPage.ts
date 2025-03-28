import MainBanner from '../../component/domain/main-banner/MainBanner';
import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import mainPageLoadingTemplate from './loadingTemplate';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScrollEvent, handleBottomScroll } from '../../util/web/scroll';
import { Modal } from '../../component/common/modal/Modal';
import { MovieDetail } from '../../component/domain/movie-detail/MovieDetail';

export class MainPage {
  #container: HTMLElement;
  #modal: Modal | null = null;

  #movieListData: MovieData[] = [];
  #currentPage = 1;
  #modalData: MovieData = {
    imgUrl: '/',
    score: 10,
    title: '',
    description: '',
    category: [''],
  };

  #isLoading: boolean = true;
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
    this.#isLoading = true;
    this.render();

    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = movieListData;
    this.#isLoading = false;
    this.render();

    this.#unbindScrollEvent = bindScrollEvent(() => handleBottomScroll(() => this.#guardedLoadMore()));
    this.#bindMovieSelectEvent();
  }

  render() {
    this.#container.innerHTML = '';
    if (this.#isLoading) {
      this.#container.innerHTML = mainPageLoadingTemplate;
      return;
    }
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#titleElement());
    this.#container.appendChild(this.#modalElement());

    this.renderDynamicSection();
  }

  renderDynamicSection() {
    this.#container.appendChild(this.#movieGridElement());
  }

  #titleElement() {
    return new Title({ text: '지금 인기 있는 영화' }).element;
  }

  #mainBannerElement() {
    return new MainBanner({ data: this.#movieListData[0] }).element;
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData }).element;
  }

  #modalElement() {
    this.#modal = new Modal();
    return this.#modal.element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = movieListData;
    this.renderDynamicSection();
  };

  #guardedLoadMore() {
    if (this.#isFetching) return;
    this.#isFetching = true;
    this.#loadMoreData();
    this.#isFetching = false;
  }

  destroy() {
    this.#unbindScrollEvent();
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
}
