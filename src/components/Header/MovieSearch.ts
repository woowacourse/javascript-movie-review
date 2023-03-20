import { ERROR_MESSAGE } from '../../constants';
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
          <input type="text" name="search-query" placeholder="검색" />
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

      const query = new FormData(event.target).get('search-query')?.toString();

      if (!query) return;

      MovieCardSection.render(query);
      MovieSearch.paintList(movies, query);
    });
  },
  async paintList(movies: Movies, query: string) {
    try {
      const results = await movies.search(query);

      if (results === ERROR_MESSAGE.DATA_LOAD) {
        throw new Error(results);
      }

      if (results.length === 0) {
        return MovieCardSection.renderEmpty(true);
      }

      MovieCardList.paint(results);
      LoadMoreButton.handleVisibility(movies.isLastPage());
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  },
};

export default MovieSearch;
