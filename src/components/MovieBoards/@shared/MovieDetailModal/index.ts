import { createApi } from "../../../../api/ApiFactory";
import { MovieDetail } from "../../../../types/movie";
import { isHTMLElement } from "../../../../utils/typeGuards";
import Spinner from "../../../@shared/Spinner";
import ErrorScreen from "../ErrorScreen";
import MovieDetailModalContent from "./Content";

class MovieDetailModal {
  #dialogElement: HTMLDialogElement;
  #api = createApi(() =>
    new ErrorScreen("상세 정보를 불러오는 중 오류가 발생했습니다.").render()
  );

  constructor(private movieId: number) {
    this.#dialogElement = this.#dialogTemplate();
    document.body.appendChild(this.#dialogElement);
    document.body.classList.add("modal-open");
    this.#attachEventListeners();
    this.#fetchAndDisplayDetail();
    this.#dialogElement.showModal();
  }

  #dialogTemplate(): HTMLDialogElement {
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

  #attachEventListeners(): void {
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

    // keydown 이벤트 추가 (cypress에서 테스트하기 위해)
    this.#dialogElement.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.#close();
      }
    });
  }

  async #fetchAndDisplayDetail(): Promise<void> {
    try {
      const detail: MovieDetail = await this.#api.movieDetail(this.movieId);
      this.#updateModalContent(detail);
    } catch (error) {
      console.error("영화 상세 정보를 불러오는 중 오류 발생:", error);
      this.#renderError();
    }
  }

  #updateModalContent(detail: MovieDetail): void {
    const container = this.#dialogElement.querySelector(".modal-container");
    if (!isHTMLElement(container)) return;

    new MovieDetailModalContent(container, detail);
  }

  #renderError(): void {
    const container = this.#dialogElement.querySelector(".modal-container");
    if (isHTMLElement(container)) {
      container.innerHTML = `<div class="modal-error"><p>상세 정보를 불러오는 데 실패했습니다.</p></div>`;
    }
  }

  #close(): void {
    this.#dialogElement.close();
    this.#dialogElement.remove();
    document.body.classList.remove("modal-open");
  }
}

export default MovieDetailModal;
