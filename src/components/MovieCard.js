import cron from '../assets/cron';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard {
  template(movie) {
    const { poster_path, title, vote_average, id } = movie;

    return `
      <li>
        <div class="item-card" data-id="${id}">
          <img
            class="item-thumbnail"
            src="${IMAGE_BASE}${poster_path}"
            loading="lazy"
            alt="${title}"
            onerror="this.src='${cron}';"
          />
          <p class="item-title">${title}</p>
          <p class="item-score">
            <i class="rating-icon rating-icon--star fa fa-star"></i> ${vote_average.toFixed(1)}
          </p>
        </div>
      </li>
    `;
  }
}
