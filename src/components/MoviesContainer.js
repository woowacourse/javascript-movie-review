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
        target[property] = value;

        this.reset();
        this.updateMovieList();
        this.updateTitle(value);

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
      $('#movie-container-title').innerText = error.message;
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
    const noResultMessage = document.createElement('span');
    noResultMessage.innerText = '검색 결과가 없습니다';
    noResultMessage.classList.add('no-result');
    noResultMessage.id = 'no-result-message';

    $('#movie-list-wrapper').appendChild(noResultMessage);
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
}

export default MoviesContainer;
