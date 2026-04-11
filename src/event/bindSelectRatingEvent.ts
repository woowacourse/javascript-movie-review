import { updateMyRating } from "../api";

export default function bindSelectRatingEvent() {
  const formElement = document.querySelector(".modal-movie-my-rate-form") as HTMLFormElement;

  formElement.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return
    const dialogElement = event.target.closest("dialog") as HTMLDialogElement;
    const formElement = event.target.closest(".modal-movie-my-rate-form") as HTMLFormElement;
    const movieIdStr = dialogElement.dataset.movieId;
    const ratingStr = event.target.dataset.rating;

    if (!movieIdStr) throw new Error("영화 ID를 찾을 수 없습니다.");
    if (!ratingStr) throw new Error("평점을 찾을 수 없습니다.");

    const movieId = Number(movieIdStr);
    const rating = Number(ratingStr);

    formElement.dataset.rating = ratingStr;
    updateMyRating(movieId, rating);
  });

}