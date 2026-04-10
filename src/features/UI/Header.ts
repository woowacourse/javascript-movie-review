import starImg from "../../images/Star.png";
import logo from "../../images/logo.png";
import searchIcon from "../../images/Search.png";
import { Movie } from "../../../types/types";
import { BACKDROP_IMAGE_URL } from "../../constants/constant";

export default class Header {
  backgroundContainer: HTMLElement;

  constructor() {
    this.backgroundContainer = document.querySelector(
      ".background-container",
    ) as HTMLElement;
  }

  clearHeader(): void {
    this.backgroundContainer.innerHTML = "";
    this.backgroundContainer.style.background = "none";
    this.backgroundContainer.style.height = "100px";
  }

  render(movie: Movie): void {
    this.backgroundContainer.innerHTML = /*html*/ `
            ${this.renderImage()}
            <div class="top-rated-movie">
                <div class="rate">
                  <img src="${starImg}" class="star" />
                  <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="title">${movie.title}</div>
                <button class="primary detail" data-id="${movie.id}">자세히 보기</button>
            </div>
      `;

    this.backgroundContainer.style.background = `url(${BACKDROP_IMAGE_URL}${movie.backdrop_path}) no-repeat center center / cover`;
    this.backgroundContainer.style.removeProperty("height");
  }

  renderSearch(searchMovie: string = ""): void {
    this.backgroundContainer.innerHTML = /*html*/ `${this.renderImage(
      searchMovie,
    )}`;
  }

  renderImage(searchMovie: string = ""): string {
    return /*html*/ `<div class="overlay">
                      <div class="search-container">
                        <h1 class="logo">
                          <img src="${logo}" alt="MovieList" />
                        </h1>
                        <form class="search-form">
                          <input
                            type="search"
                            class="search-input"
                            aria-label="영화 검색"
                            placeholder="검색어를 입력하세요"
                            value="${searchMovie}"
                          />
                          <button
                          type="submit"
                          class="btn-submit"
                          aria-label="영화 검색 실행"
                          >
                            <img
                            src="${searchIcon}"
                            alt=""
                            aria-hidden="true"
                            class="img-search"
                            />
                          </button>
                        </form>
                      </div>
                    </div>`;
  }
}
