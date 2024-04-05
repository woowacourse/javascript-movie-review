import { hiddenElement, showElement } from '../../util/hiddenElement';
import { keydownEvent } from '../../util/keydownEvent';

class BaseModal {
  constructor() {
    this.modalLayoutTemplate();
  }

  modalClose() {
    const modal = document.querySelector('.modal');
    if (!(modal instanceof HTMLElement)) return;
    hiddenElement(modal);
  }

  modalOpen() {
    const modal = document.querySelector('.modal');
    if (!(modal instanceof HTMLElement)) return;
    showElement(modal);
  }

  setEvent(element: HTMLElement) {
    this.#clickBackground(element);
    this.#clickEsc();
  }

  #clickBackground(element: Element) {
    element.addEventListener('click', () => {
      this.modalClose();
    });
  }

  #clickEsc() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      keydownEvent({ event, key: 'Escape', func: () => this.modalClose() });
    });
  }

  modalLayoutTemplate() {
    const app = document.querySelector('#app');
    const modal = document.createElement('div');
    const modalBackdrop = document.createElement('div');
    const modalContainer = document.createElement('div');

    modal.classList.add('modal');
    hiddenElement(modal);
    modalBackdrop.classList.add('modal-backdrop');
    modalContainer.classList.add('modal-container');

    modal.appendChild(modalBackdrop);
    modal.appendChild(modalContainer);

    if (!(app instanceof HTMLElement)) return;

    app.appendChild(modal);
    this.setEvent(modalBackdrop);
  }
}
export default BaseModal;
