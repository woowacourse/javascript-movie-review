import { Search } from './Search';
import logo from '../assets/logo.png';
import { Event } from '../utils';
import PageData from '../data/PageData';
import { resetMovieList, showMovieList } from '../showMovieList';
import MovieData from '../data/MovieData';

export function Header() {
  Event.addEvent('click', '#logo-img', async () => {
    PageData.changePageStatus('popular');
    PageData.resetPage();
    PageData.setRecentKeyword(null);

    resetMovieList();
    MovieData.resetMovieData();

    showMovieList();
  });

  return `
    <header>
        <h1><img class="logo-img" id="logo-img" src='${logo}' alt="MovieList 로고" /></h1>
        ${Search()}
    </header>
   `;
}
