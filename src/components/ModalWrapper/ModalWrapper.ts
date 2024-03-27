class ModalWrapper {
  #modal = document.createElement('div');
  #modalBackdrop = document.createElement('div');
  #modalContent = document.createElement('div');
  #closeButton = document.createElement('button');

  constructor() {
    this.#modal.classList.add('modal', 'modal--open');
    this.#modalBackdrop.classList.add('modal-backdrop');
    this.#modalContent.classList.add('modal-content');

    this.#modal.appendChild(this.#modalBackdrop);
    this.#modal.appendChild(this.#modalContent);

    this.#modalBackdrop.addEventListener('click', this.toggle.bind(this));
  }

  get element() {
    return this.#modal;
  }

  replaceContent(child: HTMLElement) {
    this.#modalContent.replaceChildren(child);
  }

  toggle() {
    this.#modal.classList.toggle('modal--open');
  }
}

export default ModalWrapper;
