import './Header.style.css';
import MovieSearch from './MovieSearch';

const Header = {
  template() {
    return `
      <header>
        <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
        ${MovieSearch.template()}
      </header>
    `;
  },
};

export default Header;
