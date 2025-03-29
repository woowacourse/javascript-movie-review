import createDOMElement from '../util/createDomElement.js';
import { lockScroll, unlockScroll } from '../util/scroll.js';
import { $ } from '../util/selector.js';

class Modal {
  private modal: HTMLElement;
  private content: HTMLElement;
  private handleEscKey: (event: KeyboardEvent) => void;

  constructor() {
    this.modal = ($('.modal') as HTMLElement) || this.createModal();
    this.content = this.modal.querySelector('.modal-content') as HTMLElement;

    this.handleEscKey = this.handleEscKeyInternal.bind(this);
  }

  private createModal(): HTMLElement {
    const modal = createDOMElement({
      tag: 'div',
      className: 'modal',
      children: [
        createDOMElement({
          tag: 'div',
          className: 'modal-backdrop',
          event: { click: () => this.close() }
        }),
        createDOMElement({
          tag: 'div',
          className: 'modal-content'
        })
      ]
    });

    document.body.appendChild(modal);
    return modal;
  }

  open(content: HTMLElement) {
    this.content.innerHTML = '';
    this.content.appendChild(content);

    this.modal.classList.add('modal--open');
    lockScroll();
    document.addEventListener('keydown', this.handleEscKey);
  }

  close() {
    this.modal.classList.remove('modal--open');
    unlockScroll();
    document.removeEventListener('keydown', this.handleEscKey);
    this.content.innerHTML = '';
  }

  private handleEscKeyInternal(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export default new Modal();
