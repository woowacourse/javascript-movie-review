import { Movie } from "../../apis/dtos";
import planetAndStarImg from "../../images/planet_and_star.png";
import screamingPlanetImg from "../../images/screaming_planet.svg";
import starEmptyImg from "../../images/star_empty.png";

const Component = {
  movie(movieData: Pick<Movie, "posterPath" | "title" | "voteAverage">) {
    const { posterPath, title, voteAverage } = movieData;
    return `
    <li>
      <div class="item">
      <img
      class="thumbnail"
      src="${posterPath}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="${starEmptyImg}" class="star" /><span>${voteAverage.toFixed(1)}</span>
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
    posterPath,
    voteAverage,
  }: Pick<Movie, "title" | "voteAverage" | "posterPath">) {
    return `
      <div class="top-rated-movie" style="background-image: url('${posterPath}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="${starEmptyImg}" class="star" />
              <span class="rate-value">${voteAverage.toFixed(1)}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
      </div>
    `;
  },

  emptyResult() {
    return `
      <div class="notice-box empty-result">
        <img src="${screamingPlanetImg}">
        <p class="notice-text">검색 결과가 없습니다.</p>
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
