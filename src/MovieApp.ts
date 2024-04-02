import {
  MOVIE_POSTER_PATH,
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

class MovieApp extends MoviePage {
  isLastPage: boolean = false;

  isLoading: boolean = false;

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
    this.handleSearchWidth();

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

    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    ul.id = 'item-list';
    const h2 = document.createElement('h2');
    h2.textContent = titleMessage;

    section.appendChild(h2);
    section.appendChild(ul);
    return section;
  }

  createMainSkeleton() {
    const ul = document.querySelector('#item-list') as HTMLElement;
    if (!ul) return;

    const templates = document
      .createRange()
      .createContextualFragment(SKELETON_ITEM_TEMPLATE.repeat(20));
    ul.appendChild(templates);

    this.isLoading = true;
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
    this.deleteSkeleton();
    const ul = document.querySelector('#item-list') as HTMLElement;
    if (!ul) return;

    const templates = movieList.map((movie) => {
      const imagePath = movie.poster_path ? `${MOVIE_POSTER_PATH}/${movie.poster_path}` : NO_IMAGE;
      return MOVIE_ITEM_TEMPLATE(movie, imagePath);
    });

    ul.insertAdjacentHTML('beforeend', templates.join(''));
    movieDetailModal.handleDetailModal(ul);
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
    const skeletons = document.querySelectorAll('.li--skeleton');
    if (skeletons) {
      skeletons.forEach((skeleton) => skeleton.remove());
    }
    this.isLoading = false;
  }

  setSearchFormEvent() {
    const searchForm = document.querySelector('#search-form') as HTMLFormElement;

    if (searchForm) {
      searchForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.handleSearchFormSubmit();
        this.toggleSearchWidth(searchForm);
      });
    }
  }

  async handleSearchFormSubmit() {
    const searchInput = document.querySelector('#search') as HTMLInputElement;

    if (searchInput instanceof HTMLInputElement) {
      const input = searchInput.value;
      this.resetPage();
      this.handleSearchWidth();
      this.updateMainHtml(SEARCH_MOVIE_TITLE(input));
      await this.renderMainContents({ renderType: RENDER_TYPE.SEARCH, input });
      infiniteScroll.startObserving(this, { renderType: RENDER_TYPE.SEARCH, input });
    }
  }

  handleSearchWidth() {
    const searchForm = document.querySelector('#search-form') as HTMLFormElement;

    if (searchForm && window.innerWidth <= 834) {
      searchForm.addEventListener(
        'click',
        (event: Event) => {
          event.preventDefault();
          searchForm.reset();
          this.toggleSearchWidth(searchForm);
        },
        { once: true },
      );
    }
  }

  toggleSearchWidth(searchForm: HTMLFormElement) {
    const logo = document.querySelector('#logo-img') as HTMLImageElement;
    const searchInput = document.querySelector('#search') as HTMLInputElement;

    searchForm.classList.toggle('search-form--longer');
    searchInput.classList.toggle('search-input--longer');
    logo.classList.toggle('invisible');
    searchInput.focus();
  }
}

export default MovieApp;
