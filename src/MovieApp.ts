import {
  MOVIE_PATH,
  POPULAR_MOVIE_TITLE,
  RENDER_TYPE,
  SEARCH_MOVIE_TITLE,
} from './constants/movie';
import { NO_IMAGE } from './images/index';
import { MovieListType } from './types/movie';
import { RenderInputType } from './types/props';
import {
  HEADER_TEMPLATE,
  MOVIE_ITEM_TEMPLATE,
  SKELETON_ITEM_TEMPLATE,
} from './constants/templates';
import movieDetailModal from './components/movieDetailModal/movieDetailModal';
import MoviePage from './domain/MoviePage';
import infiniteScroll from './utils/infiniteScroll';
import movieData from './domain/movieData';

// ====================임시 더미데이터==================
const dummy = [
  {
    id: 1011985,
    ratingValue: 10,
  },
  {
    id: 634492,
    ratingValue: 2,
  },
  {
    id: 763215,
    ratingValue: 8,
  },
];

localStorage.setItem('ratings', JSON.stringify(dummy));

// ========================임시=========================

class MovieApp extends MoviePage {
  isLastPage: boolean = false;

  constructor() {
    super();
    this.init();
  }

  async init() {
    const container = document.querySelector('#app');
    if (!container) return;

    const header = this.createHeader();
    const detailModal = movieDetailModal.createModal();

    container.prepend(header);
    container.appendChild(detailModal);

    this.createMain(POPULAR_MOVIE_TITLE);
    this.setSearchFormEvent();

    await this.renderMainContents({ renderType: RENDER_TYPE.POPULAR });

    infiniteScroll.startObserving(this, { renderType: RENDER_TYPE.POPULAR });
  }

  updateMainHtml(titleMessage: string) {
    this.deleteMain();
    this.deleteScrollEnd();
    this.createMain(titleMessage);
  }

  createHeader() {
    const header = document.createElement('header');
    header.innerHTML = HEADER_TEMPLATE;
    return header;
  }

  createMain(titleMessage: string) {
    const main = document.createElement('main');
    const section = this.createSection(titleMessage);
    main.appendChild(section);

    const scrollEnd = this.createScrollEnd();

    const container = document.querySelector('#app');
    if (container) {
      container.appendChild(main);
      container.appendChild(scrollEnd);
    }
  }

  createSection(titleMessage: string) {
    const section = document.createElement('section');
    section.classList.add('item-view');
    section.id = 'section--item-view';
    section.innerHTML = /* html */ `<h2>${titleMessage}</h2>`;
    return section;
  }

  createMainSkeleton() {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    ul.id = 'skeleton';

    ul.innerHTML = SKELETON_ITEM_TEMPLATE.repeat(20);
    const itemView = document.querySelector('#section--item-view');
    if (itemView) itemView.appendChild(ul);
  }

  createShowMoreButton({ renderType, input }: RenderInputType) {
    const button = document.createElement('button');
    button.classList.add('btn', 'primary', 'full-width');
    button.id = 'show-more-btn';
    button.textContent = '더 보기';

    button.addEventListener('click', () => {
      this.updatePage(renderType);
      this.renderMainContents({ renderType, input });
    });
    return button;
  }

  createMainContents(movieList: MovieListType) {
    const movieData = this.showMovieData(movieList);
    const itemView = document.querySelector('#section--item-view');
    if (!itemView) return;

    itemView.appendChild(movieData);
  }

  createScrollEnd() {
    const div = document.createElement('div');
    div.id = 'scroll-end-box';
    return div;
  }

  async renderMainContents({ renderType, input }: RenderInputType) {
    this.createMainSkeleton();
    const { movieList, isLastPage: isLastPageValue } = await movieData.handleMovieData(this, {
      renderType,
      input,
    });
    this.isLastPage = isLastPageValue;
    this.createMainContents(movieList);
  }

  deleteMain() {
    const main = document.querySelector('main');
    if (main) main.remove();
  }

  deleteScrollEnd() {
    const scrollEnd = document.querySelector('#scroll-end-box');
    if (scrollEnd) scrollEnd.remove();
  }

  deleteSkeleton() {
    const skeleton = document.querySelector('#skeleton');
    if (skeleton) skeleton.remove();
  }

  showMovieData(movieList: MovieListType) {
    this.deleteSkeleton();
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    const templates = movieList.map((movie) => {
      const imagePath = movie.poster_path ? `${MOVIE_PATH}/${movie.poster_path}` : NO_IMAGE;
      return MOVIE_ITEM_TEMPLATE(movie, imagePath);
    });

    ul.innerHTML = templates.join('');
    movieDetailModal.handleDetailModal(ul);
    return ul;
  }

  setSearchFormEvent() {
    const searchForm = document.querySelector('#search-form');

    if (searchForm) {
      searchForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.handleSearchFormSubmit();
      });
    }
  }

  async handleSearchFormSubmit() {
    const searchForm = document.querySelector('#search') as HTMLInputElement;

    if (searchForm instanceof HTMLInputElement) {
      const input = searchForm.value;
      this.resetPage();
      this.updateMainHtml(SEARCH_MOVIE_TITLE(input));
      await this.renderMainContents({ renderType: RENDER_TYPE.SEARCH, input });
      infiniteScroll.startObserving(this, { renderType: RENDER_TYPE.SEARCH, input });
    }
  }
}

export default MovieApp;
