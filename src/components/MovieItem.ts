import { Movie } from '../types/movie';
import { POSTER_BASE_URL } from '../constants';
import { $ } from '../utils/domSelector';
import { StarEmpty, StarFilled } from '../assets';

const MovieItem = {
  template() {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <p class="item-title skeleton"></p>
            <p class="item-score skeleton"></p>
          </div>
        </a>
      </li>`;
  },

  posterImageTemplate(title: string, imagePath: string) {
    return imagePath
      ? `
        <img
          class="item-thumbnail"
          src="${POSTER_BASE_URL}${imagePath}"
          loading="lazy"
          alt="${title}"
        />`
      : `<div class="item-thumbnail"></div>`;
  },

  scoreTemplate(voteAverage: number) {
    return `
      <img src="${voteAverage ? StarFilled : StarEmpty}" alt="별점" />${voteAverage}
    `;
  },

  render(target: HTMLElement, movie: Movie) {
    const itemThumbnail = $('.item-thumbnail', target);
    itemThumbnail.classList.remove('skeleton');
    itemThumbnail.insertAdjacentHTML(
      'beforeend',
      MovieItem.posterImageTemplate(movie.title, movie.poster_path)
    );

    const itemTitle = $('.item-title', target);
    itemTitle.classList.remove('skeleton');
    itemTitle.textContent = movie.title;

    const itemScore = $('.item-score', target);
    itemScore.classList.remove('skeleton');
    itemScore.insertAdjacentHTML('beforeend', MovieItem.scoreTemplate(movie.vote_average));
  },
};

export default MovieItem;
