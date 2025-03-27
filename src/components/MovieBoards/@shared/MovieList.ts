import { Movie } from "../../../types/movie";

interface MovieListContract {
  ui: string;
  skeleton: string;
  fallback: string;
}

class MovieList implements MovieListContract {
  private static IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  #movies: Movie[];

  constructor(movies: Movie[]) {
    this.#movies = movies;
  }

  #posterImage(poster_path: Movie["poster_path"]): string {
    return poster_path
      ? `${MovieList.IMAGE_BASE_URL}${poster_path}`
      : "./images/null_image.png";
  }

  public get ui() {
    return /*html*/ `
      ${this.#movies
        .map(
          ({ id, poster_path, title, vote_average }) => /*html*/ `
            <li class="item" data-id="${id}">
                <img 
                  class="thumbnail" 
                  src="${this.#posterImage(poster_path)}" alt="${title}" 
                  onerror="this.onerror=null; this.src='./images/dizzy_planet.png';"
                  />
                <div class="item-desc">
                  <p class="rate">
                    <img src="./images/star_empty.png" class="star" />
                    <span>${vote_average}</span>
                  </p>
                  <strong>${title}</strong>
                </div>
            </li>
          `
        )
        .join("")}
    `;
  }

  public get skeleton(): string {
    return /*html*/ `
      <li>
        <div class="skeleton-item">
          <div class="skeleton-thumbnail"></div>
          <div class="skeleton-item-desc">
            <div class="skeleton-text"></div>
            <div class="skeleton-text" style="width: 50%"></div>
          </div>
        </div>
      </li>
    `
      .repeat(10)
      .trim();
  }

  public get fallback(): string {
    return /*html*/ `
      <div class="fallback-screen">
        <img src="./images/dizzy_planet.png" alt="영화 정보 없음"/>
        <p>현재 표시할 영화가 없습니다</p>
      </div>
    `;
  }
}

export default MovieList;
