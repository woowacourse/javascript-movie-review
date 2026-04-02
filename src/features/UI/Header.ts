import starImg from "../../images/star_empty.png";
import logo from "../../images/logo.png";
import searchIcon from "../../images/Search.png";
import { Movie } from "../../../types/types";
import { BACKDROP_IMAGE_URL } from "../../constants/constant";

export const Header = {
  renderEmpty(): void {
    const backgroundContainer = document.querySelector(
      ".background-container",
    ) as HTMLElement;

    backgroundContainer.innerHTML = "";
    backgroundContainer.style.background = "none";
    backgroundContainer.style.height = "100px";
  },

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
            ${this.renderImage()}
      `;

    backgroundContainer.style.background = `url(${BACKDROP_IMAGE_URL}${movie.backdrop_path}) no-repeat center center / cover`;
    backgroundContainer.style.removeProperty("height");
  },

  renderSearch(): void {
    const backgroundContainer = document.querySelector(
      ".background-container",
    ) as HTMLElement;

    backgroundContainer.innerHTML = /*html*/ `${this.renderImage()}`;
  },

  renderImage(): string {
    return /*html*/ `<div class="overlay" aria-hidden="true">
                <div class="search-container">
                <h1 class="logo">
                    <img src="${logo}" alt="MovieList" />
                </h1>
                <form class="search-form">
                    <input
                    type="search"
                    class="search-input"
                    placeholder="검색어를 입력하세요"
                    />
                    <button type="submit" class="btn-submit">
                        <img
                            src="${searchIcon}"
                            alt="search"
                            class="img-search"
                        />
                     </button>
                 </form>
                </div>
            </div>`;
  },
};
