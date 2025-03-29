import { ratingMessages } from "../components/Modal";
import { movieDetailRenderer } from "../features/movies/movieDetailRenderer";
import { movieStore } from "../state/movieStore";
import { addEvent } from "./utils/addEvent";
import { saveMovieRatingById } from "./utils/ratingStorage";

const $modalBackground = document.querySelector("#modalBackground");

function closeModal() {
  $modalBackground?.classList.toggle("active");
  document.body.classList.remove("lock-scroll");
}

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

let selectedIndex = 0;

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

    movieId && saveMovieRatingById({ movieId, movieRate: targetIndex });

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
