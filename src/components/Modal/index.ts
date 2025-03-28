import Store from "../../store/store";
import { Rating, attachRatingEvents } from "./Rating";
import { renderTemplate } from "../../utils/templateUtils";

class Modal {
  private store: Store;
  private contentGenerator: (id: string, store: Store) => Promise<string>;
  private $modalBackground: HTMLElement;
  private $closeButton: HTMLElement;
  private $modalContainer: HTMLElement;
  private currentMovieId: string | null = null;

  constructor(
    store: Store,
    contentGenerator: (id: string, store: Store) => Promise<string>
  ) {
    this.store = store;
    this.contentGenerator = contentGenerator;
    this.$modalBackground = document.querySelector(
      "#modal-background"
    ) as HTMLElement;
    this.$closeButton = document.querySelector("#close-modal") as HTMLElement;
    this.$modalContainer = this.$modalBackground.querySelector(
      "#modal-container"
    ) as HTMLElement;
    this.bindEvents();
    this.store.subscribe(() => {
      if (this.isOpen() && this.currentMovieId !== null) {
        this.updateRating();
      }
    });
  }

  private bindEvents(): void {
    this.$closeButton.addEventListener("click", this.close.bind(this));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
    this.$modalBackground.addEventListener("click", (e: Event) => {
      if (e.target === this.$modalBackground) this.close();
    });
  }

  public open(movieId: string): void {
    this.currentMovieId = movieId;
    this.contentGenerator(movieId, this.store).then((contentHTML) => {
      renderTemplate(this.$modalContainer, contentHTML);
      this.$modalBackground.classList.add("active");
      this.attachThumbnailLoadEvent(this.$modalContainer);
    });
  }

  private updateRating(): void {
    if (this.currentMovieId) {
      const $ratingContainer = this.$modalContainer.querySelector(
        "#modal-rating"
      ) as HTMLElement;
      if ($ratingContainer) {
        const scores = this.store.getState().starRatings || [];
        const currentScore =
          scores.find((rating) => rating.id === this.currentMovieId)?.score ||
          0;
        renderTemplate($ratingContainer, Rating(currentScore));
        attachRatingEvents(this.currentMovieId, this.store);
      }
    }
  }

  public isOpen(): boolean {
    return this.$modalBackground.classList.contains("active");
  }

  public close(): void {
    this.$modalBackground.classList.remove("active");
    this.currentMovieId = null;
  }

  private attachThumbnailLoadEvent($container: HTMLElement): void {
    const $thumbnail = $container.querySelector(
      "img.detail-thumbnail"
    ) as HTMLImageElement;
    if (!$thumbnail) return;
    if (!$thumbnail.getAttribute("data-load-listener-attached")) {
      $thumbnail.addEventListener("load", function (this: HTMLImageElement) {
        this.style.display = "block";
        const $prev = this.previousElementSibling as HTMLElement;
        if ($prev && $prev.classList.contains("skeleton-detail-thumbnail")) {
          $prev.style.display = "none";
        }
      });
      $thumbnail.setAttribute("data-load-listener-attached", "true");
    }
  }
}

export default Modal;
