import {
  MOVIE_PATH,
  POPULAR_MOVIE_TITLE,
  RENDER_TYPE,
  SEARCH_MOVIE_TITLE,
} from './constants/movie';
import { NO_IMAGE } from './images/index';
import { MovieListType } from './types/movie';
import { RenderType } from './types/props';
import httpRequest from './api/httpRequest';
import HTTPError from './api/HttpError';
import errorMessage from './error/errorMessage';
import {
  HEADER_TEMPLATE,
  MOVIE_ITEM_TEMPLATE,
  SKELETON_ITEM_TEMPLATE,
} from './constants/templates';
import filterMovieList from './domain/filterMovieList';
import movieDetailModal from './components/movieDetailModal/movieDetailModal';

interface MovieDataType {
  movieList: MovieListType;
  isLastPage: boolean;
}

type RequestFunctionType = (page: number, input: string) => Promise<MovieDataType>;

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieDataType> };

interface RenderInputType {
  renderType: RenderType;
  input?: string;
}

interface PageInputType {
  page: number;
  input: string;
}

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

class MovieApp {
  #popularPage: number = 1;

  #searchPage: number = 1;

  constructor() {
    this.init();
  }

  async init() {
    const container = document.querySelector('#app');
    const header = this.createHeader();
    const detailModal = movieDetailModal.createModal();

    container?.prepend(header);
    container?.appendChild(detailModal);

    this.createMain(POPULAR_MOVIE_TITLE);
    document.querySelector('#search-form')?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.handleSearchFormSubmit();
    });
    await this.renderMainContents(RENDER_TYPE.POPULAR);
  }

  handleSearchFormSubmit() {
    const searchForm = document.querySelector('#search') as HTMLInputElement;

    if (searchForm instanceof HTMLInputElement) {
      const inputValue = searchForm.value;
      this.resetPage();
      this.updateMainHtml(SEARCH_MOVIE_TITLE(inputValue));
      this.renderMainContents(RENDER_TYPE.SEARCH, inputValue);
    }
  }

  updateMainHtml(titleMessage: string) {
    this.deleteMain();
    this.createMain(titleMessage);
  }

  createHeader() {
    const header = document.createElement('header');
    header.innerHTML = HEADER_TEMPLATE;
    return header;
  }

  deleteMain() {
    const main = document.querySelector('main');
    if (main) main.remove();
  }

  createMain(titleMessage: string) {
    const main = document.createElement('main');
    const section = this.createSection(titleMessage);
    main.appendChild(section);
    const container = document.querySelector('#app');
    if (container) container.appendChild(main);
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

  handleMovieData(renderType: RenderType, input?: string): Promise<MovieDataType> {
    const page = this.getPage(renderType);
    const handleMovieDataTable: HandleMovieDataTableType = {
      popular: () =>
        this.getMovieData(httpRequest.fetchPopularMovies, { page, input: input ?? '' }),
      search: () =>
        this.getMovieData(httpRequest.fetchSearchedMovies, { page, input: input ?? '' }),
    };
    const getDataFunction = handleMovieDataTable[renderType];
    return getDataFunction();
  }

  async getMovieData(
    requestFunction: RequestFunctionType,
    { page, input }: PageInputType,
  ): Promise<MovieDataType> {
    try {
      const { movieList, isLastPage } = await requestFunction(page, input ?? '');
      const filteredMovieList = filterMovieList(movieList);
      return { movieList: filteredMovieList, isLastPage };
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ?? '');
      return { movieList: [], isLastPage: true };
    }
  }

  getPage(renderType: RenderType): number {
    const pageTable = {
      popular: this.#popularPage,
      search: this.#searchPage,
    };
    return pageTable[renderType];
  }

  updatePage(renderType: RenderType) {
    if (renderType === RENDER_TYPE.POPULAR) {
      this.#popularPage += 1;
    } else {
      this.#searchPage += 1;
    }
  }

  resetPage() {
    this.#popularPage = 1;
    this.#searchPage = 1;
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

  createShowMoreButton(renderType: RenderType, input?: string) {
    const button = document.createElement('button');
    button.classList.add('btn', 'primary', 'full-width');
    button.id = 'show-more-btn';
    button.textContent = '더 보기';
    button.addEventListener('click', () => {
      this.updatePage(renderType);
      this.renderMainContents(renderType, input);
    });
    return button;
  }

  createMainContents(
    { movieList, isLastPage }: MovieDataType,
    { renderType, input }: RenderInputType,
  ) {
    const movieData = this.showMovieData(movieList);
    const itemView = document.querySelector('#section--item-view');
    if (!itemView) return;

    itemView.appendChild(movieData);

    if (!isLastPage) {
      const showMoreButton = this.createShowMoreButton(renderType, input);
      itemView.appendChild(showMoreButton);
    }
  }

  async renderMainContents(renderType: RenderType, input?: string) {
    this.deleteShowMoreButton();
    this.createMainSkeleton();
    const { movieList, isLastPage } = await this.handleMovieData(renderType, input);
    this.createMainContents({ movieList, isLastPage }, { renderType, input });
  }

  deleteShowMoreButton() {
    const showMoreButton = document.querySelector('#show-more-btn');
    if (showMoreButton) showMoreButton.remove();
  }
}

export default MovieApp;
