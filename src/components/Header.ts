import logo from '../assets/logo.png';

import { $, Event } from '../utils/index';

import { Search } from './Search';

export function Header() {
  Event.addEvent('click', '#home-logo', () => {
    window.location.href = '/';
  });

  return `
    <header>
        <h1><img src='${logo}' alt="MovieList 로고" id="home-logo"/></h1>
        ${Search()}
    </header>
   `;
}
