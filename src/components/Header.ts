import { Search } from './Search';
import logo from '../assets/logo.png';
import { Event } from '../utils';
import PageData from '../data/PageData';
import { changePageHeader, resetMovieList, showMovieList } from '../showMovieList';
import MovieData from '../data/MovieData';

export function Header() {
  Event.addEvent('click', '#logo-img', async () => {
    PageData.changePageStatus('popular');
    PageData.resetPage();
    changePageHeader('popular', null);
    resetMovieList();
    PageData.setRecentKeyword(null);
    showMovieList();
    MovieData.resetMovieData();
  });

  return `
    <header>
        <h1><img class="logo-img" id="logo-img" src='${logo}' alt="MovieList 로고" /></h1>
        ${Search()}
    </header>
   `;
}
