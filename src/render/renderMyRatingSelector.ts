import { fetchMyRating } from "../api";
import bindSelectRatingEvent from "../event/bindSelectRatingEvent";

function createMyRateSelectorElement(currentRating?: number) {
  const formElement = document.createElement("div");
  formElement.classList.add("modal-movie-my-rating-form")

  if (currentRating !== undefined) {
    formElement.dataset.rating = currentRating.toString()
  }

  const buttonElements = Array.from({ length: 5 }, (_, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.classList.add("star-button");
    buttonElement.dataset.rating = String((index + 1) * 2);
    return buttonElement
  })

  formElement.append(...buttonElements);

  return formElement
}

export default async function renderMyRatingSelector(selector: string, movieId: number) {
  const myRating = await fetchMyRating(movieId);

  const myRateSelectorElement = createMyRateSelectorElement(myRating);
  const myRateSelectorContainer = document.querySelector(selector);
  myRateSelectorContainer?.append(myRateSelectorElement);

  bindSelectRatingEvent(myRateSelectorElement);
}
