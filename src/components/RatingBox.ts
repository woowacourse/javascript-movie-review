import { COMMENT, SINGLE_STAR_SCORE } from "../constant/setting";

export default class RatingBox extends HTMLElement {
  #state: RatingBoxState = { myRating: 0 };

  get myRating() {
    return Number(this.getAttribute("my-rating"));
  }

  get movieId() {
    return Number(this.getAttribute("movie-id"));
  }

  connectedCallback() {
    this.setState({ myRating: this.myRating });
    this.render();
    this.setEvent();
  }

  render() {
    const { myRating } = this.#state;

    this.innerHTML = /*html*/ `
      <div class="rating-box flex align-center">
        <p>내 별점</p>
        <div class="star-box">${this.starBoxTemplate()}</div>
        <h4 class="rating-count">${myRating}</h4>
        <h4 class="comment">${COMMENT[myRating]}</h4>
      </div>
        `;
  }

  setEvent() {
    const $starBox = this.querySelector(".star-box");

    $starBox?.addEventListener("click", (event) => {
      const $stars = this.querySelectorAll(".star");
      $stars?.forEach((star, index) => {
        if (event.target === star)
          this.setState({
            myRating: (index + 1) * SINGLE_STAR_SCORE,
          });
      });
      this.rerenderStarBox();
      this.dispatchEvent(
        new CustomEvent("set-my-rating", {
          bubbles: true,
          detail: { movieId: this.movieId, myRating: this.#state.myRating },
        })
      );
    });
  }

  setState(newState: object) {
    this.#state = { ...this.#state, ...newState };
  }

  rerenderStarBox() {
    const { myRating } = this.#state;

    const $starBox = this.querySelector(".star-box") as HTMLDivElement;
    $starBox.innerHTML = this.starBoxTemplate();

    const $ratingCount = this.querySelector(
      ".rating-count"
    ) as HTMLHeadingElement;
    $ratingCount.innerText = String(myRating);

    const $comment = this.querySelector(".comment") as HTMLHeadingElement;
    $comment.innerText = COMMENT[myRating];
  }

  starBoxTemplate() {
    const { myRating } = this.#state;

    return /*html*/ `          
      <img class="star star-${myRating >= 2 ? "filled" : "empty"}" alt="별점" />
      <img class="star star-${myRating >= 4 ? "filled" : "empty"}" alt="별점" />
      <img class="star star-${myRating >= 6 ? "filled" : "empty"}" alt="별점" />
      <img class="star star-${myRating >= 8 ? "filled" : "empty"}" alt="별점" />
      <img class="star star-${
        myRating >= 10 ? "filled" : "empty"
      }" alt="별점" />
`;
  }
}

customElements.define("rating-box", RatingBox);
