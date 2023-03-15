import type Movies from '../../domain/Movies';
import MovieCardList from '../MovieCardSection/MovieCardList';

const MovieSearch = {
  template() {
    return `
      <div class="search-box">
        <form id="movie-search-form">
          <input type="text" name="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </div>
    `;
  },
  setEvent(movies: Movies) {
    const movieSearchForm = document.querySelector<HTMLFormElement>('#movie-search-form');

    movieSearchForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const query = new FormData(event.target).get('text')?.toString();

      if (!query) return;

      await movies.search(query);
      MovieCardList.renderSearched(movies.get());
    });
  },
};

export default MovieSearch;
