// MovieItem.ts
import { Movie } from "../../../types/movieList";

const POSTER_URL = import.meta.env.VITE_TMDB_API_POSTER_URL as string;

const MovieItem = ({ id, poster_path, title, vote_average }: Movie): string => {
  const imageUrl = poster_path
    ? `${POSTER_URL}${poster_path}`
    : "./images/logo.png";

  return /* html */ `
    <li data-movie-id="${id}">
      <div class="item">
        <div class="skeleton-thumbnail"></div>
        <img class="thumbnail" src="${imageUrl}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span>${vote_average}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
};

export default MovieItem;
