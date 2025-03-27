// Modal.js
import { ratingTemplate } from "./modalContentTemplate.js";
import { attachRatingEvents } from "./Rating.js";

class Modal {
  #store;
  #contentGenerator;
  #$modalBackground;
  #$closeButton;
  #$modalContainer;
  #currentMovieId;

  constructor(store, contentGenerator) {
    this.#store = store;
    this.#contentGenerator = contentGenerator; // modalContentTemplate 함수
    this.#$modalBackground = document.querySelector("#modal-background");
    this.#$closeButton = document.querySelector("#close-modal");
    this.#$modalContainer =
      this.#$modalBackground.querySelector(".modal-container");
    this.#currentMovieId = null;
    this.#bindEvents();
    // 구독: 모달이 열려 있고 movieId가 설정되어 있다면 별점 부분만 업데이트
    this.#store.subscribe((state) => {
      if (this.#isOpen() && this.#currentMovieId) {
        this.#updateRating();
      }
    });
  }

  #bindEvents() {
    if (this.#$closeButton) {
      this.#$closeButton.addEventListener("click", this.close.bind(this));
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this.#$modalBackground.addEventListener("click", (e) => {
      if (e.target === this.#$modalBackground) {
        this.close();
      }
    });
  }

  async open(movieId) {
    this.#currentMovieId = movieId;
    const contentHTML = await this.#contentGenerator(movieId, this.#store);
    this.#$modalContainer.innerHTML = contentHTML;
    this.#$modalBackground.classList.add("active");
    this.#attachThumbnailLoadEvent(this.#$modalContainer);
  }

  #updateRating() {
    if (this.#currentMovieId) {
      // ratingTemplate: 별점 부분 HTML을 새로 생성 (별도 컨테이너 id="modal-rating"가 있어야 함)
      const newRatingHTML = ratingTemplate(this.#currentMovieId, this.#store);
      const ratingContainer =
        this.#$modalContainer.querySelector("#modal-rating");
      if (ratingContainer) {
        ratingContainer.innerHTML = newRatingHTML;
        // reattach 별점 관련 이벤트
        setTimeout(() => {
          attachRatingEvents(this.#currentMovieId, this.#store);
        }, 0);
      }
    }
  }

  #isOpen() {
    return this.#$modalBackground.classList.contains("active");
  }

  close() {
    this.#$modalBackground.classList.remove("active");
    this.#currentMovieId = null;
  }

  #attachThumbnailLoadEvent(container = document) {
    const thumbnail = container.querySelector("img.detail-thumbnail");
    if (!thumbnail.getAttribute("data-load-listener-attached")) {
      thumbnail.addEventListener("load", function () {
        this.style.display = "block";
        if (
          this.previousElementSibling &&
          this.previousElementSibling.classList.contains(
            "skeleton-detail-thumbnail"
          )
        ) {
          this.previousElementSibling.style.display = "none";
        }
      });
      thumbnail.setAttribute("data-load-listener-attached", "true");
    }
  }
}

export default Modal;
