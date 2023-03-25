import './MoviesContainer.css';
import Movie, { MovieInformation } from '../domain/Movie';
import { $, getErrorMessage, sliceSting } from '../utils/common';

export interface HTMLMovieContainerElement extends HTMLElement {
  reset: () => void;
  setSearchWord: (searchWord: string) => void;
  setErrorMessage: (errorMessage: string) => void;
}

interface SearchWord {
  value: string;
}

const DEFAULT_VALUE = 'default_movie_search_title';

class MoviesContainer extends HTMLElement {
  #movies: MovieInformation = new Movie();
  #searchWord: SearchWord = new Proxy(
    { value: DEFAULT_VALUE },
    {
      get: (target: SearchWord, property: 'value') => {
        return target[property];
      },

      set: (target: SearchWord, property: 'value', value: string) => {
        window.scrollTo(0, 0);

        if (target[property] === value) return false;

        target[property] = value;

        this.reset();
        this.updateTitle(value);
        this.updateQueries(value);
        this.updateMovieList();

        return true;
      },
    }
  );
  #isFatching: boolean = false;

  connectedCallback(): void {
    this.renderContainer();
    this.setButtonEvent();
  }

  renderContainer(): void {
    this.innerHTML = /*html*/ `
    <main class="item-container">
    <section class="item-view">
        <h2 id="movie-container-title" class="movie-list-title">지금 인기 있는 영화</h2>
        <ul id="movie-list-wrapper" class="item-list">
        </ul>
        <skeleton-item id="skeleton-container"></skeleton-item>
        <div class="more-button-wrapper">
          <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
        </div>  
      </section>
    </main>`;
  }

  async updateMovieList(): Promise<void> {
    try {
      await this.#movies.update(this.#searchWord.value);

      $('#skeleton-container')?.classList.add('skeleton-hide');

      this.renderMovieList();
      this.toggleVisibleButton();
      this.#isFatching = false;
    } catch (error) {
      this.setErrorMessage(getErrorMessage(error));
      $('#more-button')?.classList.add('hide-button');
      $('#skeleton-container')?.classList.add('skeleton-hide');
    }
  }

  renderMovieList(): void {
    const movieList = this.#movies.movieResult;

    if (movieList.movies.length === 0) {
      this.showNoResult();
      return;
    }

    const movieListTemplate = movieList.movies.reduce((acc, curr) => {
      return (acc += `<movie-item id="${curr.id}" title="${curr.title}" imgUrl="${curr.imgUrl}" score="${curr.score}" description="${curr.description}"></movie-item>`);
    }, '');

    $('#movie-list-wrapper')?.insertAdjacentHTML('beforeend', movieListTemplate);
  }

  toggleVisibleButton(): void {
    if (this.#movies.movieResult.isLastPage) {
      $('#more-button')?.classList.add('hide-button');
      return;
    }

    $('#more-button')?.classList.remove('hide-button');
  }

  showNoResult(): void {
    const noResultContainer = document.createElement('div');
    const spelling = document.createElement('span');
    const language = document.createElement('span');
    const searchWord = document.createElement('span');
    const spacing = document.createElement('span');

    noResultContainer.classList.add('no-result');
    noResultContainer.id = 'no-result-message';
    const movieContainerTitle = $('#movie-container-title') as HTMLElement;

    movieContainerTitle.innerText = `"${this.#searchWord.value}" 에 대한 검색결과가 없습니다.`;
    spelling.innerText = '단어의 철자가 정확한지 확인해 보세요.';
    language.innerText = '한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.';
    searchWord.innerText = '검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.';
    spacing.innerText = '두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요. ';

    noResultContainer.append(spelling, language, searchWord, spacing);

    movieContainerTitle.insertAdjacentElement('afterend', noResultContainer);
  }

  setButtonEvent(): void {
    $('#more-button')?.addEventListener('click', () => {
      if (this.#isFatching) return;
      this.#isFatching = true;
      $('#skeleton-container')?.classList.remove('skeleton-hide');

      this.updateMovieList();
    });
  }

  reset(): void {
    const movieListWrapper = $('#movie-list-wrapper') as HTMLElement;

    this.#isFatching = false;
    // movieListWrapper.innerHTML = `<skeleton-item id="skeleton-container"></skeleton-item>`;
    movieListWrapper.innerHTML = ``;

    if ($('#no-result-message')) {
      $('#no-result-message')?.remove();
    }

    this.#movies.resetPageIndex();
  }

  updateTitle(word: string): void {
    const movieContainerTitle = $('#movie-container-title') as HTMLElement;

    if (word === '') {
      movieContainerTitle.innerText = '지금 인기 있는 영화';
      return;
    }

    movieContainerTitle.innerText = `"${sliceSting(word)}" 검색 결과`;
  }

  updateQueries(word: string) {
    if (word === '') {
      window.location.hash = '';
      return;
    }
    window.location.hash = `?q=${word}`;
  }

  setSearchWord(searchWord: string): void {
    this.#searchWord.value = searchWord;
  }

  setErrorMessage(errorMessage: string): void {
    const movieContainerTitle = $('#movie-container-title') as HTMLElement;

    movieContainerTitle.innerText = errorMessage;
  }
}

export default MoviesContainer;
