import {
  MOVIE_POSTER_PATH,
  POPULAR_MOVIE_TITLE,
  RENDER_TYPE,
  SEARCH_MOVIE_TITLE,
} from './constants/movie';
import { NO_IMAGE } from './images/index';
import { MovieListType } from './types/movie';
import { RenderInputType, RenderType } from './types/props';
import {
  HEADER_TEMPLATE,
  MOVIE_ITEM_TEMPLATE,
  SKELETON_ITEM_TEMPLATE,
} from './constants/templates';
import movieDetailModal from './components/movieDetailModal/movieDetailModal';
import MoviePage from './domain/MoviePage';
import infiniteScroll from './utils/infiniteScroll';
import movieData from './domain/movieData';
import INFINITE_SCROLL from './constants/infiniteScroll';

interface CategorizeRenderType {
  popular: MoviePage;
  search: MoviePage;
}

class MovieApp {
  popularPage: MoviePage = new MoviePage();

  searchPage: MoviePage = new MoviePage();

  constructor() {
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
    this.preventSearchEvent();

    await this.renderMainContents({ renderType: RENDER_TYPE.POPULAR });

    infiniteScroll.startObserving(this, {
      renderType: RENDER_TYPE.POPULAR,
      threshold: INFINITE_SCROLL.THRESHOLD,
    });
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

    const ul = this.createItemList();
    const h2 = document.createElement('h2');
    h2.textContent = titleMessage;

    section.appendChild(h2);
    section.appendChild(ul);
    return section;
  }

  createItemList() {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    ul.id = 'item-list';
    movieDetailModal.handleDetailModal(ul);
    return ul;
  }

  createMainSkeleton(renderType: RenderType) {
    const ul = document.querySelector('#item-list') as HTMLElement;
    if (!ul) return;

    const templates = document
      .createRange()
      .createContextualFragment(SKELETON_ITEM_TEMPLATE.repeat(20));
    ul.appendChild(templates);

    this.categorizeRenderType(renderType).isLoading = true;
  }

  createMainContents(movieList: MovieListType) {
    const ul = document.querySelector('#item-list') as HTMLElement;
    if (!ul) return;

    const templates = movieList.map((movie) => {
      const imagePath = movie.poster_path ? `${MOVIE_POSTER_PATH}/${movie.poster_path}` : NO_IMAGE;
      return MOVIE_ITEM_TEMPLATE(movie, imagePath);
    });

    ul.insertAdjacentHTML('beforeend', templates.join(''));
  }

  createScrollEnd() {
    const div = document.createElement('div');
    div.id = 'scroll-end-box';
    div.className = 'scroll-end-box';
    return div;
  }

  async renderMainContents({ renderType, input }: RenderInputType) {
    const { movieList, isLastPage: isLastPageValue } = await movieData.handleMovieData(this, {
      renderType,
      input,
    });
    this.categorizeRenderType(renderType).isLastPage = isLastPageValue;
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

  deleteSkeleton(renderType: RenderType) {
    const skeletons = document.querySelectorAll('.li--skeleton');
    if (skeletons) {
      skeletons.forEach((skeleton) => skeleton.remove());
    }
    this.categorizeRenderType(renderType).isLoading = false;
  }

  setSearchFormEvent() {
    const searchForm = document.querySelector('#search-form') as HTMLFormElement;

    if (searchForm) {
      searchForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.handleSearchFormSubmit();
        this.toggleSearchWidth(searchForm);
        this.searchPage.resetIsLastPage();
      });
    }
  }

  async handleSearchFormSubmit() {
    const searchInput = document.querySelector('#search') as HTMLInputElement;

    if (searchInput instanceof HTMLInputElement) {
      const input = searchInput.value;
      const page = this.categorizeRenderType('search');
      page.resetPage();

      searchInput.focus();
      this.preventSearchEvent();

      this.updateMainHtml(SEARCH_MOVIE_TITLE(input));
      await this.renderMainContents({ renderType: RENDER_TYPE.SEARCH, input });
      infiniteScroll.startObserving(this, {
        renderType: RENDER_TYPE.SEARCH,
        input,
        threshold: INFINITE_SCROLL.THRESHOLD,
      });
    }
  }

  preventSearchEvent() {
    const searchForm = document.querySelector('#search-form') as HTMLFormElement;
    if (!searchForm) return;
    searchForm.reset();

    searchForm.addEventListener(
      'click',
      (event: Event) => {
        event.preventDefault();
      },
      { once: true },
    );
  }

  handleMovieApp({ renderType, input }: RenderInputType) {
    this.categorizeRenderType(renderType).updatePage();
    this.renderMainContents({ renderType, input });
  }

  toggleSearchWidth(searchForm: HTMLFormElement) {
    const logo = document.querySelector('#logo-img') as HTMLImageElement;
    const searchInput = document.querySelector('#search') as HTMLInputElement;

    searchForm.classList.toggle('search-form--longer');
    searchInput.classList.toggle('search-input--longer');
    logo.classList.toggle('invisible');
    searchInput.focus();
  }

  categorizeRenderType(renderType: RenderType): MoviePage {
    const categorizeRenderTypeTable: CategorizeRenderType = {
      popular: this.popularPage,
      search: this.searchPage,
    };
    return categorizeRenderTypeTable[renderType];
  }
}

export default MovieApp;
