import MovieData from '../domain/MovieData';
import './MoviesContainer.css';
import { $ } from '../utils/common';

class MoviesContainer extends HTMLElement {
  #movieData;

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
    <ul class="item-list"></ul>
    <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
    </section>
    </main>`;
  }

  async updateMovieList() {
    await this.#movieData.update();
    this.renderMovieList();
    this.toggleVisibleButton();
  }

  renderMovieList() {
    const movieList = this.#movieData.movieResult;
    const movieListTemplate = movieList.movies.reduce((curr, prev) => {
      return (curr += `<movie-item id="${prev.id}" title="${prev.title}" imgUrl="${prev.imgUrl}" score="${prev.score}"></movie-item>`);
    }, '');

    $('.item-list').insertAdjacentHTML('beforeend', movieListTemplate);
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
      this.updateMovieList();
    });
  }
}

export default MoviesContainer;
