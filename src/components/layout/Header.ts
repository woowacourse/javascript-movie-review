import searchMovie from "../handler/searchMovie.ts";
import { createElement } from "../../utils/createElement.ts";
import { $multiSelect } from "../../utils/dom.ts";
import Button from "../common/Button.ts";
import Rate from "../common/Rate.ts";
import SearchBar from "../common/SearchBar.ts";
import loadDetailMovie from "../handler/loadDetailMovie.ts";

type Props = {
  id: number;
  title: string;
  imageUrl: string;
  voteAverage: number;
};

const Header = ({ id, title, imageUrl, voteAverage }: Props) => {
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

  const searchBar = SearchBar({ handleSearch: searchMovie });
  const rate = Rate({ rate: voteAverage, className: ["rate-value"] });
  const button = Button({
    text: "자세히 보기",
    className: ["primary", "detail"],
    onClick: () => loadDetailMovie(id),
  });

  const [logoSearchContainer, topRateMovie, logo] = $multiSelect(
    ".logo-search-container .top-rated-movie .logo",
    header
  );
  logoSearchContainer.appendChild(searchBar);

  topRateMovie.prepend(rate);
  topRateMovie.appendChild(button);

  logo.addEventListener("click", () => location.reload());

  return header;
};

export default Header;
