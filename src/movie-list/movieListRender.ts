import { Movie } from '../../types/movie';
import { SKELETON_MOVIE_COUNT } from '../constants/constant';
import { createMovieListItemMarkup } from './movieListMarkup';




export const renderMovies = (movies: Movie[], movieListElement: HTMLUListElement) => {
  movieListElement.innerHTML = movies.map(createMovieListItemMarkup).join("");
};

export const makeSkeleton = (skeletonCardElement: HTMLUListElement) => {
  const skeletonItemMarkup = /* html */ `<li>
    <div class="item" aria-hidden="true">
      <div class="thumbnail thumbnail-skeleton skeleton"></div>
      <div class="item-desc">
        <p class="rate rate-skeleton">
          <span class="rate-icon-skeleton skeleton"></span>
          <span class="rate-value-skeleton skeleton"></span>
        </p>
        <div class="title-skeleton skeleton"></div>
      </div>
    </div>
  </li>`;

  skeletonCardElement.innerHTML = Array.from({ length: SKELETON_MOVIE_COUNT }, () => skeletonItemMarkup).join("");
};
