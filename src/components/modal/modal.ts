import starFilledSrc from "../../images/star_filled.png";
import starEmptySrc from "../../images/star_empty.png";
import closeButtonSrc from "../../images/modal_button_close.png";
import { IMAGE_BASE_URL } from "../../utils/constants";

export interface ModalMovieData {
  id: number;
  title: string;
  posterPath: string;
  releaseYear: string;
  genres: string[];
  rating: number;
  overview: string;
}

const RATING_LABELS: Record<number, string> = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export class Modal {
  private background: HTMLElement;

  constructor() {
    this.background = this.createBackground();
    document.body.appendChild(this.background);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  private createBackground(): HTMLElement {
    const background = document.createElement("div");
    background.className = "modal-background";

    const modal = document.createElement("div");
    modal.className = "modal";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.setAttribute("aria-label", "모달 닫기");
    const closeImg = document.createElement("img");
    closeImg.src = closeButtonSrc;
    closeImg.alt = "닫기";
    closeBtn.appendChild(closeImg);
    closeBtn.addEventListener("click", () => this.close());

    const container = document.createElement("div");
    container.className = "modal-container";

    const imageDiv = document.createElement("div");
    imageDiv.className = "modal-image";
    const posterImg = document.createElement("img");
    posterImg.id = "modal-poster";
    imageDiv.appendChild(posterImg);

    const descDiv = document.createElement("div");
    descDiv.className = "modal-description";
    descDiv.id = "modal-desc";

    container.append(imageDiv, descDiv);
    modal.append(closeBtn, container);
    background.appendChild(modal);

    background.addEventListener("click", (e) => {
      if (e.target === background) this.close();
    });

    return background;
  }

  open(data: ModalMovieData): void {
    this.updateContent(data);
    this.background.classList.add("active");
    document.body.classList.add("modal-open");
  }

  close(): void {
    this.background.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  private updateContent(data: ModalMovieData): void {
    const poster =
      this.background.querySelector<HTMLImageElement>("#modal-poster")!;
    poster.src = `${IMAGE_BASE_URL}/w500${data.posterPath}`;
    poster.alt = data.title;

    const desc =
      this.background.querySelector<HTMLElement>("#modal-desc")!;
    desc.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = data.title;

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = `${data.releaseYear} · ${data.genres.join(", ")}`;

    const rateP = document.createElement("p");
    rateP.className = "rate";
    const starImg = document.createElement("img");
    starImg.src = starFilledSrc;
    starImg.className = "star";
    const rateSpan = document.createElement("span");
    rateSpan.textContent = data.rating.toFixed(1);
    rateP.append(starImg, rateSpan);

    const hr = document.createElement("hr");

    const myRating = this.createUserRatingSection(data.id);

    const detailP = document.createElement("p");
    detailP.className = "detail";
    detailP.textContent = data.overview || "줄거리 정보가 없습니다.";

    desc.append(title, category, rateP, hr, myRating, detailP);
  }

  private createUserRatingSection(movieId: number): HTMLElement {
    const savedRating = this.getSavedRating(movieId);

    const section = document.createElement("div");
    section.className = "my-rating";

    const label = document.createElement("span");
    label.className = "my-rating-label";
    label.textContent = "내 평점";

    const starsWrapper = document.createElement("div");
    starsWrapper.className = "rating-stars";

    const ratingText = document.createElement("span");
    ratingText.className = "rating-text";
    ratingText.textContent = savedRating ? RATING_LABELS[savedRating] : "";

    const stars: HTMLImageElement[] = [];

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("img");
      star.className = "star rating-star";
      star.alt = `${i * 2}점`;
      star.src =
        savedRating && i * 2 <= savedRating ? starFilledSrc : starEmptySrc;

      star.addEventListener("mouseenter", () => {
        this.highlightStars(stars, i);
        ratingText.textContent = RATING_LABELS[i * 2];
      });

      star.addEventListener("mouseleave", () => {
        const current = this.getSavedRating(movieId);
        this.highlightStars(stars, current ? current / 2 : 0);
        ratingText.textContent = current ? RATING_LABELS[current] : "";
      });

      star.addEventListener("click", () => {
        const value = i * 2;
        this.saveRating(movieId, value);
        this.highlightStars(stars, i);
        ratingText.textContent = RATING_LABELS[value];
      });

      stars.push(star);
      starsWrapper.appendChild(star);
    }

    starsWrapper.appendChild(ratingText);
    section.append(label, starsWrapper);
    return section;
  }

  private highlightStars(stars: HTMLImageElement[], count: number): void {
    stars.forEach((star, idx) => {
      star.src = idx < count ? starFilledSrc : starEmptySrc;
    });
  }

  private getSavedRating(movieId: number): number | null {
    const saved = localStorage.getItem(`rating-${movieId}`);
    return saved ? Number(saved) : null;
  }

  private saveRating(movieId: number, rating: number): void {
    localStorage.setItem(`rating-${movieId}`, String(rating));
  }
}
