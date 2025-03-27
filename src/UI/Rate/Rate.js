import { setItem, MOVIE_REVIEW, getItem } from "../../utils/localStorage";
import "./Rate.css";

class Rate {
  #rate;
  #movieId;

  constructor($target, movieId) {
    this.$target = $target;
    this.#movieId = movieId;

    this.#rate = this.getRateByMovieId(MOVIE_REVIEW) ?? 0;
  }

  getRateByMovieId() {
    const movieRate = getItem(MOVIE_REVIEW);
    if (!movieRate) return;

    return movieRate[this.#movieId];
  }

  setRate(rate) {
    this.#rate = rate;
    this.render();
  }

  render() {
    this.$target.innerHTML = "";
    const $div = document.createElement("div");
    $div.classList.add("rating-selector");

    $div.innerHTML = /*html*/ `
    <div class="rate-button-wrap">
        ${Array.from({ length: 5 }, (v, i) => (i + 1) * 2)
          .map(
            (value) =>
              `<button class="rate-button" id=${value}>
                <img src=${
                  this.#rate < value
                    ? "./images/star_empty.png"
                    : "./images/star_filled.png"
                } class="star" />
              </button>`
          )
          .join("")}
    </div>
    <span class="rate-text">${this.getRateText(this.#rate)}</span>
    <span class="rate-number">${
      this.#rate === 0 ? "" : `(${this.#rate}/10)`
    }</span>
      `;

    $div.addEventListener("click", this.handleRateButtonClick);

    this.$target.appendChild($div);
  }

  getRateText(rate) {
    const obj = {
      0: "아직 평점을 매기지 않았어요",
      2: "최악이예요",
      4: "별로예요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    return obj[rate];
  }

  handleRateButtonClick = (e) => {
    const $button = e.target.closest("button");
    this.setRate($button.id);

    const localValue = getItem(MOVIE_REVIEW, {});
    const copy = { ...localValue };
    copy[this.#movieId] = this.#rate;
    setItem(MOVIE_REVIEW, copy);
  };
}

export default Rate;
