import { Movie } from '../types';
import { IMAGE_URL } from '../constants';

const movieItem = ({ id, title, posterPath, voteAverage }: Movie) => {
  const originalImageUrl = `${IMAGE_URL.BASE}${posterPath}`;
  const imageUrl = posterPath ? originalImageUrl : IMAGE_URL.ALTERNATIVE;

  return `
    <li>
      <div class="item-card" data-id="${id}">
        <img
          class="item-thumbnail skeleton"
          src="${imageUrl}"
          loading="lazy"
          alt="${title}" />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${voteAverage}</p>
      </div>
    </li>`;
};

export default movieItem;
