import MovieData from '../domain/MovieData';
import './MoviesContainer.css';
import { $ } from '../utils/common';

class MoviesContainer extends HTMLElement {
  #movieData;
  #searchWord = new Proxy(
    { value: '' },
    {
      get: (target, property) => {
        return target[property];
      },

      set: (target, property, value) => {
        target[property] = value;
        this.reset();

        document.querySelectorAll('skeleton-item').forEach(node => {
          node.classList.remove('skeleton-hide');
        });

        this.updateMovieList();
        this.updateTitle(value);

        return true;
      },
    }
  );

  constructor() {
    super();
    this.#movieData = new MovieData();
  }

  connectedCallback() {
    this.renderContainer();
    this.updateMovieList();
    this.setButtonEvent();
  }

  renderContainer() {
    this.innerHTML = `
    <main>
    <section class="item-view">
    <h2>지금 인기 있는 영화</h2>
    <ul class="item-list">
      <skeleton-item id="first-skeleton"></skeleton-item>
    ${'<skeleton-item></skeleton-item>'.repeat(19)}
    </ul>
    <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
    </section>
    </main>`;
  }

  async updateMovieList() {
    try {
      await this.#movieData.update(this.#searchWord.value);

      document.querySelectorAll('skeleton-item').forEach(node => {
        node.classList.add('skeleton-hide');
      });

      this.renderMovieList();
      this.toggleVisibleButton();
    } catch (error) {
      $('h2').innerText = error.message;
      $('#more-button').classList.add('hide-button');

      document.querySelectorAll('skeleton-item').forEach(node => {
        node.classList.add('skeleton-hide');
      });
    }
  }

  renderMovieList() {
    const movieList = this.#movieData.movieResult;

    if (movieList.movies.length === 0) {
      this.showNoResult();
      return;
    }

    const movieListTemplate = movieList.movies.reduce((curr, prev) => {
      return (curr += `<movie-item id="${prev.id}" title="${prev.title}" imgUrl="${prev.imgUrl}" score="${prev.score}"></movie-item>`);
    }, '');

    $('#first-skeleton').insertAdjacentHTML('beforebegin', movieListTemplate);
  }

  toggleVisibleButton() {
    if (this.#movieData.movieResult.isLastPage) {
      $('#more-button').classList.add('hide-button');
      return;
    }

    $('#more-button').classList.remove('hide-button');
  }

  setButtonEvent() {
    $('#more-button').addEventListener('click', () => {
      document.querySelectorAll('skeleton-item').forEach(node => {
        node.classList.remove('skeleton-hide');
      });

      this.updateMovieList();
    });
  }

  setSearchWord(searchWord) {
    this.#searchWord.value = searchWord;
  }

  reset() {
    document.querySelectorAll('movie-item').forEach(node => node.remove());

    const noResultMessage = $('.item-list > span');

    if (noResultMessage) {
      noResultMessage.remove();
    }

    this.#movieData.resetPageIndex();
  }

  updateTitle(word) {
    if (word === '') {
      $('h2').innerText = '지금 인기 있는 영화';
      return;
    }

    $('h2').innerText = `"${word}" 검색 결과`;
  }

  showNoResult() {
    const noResultMessage = document.createElement('span');
    noResultMessage.innerText = '검색 결과가 없습니다';
    noResultMessage.classList.add('no-result');

    $('.item-list').appendChild(noResultMessage);
  }
}

export default MoviesContainer;
