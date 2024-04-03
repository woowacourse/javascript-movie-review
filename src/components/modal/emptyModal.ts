import { Dom } from '../../utils/Dom';

class Modal {
  private modal: HTMLElement;
  private modalClassName: string;

  private content: HTMLElement;

  constructor(className: string, content: HTMLElement) {
    this.modalClassName = className;
    this.content = content;
    this.setContentKeyEvent();
    const modal = document.createElement('div');
    modal.className = className;
    const backdrop = createBackdrop();
    backdrop.appendChild(content);
    modal.append(backdrop);
    this.modal = modal;
    document.body.appendChild(modal);
  }
  open() {
    document.body.classList.add('stop-scroll');
    document.body.appendChild(this.modal);
  }
  setContentKeyEvent() {
    this.content.tabIndex = -1;

    this.content.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        Modal.remove(this.modalClassName);
      }
    });
    setTimeout(() => this.content.focus(), 0);
  }

  static remove(modalClassName: string) {
    document.body.classList.remove('stop-scroll');
    Dom.getElement(document, `.${modalClassName}`).remove();
  }
}

function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}

export default Modal;
