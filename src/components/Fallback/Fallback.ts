import './style.css';
import FALLBACK_LOOKUP_TABLE from '../../constants/fallbackMessage';

class Fallback {
  private template: HTMLElement;

  constructor() {
    const main = document.createElement('section');
    main.classList.add('fallback');
    const p = document.createElement('p');
    p.classList.add('fallback_message');
    p.textContent = FALLBACK_LOOKUP_TABLE['default'];
    main.appendChild(p);

    this.template = main;
  }

  setFallbackMessage(status: string) {
    const p = this.template.querySelector('p') as HTMLElement;
    p.textContent = FALLBACK_LOOKUP_TABLE[status];
  }

  getElement() {
    return this.template;
  }
}

export default Fallback;
