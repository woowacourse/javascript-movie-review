import MovieSearch from './MovieSearch';
import MobileSearchBox from './MobileSearchButton';
import Tooltip from '../common/Tooltip';

import { logoImage } from '../../assets/images';
import { $ } from '../../utils/dom';

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
        <div class="search-tooltip"></div>
      </header>
    `;
  },

  setEvent() {
    MovieSearch.setEvent();
    MobileSearchBox.setEvent();
  },

  renderTooltip(message: string) {
    const searchTooltip = $<HTMLDivElement>('.search-tooltip');

    searchTooltip.innerHTML = Tooltip.template(message);
  },

  removeTooltip() {
    const searchTooltip = $<HTMLDivElement>('.search-tooltip');

    searchTooltip.innerHTML = '';
  },
};

export default Header;
