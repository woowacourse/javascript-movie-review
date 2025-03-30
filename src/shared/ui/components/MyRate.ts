import { getRateText } from "../../utils/getRateText";
import { localStorageHandler } from "../../stores/localStorage";

const MyRate = (id: string) => {
  let userRate = Number(localStorageHandler.get(id)) ?? 0;

  return /*html*/ `
  <h3 class="my-rate-title">내 별점</h3>
  <div class="rate-display">
    <span class="rate-stars">
      <input type="radio" name="rate" id="rate1" value="2" class="star-icon-radio" />
      <label for="rate1">
        <img class="star-icon" src="/images/star_${
          userRate >= 2 ? "filled" : "empty"
        }.png" />
      </label>
      <input type="radio" name="rate" id="rate2" value="4" class="star-icon-radio" />
      <label for="rate2">
        <img class="star-icon" src="/images/star_${
          userRate >= 4 ? "filled" : "empty"
        }.png" />
      </label>
      <input type="radio" name="rate" id="rate3" value="6" class="star-icon-radio" />
      <label for="rate3">
        <img class="star-icon" src="/images/star_${
          userRate >= 6 ? "filled" : "empty"
        }.png" />
      </label>
      <input type="radio" name="rate" id="rate4" value="8" class="star-icon-radio" />
      <label for="rate4">
        <img class="star-icon" src="/images/star_${
          userRate >= 8 ? "filled" : "empty"
        }.png" />
      </label>
      <input type="radio" name="rate" id="rate5" value="10" class="star-icon-radio" />
      <label for="rate5">
        <img class="star-icon" src="/images/star_${
          userRate >= 10 ? "filled" : "empty"
        }.png" />
      </label>
    </span>
    <span class="rate-text">${getRateText(userRate)}</span>
  </div>
  `;
};

export default MyRate;
