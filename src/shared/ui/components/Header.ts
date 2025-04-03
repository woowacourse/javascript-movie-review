import { Movie } from "../../types/domain/movies";
import { CustomButton } from "./CustomButton";
import SearchForm from "../../../features/search/ui/components/SearchForm";
import { searchFormSubmitHandler } from "../../../features/search/ui/handlers/searchFormSubmitHandler";
import getMovieDetail from "../../../features/movie/api/getMovieDetail";
import Modal from "./Modal";
import URL from "../../constants/url";

const Header = (movie: Movie) => {
  const $header = document.getElementById("header");

  if (!$header) {
    return;
  }

  $header.innerHTML = /*html*/ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true">
        <img src="${URL.BASE_POSTER_IMAGE}${
    movie.backdropPath
  }" alt="MovieList" />
      </div>
      <div class="top-rated-container">
        <div class="header-container">
          <a href="/javascript-movie-review/" class="logo">
            <img src="${URL.LOGO}" alt="MovieList" />
          </a>
          ${SearchForm().outerHTML}
        </div>
        <div id=${movie.id} class="top-rated-movie">
          <div class="rate">
            <img src="${URL.BASE_STAR_IMAGE}empty.png" class="star" />
            <span class="rate-value">${movie.voteAverage.toFixed(1)}</span>
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
