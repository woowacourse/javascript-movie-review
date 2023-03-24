import '../../css/modal.css';
import { $ } from '../utils/dom';
import { movieModalTemplate } from './templates/movieModalTemplate';

class MovieModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleModalClick);
    document.addEventListener('keydown', this.handleModalKeydown.bind(this));
  }

  handleModalClick(event: Event) {
    const target = event.target;

    if (
      (this.classList.contains('modal--open') &&
        target instanceof HTMLDivElement &&
        target.className === 'modal-backdrop') ||
      (target instanceof HTMLButtonElement && target.ariaLabel === 'escape')
    ) {
      this.classList.remove('modal--open');
    }
  }

  handleModalKeydown(keyboardEvent: KeyboardEvent) {
    const keycode = keyboardEvent.key;

    if (keycode === 'Escape' && this.classList.contains('modal--open')) {
      this.classList.remove('modal--open');
    }
  }

  static render() {
    const container = $<HTMLElement>('main');

    if (container instanceof HTMLElement) {
      container.insertAdjacentHTML('beforeend', movieModalTemplate);
    }
  }
}

export default MovieModal;
