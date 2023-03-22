import logo from '../assets/logo.png';

import { Search } from './Search';

export function Header() {
  return `
    <header>
        <h1><img src='${logo}' alt="MovieList 로고" id="home-logo"/></h1>
        ${Search()}
    </header>
   `;
}
