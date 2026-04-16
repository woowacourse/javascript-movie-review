import closeIconSrc from "../../../templates/images/modal_button_close.png";
import starFilledSrc from "../../../templates/images/star_filled.png";
import { ModalState } from "./ModalViewModel";
import { StarRating } from "./StarRating";
import { createPoster } from "../poster";

interface ModalViewCallbacks {
  onClose: () => void;
  onStarHover: (score: number) => void;
  onStarLeave: () => void;
  onStarClick: (score: number) => void;
}

export class ModalView {
  element: HTMLDialogElement;

  private posterImg: HTMLImageElement | HTMLDivElement;
  private titleEl: HTMLHeadingElement;
  private categoryEl: HTMLParagraphElement;
  private avgRatingEl: HTMLSpanElement;
  private overviewEl: HTMLParagraphElement;
  private starRating: StarRating;

  constructor(callbacks: ModalViewCallbacks) {
    this.posterImg = createPoster(null, "");
    this.titleEl = document.createElement("h2");
    this.categoryEl = document.createElement("p");
    this.categoryEl.className = "category";
    this.avgRatingEl = document.createElement("span");
    this.avgRatingEl.className = "rate-value";
    this.overviewEl = document.createElement("p");
    this.overviewEl.className = "overview";

    this.starRating = new StarRating({
      onHover: callbacks.onStarHover,
      onLeave: callbacks.onStarLeave,
      onClick: callbacks.onStarClick,
    });

    this.element = this.buildDialog(callbacks.onClose);
  }

  renderRating(rating: number | null): void {
    this.starRating.render(rating);
  }

  render(state: ModalState): void {
    if (state.isPending) {
      this.showSkeleton();
      return;
    }
    if (state.error) {
      this.showError();
      return;
    }
    if (state.detail) {
      this.showDetail(state.detail);
    }
    this.starRating.render(state.myRating);
  }

  private showSkeleton(): void {
    this.titleEl.textContent = "\u00A0";
    this.categoryEl.textContent = "\u00A0";
    this.avgRatingEl.textContent = "\u00A0";
    this.overviewEl.textContent = "\u00A0";
    this.setSkeletonMode(true);
  }

  private showError(): void {
    this.setSkeletonMode(false);
    this.titleEl.textContent = "오류가 발생했습니다";
    this.categoryEl.textContent = "";
    this.avgRatingEl.textContent = "-";
    this.overviewEl.textContent = "영화 정보를 불러오지 못했습니다.";
  }

  private showDetail({
    title,
    releaseYear,
    genres,
    rating,
    overview,
    posterSrc,
  }: NonNullable<ModalState["detail"]>): void {
    this.setSkeletonMode(false);
    this.titleEl.textContent = title;
    this.categoryEl.textContent = `${releaseYear} · ${genres}`;
    this.avgRatingEl.textContent = String(rating);
    this.overviewEl.textContent = overview;

    const newPoster = createPoster(posterSrc, title);
    this.posterImg.replaceWith(newPoster);
    this.posterImg = newPoster;
  }

  private setSkeletonMode(active: boolean): void {
    [this.titleEl, this.categoryEl, this.avgRatingEl, this.overviewEl].forEach(
      (el) => el.classList.toggle("skeleton-box", active),
    );
    this.posterImg.classList.toggle("skeleton-box", active);
    this.posterImg.style.opacity = active ? "0" : "";
  }

  private buildDialog(onClose: () => void): HTMLDialogElement {
    const modalDesc = this.buildModalDesc();

    const dialog = document.createElement("dialog");
    dialog.className = "modal";
    dialog.append(
      this.buildCloseButton(onClose),
      this.buildContainer(modalDesc),
    );
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) onClose();
    });

    return dialog;
  }

  private buildModalDesc(): HTMLDivElement {
    const rateEl = this.buildRateElement();
    const overviewSection = this.buildOverviewSection();

    const modalDesc = document.createElement("div");
    modalDesc.className = "modal-description";
    modalDesc.append(
      this.titleEl,
      this.categoryEl,
      rateEl,
      this.starRating.element,
      overviewSection,
    );
    return modalDesc;
  }

  private buildRateElement(): HTMLParagraphElement {
    const rateEl = document.createElement("p");
    rateEl.className = "rate";

    const label = document.createElement("span");
    label.className = "rate-label";
    label.textContent = "평균";

    const starImg = document.createElement("img");
    starImg.src = starFilledSrc;
    starImg.className = "rate-star";

    rateEl.append(label, starImg, this.avgRatingEl);
    return rateEl;
  }

  private buildOverviewSection(): HTMLDivElement {
    const overviewLabel = document.createElement("h3");
    overviewLabel.className = "overview-label";
    overviewLabel.textContent = "줄거리";

    const wrapper = document.createElement("div");
    wrapper.className = "overview-section";
    wrapper.append(overviewLabel, this.overviewEl);
    return wrapper;
  }

  private buildCloseButton(onClick: () => void): HTMLButtonElement {
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    const closeImg = document.createElement("img");
    closeImg.src = closeIconSrc;
    closeBtn.appendChild(closeImg);
    closeBtn.addEventListener("click", onClick);
    return closeBtn;
  }

  private buildContainer(descElement: HTMLDivElement): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "modal-container";

    const modalImage = document.createElement("div");
    modalImage.className = "modal-image";
    modalImage.append(this.posterImg);

    container.append(modalImage, descElement);
    return container;
  }
}
