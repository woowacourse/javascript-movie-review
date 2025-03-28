import { movieStore } from "../state/movieStore";
import { renderMoviesList } from "../features/movies/movieListRenderer";
import { movieDetailRenderer } from "../features/movies/movieDetailRenderer";

interface addEventProps {
  type: string;
  selector: string;
  handler: (event: Event | KeyboardEvent, target?: Element) => void;
}

const $modalBackground = document.querySelector("#modalBackground");
const $title = document.querySelector(".thumbnail-title");
const $ul = document.querySelector(".thumbnail-list");
const $topRatedContainer = document.querySelector(".top-rated-container");
const $overlay = document.querySelector(".overlay");

function closeModal() {
  $modalBackground?.classList.toggle("active");
  document.body.classList.remove("lock-scroll");
}

function addEvent({ type, selector, handler }: addEventProps) {
  window.addEventListener(type, (event) => {
    const target = event.target as HTMLElement;
    if (selector === "") {
      handler(event);
    } else if (target && target.closest(selector)) {
      handler(event, target.closest(selector)!);
    }
  });
}

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

addEvent({
  type: "click",
  selector: ".item",
  handler: (event, target) => {
    movieStore.selectedMovie = Number(target?.id);
    document.body.classList.add("lock-scroll");
    $modalBackground?.classList.toggle("active");
    movieDetailRenderer();
  },
});

addEvent({
  type: "click",
  selector: "#closeModal",
  handler: closeModal,
});

addEvent({
  type: "keydown",
  selector: "",
  handler: (event) => {
    if (
      (event as KeyboardEvent).key === "Escape" &&
      $modalBackground &&
      $modalBackground.classList.contains("active")
    ) {
      closeModal();
    }
  },
});
