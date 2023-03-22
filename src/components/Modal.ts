class Modal {
  #$modal: HTMLDivElement | null;
  #$modalContainer: HTMLDivElement | null;

  constructor() {
    this.#$modal = document.querySelector('.modal');
    this.#$modalContainer = document.querySelector('.modal-container');

    const $closeButton = document.createElement('button');
    $closeButton.className = 'modal-close-button';

    $closeButton.addEventListener('click', () => {
      modal.close();
    });
    this.#$modalContainer?.appendChild($closeButton);
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

  close() {
    this.#$modal?.classList.remove('modal--open');
  }
}

const modal = new Modal();

export default modal;
