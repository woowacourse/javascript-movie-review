import { updateMyRating } from "../api";
import { AppError, handleError } from "../error";

export default function bindSelectRatingEvent(element: HTMLElement) {
  element.addEventListener("click", async (event) => {
    try {
      if (!(event.target instanceof HTMLButtonElement)) return

      const dialogElement = event.target.closest<HTMLDialogElement>("dialog");
      const selectorElement = event.target.closest<HTMLDivElement>(".modal-movie-my-rating-selector");

      if (!dialogElement) throw new AppError("모달을 찾을 수 없습니다.");
      if (!selectorElement) throw new AppError("별점 셀렉터를 찾을 수 없습니다.");

      const movieIdStr = dialogElement?.dataset.movieId;
      const ratingStr = event.target.dataset.rating;

      if (!movieIdStr) throw new AppError("영화 ID를 찾을 수 없습니다.");
      if (!ratingStr) throw new AppError("별점을 찾을 수 없습니다.");

      const movieId = Number(movieIdStr);
      const rating = Number(ratingStr);

      selectorElement.dataset.rating = ratingStr;
      await updateMyRating(movieId, rating);
    } catch (error) {
      await handleError(error);
    }
  });

}