import { getRateScore, getRateText } from "../../utils/getRateText";
import { localStorageHandler } from "../../stores/localStorage";
import URL from "../../constants/url";

const RATE_STARS = [2, 4, 6, 8, 10];

const MyRate = (id: string) => {
  let userRate = Number(localStorageHandler.get(id)) ?? 0;

  return /*html*/ `
  <h3 class="my-rate-title">내 별점</h3>
  <div class="rate-display">
  <span class="rate-stars">
    ${RATE_STARS.map((rate) => {
      return /*html*/ `
      <input type="radio" name="rate" id="rate${rate}" value="${rate}" class="star-icon-radio" />
      <label for="rate${rate}">
        <img class="star-icon" src="${URL.BASE_STAR_IMAGE}${
        userRate >= rate ? "filled" : "empty"
      }.png" />
      </label>
    `;
    }).join("")}
    </span>
    <p class="rate-text">
      <span class="rate-text-description">${getRateText(userRate)}</span>
      <span class="rate-score">${getRateScore(userRate)}</span>
    </p>
  </div>
  `;
};

export default MyRate;
