import BaseComponent from '../BaseComponent';
import Logo from '../../assets/logo.png';

class Header extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const headerBox = document.createElement('header');

    headerBox.innerHTML = /* html */ `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>
    `;

    super.mounted({ parentSelector: '#app', children: headerBox });
  }

  setEvent(): void {}
}

export default Header;
