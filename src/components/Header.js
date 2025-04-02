import { openModal } from "../controllers/MovieDetailModal";
import Button from "./Button";
import LogoSearchBar from "./LogoSearchBar";

function Header({ id, title, poster_path, vote_average }) {
  const $header = document.createElement("header");

  $header.innerHTML = `
  <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
      <img src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${poster_path}" class="banner"/>
      <div class="top-rated-container">
      ${LogoSearchBar().outerHTML}
      <div class="top-rated-movie">
        <div class="rate">
          <img src="images/star_empty.png" class="star" />
          <span class="rate-value">${vote_average.toFixed(1)}</span>
        </div>
        <div class="title">${title}</div>
        ${Button("자세히 보기", "primary detail").outerHTML}
      </div>
    </div>
  </div>
`;

  const $button = $header.querySelector(".primary.detail");
  $button.dataset.id = id;
  $button.addEventListener("click", openModal);

  return $header;
}

export default Header;
