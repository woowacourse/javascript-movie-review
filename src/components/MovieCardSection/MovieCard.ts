import { starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import type { Movie } from '../../types/movie';

const MovieCard = {
  template(item: Movie) {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${IMAGE_URL}${item.poster_path}"
              loading="lazy"
              alt="${item.title}"
            />
            <p class="item-title">${item.title}</p>
            <p class="item-score"><img src=${starFilledImage} alt="별점" /> ${item.vote_average.toFixed(1)}</p>
          </div>
        </a>
      </li>
    `;
  },
};

export default MovieCard;
