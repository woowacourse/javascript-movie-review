import './style.css';
import FALLBACK_LOOKUP_TABLE from '../../constants/fallbackMessage';

class Fallback {
  private template: HTMLElement;

  constructor() {
    const main = document.createElement('section');
    main.classList.add('fallback');
    const h2 = document.createElement('h2');
    h2.classList.add('fallback_message');
    h2.textContent = FALLBACK_LOOKUP_TABLE['default'];
    main.appendChild(h2);

    this.template = main;
  }

  setFallbackMessage(status: string) {
    const h2 = this.template.querySelector('h2') as HTMLElement;
    h2.textContent = FALLBACK_LOOKUP_TABLE[status];
  }

  getElement() {
    return this.template;
  }
}

export default Fallback;
