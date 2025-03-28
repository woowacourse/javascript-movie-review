import { Movie } from "../../../types/movie";
import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import { showMovieDetailInfo } from "../../utils/loadMovies.ts";
import Button from "../common/Button.ts";
import Rate from "../common/Rate.ts";
import SearchBar from "../common/SearchBar.ts";

type HeaderProps = {
  title: string;
  imageUrl: string;
  voteAverage: number;
  topMovieInfo?: Movie;
};

const Header = ({
  title,
  imageUrl,
  voteAverage,
  topMovieInfo,
}: HeaderProps) => {
  const header = createElement(/*html*/ `
    <header>
      <div class="background-container">
        <div class="overlay" aria-hidden="true">
        <img src=${imageUrl} class="overlay-img" />
        <div class="backdrop"></div>
      </div>
        
        <div class="logo-search-container">
          <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
          </h1>
        </div>
        
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="title">${title}</div>
        </div>
      </div>
    </header>
  `);

  const searchBar = SearchBar();
  const rate = Rate({ rate: voteAverage, className: ["rate-value"] });
  const button = Button({
    text: "자세히 보기",
    className: ["primary", "detail"],
  });
  if (topMovieInfo)
    button.addEventListener("click", () => showMovieDetailInfo(topMovieInfo));

  if (!rate) return;

  const logoSearchContainer = $(".logo-search-container", header);
  logoSearchContainer.appendChild(searchBar);

  const topRateMovie = $(".top-rated-movie", header);
  topRateMovie.prepend(rate);
  topRateMovie.appendChild(button);

  const logo = $(".logo", header);
  logo.addEventListener("click", () => location.reload());

  return header;
};

export default Header;
