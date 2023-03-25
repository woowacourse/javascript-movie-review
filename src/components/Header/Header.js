import './Header.css';
import Logo from '../../image/logo.png';
import { $ } from '../../utils/common';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLogoClickEvent();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1 id="logo"><img src="${Logo}" alt="MovieList 로고" /></h1>
      <search-input></search-input>
    </header>`;
  }

  setLogoClickEvent() {
    $('#logo').addEventListener('click', this.setInitializing.bind(this));
  }

  setInitializing() {
    $('movie-list').setSearchWord('');
    $('.search-box').classList.add('search-box-hide');
    $('.search-single-button').classList.remove('search-click-hide');
  }
}

customElements.define('movie-header', Header);

export default Header;
