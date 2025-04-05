import createDOMElement from '../../util/createDomElement';
import { lockScroll, unlockScroll } from '../../util/scroll';
import { $ } from '../../util/selector';

class Modal {
  private modalWrapper: HTMLElement;
  private modal: HTMLElement;
  private content: HTMLElement;
  private handleEscKey: (e: KeyboardEvent) => void;

  constructor() {
    this.modalWrapper = ($('.modal-background') as HTMLElement) || this.#createModal();
    this.modal = this.modalWrapper.querySelector('.modal') as HTMLElement;
    this.content = this.modal.querySelector('.modal-content') as HTMLElement;

    this.handleEscKey = this.#handleEscKey.bind(this);
  }

  #createModal(): HTMLElement {
    const content = createDOMElement({
      tag: 'div',
      className: 'modal-content'
    });

    const modal = createDOMElement({
      tag: 'div',
      className: 'modal',
      children: [content]
    });

    const modalWrapper = createDOMElement({
      tag: 'div',
      className: 'modal-background',
      children: [modal]
    });

    modalWrapper.addEventListener('click', (e) => {
      if (e.target === modalWrapper) this.close();
    });

    document.body.appendChild(modalWrapper);
    return modalWrapper;
  }

  open(content: HTMLElement) {
    this.content.innerHTML = '';
    this.content.appendChild(content);

    this.modalWrapper.classList.add('active');
    lockScroll();
    document.addEventListener('keydown', this.handleEscKey);
  }

  close() {
    this.modalWrapper.classList.remove('active');
    unlockScroll();
    document.removeEventListener('keydown', this.handleEscKey);
    this.content.innerHTML = '';
  }

  #handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export default new Modal();
