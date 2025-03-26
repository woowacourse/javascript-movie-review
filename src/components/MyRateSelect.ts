const MyRateSelect = {
  create() {
    const myRateElement = document.createElement("div");
    myRateElement.classList.add("my-rate");
    const content = /*html*/ `
        <div class="star-container">
          <img src="./images/star_filled.png" class="star" />
          <img src="./images/star_filled.png" class="star" />
          <img src="./images/star_filled.png" class="star" />
          <img src="./images/star_filled.png" class="star" />
          <img src="./images/star_empty.png" class="star" />
        </div>
        <p class="my-rate-description">
          명작이에요 <span class="my-rate-score">(8/10)</span>
        </p>
    `;

    myRateElement.insertAdjacentHTML("beforeend", content);
    return myRateElement;
  },
};

export default MyRateSelect;
