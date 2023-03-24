import Header from '.';
import MovieCardSection from '../MovieCardSection';
import MobileSearchBox from './MobileSearchButton';

import { searchButtonImage } from '../../assets/images';
import { SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { ID } from '../../constants/selector';
import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

const MovieSearch = {
  template() {
    return `
      <div class="search-box">
        <form id=${ID.MOVIE_SEARCH_FORM}>
          <input type="search" name="search-query" placeholder="검색" />
          <button class="search-button">
            <img src=${searchButtonImage} alt="영화 검색" />
          </button>
        </form>
      </div>
      ${MobileSearchBox.template()}
    `;
  },

  setEvent() {
    const movieSearchForm = $<HTMLFormElement>(`#${ID.MOVIE_SEARCH_FORM}`);
    const movieSearchInput = $('input[name="search-query"]');

    movieSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const searchInput = event.target.querySelector('input[name="search-query"]') as HTMLInputElement;
      const query = searchInput.value;

      if (query.trim().length === 0) {
        return Header.renderTooltip(SEARCH_ERROR_MESSAGE.EMPTY.error);
      }

      if (movieStates.isCurrentQuery(query)) {
        return Header.renderTooltip(SEARCH_ERROR_MESSAGE.EQUAL.error);
      }

      Header.removeTooltip();
      MovieCardSection.render(query);
    });

    movieSearchInput.addEventListener('focus', () => {
      Header.removeTooltip();
    });
  },
};

export default MovieSearch;
