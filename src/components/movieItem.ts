import { Movie } from '../types';
import { IMAGE_URL } from '../constants';

const movieItem = ({ title, posterPath, voteAverage }: Movie) => {
  const originalImageUrl = `${IMAGE_URL.BASE}${posterPath}`;
  const imageUrl = posterPath ? originalImageUrl : IMAGE_URL.ALTERNATIVE;

  return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail skeleton"
            src="${imageUrl}"
            loading="lazy"
            alt="${title}" />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    </li>`;
};

export default movieItem;
