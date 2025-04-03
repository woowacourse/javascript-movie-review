import "./Modal.css";
import { getMovieDetail } from "../../../Domain/getMovieDetail";
import Rate from "../Rate/Rate";
import Spinner from "../../Common/Spinner/Spinner";
import MovieDescription from "../MovieDescription/MovieDescription";

class Modal {
  static currentKeydownHandler = null;

  #movie;
  #isLoading;
  #show;

  constructor($target, setMovieId) {
    this.$target = $target;
    this.setMovieId = setMovieId;

    this.#movie;
    this.#show = false;
    this.#isLoading = false;

    this.$div;
  }

  async init(movieId) {
    if (Modal.currentKeydownHandler) {
      document.removeEventListener("keydown", Modal.currentKeydownHandler);
    }

    document.addEventListener("keydown", this.handleKeyDown);
    Modal.currentKeydownHandler = this.handleKeyDown;

    this.movieId = movieId;

    if (
      (this.movieId && !this.#movie) ||
      (this.#movie && this.movieId && this.#movie.id !== this.movieId)
    ) {
      const movieDetail = await this.getMovieDetailData();
      this.setMovie(movieDetail);
    }
  }

  setIsLoading(isLoading) {
    this.#isLoading = isLoading;
    this.render();
  }

  setShow(show) {
    this.#show = show;
    this.render();
  }

  setMovie(newMovie) {
    this.#movie = newMovie;
    this.render();
  }

  async getMovieDetailData() {
    this.setIsLoading(true);
    this.setShow(true);

    const data = await getMovieDetail(this.movieId);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data !== null) {
      this.setIsLoading(false);

      return data;
    }
  }

  render() {
    this.$target.innerHTML = "";

    this.$div = document.createElement("div");

    this.$div.classList.add("modal-background");
    this.$div.id = "modalBackground";

    this.$div.addEventListener("click", this.handleModalBackClick);

    if (this.#show) this.$div.classList.add("active");

    if (this.#isLoading) {
      const $modal = document.createElement("div");
      $modal.className = "modal loading";

      const $closeButton = document.createElement("button");
      $closeButton.classList.add("close-modal");
      $closeButton.id = "closeModal";

      const $img = document.createElement("img");
      $img.setAttribute("src", "./images/modal_button_close.png");

      $closeButton.appendChild($img);
      $closeButton.addEventListener("click", this.handleCloseButtonClick);

      const $modalContainer = document.createElement("div");
      $modalContainer.classList.add("modal-container");

      $modal.appendChild($closeButton);
      new Spinner($modalContainer).render();

      $modal.appendChild($modalContainer);
      this.$div.appendChild($modal);
      this.$target.appendChild(this.$div);
      return;
    }

    if (!this.#movie || !this.movieId) return;

    const {
      title,
      poster_path,
      vote_average,
      genres,
      release_date,
      overview,
      id,
    } = this.#movie;

    const $modal = document.createElement("div");
    $modal.classList.add("modal");

    const $closeButton = document.createElement("button");
    $closeButton.classList.add("close-modal");
    $closeButton.id = "closeModal";

    const $img = document.createElement("img");
    $img.setAttribute("src", "./images/modal_button_close.png");

    $closeButton.appendChild($img);
    $closeButton.addEventListener("click", this.handleCloseButtonClick);

    const $modalContainer = document.createElement("div");
    $modalContainer.classList.add("modal-container");

    const $modalImageDiv = document.createElement("div");
    $modalImageDiv.classList.add("modal-image");

    const $modalImg = document.createElement("img");

    $modalImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${poster_path}`
    );

    $modalContainer.appendChild($modalImageDiv);
    $modalImageDiv.appendChild($modalImg);

    new MovieDescription($modalContainer, this.#movie).render();

    $modal.appendChild($closeButton);
    $modal.appendChild($modalContainer);
    this.$div.appendChild($modal);

    this.$target.appendChild(this.$div);
  }

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.handleCloseButtonClick();
    }
  };

  handleModalBackClick = (e) => {
    if (!e.target.closest(".modal") && !e.target.closest(".rating-selector")) {
      this.handleCloseButtonClick();
    }
  };

  handleCloseButtonClick = () => {
    this.setMovieId(undefined);
    this.$div.classList.remove("active");
  };
}

export default Modal;
