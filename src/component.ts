import type { Movie } from "./api";

const Component = {
  movie(movieData: Pick<Movie, "poster_path" | "title" | "vote_average">) {
    const { poster_path, title, vote_average } = movieData;
    return `
    <li>
      <div class="item">
      <img
      class="thumbnail"
      src="https://image.tmdb.org/t/p/original/${poster_path}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="src/images/star_empty.png" class="star" /><span>${vote_average.toFixed(1)}</span>
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
      <div class="top-rated-movie" style="background-image: url('https://image.tmdb.org/t/p/original/${poster_path}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="src/images/star_empty.png" class="star" />
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
        <img src="src/images/screaming_planet.svg">
        <p class="notice-text">검색 결과가 없습니다.</p>
      </div>
      `;
  },

  error(message: string) {
    return `
      <div class="notice-box">
        <img src="src/images/planet_and_star.png">
        <span class="notice-text">${message}</span>
      </div>
    `;
  },
};

export default Component;
