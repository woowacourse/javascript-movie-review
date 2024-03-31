import MovieReviewHeader from "../MovieReviewHeader/MovieReviewHeader";
import MovieSearchInput from "../MovieSearchInput/MovieSearchInput";
import MovieListController from "../../controller/MovieListController";
import MovieItemModal from "../MovieItemModal/MovieItemModal";

import { $ } from "../../utility/dom";

class MovieReviewApp {
  #movieItemModal;

  constructor() {
    this.#movieItemModal = new MovieItemModal();
  }

  #renderMovieReviewHeader() {
    // TODO: 명확한 클래스/아이디로 찾아오기
    const headerElement = $("header");

    const movieSearchInput = new MovieSearchInput();

    if (headerElement) {
      headerElement.appendChild(MovieReviewHeader.createHeader());
      headerElement.appendChild(movieSearchInput.createSearchBox());
    }
  }

  async #renderMovieReviewMain() {
    const movieListController = new MovieListController();
  }

  #renderMovieItemModal() {
    const mainSection = $("main") as HTMLElement;

    const modalElement = this.#movieItemModal.getModal();
    mainSection.appendChild(modalElement);

    this.#movieItemModal.setModalCloseHandler();
    // this.#movieItemModal.setModalClickHandler();
  }

  #handleMovieItemClick() {
    const itemViewSection = $(".item-view") as HTMLElement;

    itemViewSection.addEventListener("click", async (e) => {
      const targetElement = e.target as HTMLElement;

      const liElement = targetElement.closest("li");
      if (liElement) {
        await this.#movieItemModal.setModalContent(liElement.id);

        this.#movieItemModal.openModal();
      }
    });
  }

  render() {
    this.#renderMovieReviewHeader();
    this.#renderMovieReviewMain();
    this.#renderMovieItemModal();
    this.#handleMovieItemClick();
  }
}

export default MovieReviewApp;
