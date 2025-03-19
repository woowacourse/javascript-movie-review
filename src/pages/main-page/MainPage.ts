import MainBanner from '../../component/main-banner/MainBanner';
import MovieGrid from '../../component/movie-grid/MovieGrid';

const mockData = [
  {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  },
  {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  },
  {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  },
  {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  },
  {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  },
];

export class MainPage {
  #container;

  constructor() {
    this.#container = document.createElement('div');

    this.render();
  }

  render() {
    this.#container.appendChild(this.#mainBannerElement());
    this.#container.appendChild(this.#movieGridElement());

    console.log(this.#container);
  }

  #mainBannerElement() {
    console.log(new MainBanner({ data: mockData[0] }).element);
    return new MainBanner({ data: mockData[0] }).element;
  }

  #movieGridElement() {
    return new MovieGrid({ movieItems: mockData, gridTitle: '지금 인기 있는 영화' }).element;
  }

  get element() {
    return this.#container;
  }
}
