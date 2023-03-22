import { isCustomErrorMessage, SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { ID } from '../../constants/selector';
import type Movies from '../../domain/Movies';
import MovieCardSection from '../MovieCardSection';
import LoadMoreButton from '../MovieCardSection/LoadMoreButton';
import MovieCardList from '../MovieCardSection/MovieCardList';

const MovieSearch = {
  template() {
    return `
      <div class="search-box">
        <form id=${ID.MOVIE_SEARCH_FORM}>
          <input type="search" name="search-query" placeholder="검색" data-tooltip="버튼 요소 길이보다 툴팁 길이가 훨씬 기네요." />
          <button class="search-button">검색</button>
        </form>
      </div>
    `;
  },

  setEvent(movies: Movies) {
    const movieSearchForm = document.querySelector<HTMLFormElement>(`#${ID.MOVIE_SEARCH_FORM}`);

    movieSearchForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const searchInput = event.target.querySelector('input[name="search-query"]') as HTMLInputElement;
      const query = searchInput.value;

      if (query.trim().length === 0) {
        return MovieSearch.handleShowTooltip(true);
      }

      MovieSearch.handleShowTooltip(false);
      MovieCardSection.render(query);

      try {
        const results = await movies.search(query);

        if (results.length === 0) {
          throw SEARCH_ERROR_MESSAGE;
        }

        MovieCardList.paint(results);
        LoadMoreButton.handleVisibility(movies.isLastPage());
      } catch (error) {
        if (isCustomErrorMessage(error)) {
          MovieCardSection.renderErrorMessage(error);
        }
      }
    });

    const movieSearchInput = document.querySelector('input[name="search-query"]');

    movieSearchInput?.addEventListener('focus', () => {
      MovieSearch.handleShowTooltip(false);
    });
  },

  handleShowTooltip(state: boolean) {
    const searchTooltip = document.querySelector<HTMLDivElement>('.search-tooltip');

    if (searchTooltip === null) return;

    if (state) {
      return searchTooltip.classList.remove('hide');
    }

    return searchTooltip.classList.add('hide');
  },
};

export default MovieSearch;
