import Star from "./star";

class StarRate {
  #parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#render();
    this.#addEventListeners();
  }

  #render() {
    const totalStars = [1, 2, 3, 4, 5]
      .map((id) => `<img src="./images/star_empty.png" id="star-${id}" />`)
      .join("");
    this.#parentElement.innerHTML = totalStars;
  }

  #addEventListeners() {
    this.#parentElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!target.matches("img")) return;

      const ratedStars = [1, 2, 3, 4, 5]
        .map((id) => {
          if (id <= Number(target.id.split("-")[1])) {
            return `<img src="./images/star_filled.png" id="star-${id}" />`;
          } else {
            return `<img src="./images/star_empty.png" id="star-${id}" />`;
          }
        })
        .join("");
      console.log(ratedStars);
      this.#parentElement.innerHTML = ratedStars;
    });
  }
}

export default StarRate;
