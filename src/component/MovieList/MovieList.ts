import MovieItem from '../MovieItem/MovieItem';
import { getSearchedMoviesData } from '../../api/getSearchedMoviesData';
import { getPopularMoviesData } from '../../api/getPopularMoviesData';
import { getMovieDetailData } from '../../api/getMovieDetailData';
import { $, $$, createElement } from '../../utility/dom';
import { validation } from '../../utility/validation';
import hangsungImg from '../../image/wooteco-icon.png';
import {
  ERROR_MESSAGE,
  INFO_MESSAGE,
  MAX_PAGE_PER_REQUEST,
  TITLE_TEXT,
} from '../../constant/setting';
import MovieModal from '../MovieModal/MovieModal';
import { pagination } from '../../utility/pagination';

class MovieList {
  #movieID: number;
  #movieListSection;
  #popularCurrentPage = 1;
  #searchCurrentPage = 1;
  #movieModal: MovieModal;

  constructor() {
    this.#movieModal = new MovieModal();
    this.#movieID = 0;
    this.#movieListSection = $('.item-view') as Element;

    this.#createPopularMoviesSection();
    this.#renderPopularMovieItems();
    this.#setupSearchFormSubmit();
  }

  #createPopularMoviesSection() {
    const movieListTitle = createElement('h2');
    movieListTitle.textContent = TITLE_TEXT.POPULAR;

    const movieListUl = createElement('ul', {
      class: 'item-list',
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(movieListUl);
    this.#movieModal.createMovieModalSection();
  }

  async #renderPopularMovieItems() {
    const ulElement = $('.item-list');
    const liList = this.#createEmptyMovieItems(ulElement);
    const scrollTrigger = $('.item-list')?.lastChild as HTMLLIElement;
    try {
      const data = await getPopularMoviesData(
        this.#popularCurrentPage.toString(),
      );
      if (data.length > 0) {
        pagination.paginate(data.length, scrollTrigger, () =>
          this.#onPopularIntersect(),
        );
      }
      this.#removeSkeleton();
      this.#updateMovieItemsWithData(data, liList);
    } catch (error) {
      this.#removeSkeleton();
      this.#handleError(error as Error);
    }
    this.#setupItemClick();
  }

  #setupSearchFormSubmit() {
    const searchForm = $('.search-box');

    searchForm?.addEventListener('submit', (event) => {
      this.#handleSearchFormSubmit(event, searchForm);
    });
  }

  #setupItemClick() {
    const ulElement = $('.item-list');
    ulElement?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const clickedLi = target.closest('li');
      if (clickedLi) {
        this.#movieID = Number(clickedLi.id);
        this.#renderMovieDetailModal(this.#movieID);
      }
    });
  }

  #onPopularIntersect() {
    this.#popularCurrentPage += 1;
    this.#renderPopularMovieItems();
  }

  #onSearchIntersect(titleInput: string) {
    this.#searchCurrentPage += 1;
    this.#renderSearchedMovieItems(titleInput);
  }

  #handleSearchFormSubmit(event: Event, searchForm: HTMLElement | null) {
    event.preventDefault();

    this.#searchCurrentPage = 1;

    const titleInput = (
      searchForm?.querySelector('.search-input') as HTMLInputElement
    ).value;

    if (!validation.validateEmptyInput(titleInput)) {
      alert(INFO_MESSAGE.EMPTY_SEARCH_KEYWORD);
      return;
    }

    this.#movieListSection.innerHTML = '';
    this.#createSearchedMoviesSection(titleInput);
    this.#renderSearchedMovieItems(titleInput);
  }

  #createSearchedMoviesSection(titleInput: string) {
    const movieListTitle = createElement('h2');
    movieListTitle.textContent = TITLE_TEXT.SEARCH(titleInput);

    const searchedMovieListUl = createElement('ul', {
      class: 'item-list',
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(searchedMovieListUl);
    this.#movieModal.createMovieModalSection();
  }

  async #renderSearchedMovieItems(titleInput: string) {
    const ulElement = $('.item-list');
    const liList = this.#createEmptyMovieItems(ulElement);
    const scrollTrigger = $('.item-list')?.lastChild as HTMLLIElement;

    try {
      const data = await this.#getSearchedMoviesData(titleInput);
      if (data.length > 0) {
        pagination.paginate(data.length, scrollTrigger, () =>
          this.#onSearchIntersect(titleInput),
        );
      }
      this.#removeSkeleton();
      this.#updateMovieItemsWithData(data, liList);
    } catch (error) {
      this.#removeSkeleton();
      this.#handleError(error as Error);
    }
    this.#setupItemClick();
  }

  async #getSearchedMoviesData(titleInput: string) {
    return await getSearchedMoviesData(
      this.#searchCurrentPage.toString(),
      titleInput,
    );
  }

  async #renderMovieDetailModal(movieID: number) {
    try {
      const data = await this.#getMovieDetailData(movieID);
      this.#movieModal.setMovieModalItem(data);
    } catch (error) {
      this.#handleError(error as Error);
    }
  }

  async #getMovieDetailData(movieID: number) {
    return await getMovieDetailData(movieID);
  }

  // NOTE: 인기순 및 검색 리스트 공통 메서드
  #createMovieItem() {
    const li = createElement('li', {
      class: 'item',
    });
    const article = createElement('article', {
      class: 'item-card',
    });
    const tumbnailContainer = createElement('div', {
      class: 'thumbnail-container skeleton',
    });
    const thumbnail = createElement('img', {
      class: 'item-thumbnail',
      loading: 'lazy',
      alt: '',
    }) as HTMLImageElement;
    const title = createElement('p', {
      class: 'item-title skeleton',
    });
    const scoreWrapper = createElement('div', {
      class: 'item-score-wrapper',
    });
    const score = createElement('span', {
      class: 'item-score skeleton',
    });
    const starImg = createElement('img', {
      class: 'item-filled-star',
    }) as HTMLImageElement;

    scoreWrapper.appendChild(score);
    scoreWrapper.appendChild(starImg);
    article.appendChild(tumbnailContainer);
    tumbnailContainer.appendChild(thumbnail);
    article.appendChild(title);
    article.appendChild(scoreWrapper);
    li.appendChild(article);

    return li;
  }

  #createEmptyMovieItems(ul: HTMLElement | null): HTMLLIElement[] {
    const skeletonData = Array.from({ length: MAX_PAGE_PER_REQUEST }).map(
      () => {
        return this.#createMovieItem() as HTMLLIElement;
      },
    );

    skeletonData.forEach((liElement) => {
      ul?.appendChild(liElement);
    });

    return skeletonData;
  }

  #updateMovieItemsWithData(data: IMovieItemData[], liList: HTMLLIElement[]) {
    const movieItems = data.map(
      ({ title, poster_path, vote_average, id }) =>
        new MovieItem({ title, poster_path, vote_average, id }),
    );

    movieItems.forEach((movieItem: MovieItem, index: number) => {
      const li = liList[index];
      if (li) {
        movieItem.setMovieItemData(li);
      }
    });
  }

  #removeSkeleton() {
    const skeletonElements = $$('.skeleton');

    if (skeletonElements) {
      skeletonElements.forEach((element) => {
        element.classList.remove('skeleton');
      });
    }
  }

  #crateErrorUI(message: string) {
    const sectionElement = $('.item-view');
    const errorWrapper = createElement('div', {
      class: 'error-wrapper',
    });
    const imgElement = createElement('img', {
      class: 'wooteco-icon',
      src: hangsungImg,
    });
    const textElement = createElement('p', {
      class: 'error-message',
    });
    textElement.textContent = message;

    if (sectionElement) {
      sectionElement.innerHTML = '';
      sectionElement.appendChild(errorWrapper);
    }

    if (errorWrapper) {
      errorWrapper.appendChild(imgElement);
      errorWrapper.appendChild(textElement);
    }
  }

  #handleError(error: Error) {
    if (typeof error === 'object' && error.message) {
      this.#crateErrorUI(error.message);
      return;
    }
    this.#crateErrorUI(ERROR_MESSAGE.UNKNOWN);
  }
}

export default MovieList;
