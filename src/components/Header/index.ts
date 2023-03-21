import './Header.style.css';
import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';
import type Movies from '../../domain/Movies';
import MovieCardSection from '../MovieCardSection';
import MovieCardList from '../MovieCardSection/MovieCardList';
import LoadMoreButton from '../MovieCardSection/LoadMoreButton';
import { CLASS } from '../../constants/selector';
import { ERROR_MESSAGE } from '../../constants';

const Header = {
  template() {
    return `
      <header>
        <h1><button type="button" class=${CLASS.PAGE_TITLE_BUTTON}><img src=${logoImage} alt="MovieList 로고" /></button></h1>
        ${MovieSearch.template()}
      </header>
    `;
  },
  setEvent(movies: Movies, target: HTMLElement) {
    const header = target.querySelector('header') as HTMLElement;
    MovieSearch.setEvent(movies, header);

    const pageTitleButton = target.querySelector<HTMLButtonElement>(`.${CLASS.PAGE_TITLE_BUTTON}`);

    pageTitleButton?.addEventListener('click', async () => {
      MovieCardSection.render();

      try {
        const results = await movies.init();

        if (results === ERROR_MESSAGE.DATA_LOAD) {
          throw new Error(results);
        }

        MovieCardList.paint(results);
        LoadMoreButton.handleVisibility(movies.isLastPage());
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    });
  },
};

export default Header;
