import starFilled from '../../templates/star_filled.png';

import { CUSTOM_EVENT } from '../constants';

class MovieList {
  $ul = document.createElement('ul');

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$ul.classList = 'item-list';
  }

  render($target) {
    $target.insertAdjacentElement('beforeend', this.$ul);
  }

  bindEvent() {
    this.$ul.addEventListener('click', ({ target }) => {
      if (!target.closest('.item')) return;

      const { id } = target.closest('.item');

      document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.SHOW_MOVIE_DETAIL, { detail: { id } }));
    });
  }

  insertMovies(movies) {
    const movieLi = this.getMovieLi(movies);

    this.$ul.insertAdjacentHTML('beforeend', movieLi);
  }

  nothingFound() {
    this.$ul.innerHTML = '<p class="nothing-found">해당하는 영화를 찾을 수 없습니다</p>';
  }

  switchMovies(movies) {
    const movieLi = this.getMovieLi(movies);

    this.$ul.innerHTML = movieLi;
  }

  getMovieLi(movies) {
    const movieLi = movies.reduce((li, movie) => {
      return li + this.getMovieItemTemplate(movie);
    }, '');

    return movieLi;
  }

  getMovieItemTemplate({ id, title, vote_average, poster_path }) {
    const template = `
      <li id=${id} class="item">
        <a href="#${id}">
          <div class="item-card">
            ${
              poster_path
                ? `<img
                  class="item-thumbnail skeleton"
                  src="https://image.tmdb.org/t/p/w500/${poster_path}"
                  loading="lazy"
                  alt="${title}"
                />`
                : `<div class="item-thumbnail no-image">
                  <span>No Image</span>
                </div>`
            }
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average?.toFixed(
      1
    )}</p>
          </div>
        </a>
      </li>`;

    return template;
  }
}

export default MovieList;
