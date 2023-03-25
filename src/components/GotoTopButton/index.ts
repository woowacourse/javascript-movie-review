import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

class GotoTopButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  handleTopButtonVisibility() {
    if (window.scrollY > 300) {
      $<HTMLImageElement>('img', this).classList.remove('hidden');
    }
  }
}
export default GotoTopButton;
