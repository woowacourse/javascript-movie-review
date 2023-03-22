import './Header.style.css';

import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';
import Tooltip from '../common/Tooltip';

const Header = {
  template() {
    return `
      <header>
        <h1>
          <a href="./">
            <img src=${logoImage} alt="MovieList 로고" />
          </a>
        </h1>
        ${MovieSearch.template()}
        <div class="search-tooltip"></div>
      </header>
    `;
  },
};

export default Header;
