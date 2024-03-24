import Logo from '../../assets/logo.png';
import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { deleteParams, setEndpoint } from '../../utils/queryString';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

class Header {
  headerBox = document.createElement('header');
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
    this.headerBox.append(this.header);

    const searchBox = new SearchBox(this.rerenderList).render();
    this.headerBox.append(searchBox);

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(this.headerBox);
  }

  setEvent() {
    this.header.addEventListener('click', () => {
      deleteParams(QUERY_STRING_KEYS.QUERY);
      deleteParams(QUERY_STRING_KEYS.PAGE);

      setEndpoint(END_POINT.POPULAR);
      this.rerenderList();
    });
  }
}

export default Header;
