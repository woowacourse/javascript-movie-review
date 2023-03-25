import '../../css/movie-container.css';
import '../../css/modal.css';
import { $ } from '../utils/dom';
import { movieModalTemplate } from './templates/movieModalTemplate';
import { generateSelfGradeTemplate } from './templates/selfGradeTemplate';

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
      const container = this.querySelector('.modal-container');
      if (container instanceof HTMLDivElement) {
        container.innerHTML = '';
      }
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
    const container = $<HTMLDivElement>('.self-grade');

    if (container instanceof HTMLDivElement) {
      const scoreTemplate = generateSelfGradeTemplate(Number(target.id));
      container.innerHTML = scoreTemplate;
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
