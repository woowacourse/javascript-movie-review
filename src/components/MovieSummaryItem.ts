import MovieSummary from "../type/MovieInfo";
import { $ } from "../util/querySelector";

const movieTemplate = (() => {
  const movieInfo = document.createElement('li');
  movieInfo.setAttribute('class', 'movie-info');

  movieInfo.innerHTML = `
  <a class="item-card" href="#movie-modal">
    <div class="item-thumbnail skeleton"></div>
    <p class="item-title"></p>
    <p class="item-score"><img src="./assets/star_filled.png" alt="별점"/></p>
  </a>
  `.trim();

  return movieInfo;
})();

class MovieSummaryItem {
  private info: MovieSummary;
  private readonly element = movieTemplate.cloneNode(true) as HTMLElement;

  constructor(info: MovieSummary) {
    this.info = info;
    this.addClickEvent();
  }

  render(newInfo?: MovieSummary) {
    if (newInfo) this.info = newInfo;

    const { posterPath, title, voteAverage } = this.info;

    $('.item-title', this.element).textContent = title;
    $('.item-score', this.element).insertAdjacentHTML('beforeend', voteAverage.toFixed(1).toString());

    const skeletonImage = $('.skeleton', this.element);
    const posterImage = document.createElement('img');

    posterImage.addEventListener('load', () => skeletonImage.replaceWith(posterImage));
    posterImage.addEventListener('error', () => posterImage.setAttribute('src', './assets/image_error.jpg'));

    posterImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${posterPath}`);
    posterImage.setAttribute('alt', `영화 ${title} 포스터 사진`);

    return this.element;
  }

  private addClickEvent() {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(new CustomEvent('summaryClick', {
        bubbles: true,
        detail: { info: this.info },
      }));
    });
  }
}

export default MovieSummaryItem;
