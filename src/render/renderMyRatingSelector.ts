import { fetchMyRating } from "../api";
import { RATING_MESSAGES } from "../constants";
import bindSelectRatingEvent from "../event/bindSelectRatingEvent";

function createMyRateSelectorElement(currentRating?: number) {
  const selectorElement = document.createElement("div");
  selectorElement.classList.add("modal-movie-my-rating-selector")

  if (currentRating !== undefined) {
    selectorElement.dataset.rating = currentRating.toString()
  }

  const buttonElements = Array.from({ length: 5 }, (_, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.classList.add("star-button");
    buttonElement.dataset.rating = String((index + 1) * 2);
    return buttonElement
  })

  selectorElement.append(...buttonElements);

  return selectorElement
}

function createMyRatingMessagesElement() {
  const containerElement = document.createElement("div");
  containerElement.classList.add("modal-movie-my-rating-messages");

  containerElement.insertAdjacentHTML("beforeend", Object.entries(RATING_MESSAGES).map(([rating, message]) => /*html*/`
    <p class="modal-movie-my-rating-message" data-rating="${rating}">
      <span>${message}</span>
      <span class="modal-movie-my-rating-message-score">(${rating}/10)</span>
    </p>
  `).join(""));

  return containerElement;
}

export default async function renderMyRatingSelector(selector: string, movieId: number) {
  const myRating = await fetchMyRating(movieId);

  const myRateSelectorBody = document.querySelector(selector);
  const myRateSelectorElement = createMyRateSelectorElement(myRating);
  const myRatingMessagesElement = createMyRatingMessagesElement();
  myRateSelectorBody?.append(myRateSelectorElement, myRatingMessagesElement);

  bindSelectRatingEvent(myRateSelectorElement);
}
