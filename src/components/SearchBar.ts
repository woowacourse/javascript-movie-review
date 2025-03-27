import fetchSearchMovies from "../fetch/fetchSearchMovies";
import createElement from "./utils/createElement";
import movies from "../store/Movies";
import page from "../store/page";
import SearchButtonImage from "../../images/searchButtonIcon.png";
import renderMovieList from "./renderMovieList";

const PAGE = 1;
const SEARCH_BAR_PLACEHOLDER = "검색어를 입력하세요";

function createSearchBarUI(onSubmit: (query: string) => void) {
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
    src: SearchButtonImage,
  });

  $button.appendChild($img);
  $form.append($input, $button);

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit($input.value.trim());
  });

  return $form;
}

function updateURLQueryParam(query: string) {
  const params = new URLSearchParams(window.location.search);
  params.set("query", query);
  page.reset();
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
}

function updateDOMForSearch(query: string) {
  document.querySelector(".background-container")?.classList.add("disappear");
  const $title = document.querySelector(".list-title");
  if ($title) $title.textContent = `"${query}" 검색 결과`;
}

async function performSearch(query: string) {
  if (!query) return;

  updateURLQueryParam(query);
  updateDOMForSearch(query);

  renderMovieList(async () => {
    const res = await fetchSearchMovies(query, PAGE);
    movies.updateMovies(res.results);
    return {
      results: res.results,
      totalPages: res.totalPages,
    };
  });
}

const SearchBar = () => {
  return createSearchBarUI(performSearch);
};

export default SearchBar;
