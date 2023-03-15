import './Header.style.css';
import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';
import type Movies from '../../domain/Movies';
import MovieCardSection from '../MovieCardSection';
import MovieCardList from '../MovieCardSection/MovieCardList';

const Header = {
  template() {
    return `
      <header>
        <h1><button type="button" class="page-title-button"><img src=${logoImage} alt="MovieList 로고" /></button></h1>
        ${MovieSearch.template()}
      </header>
    `;
  },
  setEvent(movies: Movies) {
    MovieSearch.setEvent(movies);

    const pageTitleButton = document.querySelector<HTMLButtonElement>('.page-title-button');

    pageTitleButton?.addEventListener('click', async () => {
      MovieCardSection.renderTitle('');
      await movies.init();
      MovieCardList.renderSearched(movies.get());
    });
  },
};

export default Header;
