class Modal {
  #$modal: HTMLDivElement | null;
  #$modalContainer: HTMLDivElement | null;
  #$modalDrop: HTMLDivElement | null;

  constructor() {
    this.#$modal = document.querySelector('.modal');
    this.#$modalDrop = document.querySelector('.modal-backdrop');
    this.#$modalContainer = document.querySelector('.modal-container');

    this.#$modalDrop?.addEventListener('click', () => this.close());
  }

  getModalContainer() {
    return this.#$modalContainer;
  }

  clearModalContainer() {
    if (!this.#$modalContainer) return;

    this.#$modalContainer.innerHTML = '';
  }

  open() {
    this.#$modal?.classList.add('modal--open');
  }

  close(isBack = false) {
    this.#$modal?.classList.remove('modal--open');
    if (isBack) {
      history.back();
      return;
    }
    history.pushState('', '', '/');
  }
}

const modal = new Modal();

export default modal;
