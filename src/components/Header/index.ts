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
        <div class="search-tooltip hide">
          ${Tooltip.template('올바른 검색값을 입력해주세요.')}
        </div>
      </header>
    `;
  },
};

export default Header;
