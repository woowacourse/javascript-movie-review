import Button from '../../component/common/button/Button';
import MainBanner from '../../component/domain/main-banner/MainBanner';
import MovieGrid from '../../component/domain/movie-grid/MovieGrid';
import { Title } from '../../component/common/title/Title';
import { extractedData } from '../../domain/APIManager';
import mainPageLoadingTemplate from './loadingTemplate';
import { MOVIE_API } from '../../constants/systemConstants';

export class MainPage {
  #container;
  #movieListData = [];
  #currentPage = 1;
  #isLoading: boolean = true;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.init();
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
    const loadMoreButton = document.querySelector('.button--full');
    if (loadMoreButton) {
      loadMoreButton.remove();
    }
    this.#container.appendChild(this.#movieGridElement());
    this.#container.appendChild(this.#loadMoreButtonElement());
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

  #loadMoreButtonElement() {
    return new Button({ size: 'full', innerText: '더보기', onclick: this.#loadMoreData }).element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(MOVIE_API.getPopularUrl(this.#currentPage));
    this.#movieListData = movieListData;
    this.renderDynamicSection();
  };

  get element() {
    return this.#container;
  }
}
