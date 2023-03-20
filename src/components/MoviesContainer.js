import './MoviesContainer.css';
import MovieData from '../domain/MovieData';
import { $ } from '../utils/common';

class MoviesContainer extends HTMLElement {
  #movieData = new MovieData();
  #searchWord = new Proxy(
    { value: '' },
    {
      get: (target, property) => {
        return target[property];
      },

      set: (target, property, value) => {
        window.scrollTo(0, 0);

        if (target[property] === value) return;

        target[property] = value;

        this.reset();
        this.updateTitle(value);
        this.updateMovieList();

        return true;
      },
    }
  );
  #isFatching = false;

  connectedCallback() {
    this.renderContainer();
    this.updateMovieList();
    this.setButtonEvent();
  }

  renderContainer() {
    this.innerHTML = `
    <main class="item-container">
    <section class="item-view">
    <h2 id="movie-container-title">지금 인기 있는 영화</h2>
    <ul id="movie-list-wrapper" class="item-list">
    <skeleton-item id="skeleton-container"></skeleton-item>
    </ul>
    <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
    </section>
    </main>`;
  }

  async updateMovieList() {
    try {
      await this.#movieData.update(this.#searchWord.value);

      $('#skeleton-container').classList.add('skeleton-hide');

      this.renderMovieList();
      this.toggleVisibleButton();
      this.#isFatching = false;
    } catch (error) {
      this.setErrorMessage(error.message);
      $('#more-button').classList.add('hide-button');
      $('#skeleton-container').classList.add('skeleton-hide');
    }
  }

  renderMovieList() {
    const movieList = this.#movieData.movieResult;

    if (movieList.movies.length === 0) {
      this.showNoResult();
      return;
    }

    const movieListTemplate = movieList.movies.reduce((acc, curr) => {
      return (acc += `<movie-item id="${curr.id}" title="${curr.title}" imgUrl="${curr.imgUrl}" score="${curr.score}"></movie-item>`);
    }, '');

    $('#skeleton-container').insertAdjacentHTML('beforebegin', movieListTemplate);
  }

  toggleVisibleButton() {
    if (this.#movieData.movieResult.isLastPage) {
      $('#more-button').classList.add('hide-button');
      return;
    }

    $('#more-button').classList.remove('hide-button');
  }

  showNoResult() {
    const noResultContainer = document.createElement('div');
    const spelling = document.createElement('span');
    const language = document.createElement('span');
    const searchWord = document.createElement('span');
    const spacing = document.createElement('span');

    noResultContainer.classList.add('no-result');
    noResultContainer.id = 'no-result-message';

    $('#movie-container-title').innerText = `"${this.#searchWord.value}" 에 대한 검색결과가 없습니다.`;
    spelling.innerText = '단어의 철자가 정확한지 확인해 보세요.';
    language.innerText = '한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.';
    searchWord.innerText = '검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.';
    spacing.innerText = '두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요. ';

    noResultContainer.append(spelling, language, searchWord, spacing);

    $('#movie-container-title').insertAdjacentElement('afterend', noResultContainer);
  }

  setButtonEvent() {
    $('#more-button').addEventListener('click', () => {
      if (this.#isFatching) return;
      this.#isFatching = true;
      $('#skeleton-container').classList.remove('skeleton-hide');

      this.updateMovieList();
    });
  }

  reset() {
    this.#isFatching = false;
    $('#movie-list-wrapper').innerHTML = `<skeleton-item id="skeleton-container"></skeleton-item>`;

    if ($('#no-result-message')) {
      $('#no-result-message').remove();
    }

    this.#movieData.resetPageIndex();
  }

  updateTitle(word) {
    if (word === '') {
      $('#movie-container-title').innerText = '지금 인기 있는 영화';
      return;
    }

    $('#movie-container-title').innerText = `"${word}" 검색 결과`;
  }

  setSearchWord(searchWord) {
    this.#searchWord.value = searchWord;
  }

  setErrorMessage(errorMessage) {
    $('#movie-container-title').innerText = errorMessage;
  }
}

export default MoviesContainer;
