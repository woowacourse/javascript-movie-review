import { MovieType } from '../types';

const movieItem = ({ title, posterPath, voteAverage }: MovieType) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

  return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${IMAGE_BASE_URL}${posterPath}"
            loading="lazy"
            alt="${title}" />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="../../assets/star_filled.png" alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    </li>`;
};

export default movieItem;
