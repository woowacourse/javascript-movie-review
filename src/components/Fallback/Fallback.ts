import './style.css';

import FALLBACK_LOOKUP_TABLE from '../../constants/fallbackMessage';

class Fallback {
  private template: HTMLElement;

  constructor(status: string = '') {
    this.template = document.createElement('section');
    this.template.classList.add('fallback', 'fallback--hidden');
    this.createTemplate();
    this.setFallbackMessage(status);
  }

  createTemplate() {
    const h2 = document.createElement('h2');
    h2.classList.add('fallback_message');
    h2.textContent = FALLBACK_LOOKUP_TABLE['default'];
    this.template.appendChild(h2);
  }

  setFallbackMessage(status: string) {
    const h2 = this.template.querySelector('h2') as HTMLElement;
    h2.textContent = FALLBACK_LOOKUP_TABLE[status];
  }

  toggleHidden() {
    this.template.classList.toggle('fallback--hidden');
  }

  getElement() {
    return this.template;
  }
}

export default Fallback;
