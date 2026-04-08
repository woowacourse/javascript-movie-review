import closeIconSrc from "../../templates/images/modal_button_close.png";
import starFilledSrc from "../../templates/images/star_filled.png";

interface ModalContent {
  title: string;
  genres: string;
  year: string;
  rating: number;
  overview: string;
  posterSrc: string;
}

interface ModalInstance {
  element: HTMLElement;
  open: (content: ModalContent) => void;
  close: () => void;
}

export function createModal(): ModalInstance {
  const background = createModalBackground();
  const closeBtn = createCloseButton();
  const posterImg = createPosterImage();
  const {
    element: modalDesc,
    titleEl,
    categoryEl,
    rateSpan,
    detailEl,
  } = createModalDescription();
  const container = createModalContainer(posterImg, modalDesc);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.append(closeBtn, container);
  background.appendChild(modal);

  const open = (content: ModalContent) => {
    titleEl.textContent = content.title;
    categoryEl.textContent = `${content.year} · ${content.genres}`;
    rateSpan.textContent = String(content.rating);
    detailEl.textContent = content.overview;
    posterImg.src = content.posterSrc;
    posterImg.alt = content.title;
    background.setAttribute("aria-hidden", "false");
    background.classList.add("active");
  };

  const close = () => {
    background.setAttribute("aria-hidden", "true");
    background.classList.remove("active");
  };

  closeBtn.addEventListener("click", close);
  background.addEventListener("click", (e) => {
    if (e.target === background) close();
  });

  return { element: background, open, close };
}

function createCloseButton(): HTMLButtonElement {
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-modal";
  const closeImg = document.createElement("img");
  closeImg.src = closeIconSrc;
  closeBtn.appendChild(closeImg);
  return closeBtn;
}

function createPosterImage(): HTMLImageElement {
  return document.createElement("img");
}

function createRateElement(): {
  element: HTMLParagraphElement;
  span: HTMLSpanElement;
} {
  const rateEl = document.createElement("p");
  rateEl.className = "rate";
  const starImg = document.createElement("img");
  starImg.src = starFilledSrc;
  starImg.className = "star";
  const span = document.createElement("span");
  rateEl.append(starImg, span);
  return { element: rateEl, span };
}

function createModalDescription(): {
  element: HTMLDivElement;
  titleEl: HTMLHeadingElement;
  categoryEl: HTMLParagraphElement;
  rateSpan: HTMLSpanElement;
  detailEl: HTMLParagraphElement;
} {
  const modalDesc = document.createElement("div");
  modalDesc.className = "modal-description";

  const titleEl = document.createElement("h2");
  const categoryEl = document.createElement("p");
  categoryEl.className = "category";
  const { element: rateEl, span: rateSpan } = createRateElement();
  const hr = document.createElement("hr");
  const detailEl = document.createElement("p");
  detailEl.className = "detail";

  modalDesc.append(titleEl, categoryEl, rateEl, hr, detailEl);
  return { element: modalDesc, titleEl, categoryEl, rateSpan, detailEl };
}

function createModalContainer(
  posterImg: HTMLImageElement,
  descElement: HTMLDivElement,
): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "modal-container";

  const modalImage = document.createElement("div");
  modalImage.className = "modal-image";
  modalImage.appendChild(posterImg);

  container.append(modalImage, descElement);
  return container;
}

function createModalBackground(): HTMLDivElement {
  const background = document.createElement("div");
  background.className = "modal-background";
  background.setAttribute("aria-hidden", "true");
  return background;
}
