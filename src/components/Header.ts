import { search } from './search';
import logo from '../assets/logo.png';
import { Event } from '../utils';
import PageData from '../data/pageData';
import { resetMovieList, showMovieList } from '../showMovieList';
import MovieData from '../data/movieData';

export function header() {
  Event.addEvent('click', '#logo-img', async () => {
    PageData.changePageStatus('popular');
    PageData.resetCurrentPage();
    PageData.setRecentKeyword(null);

    resetMovieList();
    MovieData.resetMovieData();

    showMovieList();
  });

  return `
    <header>
        <h1><img class="logo-img" id="logo-img" src='${logo}' alt="MovieList 로고" /></h1>
        ${search()}
    </header>
   `;
}
