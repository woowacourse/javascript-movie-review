import { IMAGE_URL } from '../constants/constants';
import { MovieType } from '../types';

const movieItem = ({ title, posterPath, voteAverage }: MovieType) => {
  const originalImageUrl = `${IMAGE_URL.BASE}${posterPath}`;
  const imageUrl = posterPath ? originalImageUrl : IMAGE_URL.ALTERNATIVE;

  return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
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
