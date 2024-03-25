import { template } from 'cypress/types/lodash';
import createHeader from './components/Header/Header';
import createMovieContents from './components/MovieContents/MovieContents';
import { POPULAR_MOVIE_TITLE, RENDER_TYPE, SEARCH_MOVIE_TITLE } from './constants/movie';
import Movie from './domain/Movie';
import { LOGO, STAR_FILLED } from './images/index';
import { MovieListType, MovieType } from './types/movie';
import { PropsType, RenderType } from './types/props';
import httpRequest from './api/httpRequest';
import HTTPError from './api/HttpError';
import errorMessage from './error/errorMessage';

interface MovieDataType {
  movieList: MovieListType;
  isLastPage: boolean;
}

type RequestFunctionType = (page: number, input?: string) => Promise<MovieDataType>;

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieDataType> };

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
      this.setEventOnSearchForm()
    });
    this.renderMainContents(RENDER_TYPE.POPULAR);
  }
  
  setEventOnSearchForm() {
    const searchForm = document.querySelector('#search');
    if (searchForm instanceof HTMLElement) {
      const formData = new FormData(searchForm as HTMLFormElement);
      const inputValue = formData.get('search') as string;
      this.resetPage();
      this.updateMainHtml();
      this.renderMainContents(RENDER_TYPE.SEARCH, inputValue);
    }

  }

  updateMainHtml() {
    this.deleteMain();
    this.createMain(SEARCH_MOVIE_TITLE);
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
    document.querySelector('main')?.remove();
  }

  createMain(titleMessage: string) {
    const main = document.createElement('main');
    const section = document.createElement('section');
    section.classList.add('item-view');

    const title = this.createTitle(titleMessage);
    section.innerHTML = title;
    main.appendChild(section);
    document.querySelector('#app')?.appendChild(main);
  }

  createTitle(titleMessage: string) {
    const title = /* html */ `<h2>${titleMessage}</h2>`;
    return title;
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
    document.querySelector('section.item-view')?.appendChild(ul);
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
      errorMessage.apiError(customError.statusCode, customError.message ? customError.message : '');
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
    document.querySelector('#skeleton')?.remove();
  }

  showMovieData(movieList: MovieListType) {
    this.deleteSkeleton();
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    const templateItem = (movie: MovieType) => /* html */ `
      <li>
        <a>
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
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

    const templates = movieList.map((movie: MovieType) => templateItem(movie));
    ul.innerHTML = templates.join('');
    return ul;
  }

  createShowMoreButton() {
    const button = document.createElement('button');
    button.classList.add('btn', 'primary', 'full-width');
    button.id = 'show-more-btn';
    button.textContent = '더 보기';
    return button;
  }

  createMainContents(
    movieList: MovieListType,
    isLastPage: boolean,
    renderType: RenderType,
    input?: string,
  ) {
    // 영화 데이터 출력
    const movieData = this.showMovieData(movieList);
    document.querySelector('section.item-view')?.appendChild(movieData);

    // 버튼 출력
    if (!isLastPage) {
      const showMoreButton = this.createShowMoreButton();
      showMoreButton.addEventListener('click', () => this.renderMainContents(renderType, input));
      document.querySelector('section.item-view')?.appendChild(showMoreButton);
    }
  }

  async renderMainContents(renderType: RenderType, input?: string) {
    this.deleteShowMoreButton();
    this.createMainSkeleton();

    const { movieList, isLastPage } = await this.handleMovieData(renderType, input);
    this.createMainContents(movieList, isLastPage, renderType, input);
  }

  deleteShowMoreButton() {
    document.querySelector('#show-more-btn')?.remove();
  }
}

export default MovieApp;
