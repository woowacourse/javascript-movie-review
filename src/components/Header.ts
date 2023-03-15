import { Search } from './Search';
import logo from '../assets/logo.png';

function Header() {
  return `
    <header>
        <h1><img src='${logo}' alt="MovieList 로고" /></h1>
        ${Search()}
    </header>
   `;
}

export { Header };
