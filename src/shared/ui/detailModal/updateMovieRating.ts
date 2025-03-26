import { storageService } from "../../utils/storageService";
import { toElement } from "../../utils/toElement";
import MyRatingInDetailModal from "../components/MyRatingInDetailModal";

export const updateMovieRating = () => {
  document
    .querySelector(".my-rating-container")
    ?.addEventListener("click", (e: Event) => {
      const target = e.target;
      const starRatingButton = (target as HTMLElement).closest(
        ".star-button"
      ) as HTMLElement;
      if (!starRatingButton) return;
      const rating = Number(starRatingButton.dataset.key);

      const $modal = (target as HTMLElement).closest(".modal") as HTMLElement;
      const movieId = $modal.dataset.id;

      storageService(Number(movieId), rating);

      const $myRatingContainer = document.querySelector(
        ".my-rating-container"
      ) as HTMLElement;
      $myRatingContainer.replaceChildren(
        toElement(`<h2>내 별점</h2>`),
        toElement(MyRatingInDetailModal(rating * 2))
      );
    });
};
