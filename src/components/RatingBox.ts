export default class RatingBox extends HTMLElement {
  #state = { myRating: 0, comment: "별점은 매겨주세요." };

  get myRating() {
    return Number(this.getAttribute("my-rating"));
  }

  get movieId() {
    return Number(this.getAttribute("movie-id"));
  }

  connectedCallback() {
    this.#state.myRating = this.myRating;
    this.render();
    this.setEvent();
  }

  render() {
    const { myRating, comment } = this.#state;

    this.innerHTML = `
      <div class="rating-box flex align-center">
        <p class="mr-16">내 별점</p>
        <img class="star-${
          myRating >= 2 ? "filled" : "empty"
        } mr-4" alt="별점" />
        <img class="star-${
          myRating >= 4 ? "filled" : "empty"
        } mr-4" alt="별점" />
        <img class="star-${
          myRating >= 6 ? "filled" : "empty"
        } mr-4" alt="별점" />
        <img class="star-${
          myRating >= 8 ? "filled" : "empty"
        } mr-4" alt="별점" />
        <img class="star-${
          myRating >= 10 ? "filled" : "empty"
        } mr-4" alt="별점" />
        <h4 class="ml-12 mr-12">${myRating}</h4>
        <h4>${comment}</h4>
      </div>
        `;
  }

  setEvent() {
    const $stars = this.querySelectorAll("img");
    $stars?.forEach((star, index) => {
      star.addEventListener("click", () => {
        this.setState({ myRating: (index + 1) * 2 });
        this.changeComment();
        this.render();
        this.setEvent();
        this.dispatchEvent(
          new CustomEvent("set-my-rating", {
            bubbles: true,
            detail: { movieId: this.movieId, myRating: this.#state.myRating },
          })
        );
      });
    });
  }

  changeComment() {
    if (this.#state.myRating === 2) this.#state.comment = "최악이예요";
    if (this.#state.myRating === 4) this.#state.comment = "별로예요";
    if (this.#state.myRating === 6) this.#state.comment = "보통이에요";
    if (this.#state.myRating === 8) this.#state.comment = "재미있어요";
    if (this.#state.myRating === 10) this.#state.comment = "명작이에요";
  }

  setState(newState: object) {
    this.#state = { ...this.#state, ...newState };
  }
}

customElements.define("rating-box", RatingBox);
