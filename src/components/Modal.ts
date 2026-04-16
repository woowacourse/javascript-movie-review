import fallbackImg from "../assets/movie_fallback_image.svg";
import { requireElement, loadImageWithFallback } from "../utils/dom";

class Modal {
  #modal: HTMLDivElement;
  #closeBtn: HTMLButtonElement;
  #description: {
    title: HTMLHeadingElement;
    category: HTMLParagraphElement;
    rate: HTMLSpanElement;
    detail: HTMLParagraphElement;
    image: HTMLImageElement;
  };
  #escHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") this.close();
  };

  constructor() {
    this.#modal = requireElement<HTMLDivElement>(".modal-background");
    this.#closeBtn = requireElement<HTMLButtonElement>(".close-modal");
    this.#description = {
      title: requireElement<HTMLHeadingElement>(".modal-description h2"),
      category: requireElement<HTMLParagraphElement>(
        ".modal-description .category",
      ),
      rate: requireElement<HTMLSpanElement>(".modal-description .rate span"),
      detail: requireElement<HTMLParagraphElement>(
        ".modal-description .detail",
      ),
      image: requireElement<HTMLImageElement>(".modal-image img"),
    };
  }

  bindEvent() {
    this.#closeBtn.addEventListener("click", () => this.close());

    this.#modal.addEventListener("click", (e) => {
      if (e.target === this.#modal) {
        this.close();
      }
    });
  }

  fill(movie: {
    title: string;
    overview: string;
    voteAverage: number;
    posterPath: string;
    categoryText: string;
  }) {
    const { title, category, rate, detail, image } = this.#description;

    title.textContent = movie.title;
    category.textContent = movie.categoryText;
    rate.textContent = movie.voteAverage.toString();
    detail.textContent = movie.overview;
    image.alt = movie.title;

    loadImageWithFallback(image, movie.posterPath, fallbackImg);
  }

  openEmpty() {
    const { title, category, rate, detail, image } = this.#description;

    title.textContent = "";
    category.textContent = "";
    rate.textContent = "";
    detail.textContent = "";
    image.style.opacity = "0";
    this.#modal.classList.add("active");
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", this.#escHandler);
  }

  close() {
    this.#modal.classList.remove("active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.#escHandler);
  }
}

export default Modal;
