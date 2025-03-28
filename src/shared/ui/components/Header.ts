import { IMovie } from "../../types/movies";
import { bannerButtonHandler } from "../detailModal/bannerButtonHandler";
import { CustomButton } from "./CustomButton";

export default function Header(movie: IMovie) {
  const $header = document.getElementById("header");

  if (!$header) {
    return;
  }

  $header.innerHTML = /*html*/ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true">
        <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${
          movie.poster_path
        }" alt="MovieList" />
      </div>
      <div class="top-rated-container">
        <div class="header-container">
          <a href="./" class="logo">
            <img src="./images/logo.png" alt="MovieList" />
          </a>
          <form class="search-form">
            <input id="search-input" name="search-input" type="text" placeholder="검색어를 입력하세요" />
            <button type="submit" class="search-button">
              <img src="./images/search.png" alt="Search" />
            </button>
          </form>
        </div>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average}</span>
          </div>
          <div class="title">${movie.title}</div>
          ${
            CustomButton({ title: "자세히 보기", className: "banner-button" })
              .outerHTML
          }
        </div>
      </div>
    </div>
  `;

  bannerButtonHandler();
}
