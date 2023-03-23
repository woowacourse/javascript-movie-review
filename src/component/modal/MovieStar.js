import { $, $$ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieStar extends CustomElement {
  template() {
    const id = this.getAttribute("id");

    return `
      <div class="user-rate">
        <p class="user-rate-title">내 별점</p>
        <div class="rate-container">
          <input name="1" type="image" class="rate" src="./image/star_empty.png" alt="별점" />
          <input name="2" type="image" class="rate" src="./image/star_empty.png" alt="별점" />
          <input name="3" type="image" class="rate" src="./image/star_empty.png" alt="별점" />
          <input name="4" type="image" class="rate" src="./image/star_empty.png" alt="별점" />
          <input name="5" type="image" class="rate" src="./image/star_empty.png" alt="별점" />
        </div>
        <p class="user-rate-title rate-result"></p>
      </div>
    `;
  }

  setEvent() {
    const rates = $$(".rate");

    rates.forEach((rate) => {
      rate.addEventListener("click", () => {
        this.changeRate(rate);
      });
    });
  }

  changeRate(element) {
    element.setAttribute("src", "./image/star_filled.png");
    this.fillStar(element);
    this.emptyStar(element);

    this.rateText(parseInt(element.name));
  }

  rateText(rate) {
    if (rate === 1) $(".rate-result").innerText = "2 최악이예요";
    if (rate === 2) $(".rate-result").innerText = "4 별로예요";
    if (rate === 3) $(".rate-result").innerText = "6 보통이에요";
    if (rate === 4) $(".rate-result").innerText = "8 재미있어요";
    if (rate === 5) $(".rate-result").innerText = "10 명작이에요";
  }

  fillStar(element) {
    while ((element = element.previousElementSibling))
      element.setAttribute("src", "./image/star_filled.png");
  }

  emptyStar(element) {
    while ((element = element.nextElementSibling))
      element.setAttribute("src", "./image/star_empty.png");
  }
}

customElements.define("movie-star", MovieStar);

export default MovieStar;
