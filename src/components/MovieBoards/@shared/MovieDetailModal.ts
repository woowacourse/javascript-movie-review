import { createApi } from "../../../api/ApiFactory";
import { MovieDetail } from "../../../types/movie";
import Date from "../../../utils/Date";
import { isHTMLElement } from "../../../utils/typeGuards";
import Spinner from "../../@shared/Spinner";
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
                <div class="modal-spinner">
                ${Spinner(1)}
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
    const modalContainer =
      this.#dialogElement.querySelector(".modal-container");
    if (!isHTMLElement(modalContainer)) return;

    modalContainer.innerHTML = /*html*/ `
        <div class="modal-image">
            <img src="${
              detail.poster_path
                ? "https://image.tmdb.org/t/p/original" + detail.poster_path
                : "./images/null_image.png"
            }" alt="${detail.title}"/>
        </div>
        <div class="modal-description">
            <h2>${detail.title}</h2>
            <div class="modal-description--yearCategory">
                <span>${new Date(detail.release_date).year}</span>
                <span>•</span>
                <p class="category">${
                  detail.genres.map((genre) => genre.name).join(", ") || ""
                }</p>
            </div>
            <p class="rate">
                <span>평균</span>
                <img src="./images/star_filled.png" class="star" alt="Star"/>
                <span>${detail.vote_average.toString()}</span>
            </p>
            <div class="divider"></div>
            <div class="modal-section myRate">
                <h3>별점</h3>
                
            </div>
            <div class="divider"></div>
            <div class="modal-section detail">
                <h3>줄거리</h3>
                <p>${detail.overview}</p>
            </div>
        </div>
    `;
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
