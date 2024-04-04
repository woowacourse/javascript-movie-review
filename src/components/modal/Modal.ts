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
    const body = document.body;

    this.#modal.classList.add('visible');
    body.classList.add('modal-open');
  }

  close() {
    if (this.#modal) {
      this.#modal.classList.remove('visible');
      if (this.#modal.parentNode) {
        this.#modal.parentNode.removeChild(this.#modal);
      }
      const body = document.body;
      body.classList.remove('modal-open');
    }
  }

  setContent(content: HTMLElement) {
    this.#modalContainer.appendChild(content);
  }
}

export default Modal;
