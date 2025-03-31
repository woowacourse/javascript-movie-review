import { IMovie } from "../../types/movies";
import { CustomButton } from "./CustomButton";
import SearchForm from "../../../features/search/ui/components/SearchForm";
import { searchFormSubmitHandler } from "../../../features/search/ui/handlers/searchFormSubmitHandler";
import getMovieDetail from "../../../features/movie/api/getMovieDetail";
import Modal from "./Modal";

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
        <div id=${movie.id} class="top-rated-movie">
          <div class="rate">
            <img src="images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
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

  const $headerButton = document.querySelector(".primary");
  $headerButton?.addEventListener("click", async () => {
    const movieDetail = await getMovieDetail(movie.id);
    const $wrap = document.querySelector("#wrap");
    $wrap?.appendChild(Modal(movieDetail));
  });
};

export default Header;
