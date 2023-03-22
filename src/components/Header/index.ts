import MovieSearch from './MovieSearch';
import Tooltip from '../common/Tooltip';

import { logoImage } from '../../assets/images';
import { $ } from '../../utils/dom';

import type Movies from '../../domain/Movies';
import type { GetMovies } from '../../App';

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

  setEvent(movies: Movies, getMovies: GetMovies) {
    MovieSearch.setEvent(movies, getMovies);
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
