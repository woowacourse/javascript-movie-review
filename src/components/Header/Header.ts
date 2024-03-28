import Logo from '../../assets/logo.png';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

interface HeaderProp {
  onSearch: () => Promise<void>;
  onLogoClick: () => Promise<void>;
}
class Header {
  headerBox = document.createElement('header');
  header = document.createElement('h1');
  headerImage = document.createElement('img');

  onSearch: () => Promise<void>;
  onLogoClick: () => Promise<void>;

  constructor({ onSearch: searchEvent, onLogoClick: onLogoClick }: HeaderProp) {
    this.render();
    this.onSearch = searchEvent;
    this.onLogoClick = onLogoClick;
    this.setEvent();
  }

  render() {
    this.headerImage.setAttribute('src', Logo);
    this.headerImage.setAttribute('alt', '로고 이미지');

    this.header.append(this.headerImage);
    this.headerBox.append(this.header);

    const searchBox = new SearchBox({ onSearch: () => this.onSearch() }).init();
    this.headerBox.append(searchBox);

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(this.headerBox);
  }

  setEvent() {
    this.header.addEventListener('click', () => {
      this.onLogoClick();
    });
  }
}

export default Header;
