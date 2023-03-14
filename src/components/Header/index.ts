import './Header.style.css';
import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';

const Header = {
  template() {
    return `
      <header>
        <h1><img src=${logoImage} alt="MovieList 로고" /></h1>
        ${MovieSearch.template()}
      </header>
    `;
  },
};

export default Header;
