import starFilledSrc from "../../images/star_filled.png";
import starEmptySrc from "../../images/star_empty.png";
import closeButtonSrc from "../../images/modal_button_close.png";
import { IMAGE_BASE_URL, RATING_LABELS } from "../../utils/constants.ts";
import { RatingRepository } from "../../types/ratingRepository.ts";

export interface ModalMovieData {
  id: number;
  title: string;
  posterPath: string;
  releaseYear: string;
  genres: string[];
  rating: number;
  overview: string;
}

export class Modal {
  private background: HTMLElement;
  private ratingRepo: RatingRepository;

  constructor(ratingRepo: RatingRepository) {
    this.ratingRepo = ratingRepo;
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
    this.renderContent(data);
    this.background.classList.add("active");
    document.body.classList.add("modal-open");
  }

  close(): void {
    this.background.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  private renderContent(data: ModalMovieData): void {
    const poster =
      this.background.querySelector<HTMLImageElement>("#modal-poster")!;
    poster.src = `${IMAGE_BASE_URL}/w500${data.posterPath}`;
    poster.alt = data.title;

    const desc = this.background.querySelector<HTMLElement>("#modal-desc")!;
    desc.innerHTML = "";

    // 제목
    const title = document.createElement("h2");
    title.textContent = data.title;

    // 개봉연도 · 장르
    const category = document.createElement("p");
    category.className = "category";
    category.textContent = `${data.releaseYear} · ${data.genres.join(", ")}`;

    // 평균 평점
    const rateP = document.createElement("p");
    rateP.className = "rate";
    const rateLabel = document.createElement("span");
    rateLabel.textContent = "평점 ";
    const starImg = document.createElement("img");
    starImg.src = starFilledSrc;
    starImg.className = "star";
    const rateSpan = document.createElement("span");
    rateSpan.textContent = data.rating.toFixed(1);
    rateP.append(rateLabel, starImg, rateSpan);

    // 내 별점
    const myRatingSection = this.createMyRatingSection(data.id);

    const hr = document.createElement("hr");

    // 줄거리
    const overviewTitle = document.createElement("strong");
    overviewTitle.textContent = "줄거리";

    const detailP = document.createElement("p");
    detailP.className = "detail";
    detailP.textContent = data.overview || "줄거리 정보가 없습니다.";

    desc.append(
      title,
      category,
      rateP,
      myRatingSection,
      hr,
      overviewTitle,
      detailP,
    );
  }

  private createMyRatingSection(movieId: number): HTMLElement {
    const section = document.createElement("div");
    section.className = "my-rating";

    const label = document.createElement("span");
    label.className = "my-rating-label";
    label.textContent = "내 별점";

    const starsDiv = document.createElement("div");
    starsDiv.className = "my-rating-stars";

    const ratingText = document.createElement("span");
    ratingText.className = "my-rating-text";

    const savedRating = this.ratingRepo.getRating(movieId);
    this.renderStars(starsDiv, ratingText, movieId, savedRating ?? 0);

    section.append(label, starsDiv, ratingText);
    return section;
  }

  private renderStars(
    container: HTMLElement,
    ratingText: HTMLElement,
    movieId: number,
    currentRating: number,
  ): void {
    container.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const score = i * 2;
      const btn = document.createElement("button");
      btn.className = "star-btn";
      btn.setAttribute("aria-label", `${score}점`);

      const img = document.createElement("img");
      img.src = score <= currentRating ? starFilledSrc : starEmptySrc;
      img.alt = score <= currentRating ? "full-star" : "empty-star";
      btn.appendChild(img);

      btn.addEventListener("mouseenter", () => {
        this.highlightStars(container, i);
      });

      btn.addEventListener("mouseleave", () => {
        const saved = this.ratingRepo.getRating(movieId) ?? 0;
        this.renderStars(container, ratingText, movieId, saved);
      });

      btn.addEventListener("click", () => {
        this.ratingRepo.setRating(movieId, score);
        this.renderStars(container, ratingText, movieId, score);
        ratingText.textContent = `${RATING_LABELS[score]} (${score}/10)`;
      });

      container.appendChild(btn);
    }

    ratingText.textContent =
      currentRating > 0
        ? `${RATING_LABELS[currentRating]} (${currentRating}/10)`
        : "";
  }

  private highlightStars(container: HTMLElement, upToIndex: number): void {
    const buttons = container.querySelectorAll<HTMLButtonElement>(".star-btn");
    buttons.forEach((btn, idx) => {
      const img = btn.querySelector("img")!;
      img.src = idx < upToIndex ? starFilledSrc : starEmptySrc;
    });
  }
}
