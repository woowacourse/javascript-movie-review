import { Movie } from "../../types/movie";
import { BASE_URL, IMAGE_URL } from "../constants/constant";

export const createImageUrl = (baseUrl: string, imageUrlPath: string) => {
  return imageUrlPath.length > 0
    ? `${baseUrl}${imageUrlPath}`
    : IMAGE_URL.DEFAULT_THUMBNAIL_IMAGE_URL;
};

export const createMovieListItemMarkup = (movie: Movie) => {
  const posterImageUrl = createImageUrl(
    BASE_URL.POSTER_BASE_URL,
    movie.thumbnail_path ?? "",
  );

  return /* html */ `<li>
    <div class="item" data-movie-id="${movie.id}">
      <img class="thumbnail" src="${posterImageUrl}" alt="${movie.title}" />
      <div class="item-desc">
        <p class="rate">
          <img src="${IMAGE_URL.STAR_IMAGE_URL}" class="star" alt="" aria-hidden="true" />
          <span>${movie.rate.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </li>`;
};
