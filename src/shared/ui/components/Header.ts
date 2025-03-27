import { IMovie } from "../../types/movies";
import { CustomButton } from "./CustomButton";
import SearchForm from "../../../features/search/ui/components/SearchForm";
import { searchFormSubmitHandler } from "../../../features/search/ui/searchFormSubmitHandler";

const Header = (movie: IMovie) => {
  const $header = document.getElementById("header");

  if (!$header) {
    return;
  }

  $header.innerHTML = /*html*/ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true">
        <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${
          movie.backdrop_path
        }" alt="MovieList" />
      </div>
      <div class="top-rated-container">
        <div class="header-container">
          <a href="/javascript-movie-review/" class="logo">
            <img src="images/logo.png" alt="MovieList" />
          </a>
          ${SearchForm().outerHTML}
        </div>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average}</span>
          </div>
          <div class="title">${movie.title}</div>
          ${CustomButton({ title: "자세히 보기" }).outerHTML}
        </div>
      </div>
    </div>
  `;

  const $searchForm = document.querySelector(".search-form");
  $searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchFormSubmitHandler(e);
  });
};

export default Header;
