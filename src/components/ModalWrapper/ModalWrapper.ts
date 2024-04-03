class ModalWrapper {
  #modal = document.createElement('div');
  #modalBackdrop = document.createElement('div');
  #modalContent = document.createElement('div');

  constructor() {
    this.#modal.classList.add('modal');
    this.#modalBackdrop.classList.add('modal-backdrop');
    this.#modalContent.classList.add('modal-content');

    this.#modal.appendChild(this.#modalBackdrop);
    this.#modal.appendChild(this.#modalContent);

    this.#modalBackdrop.addEventListener('click', this.toggle.bind(this));
    document.addEventListener('keydown', (event) => {
      if (this.#modal.classList.contains('modal--open') && event.key === 'Escape') {
        this.toggle();
      }
    });
  }

  get element() {
    return this.#modal;
  }

  replaceContent(child: HTMLElement) {
    this.#modalContent.replaceChildren(child);
  }

  toggle() {
    if (this.#modal.classList.contains('modal--open')) {
      this.#modalContent.innerHTML = '';
    }

    this.#modal.classList.toggle('modal--open');
  }
}

export default ModalWrapper;
