import { movieStore } from "../state/movieStore";
import { renderMoviesList } from "../features/movies/movieListRenderer";
import { addEvent } from "./addEvent";

const $title = document.querySelector(".thumbnail-title");
const $ul = document.querySelector(".thumbnail-list");
const $topRatedContainer = document.querySelector(".top-rated-container");
const $overlay = document.querySelector(".overlay");

addEvent({
  type: "click",
  selector: ".show-more",
  handler: () => {
    movieStore.page = movieStore.page + 1;
    renderMoviesList();
  },
});

addEvent({
  type: "submit",
  selector: ".top-rated-search",
  handler: (event: Event, target) => {
    event.preventDefault();

    const value = (
      target?.querySelector(".top-rated-search-input") as HTMLInputElement
    ).value;

    (target as HTMLFormElement).reset();

    if (value) {
      movieStore.searchKeyword = value;
      movieStore.page = 1;

      if ($ul && $title) {
        $ul.innerHTML = "";
        $title.textContent = `"${movieStore.searchKeyword}" 검색 결과`;
      }

      $topRatedContainer?.classList.add("close");
      $overlay?.classList.add("close");

      movieStore.movies = [];

      renderMoviesList();
    }
  },
});
