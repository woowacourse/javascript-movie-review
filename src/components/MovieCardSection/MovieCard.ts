import type { Movie } from '../../types/movie';

const MovieCard = {
  template(item: Movie) {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${item.poster_path}"
              loading="lazy"
              alt="${item.title}"
            />
            <p class="item-title">${item.title}</p>
            <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${item.vote_average}</p>
          </div>
        </a>
      </li>
    `;
  },
};

export default MovieCard;
