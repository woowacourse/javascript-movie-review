import MainBanner from '../../component/main-banner/MainBanner';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { Title } from '../../component/title/Title';
import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { extractedData } from '../../domain/APIManager';
import { $ } from '../../utils/selector';
import mainPageLoadingTemplate from './loadingTemplate';

export class MainPage {
  #container;
  #movieListData: MovieData[] = [];
  #currentPage = 1;
  #isLoading: boolean = true;
  #movieGrid: MovieGrid | null = null;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.init();
  }

  async init() {
    this.#isLoading = true;
    this.render();

    const { movieListData } = await extractedData(SYSTEM_CONSTANTS.MAIN_URL(this.#currentPage));
    this.#movieListData = movieListData;
    this.#isLoading = false;
    this.render();
    this.#bindInfiniteScrollEvent();
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
    const $loadMoreButton = $({ selector: '.button--medium' });
    if ($loadMoreButton) $loadMoreButton.remove();
    this.#renderGridMovies();
  }

  #renderGridMovies() {
    if (!this.#movieGrid) {
      this.#container.appendChild(this.#movieGridElement());
      return;
    }
    const newItems = this.#movieListData.slice(-20); // todo : 20 매직넘버
    const movieElements = this.#movieGrid.appendMovies(newItems);

    const list = $({ selector: '.thumbnail-list' });
    if (!list) throw new Error('thumbnail-list가 존재하지 않습니다.');

    movieElements.forEach((el) => list.appendChild(el));
  }

  #titleElement() {
    return new Title({ text: '지금 인기 있는 영화' }).element;
  }

  #mainBannerElement() {
    return new MainBanner({ data: this.#movieListData[0] }).element;
  }

  #movieGridElement() {
    this.#movieGrid = new MovieGrid({ movieItems: this.#movieListData });
    return this.#movieGrid.element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    const { movieListData } = await extractedData(SYSTEM_CONSTANTS.MAIN_URL(this.#currentPage));
    this.#movieListData = [...this.#movieListData, ...movieListData];
    this.renderDynamicSection();
  };

  get element() {
    return this.#container;
  }

  #onScroll = () => {
    if (this.#isLoading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      this.#loadMoreData();
    }
  };

  #bindInfiniteScrollEvent() {
    window.addEventListener('scroll', this.#onScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.#onScroll);
  }
}
