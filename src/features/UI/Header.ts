import starImg from "../../../templates/images/star_empty.png";
import { Movie } from "../../../types/types";

const BACKDROP_IMAGE_URL =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

export const Header = {
  render(movie: Movie): void {
    const backgroundContainer = document.querySelector(
      ".background-container",
    ) as HTMLElement;

    backgroundContainer.innerHTML = /*html*/ `
              <div class="top-rated-movie">
                <div class="rate">
                  <img src="${starImg}" class="star" />
                  <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="title">${movie.title}</div>
                <button class="primary detail">자세히 보기</button>
              </div>
            </div>
             <div class="overlay" aria-hidden="true">
            <div class="container">
              <h1 class="logo">
                <img src="./templates/images/logo.png" alt="MovieList" />
              </h1>
              <form class="search-form">
                <input
                  type="search"
                  class="search-input"
                  placeholder="검색어를 입력하세요"
                />
                <button type="submit" class="btn-submit">
                  <img
                    src="./templates/images/Search.png"
                    alt="search"
                    class="img-search"
                  />
                </button>
              </form>
            </div>
          </div>
      `;

    backgroundContainer.style.background = `url(${BACKDROP_IMAGE_URL}${movie.backdrop_path}) no-repeat center center / cover`;
  },
};
