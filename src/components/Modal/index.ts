import Store from "../../store/store";

class Modal {
  private store: Store;
  private contentGenerator: (id: string, store: Store) => Promise<string>;
  private modalBackground: HTMLElement;
  private closeButton: HTMLElement;
  private modalContainer: HTMLElement;
  private currentMovieId: string | null = null;

  constructor(
    store: Store,
    contentGenerator: (id: string, store: Store) => Promise<string>
  ) {
    this.store = store;
    this.contentGenerator = contentGenerator;
    this.modalBackground = document.querySelector(
      "#modal-background"
    ) as HTMLElement;
    this.closeButton = document.querySelector("#close-modal") as HTMLElement;
    this.modalContainer = this.modalBackground.querySelector(
      ".modal-container"
    ) as HTMLElement;
    this.bindEvents();
    this.store.subscribe(() => {
      if (this.isOpen() && this.currentMovieId !== null) {
        this.updateRating();
      }
    });
  }

  private bindEvents(): void {
    this.closeButton.addEventListener("click", this.close.bind(this));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this.modalBackground.addEventListener("click", (e) => {
      if (e.target === this.modalBackground) {
        this.close();
      }
    });
  }

  public open(movieId: string): void {
    this.currentMovieId = movieId;
    this.contentGenerator(movieId, this.store).then((contentHTML) => {
      this.modalContainer.innerHTML = contentHTML;
      this.modalBackground.classList.add("active");
      this.attachThumbnailLoadEvent(this.modalContainer);
    });
  }

  private updateRating(): void {
    if (this.currentMovieId !== null) {
      // 모달 내 별점 부분은 <div id="modal-rating">로 분리되어 있음
      this.contentGenerator(this.currentMovieId, this.store).then(
        (contentHTML) => {
          // 새로운 별점 부분만 업데이트합니다.
          const parser = new DOMParser();
          const doc = parser.parseFromString(contentHTML, "text/html");
          const newRating = doc.querySelector("#modal-rating");
          const currentRating =
            this.modalContainer.querySelector("#modal-rating");
          if (newRating && currentRating) {
            currentRating.innerHTML = newRating.innerHTML;
          }
        }
      );
    }
  }

  private isOpen(): boolean {
    return this.modalBackground.classList.contains("active");
  }

  private close(): void {
    this.modalBackground.classList.remove("active");
    this.currentMovieId = null;
  }

  private attachThumbnailLoadEvent(
    container: Document | HTMLElement = document
  ): void {
    const thumbnail = container.querySelector(
      "img.detail-thumbnail"
    ) as HTMLImageElement | null;
    if (!thumbnail) return;
    if (!thumbnail.getAttribute("data-load-listener-attached")) {
      thumbnail.addEventListener("load", function (this: HTMLImageElement) {
        this.style.display = "block";
        if (
          this.previousElementSibling &&
          this.previousElementSibling.classList.contains(
            "skeleton-detail-thumbnail"
          )
        ) {
          (this.previousElementSibling as HTMLElement).style.display = "none";
        }
      });
      thumbnail.setAttribute("data-load-listener-attached", "true");
    }
  }
}

export default Modal;
