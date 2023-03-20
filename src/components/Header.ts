import { Search } from './Search';
import logo from '../assets/logo.png';
import { Event } from '../utils';
import PageData from '../data/PageData';
import { showMovieList } from '../showMovieList';

export function Header() {
  Event.addEvent('click', '#logo-img', async () => {
    PageData.changePageStatus('popular');
    PageData.resetPage();
    showMovieList('popular', null);
  });

  return `
    <header>
        <h1><img class="logo-img" id="logo-img" src='${logo}' alt="MovieList 로고" /></h1>
        ${Search()}
    </header>
   `;
}
