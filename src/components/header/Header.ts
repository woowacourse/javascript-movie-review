import { LOGO } from '../../resource';
import SearchBox from './SearchBox';
import Title from './Title';

interface InitProps {
  title: HTMLElement;
  searchBox: HTMLElement;
  main: HTMLElement;
}

interface HeaderProps {
  onClick: () => void;
  main: HTMLElement;
}

class Header {
  constructor({ onClick, main }: HeaderProps) {
    this.initHeader({ onClick, main });
  }

  initHeader({ onClick, main }: HeaderProps) {
    const title = Title({ element: this.createLogo(), click: onClick });
    const searchBox = SearchBox();
    this.headerTemplate({ title, searchBox, main });
  }

  headerTemplate({ title, searchBox, main }: InitProps) {
    const header = document.createElement('header');
    header.appendChild(title);
    header.appendChild(searchBox);
    header.appendChild(searchBox);
    main.appendChild(header);
  }

  createLogo() {
    const logo = document.createElement('img');
    logo.src = LOGO;
    logo.setAttribute('alt', 'MovieList 로고');
    return logo;
  }
}

export default Header;
