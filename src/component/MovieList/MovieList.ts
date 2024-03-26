import MovieItem from '../MovieItem/MovieItem';
import MoreMoviesButton from '../MoreMoviesButton/MoreMoviesButton';
import { getSearchedMoviesData } from '../../api/getSearchedMoviesData';
import { getPopularMoviesData } from '../../api/getPopularMoviesData';
import { $, $$, createElement } from '../../utility/dom';
import { validation } from '../../utility/validation';
import hangsungImg from '../../image/wooteco-icon.png';
import {
  ERROR_MESSAGE,
  INFO_MESSAGE,
  MAX_PAGE_PER_REQUEST,
  TAB,
  TITLE_TEXT,
} from '../../constant/setting';

class MovieList {
  #title: string;
  #movieListSection;
  #popularCurrentPage = 1;
  #searchCurrentPage = 1;

  constructor() {
    this.#title = '';
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
  }

  async #renderPopularMovieItems() {
    const ul = $('.item-list');

    try {
      const data = await getPopularMoviesData(
        this.#popularCurrentPage.toString(),
      );
      const liList = this.#createEmptyMovieItems(data, ul);

      setTimeout(() => {
        this.#updateMovieItemsWithData(data, liList);
        this.#handlePopularPagination(data);
      }, 1000);
    } catch (error) {
      this.#handleError(error as Error);
    }
    this.#removeMoreMoviesButton(TAB.POPULAR);
  }

  #handlePopularPagination(data: IMovieItemData[]) {
    if (data.length === MAX_PAGE_PER_REQUEST) {
      const moreMoviesButton = this.#createMoreMoviesButton(TAB.POPULAR);

      moreMoviesButton.addEventListener('click', () => {
        this.#popularCurrentPage += 1;
        this.#renderPopularMovieItems();
      });

      return;
    }

    this.#removeMoreMoviesButton(TAB.POPULAR);
    this.#displayMaxPageInfo();
  }

  #setupSearchFormSubmit() {
    const searchForm = $('.search-box');

    searchForm?.addEventListener('submit', (event) => {
      this.#handleSearchFormSubmit(event, searchForm);
    });
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

    this.#title = titleInput;
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
  }

  async #renderSearchedMovieItems(titleInput: string) {
    const ul = $('ul');

    try {
      const data = await this.#getSearchedMoviesData(titleInput);
      if (data.length > 0) {
        const liList = this.#createEmptyMovieItems(data, ul);

        setTimeout(() => {
          this.#updateMovieItemsWithData(data, liList);
          this.#handleSearchPagination(data);
        }, 1000);
      }
    } catch (error) {
      this.#handleError(error as Error);
    }

    this.#removeMoreMoviesButton(TAB.SEARCH);
  }

  async #getSearchedMoviesData(titleInput: string) {
    return await getSearchedMoviesData(
      this.#searchCurrentPage.toString(),
      titleInput,
    );
  }

  #handleSearchPagination(data: IMovieItemData[]) {
    if (data.length === MAX_PAGE_PER_REQUEST) {
      const moreMoviesButton = this.#createMoreMoviesButton(TAB.SEARCH);

      moreMoviesButton.addEventListener('click', () => {
        this.#searchCurrentPage += 1;
        this.#renderSearchedMovieItems(this.#title);
      });

      return;
    }

    this.#removeMoreMoviesButton(TAB.SEARCH);
    this.#displayMaxPageInfo();
  }

  // NOTE: 인기순 및 검색 리스트 공통 메서드
  #createMovieItem() {
    const li = createElement('li');
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

  #createEmptyMovieItems(
    data: IMovieItemData[],
    ul: HTMLElement | null,
  ): HTMLLIElement[] {
    return data.map(() => {
      const liElement = this.#createMovieItem() as HTMLLIElement;
      ul?.appendChild(liElement);
      return liElement;
    });
  }

  #updateMovieItemsWithData(data: IMovieItemData[], liList: HTMLLIElement[]) {
    this.#removeSkeleton();

    const movieItems = data.map(
      ({ title, poster_path, vote_average }) =>
        new MovieItem({ title, poster_path, vote_average }),
    );

    movieItems.forEach((movieItem: MovieItem, index: number) => {
      const li = liList[index];
      if (li) {
        movieItem.setMovieItemData(li);
      }
    });
  }

  #createMaxPageInfo() {
    const maxPageInfoElement = createElement('p', {
      class: 'max-page-info',
    });
    maxPageInfoElement.textContent = INFO_MESSAGE.MAX_PAGE;

    return maxPageInfoElement;
  }

  #displayMaxPageInfo() {
    const maxPageInfo = this.#createMaxPageInfo();

    this.#movieListSection.appendChild(maxPageInfo);
  }

  #createMoreMoviesButton(tab: string) {
    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton(tab);
    this.#movieListSection.appendChild(moreMoviesButton);

    return moreMoviesButton;
  }

  #removeMoreMoviesButton(tab: string) {
    $(`.${tab}MoreMoviesButton`)?.remove();
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
    } else {
      this.#crateErrorUI(ERROR_MESSAGE.UNKNOWN);
    }
  }
}

export default MovieList;
