// src/components/header/Logo.js
import { store } from '../../store/store.js';

export default class Logo {
  constructor(movieListHandler) {
    this.movieListHandler = movieListHandler;
  }

  createLogo() {
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', this.handleLogoClick.bind(this));
    } else {
      console.error('로고 요소를 찾을 수 없습니다.');
    }
  }

  async handleLogoClick() {
    store.setMode('popularAdd');
    await this.movieListHandler.initMovieList();
  }
}
