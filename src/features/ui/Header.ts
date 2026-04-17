import starImg from "../../images/star_empty.png";
import logo from "../../images/logo.png";
import searchIcon from "../../images/Search.png";
import { Movie } from "../../../types/types";
import { BACKDROP_IMAGE_URL } from "../../constants/image";
import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";
import { header } from "../../dom";

function attachLogoListener(): void {
  const logoEl = document.querySelector(".logo") as HTMLElement | null;
  if (!logoEl) return;
  logoEl.addEventListener("click", () => {
    eventBus.publish(APP_EVENTS.LOGO_CLICK, undefined);
  }, { once: true });
}

export const Header = {
  clearHeader(): void {
    const backgroundContainer = header;

    backgroundContainer.innerHTML = "";
    backgroundContainer.style.background = "none";
    backgroundContainer.style.height = "100px";
  },

  render(movie: Movie | null): void {
    if (!movie) return;
    const backgroundContainer = header;

    backgroundContainer.innerHTML = /*html*/ `
            <div class="top-rated-movie">
                <div class="rate">
                  <img src="${starImg}" class="star" />
                  <span class="rate-value">${(movie.vote_average ?? 0).toFixed(1)}</span>
                </div>
                <div class="title">${movie.title}</div>
                <button class="primary detail">자세히 보기</button>
            </div>
            ${this.renderImage()}
      `;

    if (movie.backdrop_path) {
      backgroundContainer.style.background = `url(${BACKDROP_IMAGE_URL}${movie.backdrop_path}) no-repeat center center / cover`;
    }
    backgroundContainer.style.removeProperty("height");
    attachLogoListener();

    const detailButton = backgroundContainer.querySelector(".detail") as HTMLElement | null;
    detailButton?.addEventListener("click", () => {
      eventBus.publish(APP_EVENTS.MOVIE_SELECTED, movie.id);
    });
  },

  renderSearch(): void {
    const backgroundContainer = header;

    backgroundContainer.innerHTML = /*html*/ `${this.renderImage()}`;
    attachLogoListener();
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
