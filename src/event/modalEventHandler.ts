import { movieDetailRenderer } from "../features/movies/movieDetailRenderer";
import { movieStore } from "../state/movieStore";
import { addEvent } from "./addEvent";

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

const ratingMessages: { [key: number]: string } = {
  0: "평가해주세요",
  1: "최악이예요",
  2: "별로예요",
  3: "보통이에요",
  4: "재미있어요",
  5: "명작이에요",
};

let selectedIndex = 0;

addEvent({
  type: "click",
  selector: ".star",
  handler: (event, target) => {
    const $stars = document.querySelectorAll(".personal-rate .star");
    const $rateSubtitle = document.querySelector(".personal-rate-message");

    let targetIndex = Number((target as HTMLElement).dataset.index);

    if (selectedIndex === targetIndex) {
      targetIndex = 0;
    }
    selectedIndex = targetIndex;

    if ($rateSubtitle) {
      console.log("hiih");
      $rateSubtitle.innerHTML = `
         <span class="rating-message"> ${ratingMessages[targetIndex]}</span>
        <span class="caption"> (${targetIndex * 2}/10) </span>
        `;
    }

    $stars.forEach((star) => {
      const $starImg = star as HTMLImageElement;
      if (Number($starImg.dataset.index)! <= targetIndex!) {
        $starImg.src = "./images/star_filled.png";
      } else {
        $starImg.src = "./images/star_empty.png";
      }
    });
  },
});
