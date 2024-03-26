import {
  MOVIE_PATH,
  POPULAR_MOVIE_TITLE,
  RENDER_TYPE,
  SEARCH_MOVIE_TITLE,
} from './constants/movie';
import { LOGO, NO_IMAGE, STAR_FILLED } from './images/index';
import { MovieListType, MovieType } from './types/movie';
import { RenderType } from './types/props';
import httpRequest from './api/httpRequest';
import HTTPError from './api/HttpError';
import errorMessage from './error/errorMessage';

interface MovieDataType {
  movieList: MovieListType;
  isLastPage: boolean;
}

type RequestFunctionType = (page: number, input?: string) => Promise<MovieDataType>;

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieDataType> };

interface RenderInputType {
  renderType: RenderType;
  input?: string;
}

class MovieApp {
  #page: number = 0;

  constructor() {
    this.init();
  }

  async init() {
    const container = document.querySelector('#app');
    const header = this.createHeader();
    container?.prepend(header);
    this.createMain(POPULAR_MOVIE_TITLE);
    document.querySelector('#search')?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.handleSearchFormSubmit();
    });
    this.renderMainContents(RENDER_TYPE.POPULAR);
  }

  handleSearchFormSubmit() {
    const searchForm = document.querySelector('#search');
    if (searchForm instanceof HTMLElement) {
      const formData = new FormData(searchForm as HTMLFormElement);
      const inputValue = formData.get('search') as string;
      this.resetPage();
      this.updateMainHtml(SEARCH_MOVIE_TITLE);
      this.renderMainContents(RENDER_TYPE.SEARCH, inputValue);
    }
  }

  updateMainHtml(titleMessage: string) {
    this.deleteMain();
    this.createMain(titleMessage);
  }

  createHeader() {
    const header = document.createElement('header');
    const templates = /* html */ `
      <h1><img src=${LOGO} alt="MovieList 로고" /></h1>
      <form class="search-box" id="search">
        <input type="text" name="search" id="search" placeholder="검색" />
        <button type="submit" class="search-button">검색</button>
      </form>
    `;
    header.innerHTML = templates;

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
    section.innerHTML = /* html */ `<h2>${titleMessage}</h2>`;
    return section;
  }

  createMainSkeleton() {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    ul.id = 'skeleton';

    const skeletonItem = /* html */ `
      <li>
        <a>
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>  
    `;

    ul.innerHTML = skeletonItem.repeat(20);
    const itemView = document.querySelector('section.item-view');
    if (itemView) itemView.appendChild(ul);
  }

  handleMovieData(type: RenderType, input?: string): Promise<MovieDataType> {
    this.updatePage();
    const handleMovieDataTable: HandleMovieDataTableType = {
      popular: () => this.getMovieData(httpRequest.fetchPopularMovies),
      search: () => this.getMovieData(httpRequest.fetchSearchedMovies, input),
    };
    const getDataFunction = handleMovieDataTable[type];
    return getDataFunction();
  }

  async getMovieData(requestFunction: RequestFunctionType, input?: string): Promise<MovieDataType> {
    try {
      const { movieList, isLastPage } = await requestFunction(this.#page, input);
      const filteredMovieList = movieList.map((movie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average,
      }));
      return { movieList: filteredMovieList, isLastPage };
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ?? '');
      return { movieList: [], isLastPage: true };
    }
  }

  updatePage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 0;
  }

  deleteSkeleton() {
    const skeleton = document.querySelector('#skeleton');
    if (skeleton) skeleton.remove();
  }

  showMovieData(movieList: MovieListType) {
    this.deleteSkeleton();
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    const templateItem = (movie: MovieType, imagePath: string) => /* html */ `
      <li>
        <a>
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${imagePath}"
              loading="lazy"
              alt="${movie.title}"
            />
            <p class="item-title">${movie.title}</p>
            <p class="item-score">
              <img src=${STAR_FILLED} alt="별점" />${movie.vote_average.toFixed(1)}
            </p>
          </div>
        </a>
      </li>  
    `;

    const templates = movieList.map((movie) => {
      const imagePath = movie.poster_path ? `${MOVIE_PATH}/${movie.poster_path}` : NO_IMAGE;
      return templateItem(movie, imagePath);
    });
    ul.innerHTML = templates.join('');
    return ul;
  }

  createShowMoreButton(renderType: RenderType, input?: string) {
    const button = document.createElement('button');
    button.classList.add('btn', 'primary', 'full-width');
    button.id = 'show-more-btn';
    button.textContent = '더 보기';
    button.addEventListener('click', () => this.renderMainContents(renderType, input));
    return button;
  }

  createMainContents(
    { movieList, isLastPage }: MovieDataType,
    { renderType, input }: RenderInputType,
  ) {
    const movieData = this.showMovieData(movieList);
    const itemView = document.querySelector('section.item-view');
    if (itemView && !isLastPage) {
      const showMoreButton = this.createShowMoreButton(renderType, input);
      itemView.appendChild(movieData);
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
