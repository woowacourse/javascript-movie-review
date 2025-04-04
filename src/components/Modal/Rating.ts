import { Score } from "../../../types/starRating";
import { SCORE_MESSAGES } from "../../constants/config";
import Store from "../../store/store";

const ALLOWED_RATINGS: Score[] = [2, 4, 6, 8, 10];

export const Rating = (initialScore: Score = 0): string => {
  const score = ALLOWED_RATINGS.includes(initialScore) ? initialScore : 0;
  const scoreMessage = SCORE_MESSAGES[score];
  const labelsHTML = ALLOWED_RATINGS.map(
    (val) => /* html */ `
    <label for="star${val}" class="rating__label ${
      val === 0 ? "" : "rating__label--full"
    }" data-testid="star${val}">
      <input type="radio" id="star${val}" class="rating__input" name="rating" value="${val}">
      <span class="star-icon"></span>
    </label>`
  ).join("");

  return /* html */ `
    <div class="rating" data-testid="rating">
      <div class="rating-bar">
        ${labelsHTML}
      </div>
      <div class="rating-information">
        <p class="subtitle" data-testid="score-message">${scoreMessage}</p>
        <p class="subtitle color-95a1b2">(${score}/10)</p>
      </div>
    </div>
  `;
};

export const attachRatingEvents = (movieId: string, store: Store): void => {
  const $rateWrap = document.querySelector<HTMLElement>(".rating");
  if (!$rateWrap) return;

  const scores = store.getState().starRatings || [];
  const currentScore =
    scores.find((rating) => rating.id === movieId)?.score || 0;
  const $radio = $rateWrap.querySelector<HTMLInputElement>(
    `#star${currentScore}`
  );
  if ($radio) $radio.checked = true;

  const stars = $rateWrap.querySelectorAll(".star-icon");
  const initStars = (): void => {
    stars.forEach(($star) => $star.classList.remove("filled"));
  };

  const checkedRate = (): void => {
    const $checkedRadio = $rateWrap.querySelector<HTMLInputElement>(
      '.rating input[type="radio"]:checked'
    );

    initStars();

    if ($checkedRadio) {
      const starLabels = Array.from($rateWrap.querySelectorAll("label"));
      const index = starLabels.findIndex(($label) =>
        $label.contains($checkedRadio)
      );
      for (let i = 0; i <= index; i++) {
        const $icon = starLabels[i].querySelector(".star-icon");
        if ($icon) $icon.classList.add("filled");
      }
    }
  };

  const saveRate = (): void => {
    const $checkedRadio = $rateWrap.querySelector<HTMLInputElement>(
      '.rating input[type="radio"]:checked'
    );

    if ($checkedRadio) {
      const newScore = Number($checkedRadio.value) as Score;
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
  };

  checkedRate();

  stars.forEach(($starIcon) => {
    $starIcon.addEventListener("click", () => {
      setTimeout(() => {
        checkedRate();
        saveRate();
      }, 0);
    });
  });
};
