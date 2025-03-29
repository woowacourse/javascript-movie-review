import { MovieInfo } from "../../../types/movieType";
import { Modal } from "./Modal";

function openModal({
  title,
  release_date,
  genres,
  poster_path,
  vote_average,
  overview,
}: MovieInfo) {
  const $modalContainer = document.createElement("div");
  $modalContainer.classList.add("modalcontainer");

  const modalElement = Modal({
    title,
    release_date,
    genres,
    poster_path,
    vote_average,
    overview,
  });
  $modalContainer.innerHTML = modalElement;
  const stars = $modalContainer.querySelectorAll(".rate-star");
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("click", (event) => {
      event.stopPropagation();

      currentRating = index + 1;
      updateStarDisplay(stars, currentRating);
      saveRating(title, currentRating);
    });
  });

  const savedRating = getRating(title);
  if (savedRating) {
    currentRating = savedRating;
    updateStarDisplay(stars, currentRating);
  }

  document.body.appendChild($modalContainer);

  const closeButton = $modalContainer.querySelector("#closeModal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      $modalContainer.remove();
    });
  }

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && $modalContainer) {
      $modalContainer.remove();
    }
  });

  const $modalOverlay = $modalContainer.querySelector("#modalBackground");
  if ($modalOverlay) {
    $modalOverlay.addEventListener("click", () => {
      $modalContainer.remove();
    });
  }

  // 별 클릭할 때 별점 상태 업데이트
  function updateStarDisplay(stars: NodeListOf<Element>, rating: number) {
    stars.forEach((star: HTMLImageElement, index: number) => {
      if (index < rating) {
        star.src = "./star_filled.png";
      } else {
        star.src = "./star_empty.png";
      }
    });
    const $userRate = $modalContainer.querySelector(".user_rate");

    const existingDescription = $userRate?.querySelector("div");
    if (existingDescription) {
      existingDescription.remove();
    }

    const rateDescription = document.createElement("div");
    rateDescription.classList.add("rate_description");
    switch (rating) {
      case 1:
        rateDescription.innerHTML = "최악이에요 (2/10)";
        break;
      case 2:
        rateDescription.innerHTML = "별로예요 (4/10)";
        break;
      case 3:
        rateDescription.innerHTML = "보통이에요 (6/10)";
        break;
      case 4:
        rateDescription.innerHTML = "재미있어요 (8/10)";
        break;
      case 5:
        rateDescription.innerHTML = "명작이에요 (10/10)";
        break;
    }
    $userRate?.appendChild(rateDescription);
  }

  function saveRating(movieTitle: string, rating: number) {
    const movieRatings = JSON.parse(
      localStorage.getItem("movieRatings") || "{}"
    );
    movieRatings[movieTitle] = rating;
    localStorage.setItem("movieRatings", JSON.stringify(movieRatings));
  }

  function getRating(movieTitle: string): number | null {
    const movieRatings = JSON.parse(
      localStorage.getItem("movieRatings") || "{}"
    );
    return movieRatings[movieTitle] || null;
  }
}

export default openModal;
