import Logo from '../../assets/logo.png';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

interface HeaderProp {
  searchEvent: (query: string) => Promise<void>;
  movePopularListEvent: () => Promise<void>;
}
class Header {
  headerBox = document.createElement('header');
  header = document.createElement('h1');
  headerImage = document.createElement('img');

  searchEvent: (query: string) => Promise<void>;
  movePopularListEvent: () => Promise<void>;

  constructor({ searchEvent, movePopularListEvent }: HeaderProp) {
    this.render();
    this.searchEvent = searchEvent;
    this.movePopularListEvent = movePopularListEvent;
    this.setEvent();
  }

  render() {
    this.headerImage.setAttribute('src', Logo);
    this.headerImage.setAttribute('alt', '로고 이미지');

    this.header.append(this.headerImage);
    this.headerBox.append(this.header);

    const searchBox = new SearchBox({ searchEvent: (query: string) => this.searchEvent(query) }).init();
    this.headerBox.append(searchBox);

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(this.headerBox);
  }

  setEvent() {
    this.header.addEventListener('click', () => {
      this.movePopularListEvent();
    });
  }
}

export default Header;
