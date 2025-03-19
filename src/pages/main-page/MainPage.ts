import Button from '../../component/button/Button';
import MainBanner from '../../component/main-banner/MainBanner';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { Title } from '../../component/title/Title';
import { extractedMovieData } from '../../domain/APIManager';

export class MainPage {
  #container;
  #movieListData = [];
  #currentPage = 1;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.init();
  }

  async init() {
    this.#movieListData = await extractedMovieData();
    this.render();
  }

  render() {
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#titleElement());
    this.renderDynamicSection();

    console.log(this.#container);
  }

  renderDynamicSection() {
    const loadMoreButton = document.querySelector('.button--medium');
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
    return new MovieGrid({ movieItems: this.#movieListData, gridTitle: '지금 인기 있는 영화' }).element;
  }

  #loadMoreButtonElement() {
    return new Button({ cssType: 'medium', innerText: '더보기', onClick: this.#loadMoreData }).element;
  }

  #loadMoreData = async () => {
    this.#currentPage += 1;
    this.#movieListData = await extractedMovieData(this.#currentPage);
    this.renderDynamicSection();
  };

  get element() {
    return this.#container;
  }
}
