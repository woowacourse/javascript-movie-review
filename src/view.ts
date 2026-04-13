import { ResultData } from './api.ts';

const createSkeletonHTML = (): string => {
  return  `<li class="skeleton-item">
                <div class="item">
                  <div class="thumbnail skeleton skeleton-thumbnail"></div>
                  <div class="item-desc">
                    <div class="skeleton skeleton-text" style="width: 40%;"></div>
                    <div class="skeleton skeleton-text"></div>
                  </div>
                </div>
              </li>`;
};

export const renderSkeleton = () => {
  const container = document.querySelector('.thumbnail-list');

  const skeletonItems = Array.from({ length: 20 }, () => createSkeletonHTML()).join('');

  container?.insertAdjacentHTML('beforeend', skeletonItems);
}

export const removeSkeleton = () => {
  const skeletons = document.querySelectorAll('.skeleton-item');

  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });
};

const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face";

const createMovieHTML = (movie: ResultData) => {
  return `
  <li>
                <div class="item">
                  <img
                    class="thumbnail"
                    src="${IMAGE_BASE_URL}${movie.poster_path}"
                    alt="${movie.title}}"
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="./images/star_empty.png" class="star" /><span
                        >${movie.vote_average}</span
                      >
                    </p>
                    <strong>${movie.title}</strong>
                  </div>
                </div>
              </li>
              `;
};

export const renderMovies = (movies: ResultData[]) => {
  const container = document.querySelector('.thumbnail-list');

  const movieItems = movies.map((movie) => createMovieHTML(movie)).join("");

  container?.insertAdjacentHTML('beforeend', movieItems);
}