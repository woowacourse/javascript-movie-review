import MainBanner from '../../component/main-banner/MainBanner';
import MovieGrid from '../../component/movie-grid/MovieGrid';
import { extractedMovieData } from '../../domain/APIManager';

export class MainPage {
  #container;
  #movieListData = [];

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-page');

    this.init();
  }

  async init() {
    this.#movieListData = await extractedMovieData();
    console.log(this.#movieListData);
    this.render();
  }

  render() {
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#movieGridElement());

    console.log(this.#container);
  }

  #mainBannerElement() {
    return new MainBanner({ data: this.#movieListData[0] }).element;
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: this.#movieListData, gridTitle: '지금 인기 있는 영화' }).element;
  }

  get element() {
    return this.#container;
  }
}
