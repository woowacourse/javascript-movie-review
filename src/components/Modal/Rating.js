// RatingComponent.js
import { SCORE_MESSAGES } from "../../constants/config.js";

export const Rating = (movieId, store, initialScore = 0) => {
  const score = initialScore;
  const scoreMessage = SCORE_MESSAGES[score] || "별점이 없어요";
  return /* html */ `
    <div class="rating">
      <div class="rating-bar">
        <label for="star0">
          <input type="radio" id="star0" class="rating__input" name="rating" value="0">
          <span class="star-icon"></span>
        </label>
        <label class="rating__label rating__label--full" for="star2">              
          <input type="radio" id="star2" class="rating__input" name="rating" value="2">
          <span class="star-icon"></span>
        </label>
        <label class="rating__label rating__label--full" for="star4">              
          <input type="radio" id="star4" class="rating__input" name="rating" value="4">
          <span class="star-icon"></span>
        </label>
        <label class="rating__label rating__label--full" for="star6">              
          <input type="radio" id="star6" class="rating__input" name="rating" value="6">
          <span class="star-icon"></span>
        </label>
        <label class="rating__label rating__label--full" for="star8">              
          <input type="radio" id="star8" class="rating__input" name="rating" value="8">
          <span class="star-icon"></span>
        </label>
        <label class="rating__label rating__label--full" for="star10">              
          <input type="radio" id="star10" class="rating__input" name="rating" value="10">
          <span class="star-icon"></span>
        </label>
      </div>
      <div class="rating-information">
        <p class="subtitle">${scoreMessage}</p>
        <p class="subtitle color-95a1b2">(${score}/10)</p>
      </div>
    </div>
  `;
};

export const attachRatingEvents = (movieId, store) => {
  const $rateWrap = document.querySelector(".rating");
  if (!$rateWrap) return;
  const scores = store.getState().starRatings || [];
  let currentScore = scores.find((rating) => rating.id === movieId)?.score || 0;

  const $radio = $rateWrap.querySelector(`#star${currentScore}`);
  if ($radio) {
    $radio.checked = true;
  }
  let stars = $rateWrap.querySelectorAll(".star-icon");

  function initStars() {
    stars.forEach((star) => star.classList.remove("filled"));
  }

  function checkedRate() {
    const checkedRadio = $rateWrap.querySelector(
      '.rating input[type="radio"]:checked'
    );
    initStars();
    if (checkedRadio) {
      const starLabels = Array.from($rateWrap.querySelectorAll("label"));
      const index = starLabels.findIndex((label) =>
        label.contains(checkedRadio)
      );
      for (let i = 0; i <= index; i++) {
        const $icon = starLabels[i].querySelector(".star-icon");
        if ($icon) {
          $icon.classList.add("filled");
        }
      }
    }
  }

  function saveRate() {
    const checkedRadio = $rateWrap.querySelector(
      '.rating input[type="radio"]:checked'
    );
    if (checkedRadio) {
      const newScore = Number(checkedRadio.value);
      let starRatings = store.getState().starRatings || [];
      const index = starRatings.findIndex((rating) => rating.id === movieId);
      if (index !== -1) {
        starRatings[index].score = newScore;
      } else {
        starRatings.push({ id: movieId, score: newScore });
      }
      localStorage.setItem("starRatings", JSON.stringify(starRatings));
      store.setState({ starRatings });
    }
  }

  checkedRate();

  $rateWrap.querySelectorAll(".star-icon").forEach(($starIcon) => {
    $starIcon.addEventListener("mouseenter", () => {
      initStars();
      const starLabels = Array.from($rateWrap.querySelectorAll("label"));
      const index = starLabels.findIndex((label) => label.contains($starIcon));
      for (let i = 0; i <= index; i++) {
        const icon = starLabels[i].querySelector(".star-icon");
        if (icon) {
          icon.classList.add("filled");
        }
      }
    });
    $starIcon.addEventListener("mouseleave", () => {
      checkedRate();
    });
  });

  $rateWrap.addEventListener("mouseleave", saveRate);
};
