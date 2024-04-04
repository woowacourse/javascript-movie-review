import './Modal.css';
class Modal {
  modal = document.createElement('div');
  body = document.querySelector('body');
  container;
  constructor(container: HTMLElement) {
    this.container = container;
    const modalBackDrop = document.createElement('div');

    modalBackDrop.classList.add('modal-backdrop');
    this.modal.classList.add('modal');

    this.modal.appendChild(modalBackDrop);
    this.modal.appendChild(container);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('modal--open');
    this.body?.classList.add('body-modal--open');
  }

  close() {
    this.container.replaceChildren();
    this.modal.classList.remove('modal--open');
    this.body?.classList.remove('body-modal--open');
  }

  getElement() {
    return this.modal;
  }
}

export default Modal;
