class Modal {
  #modal = document.createElement('div');

  #modalBackdrop = document.createElement('div');

  #modalContainer = document.createElement('div');

  constructor() {
    this.#modal.classList.add('modal');
    this.#modalBackdrop.classList.add('modal-backdrop');
    this.#modalContainer.classList.add('modal-container');

    this.#modal.appendChild(this.#modalBackdrop);
    this.#modal.appendChild(this.#modalContainer);

    this.#modalBackdrop.addEventListener('click', this.close.bind(this));
  }

  get element() {
    return this.#modal;
  }

  open() {
    this.#modal.classList.add('visible');
  }

  close() {
    if (this.#modal) {
      this.#modal.classList.remove('visible');
      if (this.#modal.parentNode) {
        this.#modal.parentNode.removeChild(this.#modal);
      }
    }
  }

  setContent(content: HTMLElement) {
    this.#modalContainer.appendChild(content);
  }
}

export default Modal;
