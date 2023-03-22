import './Header.style.css';
import MovieSearch from './MovieSearch';
import { logoImage } from '../../assets/images';
import type Movies from '../../domain/Movies';
import MovieCardSection from '../MovieCardSection';
import MovieCardList from '../MovieCardSection/MovieCardList';
import LoadMoreButton from '../MovieCardSection/LoadMoreButton';
import { CLASS } from '../../constants/selector';
import Tooltip from '../common/Tooltip';
import { isCustomErrorMessage } from '../../constants/message';
import { $ } from '../../utils/dom';

const Header = {
  template() {
    return `
      <header>
        <h1><button type="button" class=${CLASS.PAGE_TITLE_BUTTON}><img src=${logoImage} alt="MovieList 로고" /></button></h1>
        ${MovieSearch.template()}
        <div class="search-tooltip hide">
          ${Tooltip.template('올바른 검색값을 입력해주세요.')}
        </div>
      </header>
    `;
  },

  setEvent(movies: Movies) {
    MovieSearch.setEvent(movies);

    const pageTitleButton = $<HTMLButtonElement>(`.${CLASS.PAGE_TITLE_BUTTON}`);

    pageTitleButton.addEventListener('click', async () => {
      MovieCardSection.render();

      try {
        const results = await movies.init();

        MovieCardList.paint(results);
        LoadMoreButton.handleVisibility(movies.isLastPage());
      } catch (error) {
        if (isCustomErrorMessage(error)) {
          MovieCardSection.renderErrorMessage(error);
        }
      }
    });
  },
};

export default Header;
