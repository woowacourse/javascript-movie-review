export default class MovieModal extends HTMLElement {
  myRating = 0;
  comment = "별점을 남겨주세요";

  get movieTitle() {
    return this.getAttribute("movie-title");
  }

  get rating() {
    return this.getAttribute("rating");
  }

  get poster() {
    return this.getAttribute("poster");
  }

  get movieId() {
    return this.getAttribute("movie-id");
  }

  get genreId() {
    return this.getAttribute("genre-id");
  }

  static get observedAttributes() {
    return ["movie-title", "rating", "poster", "movie-id", "genre-id"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (
      this.movieTitle &&
      this.rating &&
      this.poster &&
      this.movieId &&
      this.genreId
    )
      this.render();

    this.setEvent();
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
        <div class="modal">
            <div class="modal-content">
                <button class="exit-button">X</button>
                <h2>${this.movieTitle}</h2>
                <div class="w-full h-full flex align-center justify-between p-32">
                  <img class="modal-image" src="https://image.tmdb.org/t/p/w220_and_h330_face${
                    this.poster
                  }"/>
                  <div class="w-full h-full flex flex-column p-16 relative">
                    <div class="w-full flex align-center">
                      <p class="mr-16">${this.genreId}</p>
                      <div class="flex align-center">
                        <img class="star-filled mr-4" alt="별점" />
                        ${this.rating}
                      </div>
                    </div>
                    <h4 class="mt-16">내용내용</h4>
                    <div class="rating-box flex align-center">
                      <p class="mr-16">내 별점</p>
                      <img class="star-${
                        this.myRating >= 2 ? "filled" : "empty"
                      } mr-4" alt="별점" />
                      <img class="star-${
                        this.myRating >= 4 ? "filled" : "empty"
                      } mr-4" alt="별점" />
                      <img class="star-${
                        this.myRating >= 6 ? "filled" : "empty"
                      } mr-4" alt="별점" />
                      <img class="star-${
                        this.myRating >= 8 ? "filled" : "empty"
                      } mr-4" alt="별점" />
                      <img class="star-${
                        this.myRating >= 10 ? "filled" : "empty"
                      } mr-4" alt="별점" />
                      <h4 class="ml-12 mr-12">${this.myRating}</h4>
                      <h4>${this.comment}</h4>
                    </div>
                  </div>
                </div>
            </div> 
        </div>
            `;
  }

  setEvent() {
    const $stars = this.querySelectorAll(".rating-box img");

    this.addEventListener("click", this.exitModal);

    $stars?.forEach((star, index) => {
      star.addEventListener("click", (event) => {
        this.myRating = (index + 1) * 2;
        this.changeComment();
        this.render();
        this.setEvent();
        event.stopPropagation();

        this.dispatchEvent(
          new CustomEvent("set-my-rating", {
            bubbles: true,
            detail: { movieId: this.movieId, rating: this.myRating },
          })
        );
      });
    });
  }

  exitModal(event: Event) {
    const $exitButton = this.querySelector(".exit-button");

    event.stopPropagation();
    if (event.target === $exitButton) {
      this.classList.toggle("hidden");
    }
  }

  changeComment() {
    if (this.myRating === 2) this.comment = "최악이예요";
    if (this.myRating === 4) this.comment = "별로예요";
    if (this.myRating === 6) this.comment = "보통이에요";
    if (this.myRating === 8) this.comment = "재미있어요";
    if (this.myRating === 10) this.comment = "명작이에요";
  }

  getDetail() {}
}

customElements.define("movie-modal", MovieModal);
