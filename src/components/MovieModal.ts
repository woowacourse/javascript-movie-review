import { getMovieDetail } from "../utils/fetch";

export default class MovieModal extends HTMLElement {
  #state = {
    poster: "",
    rating: 0,
    myRating: 0,
    overview: "",
    comment: "",
    genre: "",
  };

  get movieTitle() {
    return this.getAttribute("movie-title");
  }

  get movieId() {
    return Number(this.getAttribute("movie-id"));
  }

  get myRating() {
    return Number(this.getAttribute("my-rating"));
  }

  static get observedAttributes() {
    return ["movie-id", "my-rating"];
  }

  async attributeChangedCallback() {
    if (this.movieId) {
      await this.getDetail();
    }
    this.render();
    this.setEvent();
    this.setState({ myRating: this.myRating });
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    const { poster, rating, myRating, overview, comment, genre } = this.#state;
    this.innerHTML = /*html*/ `
        <div class="modal">
            <div class="modal-content">
                <button class="exit-button">X</button>
                <h2>${this.movieTitle}</h2>
                <div class="w-full h-full flex align-center justify-between p-32">
                  <img class="modal-image" src="https://image.tmdb.org/t/p/w220_and_h330_face${poster}"/>
                  <div class="w-full h-full flex flex-column p-16 relative">
                    <div class="w-full flex align-center">
                      <p class="mr-16">${genre}</p>
                      <div class="flex align-center">
                        <img class="star-filled mr-4" alt="별점" />
                        <p>${rating}</p>
                      </div>
                    </div>
                    <p class="mt-16">${overview}</p>
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
                  </div>
                </div>
            </div> 
        </div>
            `;
  }

  setEvent() {
    const $stars = this.querySelectorAll(".rating-box img");
    const $image = this.querySelector(".modal-image");

    this.addEventListener("click", this.exitModal);

    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      console.log(event.key, event.target);
      if (event.key === "Escape" || event.key === "Backspace")
        this.classList.add("hidden");
      event.stopPropagation();
    });

    $stars?.forEach((star, index) => {
      star.addEventListener("click", (event) => {
        this.setState({ myRating: (index + 1) * 2 });
        this.changeComment();
        this.render();
        this.setEvent();
      });
    });

    $image?.addEventListener("load", () => {});
  }

  exitModal(event: Event) {
    const $exitButton = this.querySelector(".exit-button");
    const $modal = this.querySelector(".modal");
    event.stopPropagation();
    if (event.target === $exitButton || event.target === $modal) {
      this.classList.toggle("hidden");
    }

    this.dispatchEvent(
      new CustomEvent("set-my-rating", {
        bubbles: true,
        detail: { movieId: this.movieId, myRating: this.#state.myRating },
      })
    );
  }

  changeComment() {
    if (this.#state.myRating === 2) this.#state.comment = "최악이예요";
    if (this.#state.myRating === 4) this.#state.comment = "별로예요";
    if (this.#state.myRating === 6) this.#state.comment = "보통이에요";
    if (this.#state.myRating === 8) this.#state.comment = "재미있어요";
    if (this.#state.myRating === 10) this.#state.comment = "명작이에요";
  }

  async getDetail() {
    if (!this.movieId) throw new Error("movie_id가 존재하지 않습니다.");
    const fetchedData = await getMovieDetail(Number(this.movieId));
    const { poster_path, overview, vote_average, genres } = fetchedData;
    this.setState({
      poster: poster_path,
      rating: vote_average,
      overview,
      genre: genres.map((genre) => genre.name).join(", "),
    });
  }

  setState(newState: object) {
    this.#state = { ...this.#state, ...newState };
  }
}

customElements.define("movie-modal", MovieModal);
