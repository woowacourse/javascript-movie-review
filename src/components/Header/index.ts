import './Header.style.css';
import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';
import type Movies from '../../domain/Movies';
import MovieCardSection from '../MovieCardSection';
import MovieCardList from '../MovieCardSection/MovieCardList';
import LoadMoreButton from '../MovieCardSection/LoadMoreButton';

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
      MovieCardList.render();

      await movies.init();

      MovieCardList.paint(movies.get());

      LoadMoreButton.handleVisibility(movies.isLastPage());
    });
  },
};

export default Header;
