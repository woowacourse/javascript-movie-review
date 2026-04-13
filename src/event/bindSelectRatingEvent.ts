import { updateMyRating } from "../api";
import { AppError, handleError } from "../error";

export default function bindSelectRatingEvent(element: HTMLElement) {
  element.addEventListener("click", async (event) => {
    try {
      if (!(event.target instanceof HTMLButtonElement)) return
      const dialogElement = event.target.closest("dialog") as HTMLDialogElement;
      const formElement = event.target.closest(".modal-movie-my-rating-selector") as HTMLFormElement;
      const movieIdStr = dialogElement.dataset.movieId;
      const ratingStr = event.target.dataset.rating;

      if (!movieIdStr) throw new AppError("영화 ID를 찾을 수 없습니다.");
      if (!ratingStr) throw new AppError("평점을 찾을 수 없습니다.");

      const movieId = Number(movieIdStr);
      const rating = Number(ratingStr);

      formElement.dataset.rating = ratingStr;
      await updateMyRating(movieId, rating);
    } catch (error) {
      await handleError(error);
    }
  });

}