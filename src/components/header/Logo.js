// src/components/header/Logo.js
import { store } from '../../store/store.js';
import Logger from '../../utils/logger/Logger';

export default class Logo {
  constructor(onClick) {
    this.element = null;
    this.onClick = onClick;
  }

  createLogo() {
    this.element = document.querySelector('.logo');
    
    if (this.element) {
      this.element.addEventListener('click', this.handleLogoClick.bind(this));
    } else {
      const logger = Logger.getInstance();
      logger.error('로고 요소를 찾을 수 없습니다.');
    }
    
    return this.element;
  }

  async handleLogoClick() {
    await this.onClick();
  }

  render() {
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.innerHTML = /*html*/ `
      <img src="./images/logo.png" alt="로고" />
    `;
    return logo;
  }

  addLogoClickEvent() {
    const logo = document.querySelector('.logo');
    if (!logo) {
      const logger = Logger.getInstance();
      logger.error('로고 요소를 찾을 수 없습니다.');
      return;
    }
    logo.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
}
