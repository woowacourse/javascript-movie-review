import { CLASS } from '../../../constants/selector';
import { $ } from '../../../utils/dom';

import './Modal.style.css';

const Modal = {
  template(content: string) {
    return `
      <div class="modal-background"></div>
      <div class="modal-content">
        ${content}
      </div>
    `;
  },

  setEvent() {
    const modalBackground = $<HTMLDivElement>('.modal-background');

    modalBackground.addEventListener('click', Modal.close);
    window.addEventListener('keydown', Modal.onKeydownEscape);
  },

  removeEvent() {
    window.removeEventListener('keydown', Modal.onKeydownEscape);
  },

  open(content: string) {
    const modalRoot = $<HTMLDivElement>('#modal-root');

    modalRoot.classList.remove(CLASS.HIDE);
    modalRoot.insertAdjacentHTML('beforeend', Modal.template(content));
    Modal.setEvent();
  },

  close() {
    const modalRoot = $<HTMLDivElement>('#modal-root');

    modalRoot.classList.add(CLASS.HIDE);
    modalRoot.innerHTML = '';
    Modal.removeEvent();
  },

  onKeydownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') Modal.close();
  },
};

export default Modal;
