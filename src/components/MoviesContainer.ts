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
        this.updateMovieList();

        return true;
      },
    }
  );
  #isFatching: boolean = false;

  connectedCallback(): void {
    this.renderContainer();
    this.setInfiniteScrollEvent();
  }

  renderContainer(): void {
    this.innerHTML = /*html*/ `
    <main id="movie-container" class="item-container">
    <section class="item-view">
        <h2 id="movie-container-title" class="movie-list-title">지금 인기 있는 영화</h2>
        <ul id="movie-list-wrapper" class="item-list">
        </ul>
        <skeleton-item id="skeleton-container"></skeleton-item>
        <div id="more-button-container" class="more-button-wrapper">
          <common-button id="more-button" text="" color="darken"></common-button>
        </div>  
      </section>
    </main>`;
  }

  async updateMovieList(): Promise<void> {
    try {
      this.#isFatching = true;
      await this.#movies.update(this.#searchWord.value);
      this.renderMovieList();
      $('#skeleton-container')?.classList.add('skeleton-hide');

      if (this.#movies.movieResult.isLastPage) {
        return;
      }

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
      return (acc += `<movie-item id="id${curr.id}" movieId="${curr.id}" title="${curr.title}" imgUrl="${curr.imgUrl}" score="${curr.score}" description="${curr.description}"></movie-item>`);
    }, '');

    $('#movie-list-wrapper')?.insertAdjacentHTML('beforeend', movieListTemplate);
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
    spelling.innerText = '· 단어의 철자가 정확한지 확인해 보세요.';
    language.innerText = '· 한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.';
    searchWord.innerText = '· 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.';
    spacing.innerText = '· 두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요. ';

    noResultContainer.append(spelling, language, searchWord, spacing);

    movieContainerTitle.insertAdjacentElement('afterend', noResultContainer);
  }

  setInfiniteScrollEvent() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const movieList = $('#more-button') as HTMLButtonElement;

    const io = new IntersectionObserver((entry, observer) => {
      if (entry[0].isIntersecting) {
        if (this.#isFatching) return;
        $('#skeleton-container')?.classList.remove('skeleton-hide');
        this.#isFatching = true;
        this.updateMovieList();
      }
    }, options);

    io.observe(movieList);
  }

  reset(): void {
    const movieListWrapper = $('#movie-list-wrapper') as HTMLElement;

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

  setSearchWord(searchWord: string): void {
    if (this.#searchWord.value === searchWord) return;
    this.#searchWord.value = searchWord;
  }

  setErrorMessage(errorMessage: string): void {
    const movieContainerTitle = $('#movie-container-title') as HTMLElement;

    movieContainerTitle.innerText = errorMessage;
  }
}

export default MoviesContainer;
