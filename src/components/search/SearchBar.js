import fetchSearchMovies from "../fetch/fetchSearchMovies";
import createElement from "./utils/createElement";
import movies from "../store/Movies";
import MovieList from "./movie/MovieList";

const SEARCH_BUTTON_IMAGE_SRC = "images/searchButtonIcon.png";
const PAGE = 1;
const SEARCH_BAR_PLACEHOLDER = "검색어를 입력하세요";

const SearchBar = () => {
  const $form = createElement({
    tag: "form",
    classNames: ["search-bar-container"],
  });

  const $input = createElement({
    tag: "input",
    classNames: ["search-bar"],
    placeholder: SEARCH_BAR_PLACEHOLDER,
  });

  const $button = createElement({
    tag: "button",
    classNames: ["search-bar-button"],
  });

  const $img = createElement({
    tag: "img",
    src: SEARCH_BUTTON_IMAGE_SRC,
  });

  $button.appendChild($img);
  $form.append($input, $button);

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = $input.value.trim();
    if (!query) return;

    document.querySelector(".background-container").classList.add("disappear");

    const params = new URLSearchParams(window.location.search);
    params.set("query", query);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );

    document.querySelector(".list-title").textContent = `"${query}" 검색 결과`;

    const searchMovieData = await fetchSearchMovies(query, PAGE);
    movies.updateMovies(searchMovieData.results);

    const $thumbnailList = document.querySelector(".thumbnail-list");
    if ($thumbnailList) $thumbnailList.remove();

    document
      .querySelector("section")
      .appendChild(MovieList({ movies: movies.movieList }));
  };

  $form.addEventListener("submit", handleSearch);

  return $form;
};

export default SearchBar;
