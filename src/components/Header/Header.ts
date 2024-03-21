import Logo from '../../assets/logo.png';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

class Header {
  constructor() {
    this.render();
    this.setEvent();
  }

  render() {
    const headerBox = document.createElement('header');
    headerBox.innerHTML = /* html */ `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    `;

    const searchBox = new SearchBox().init();
    headerBox.append(searchBox);

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(headerBox);
  }

  setEvent(): void {}
}

export default Header;
