import { $ } from '../utils/domSelector';
import MovieListContent from './MovieListContent';

const MovieListContainer = {
  template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
        <div class="error-message hide"></div>
      </section>
    `;
  },

  onClick() {
    $<HTMLButtonElement>('#more-button').addEventListener('click', async () => {
      MovieListContent.loadMoreMovies();
    });
  },
};

export default MovieListContainer;
