import starFilledSrc from "../../images/star_filled.png";
import closeButtonSrc from "../../images/modal_button_close.png";
import { IMAGE_BASE_URL } from "../../utils/constants.ts";

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

    const hr = document.createElement("hr");

    // 줄거리
    const overviewTitle = document.createElement("strong");
    overviewTitle.textContent = "줄거리";

    const detailP = document.createElement("p");
    detailP.className = "detail";
    detailP.textContent = data.overview || "줄거리 정보가 없습니다.";

    desc.append(title, category, rateP, hr, overviewTitle, detailP);
  }
}
