import type { Movie } from "./api";
import starEmptyImg from "./images/star_empty.png";
import noImagePlanetImg from "./images/no_image_planet.png";
import screamingPlanetImg from "./images/screaming_planet.svg";
import planetAndStarImg from "./images/planet_and_star.png";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

const Component = {
  movie(movieData: Pick<Movie, "poster_path" | "title" | "vote_average">) {
    const { poster_path, title, vote_average } = movieData;
    const src = poster_path ? `${IMAGE_PATH}/${poster_path}` : noImagePlanetImg;
    return `
    <li>
      <div class="item">
      <img
      class="thumbnail"
      src="${src}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="${starEmptyImg}" class="star" /><span>${vote_average.toFixed(1)}</span>
            </p>
            <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
  },

  movieSkeleton() {
    return `
    <li class="skeleton">
      <div class="item">
        <div class="thumbnail skeleton-box"></div>
        <div class="item-desc">
          <p class="rate">
            <span class="skeleton-box skeleton-rate"></span>
          </p>
          <span class="skeleton-box skeleton-title"></span>
        </div>
      </div>
    </li>
  `;
  },

  movieBanner({
    title,
    vote_average,
    poster_path,
  }: Pick<Movie, "title" | "vote_average" | "poster_path">) {
    return `
      <div class="top-rated-movie" style="background-image: url('${IMAGE_PATH}/${poster_path}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="${starEmptyImg}" class="star" />
              <span class="rate-value">${vote_average.toFixed(1)}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;
  },

  emptyResult() {
    return `
      <div class="notice-box">
        <img src="${screamingPlanetImg}">
        <p class="notice-text">검색 결과가 없습니다.</p>
      </div>
      `;
  },

  movieDetail(
    movieData: Pick<
      Movie,
      "title" | "poster_path" | "vote_average" | "overview"
    >,
    releaseYear: number,
    genres: string[],
  ) {
    const { title, poster_path, vote_average, overview } = movieData;
    return `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="src/images/modal_button_close.png" alt="close modal"/>
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="${IMAGE_PATH}/${poster_path}" alt="movie poster"/>
            </div>
            <div class="modal-description">
              <h2>${title}</h2>
              <p class="category">${releaseYear} · ${genres.join(", ")}</p>
              <p class="rate">
                <img src="src/images/star_filled.png" class="star" alt="vote average" />
                <span>${vote_average.toFixed(1)}</span>
              </p>
              <hr />
              <p class="detail">${overview}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  error(message: string) {
    return `
      <div class="notice-box">
        <img src="${planetAndStarImg}">
        <span class="notice-text">${message}</span>
      </div>
    `;
  },
};

export default Component;
