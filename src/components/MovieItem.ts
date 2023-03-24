import { MOVIE_APP_IMG_PATH } from '../constant/index';

export default class MovieItem {
  template({ id, poster_path, title, vote_average }: any) {
    return `
      <li id="${id}">
        <a href="#">
          <div class="item-card">
            <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/original${poster_path}"
            loading="lazy"
            alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${MOVIE_APP_IMG_PATH.starFilled}" alt="별점" /> ${vote_average}</p>
          </div>
        </a>
      </li>
    `;
  }

  skeletonTemplate() {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
    `;
  }
}
