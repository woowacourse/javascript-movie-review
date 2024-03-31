import Logo from '../../assets/logo.png';
import { redirectToRoot } from '../../utils/queryString';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

class Header {
  headerBox = document.querySelector('header');
  header = document.createElement('h1');
  headerImage = document.createElement('img');
  rerenderList;

  constructor(rerenderList: () => void) {
    this.rerenderList = rerenderList;
    this.render();
    this.setEvent();
  }

  render() {
    this.headerImage.setAttribute('src', Logo);
    this.headerImage.setAttribute('alt', '로고 이미지');

    this.header.append(this.headerImage);

    if (!this.headerBox) return;
    this.headerBox.append(this.header);

    new SearchBox(this.rerenderList);

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(this.headerBox);
  }

  setEvent() {
    this.header.addEventListener('click', () => {
      redirectToRoot();
      this.rerenderList();
    });
  }
}

export default Header;
