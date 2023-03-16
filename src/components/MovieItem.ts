import { StarFilled } from '../assets';
import { POSTER_BASE_URL } from '../constants';
import { Movie } from '../types/movie';
import { $ } from '../utils/domSelector';

const MovieItem = {
  template: () => {
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

  posterImageTemplate: (title: string, imagePath: string) => {
    return imagePath
      ? `
        <img
          class="item-thumbnail skeleton"
          src="${POSTER_BASE_URL}${imagePath}"
          loading="lazy"
          alt="${title}"
        />`
      : `<div class="item-thumbnail placeholder-thumbnail"></div>`;
  },

  scoreTemplate: (voteAverage: number) => {
    return `
      <img src="${StarFilled}" alt="별점" />${voteAverage}
    `;
  },

  render: (target: HTMLElement, movie: Movie) => {
    const itemThumbnail = $('.item-thumbnail', target);
    itemThumbnail.insertAdjacentHTML(
      'beforeend',
      MovieItem.posterImageTemplate(movie.title, movie.poster_path)
    );
    itemThumbnail.classList.remove('skeleton');

    const itemTitle = $('.item-title', target);
    itemTitle.textContent = movie.title;
    itemTitle.classList.remove('skeleton');

    const itemScore = $('.item-score', target);
    itemScore.insertAdjacentHTML('beforeend', MovieItem.scoreTemplate(movie.vote_average));
    itemScore.classList.remove('skeleton');
  },
};

export default MovieItem;
