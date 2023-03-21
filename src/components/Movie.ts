import PersonalMovieInfo from "../type/PersonalMovieInfo";
import { $ } from "../util/querySelector";

const movieTemplate = (() => {
  const movieInfo = document.createElement('li');
  movieInfo.setAttribute('class', 'movie-info');

  movieInfo.innerHTML = `
  <div class="item-card">
    <div class="item-thumbnail skeleton"></div>
    <p class="item-title"></p>
    <p class="item-score"><img src="./assets/star_filled.png" alt="별점"/></p>
  </div>
  `.trim();

  return movieInfo;
})();

class Movie {
  private info: PersonalMovieInfo;
  private readonly element = movieTemplate.cloneNode(true) as HTMLElement;

  constructor(info: PersonalMovieInfo) {
    this.info = info;
    this.addClickEvent();
  }

  render() {
    const { poster_path, title, vote_average } = this.info.movie;

    $('.item-title', this.element).textContent = title;
    $('.item-score', this.element).insertAdjacentHTML('beforeend', vote_average.toString());

    const skeletonImage = $('.skeleton', this.element);
    const posterImage = document.createElement('img');

    posterImage.addEventListener('load', () => skeletonImage.replaceWith(posterImage));

    posterImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${poster_path}`);
    posterImage.setAttribute('alt', `영화 ${title} 포스터 사진`);

    return this.element;
  }

  private addClickEvent() {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(new CustomEvent('movieClick', {
        bubbles: true,
        detail: { info: this.info },
      }));
    });
  }
}

export default Movie;
