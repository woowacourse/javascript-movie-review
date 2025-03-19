import { Movie } from "../type";
import Button from "./Button";
import SearchBar from "./SearchBar";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1920";
function Header({ movie }: { movie: Movie }) {
  return /*html*/ `<header>
    <div class="background-container">
      <div class="overlay" aria-hidden="true">
      <img src=${IMAGE_BASE_URL}${movie.backdrop_path} />
      </div>
      <div class="top-rated-container">
        <div class="logo">
          <img class="logo-img" src="images/logo.png" alt="MovieList" />
          ${SearchBar()}
        </div>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
          </div>
          <div class="title">${movie.title}</div>
         ${Button({ text: "자세히보기" })}
        </div>
      </div>
    </div>
  </header>`;
}

export default Header;
