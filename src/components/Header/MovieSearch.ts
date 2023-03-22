import Tooltip from '../common/Tooltip';
import MovieCardSection from '../MovieCardSection';

import { SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { ID } from '../../constants/selector';
import { $ } from '../../utils/dom';

import type { GetMovies } from '../../App';
import type Movies from '../../domain/Movies';

const MovieSearch = {
  template() {
    return `
      <div class="search-box">
        <form id=${ID.MOVIE_SEARCH_FORM}>
          <input type="search" name="search-query" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </div>
    `;
  },

  setEvent(movies: Movies, getMovies: GetMovies) {
    const movieSearchForm = $<HTMLFormElement>(`#${ID.MOVIE_SEARCH_FORM}`);

    movieSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const searchInput = event.target.querySelector('input[name="search-query"]') as HTMLInputElement;
      const query = searchInput.value;

      if (query.trim().length === 0) {
        return MovieSearch.renderTooltip(SEARCH_ERROR_MESSAGE.EMPTY.error);
      }

      if (movies.isCurrentQuery(query)) {
        return MovieSearch.renderTooltip(SEARCH_ERROR_MESSAGE.EQUAL.error);
      }

      MovieSearch.removeTooltip();
      MovieCardSection.render(movies, getMovies, query);
    });

    const movieSearchInput = $('input[name="search-query"]');

    movieSearchInput.addEventListener('focus', () => {
      MovieSearch.removeTooltip();
    });
  },

  renderTooltip(message: string) {
    const searchTooltip = $<HTMLDivElement>('.search-tooltip');

    searchTooltip.insertAdjacentHTML('beforeend', Tooltip.template(message));
  },

  removeTooltip() {
    const searchTooltip = $<HTMLDivElement>('.search-tooltip');

    searchTooltip.innerHTML = '';
  },
};

export default MovieSearch;
