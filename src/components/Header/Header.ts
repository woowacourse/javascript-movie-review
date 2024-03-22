import './style.css';

import SearchField from '../SearchField/SearchField';
import Logo from '../../imgs/logo.png';
import Image from '../Image/Image';

interface HeaderProps {
  onLogoClick?: () => void;
  onSearch?: (event: SubmitEvent) => void;
}

class Header {
  private template: HTMLElement;

  constructor(props: HeaderProps) {
    this.template = this.createHeader();
    this.createElements(props);
  }

  createHeader() {
    const header = document.createElement('header');
    return header;
  }

  createElements({ onLogoClick, onSearch }: HeaderProps) {
    this.createLogoField(onLogoClick);
    this.createSearchField(onSearch);
  }

  createLogoField(onLogoClick?: () => void) {
    const h1 = document.createElement('h1');
    const img = new Image({ src: Logo, alt: 'MovieList 로고', onImageClick: onLogoClick });
    h1.appendChild(img.element);
    this.template.appendChild(h1);
  }

  createSearchField(onSearch?: (event: SubmitEvent) => void) {
    const searchField = new SearchField({ onSearch });
    this.template.appendChild(searchField.element);
  }

  get element() {
    return this.template;
  }
}

export default Header;
