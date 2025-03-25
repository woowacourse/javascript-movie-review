import createElement from "../utils/createElement";

class Modal {
  modalElement: HTMLDialogElement;
  openButtons: NodeListOf<HTMLButtonElement>;
  closeButton: HTMLButtonElement;

  constructor() {
    this.modalElement = document.getElementById(
      "modal-container"
    ) as HTMLDialogElement;
    this.openButtons = document.querySelectorAll(
      ".open_modal"
    ) as NodeListOf<HTMLButtonElement>;
    this.closeButton = document.getElementById(
      "closeModal"
    ) as HTMLButtonElement;

    this.addEventListeners();
  }

  open() {
    this.modalElement.showModal();
  }

  close() {
    this.modalElement.close();
  }

  addEventListeners() {
    this.openButtons.forEach((button) => {
      button.addEventListener("click", () => this.open());
    });
    this.closeButton.addEventListener("click", () => this.close());

    this.modalElement.addEventListener("click", (e: MouseEvent) => {
      if (e.target === this.modalElement) {
        this.close();
      }
    });
  }

  render() {
    const $modalBackgroundActive = createElement({
      tag: "div",
      classNames: ["modal-background", "active"],
      id: "modalBackground",
    });

    const $modal = createElement({
      tag: "div",
      classNames: ["modal"],
    });

    const $closeModal = createElement({
      tag: "button",
      classNames: ["close-modal"],
      id: "closeModal",
    });

    const $modalCloseButttonImg = createElement({
      tag: "img",
      src: "./images/modal_button_close.png",
    });

    const $modalContainer = createElement({
      tag: "div",
      classNames: ["modal-container"],
    });

    const $modalImage = createElement({
      tag: "div",
      classNames: ["modal-image"],
    });

    const $ModalImg = createElement({
      tag: "img",
      src: "https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg",
    });

    const $modalDescription = createElement({
      tag: "div",
      classNames: ["modal-description"],
    });

    const $h2 = createElement({
      tag: "h2",
    });

    const $category = createElement({
      tag: "p",
      classNames: ["category"],
    });

    const $rate = createElement({
      tag: "p",
      classNames: ["rate"],
    });

    const $star = createElement({
      tag: "img",
      src: "./images/star_filled.png",
      classNames: ["star"],
    });

    const $span = createElement({
      tag: "span",
    });

    const $hr = createElement({
      tag: "hr",
    });

    const $detail = createElement({
      tag: "p",
      classNames: ["detail"],
    });

    $modalBackgroundActive.appendChild($modal);
    $modal.appendChild($closeModal);
    $closeModal.appendChild($modalCloseButttonImg);
    $modal.appendChild($modalContainer);
    $modalContainer.appendChild($modalImage);
    $modalImage.appendChild($ModalImg);
    $modalContainer.appendChild($modalDescription);
    $modalDescription.appendChild($h2);
    $modalDescription.appendChild($category);
    $modalDescription.appendChild($rate);
    $rate.appendChild($star);
    $rate.appendChild($span);
    $modalDescription.appendChild($hr);
    $modalDescription.appendChild($detail);

    return $modalBackgroundActive;
  }
}

export default Modal;
