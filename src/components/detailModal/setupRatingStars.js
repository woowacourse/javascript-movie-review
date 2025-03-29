import { getRating, updateRating } from "../../util/store";

const messages = {
  0: "별점을 메겨주세요",
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export function setupRatingStars($modalContainer, id) {
  const $stars = Array.from($modalContainer.querySelectorAll(".estimate-star"));
  const $description = $modalContainer.querySelector(
    ".estimate-description .modal-text"
  );
  const $score = $modalContainer.querySelector(".estimate-number");

  const initialRating = getRating(id);
  const selectedStartIndex = initialRating / 2;

  renderInitialStars($stars, selectedStartIndex);
  updateText($description, $score, initialRating);
  bindStarClickEvents($stars, $description, $score, id);
}

function renderInitialStars(stars, selectedStartIndex) {
  stars.forEach((star, index) => {
    star.src =
      index < selectedStartIndex
        ? "./images/star_filled.png"
        : "./images/star_empty.png";
  });
}

function updateText($description, $score, rating) {
  if ($description) $description.textContent = messages[rating];
  if ($score) $score.textContent = `(${rating}/10)`;
}

function bindStarClickEvents(stars, $description, $score, id) {
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const selectedStartIndex = index + 1;
      const rating = selectedStartIndex * 2;

      renderInitialStars(stars, selectedStartIndex);
      updateText($description, $score, rating);
      updateRating({ id, rating });
    });
  });
}
