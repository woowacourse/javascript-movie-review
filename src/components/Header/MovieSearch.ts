import { GetMovies } from '../../App';
import { SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { ID } from '../../constants/selector';
import type Movies from '../../domain/Movies';
import { $ } from '../../utils/dom';
import MovieCardSection from '../MovieCardSection';
import LoadMoreButton from '../MovieCardSection/LoadMoreButton';
import MovieCardList from '../MovieCardSection/MovieCardList';

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

    movieSearchForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const searchInput = event.target.querySelector('input[name="search-query"]') as HTMLInputElement;
      const query = searchInput.value;

      if (query.trim().length === 0) {
        return MovieSearch.handleShowTooltip(true);
      }

      MovieSearch.handleShowTooltip(false);
      MovieCardSection.render(query);

      const newMovies = await getMovies(query);

      if (!newMovies) return;

      if (newMovies.list.length === 0) {
        return MovieCardSection.renderErrorMessage(SEARCH_ERROR_MESSAGE);
      }

      MovieCardList.paint(newMovies.list);
      LoadMoreButton.handleVisibility(movies.isLastPage(newMovies.totalPages));
    });

    const movieSearchInput = $('input[name="search-query"]');

    movieSearchInput.addEventListener('focus', () => {
      MovieSearch.handleShowTooltip(false);
    });
  },

  handleShowTooltip(state: boolean) {
    const searchTooltip = $<HTMLDivElement>('.search-tooltip');

    if (state) {
      return searchTooltip.classList.remove('hide');
    }

    return searchTooltip.classList.add('hide');
  },
};

export default MovieSearch;
