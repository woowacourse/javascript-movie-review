import MainBanner from '../../component/domain/main-banner/MainBanner';
import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import mainPageLoadingTemplate from './loadingTemplate';
import { MOVIE_API } from '../../constants/systemConstants';
import { MovieData } from '../../../types/movie';
import { bindScroll, handleBottomScroll } from '../../util/web/scroll';

export class MainPage {
  #container: HTMLElement;
  #movieListData: MovieData[] = [];
  #currentPage = 1;
  #isLoading: boolean = true;
  #isFetching: boolean = false;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.#isFetching;

    this.init();

    bindScroll(() => handleBottomScroll(() => this.#guardedLoadMore()));
  }

  async init() {
    this.#isLoading = true;
    this.render();

    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = movieListData;
    this.#isLoading = false;
    this.render();
  }

  render() {
    this.#container.innerHTML = '';
    if (this.#isLoading) {
      this.#container.innerHTML = mainPageLoadingTemplate;
      return;
    }
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#titleElement());
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

  get element() {
    return this.#container;
  }
}
