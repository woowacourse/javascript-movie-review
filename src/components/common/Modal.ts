import createElement from "../utils/createElement";
import "/styles/modal.css";

class Modal {
  parentElement: HTMLElement;
  modalElement: HTMLDialogElement;
  openButtons: NodeListOf<HTMLButtonElement>;
  closeButton: HTMLButtonElement;
  movies: any;
  movie: any;

  constructor(parentElement: HTMLElement, movies: any) {
    this.parentElement = parentElement;
    this.movies = movies;
    this.render();
    this.modalElement = document.getElementById(
      "modalBackground"
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
    document.body.classList.add("modal-open");
  }

  close() {
    this.modalElement.close();
    document.body.classList.remove("modal-open");
  }

  addEventListeners() {
    this.openButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.open();
        const li = e.currentTarget as HTMLElement;
        const itemElement = li.querySelector(".item") as HTMLElement;
        const movieId = itemElement?.dataset.id;

        this.movie = this.movies.find(
          (movie: any) => movie.id === Number(movieId)
        );
        console.log(this.movie);
        this.updateModalContent();
      });
    });
    this.closeButton.addEventListener("click", () => this.close());

    this.modalElement.addEventListener("click", (e: MouseEvent) => {
      if (e.target === this.modalElement) {
        this.close();
      }
    });
  }
  updateModalContent() {
    const $title = document.getElementById("modalTitle");
    if ($title && this.movie?.title) {
      $title.textContent = this.movie.title;
    }
  }
  render() {
    const $dialog = createElement({
      tag: "dialog",
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
      id: "modalTitle",
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

    $dialog.appendChild($modal);
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

    this.parentElement.appendChild($dialog);
  }
}

export default Modal;
