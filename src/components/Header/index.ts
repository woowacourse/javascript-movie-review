import MovieSearch from './MovieSearch';
import MobileSearchBox from './MobileSearchButton';

import { logoImage } from '../../assets/images';

import './Header.style.css';

const Header = {
  template() {
    return `
      <header class="header">
        <h1>
          <a href="./">
            <img src=${logoImage} alt="MovieList 로고" />
          </a>
        </h1>
        ${MovieSearch.template()}
      </header>
    `;
  },

  setEvent() {
    MovieSearch.setEvent();
    MobileSearchBox.setEvent();
  },
};

export default Header;
