import { SCORE_MESSAGES } from "../../constants/config";
import Store from "../../store/store";

export const Rating = (initialScore: number = 0): string => {
  const score = initialScore;
  const scoreMessage =
    SCORE_MESSAGES[score as 2 | 4 | 6 | 8 | 10] || "별점이 없어요";
  return /* html */ `
    <div class="rating">
      <div class="rating-bar">
        <label for="star0">
          <input type="radio" id="star0" class="rating__input" name="rating" value="0">
          <span class="star-icon"></span>
        </label>
        <label for="star2" class="rating__label rating__label--full">
          <input type="radio" id="star2" class="rating__input" name="rating" value="2">
          <span class="star-icon"></span>
        </label>
        <label for="star4" class="rating__label rating__label--full">
          <input type="radio" id="star4" class="rating__input" name="rating" value="4">
          <span class="star-icon"></span>
        </label>
        <label for="star6" class="rating__label rating__label--full">
          <input type="radio" id="star6" class="rating__input" name="rating" value="6">
          <span class="star-icon"></span>
        </label>
        <label for="star8" class="rating__label rating__label--full">
          <input type="radio" id="star8" class="rating__input" name="rating" value="8">
          <span class="star-icon"></span>
        </label>
        <label for="star10" class="rating__label rating__label--full">
          <input type="radio" id="star10" class="rating__input" name="rating" value="10">
          <span class="star-icon"></span>
        </label>
      </div>
      <div class="rating-information">
        <p class="ml-16 subtitle">${scoreMessage}</p>
        <p class="ml-16 subtitle color-95a1b2">(${score}/10)</p>
      </div>
    </div>
  `;
};

export const attachRatingEvents = (movieId: string, store: Store): void => {
  const $rateWrap = document.querySelector(".rating");
  if (!$rateWrap) return;

  const scores = store.getState().starRatings || [];
  let currentScore = scores.find((rating) => rating.id === movieId)?.score || 0;

  const radio = $rateWrap.querySelector(
    `#star${currentScore}`
  ) as HTMLInputElement;
  if (radio) {
    radio.checked = true;
  }
  const stars = $rateWrap.querySelectorAll(".star-icon");

  function initStars(): void {
    stars.forEach((star) => star.classList.remove("filled"));
  }

  function checkedRate(): void {
    if (!$rateWrap) return;

    const checkedRadio = $rateWrap.querySelector(
      '.rating input[type="radio"]:checked'
    ) as HTMLInputElement;

    initStars();

    if (checkedRadio) {
      const starLabels = Array.from($rateWrap.querySelectorAll("label"));
      const index = starLabels.findIndex((label) =>
        label.contains(checkedRadio)
      );
      for (let i = 0; i <= index; i++) {
        const icon = starLabels[i].querySelector(".star-icon");
        if (icon) {
          icon.classList.add("filled");
        }
      }
    }
  }

  function saveRate(): void {
    if (!$rateWrap) return;

    const checkedRadio = $rateWrap.querySelector(
      '.rating input[type="radio"]:checked'
    ) as HTMLInputElement;
    if (checkedRadio) {
      const newScore = Number(checkedRadio.value);
      let starRatings = store.getState().starRatings || [];
      const index = starRatings.findIndex((r) => r.id === movieId);
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

  stars.forEach((starIcon) => {
    starIcon.addEventListener("click", () => {
      setTimeout(() => {
        checkedRate();
        saveRate();
      }, 0);
    });
  });
};
