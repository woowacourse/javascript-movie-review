import '../../css/movie-container.css';
import '../../css/modal.css';
import { $ } from '../utils/dom';
import { movieModalTemplate } from './templates/movieModalTemplate';
import { generateSelfGradeTemplate } from './templates/selfGradeTemplate';
import { setMovieSelfScore } from '../domains/localStorage';

class MovieModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleModalClick);
    document.addEventListener('keydown', this.handleModalKeydown.bind(this));
  }

  private handleModalClick(event: Event) {
    const target = event.target;

    if (
      (this.classList.contains('modal--open') &&
        target instanceof HTMLDivElement &&
        target.className === 'modal-backdrop') ||
      (target instanceof HTMLButtonElement && target.ariaLabel === 'escape')
    ) {
      this.classList.remove('modal--open');
    }

    if (target instanceof HTMLImageElement && target.ariaLabel === 'score') {
      this.gradeMovie(target);
    }
  }

  private handleModalKeydown(keyboardEvent: KeyboardEvent) {
    const keycode = keyboardEvent.key;

    if (keycode === 'Escape' && this.classList.contains('modal--open')) {
      this.classList.remove('modal--open');
    }
  }

  private gradeMovie(target: HTMLImageElement) {
    const modalHeader = $<HTMLDivElement>('.modal-header');
    const container = $<HTMLDivElement>('.self-grade');

    if (modalHeader instanceof HTMLDivElement && container instanceof HTMLDivElement) {
      setMovieSelfScore(modalHeader.id, target.id);
      container.innerHTML = generateSelfGradeTemplate(modalHeader.id);
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
