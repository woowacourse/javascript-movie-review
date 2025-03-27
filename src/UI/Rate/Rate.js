import "./Rate.css";

class Rate {
  #rate;

  constructor($target) {
    this.#rate = 2;
    this.$target = $target;
  }

  setRate(rate) {
    this.#rate = rate;
    this.render();
  }

  render() {
    const $div = document.createElement("div");
    $div.classList.add("rating-selector");

    $div.innerHTML = /*html*/ `
    ${Array.from({ length: 5 }, (v, i) => (i + 1) * 2)
      .map(
        (value) =>
          `<button class="rate-button" id=${value}>
              <img src="./images/star_filled.png" class="star" />
            </button>`
      )
      .join("")}
        <span class="rate-text">${this.getRateText(this.#rate)}</span>
        <span class="rate-number">(${this.#rate}/10)</span>
      `;

    this.$target.appendChild($div);
  }

  getRateText(rate) {
    const obj = {
      2: "최악이예요",
      4: "별로예요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    return obj[rate];
  }

  handleRateButtonClick(e) {
    console.log(e.currentTarget);
    // this.setRate(rate);
  }
}

export default Rate;
