// src/components/header/Logo.js
import { store } from '../../store/store.js';

export default class Logo {
  constructor() {
    this.element = null;
  }
  onClick = async () => {};

  createLogo() {
    this.element = document.querySelector('.logo');
    
    if (this.element) {
      this.element.addEventListener('click', this.handleLogoClick.bind(this));
    } else {
      console.error('로고 요소를 찾을 수 없습니다.');
    }
    
    return this.element;
  }


  async handleLogoClick() {
    await this.onClick();
  }
}
