import { renderMoviesList } from "../features/movies/movieListRenderer";
import { ratingMessages } from "../components/Modal";
import { movieDetailRenderer } from "../features/movies/movieDetailRenderer";
import { movieStore, searchState, selectionState } from "../state/movieStore";
import { addEvent } from "./utils/addEvent";
import { updateStoredMovieRatingById } from "./utils/ratingStorage";

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
      searchState.keyword = value;
      movieStore.page = 1;

      if ($ul && $title) {
        $ul.innerHTML = "";
        $title.textContent = `"${searchState.keyword}" 검색 결과`;
      }

      $topRatedContainer?.classList.add("close");
      $overlay?.classList.add("close");

      movieStore.movies = [];

      renderMoviesList();
    }
  },
});

// modal
const $modalBackground = document.querySelector("#modalBackground");
let selectedIndex = 0;

function closeModal() {
  $modalBackground?.classList.toggle("active");
  document.body.classList.remove("lock-scroll");
}

function opneModal(id: number) {
  selectionState.movieId = id;
  document.body.classList.add("lock-scroll");
  $modalBackground?.classList.toggle("active");
  movieDetailRenderer();
}

addEvent({
  type: "click",
  selector: ".item",
  handler: (event, target) => {
    opneModal(Number(target?.id));
  },
});

addEvent({
  type: "click",
  selector: "#top-rated-show-more",
  handler: () => {
    const movieId = document
      .querySelector(".top-rated-movie")
      ?.id.split("_")[1];
    opneModal(Number(movieId));
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

function getTargetIndex(target: Element) {
  const targetIndex = Number((target as HTMLElement).dataset.index);
  if (selectedIndex === targetIndex) {
    return 0;
  }
  return targetIndex;
}

addEvent({
  type: "click",
  selector: ".star",
  handler: (event, target) => {
    const $stars = document.querySelectorAll(".personal-rate .star");
    const $rateSubtitle = document.querySelector(".personal-rate-message");
    const movieId = Number(document.querySelector(".modal-description")?.id);
    1;

    const targetIndex = getTargetIndex(target!);
    selectedIndex = targetIndex;

    movieId && updateStoredMovieRatingById({ movieId, movieRate: targetIndex });

    if ($rateSubtitle) {
      $rateSubtitle.innerHTML = `
         <span class="rating-message"> ${ratingMessages[targetIndex]}</span>
        <span class="caption"> (${targetIndex * 2}/10) </span>
        `;
    }

    $stars.forEach((star) => {
      const $starImg = star as HTMLImageElement;
      $starImg.src =
        Number($starImg.dataset.index)! <= targetIndex!
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
    });
  },
});
