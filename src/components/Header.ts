import logo from '../assets/logo.png';
import { publisher } from '../store/publisher';

import { Event } from '../utils/index';

import { Search } from './Search';

export function Header(state: publisher) {
  Event.addEvent('click', '#home-logo', () => {
    window.location.href = '/';
  });

  return `
    <header>
        <h1><img src='${logo}' alt="MovieList 로고" id="home-logo"/></h1>
        ${Search(state)}
    </header>
   `;
}
