import { getMovieDetail } from "../utils/fetch";
import NoImage from "../assets/image/no_image.png";

export default class MovieModal extends HTMLElement {
  #state = {
    poster: "",
    rating: 0,
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

  async connectedCallback() {
    await this.getDetail();
    this.render();
    this.setEvent();
  }

  render() {
    const { poster, rating, overview, genre } = this.#state;
    this.innerHTML = /*html*/ `
            <div class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <button class="exit-button">X</button>
                  <h2>${this.movieTitle}</h2>
                </div>
                <div class="w-full h-full flex align-center justify-between p-32">
                  <img class="modal-image skeleton" src='${
                    poster
                      ? `https://image.tmdb.org/t/p/original${poster}`
                      : NoImage
                  }'/>
                  <div class="w-full h-full flex flex-column p-16 relative">
                    <div class="w-full flex align-center skeleton">
                      <p class="mr-16 hidden">${genre}</p>
                      <div class="flex align-center">
                        <img class="star-filled mr-4 hidden" alt="별점" />
                        <p>${rating}</p>
                      </div>
                    </div>
                    <p class="mt-16 truncate skeleton">
                    ${overview ? overview : '" 제공된 줄거리가 없습니다. "'}
                    </p>
                    <rating-box 
                    my-rating="${this.myRating}" 
                    movie-id="${this.movieId}">
                    </rating-box>
                  </div>
                </div>
              </div> 
            </div>
            `;
  }

  setEvent() {
    this.addEventListener("click", this.exitModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.remove();
      }
    });

    const $skeletonList = this.querySelectorAll(".skeleton");
    const $hiddenList = this.querySelectorAll(".hidden");
    const $image = this.querySelector(".modal-image") as HTMLImageElement;
    $image?.addEventListener("load", () => {
      if (!$image.complete) return;
      $skeletonList.forEach((element) => element.classList.remove("skeleton"));
      $hiddenList.forEach((element) => element.classList.remove("hidden"));
    });
  }

  exitModal(event: Event) {
    const $exitButton = this.querySelector(".exit-button");
    event.stopPropagation();
    if (event.target === $exitButton || event.target === this) {
      this.remove();
    }
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
