import { createApi } from "../../../api/ApiFactory";
import { MovieDetail } from "../../../types/movie";
import { isHTMLElement } from "../../../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";

class MovieDetailModal {
  #dialogElement: HTMLDialogElement;
  #api = createApi(() =>
    new ErrorScreen("상세 정보를 불러오는 중 오류가 발생했습니다.").render()
  );

  constructor(private movieId: number) {
    this.#dialogElement = this.#createDialogElement();
    document.body.appendChild(this.#dialogElement);
    this.#attachEvents();
    this.#fetchAndDisplayDetail();
    this.#dialogElement.showModal();
  }

  #createDialogElement(): HTMLDialogElement {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal-background");
    dialog.id = "modalBackground";
    dialog.innerHTML = /*html*/ `
        <div class="modal">
            <button class="close-modal" id="closeModal">
                <img src="./images/modal_button_close.png" alt="Close"/>
            </button>
            <div class="modal-container">
                <div class="modal-image">
                    <img src="" alt="Movie Poster"/>
                </div>
                <div class="modal-description">
                    <h2>Loading...</h2>
                    <p class="category"></p>
                    <p class="rate">
                        <img src="./images/star_filled.png" class="star" alt="Star"/>
                        <span></span>
                    </p>
                    <hr />
                    <p class="detail"></p>
                </div>
            </div>
        </div>
    `;
    return dialog;
  }

  #attachEvents(): void {
    const closeButton = this.#dialogElement.querySelector("#closeModal");
    if (closeButton && isHTMLElement(closeButton)) {
      closeButton.addEventListener("click", () => this.#close());
    }

    this.#dialogElement.addEventListener("click", (event) => {
      if (event.target === this.#dialogElement) {
        this.#close();
      }
    });

    this.#dialogElement.addEventListener("cancel", () => this.#close());
  }

  async #fetchAndDisplayDetail(): Promise<void> {
    try {
      const detail = await this.#api.movieDetail(this.movieId);
      this.#renderDetail(detail);
    } catch (error) {
      console.error("영화 상세 정보를 불러오는 중 오류 발생:", error);
      this.#renderError();
    }
  }

  #renderDetail(detail: MovieDetail): void {
    const modalImage = this.#dialogElement.querySelector(
      ".modal-image img"
    ) as HTMLImageElement;
    const titleElem = this.#dialogElement.querySelector(
      ".modal-description h2"
    );
    const categoryElem = this.#dialogElement.querySelector(
      ".modal-description .category"
    );
    const rateElem = this.#dialogElement.querySelector(
      ".modal-description .rate span"
    );
    const detailElem = this.#dialogElement.querySelector(
      ".modal-description .detail"
    );

    if (modalImage) {
      modalImage.src = detail.poster_path
        ? "https://image.tmdb.org/t/p/original" + detail.poster_path
        : "./images/null_image.png";
      modalImage.alt = detail.title;
    }
    if (titleElem) {
      titleElem.textContent = detail.title;
    }
    if (categoryElem) {
      categoryElem.textContent =
        detail.genres.map((genre) => genre.name).join(", ") || "";
    }
    if (rateElem) {
      rateElem.textContent = detail.vote_average.toString();
    }
    if (detailElem) {
      detailElem.textContent = detail.overview;
    }
  }

  #renderError(): void {
    const modalDescription =
      this.#dialogElement.querySelector(".modal-description");
    if (modalDescription) {
      modalDescription.innerHTML = `<p>상세 정보를 불러오는 데 실패했습니다.</p>`;
    }
  }

  #close(): void {
    this.#dialogElement.close();
    if (this.#dialogElement.parentNode) {
      this.#dialogElement.parentNode.removeChild(this.#dialogElement);
    }
  }
}

export default MovieDetailModal;
