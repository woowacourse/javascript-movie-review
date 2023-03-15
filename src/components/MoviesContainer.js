import MovieData from '../domain/MovieData';
import './MoviesContainer.css';
import { $ } from '../utils/common';

class MoviesContainer extends HTMLElement {
  #movieData;

  constructor() {
    super();
    this.#movieData = new MovieData();
  }

  async connectedCallback() {
    this.renderContainer();
    this.updateMovieList();
    this.setButtonEvent();
  }

  renderContainer() {
    this.innerHTML = `
    <main>
    <section class="item-view">
    <h2>지금 인기 있는 영화</h2>
    <ul class="item-list"></ul>
    <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
    </section>
    </main>`;
  }

  renderMovieList() {
    const movieList = this.#movieData.movies;
    const movieListTemplate = movieList.reduce((curr, prev) => {
      return (curr += `<movie-item id="${prev.id}" title="${prev.title}" imgUrl="${prev.imgUrl}" score="${prev.score}"></movie-item>`);
    }, '');

    $('.item-list').insertAdjacentHTML('beforeend', movieListTemplate);
  }

  async updateMovieList() {
    await this.#movieData.update();
    this.renderMovieList();
    this.toggleVisibleButton();
  }

  toggleVisibleButton() {
    if (this.#movieData.movies.length === 0) {
      $('#more-button').classList.add('hide-button');
      return;
    }

    $('#more-button').classList.remove('hide-button');
  }

  setButtonEvent() {
    $('#more-button').addEventListener('click', () => {
      this.updateMovieList();
    });
  }
}

export default MoviesContainer;
