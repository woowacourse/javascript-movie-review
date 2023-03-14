import getPopularMovies from '../../api/getPopularMovies';
import type Movies from '../../domain/Movies';
import MovieCardList from './MovieCardList';

const LoadMoreButton = {
  template() {
    return `<button id="load-more-button" class="btn primary full-width">더 보기</button>`;
  },
  setEvent(movies: Movies) {
    const button = document.querySelector<HTMLButtonElement>('#load-more-button');

    button?.addEventListener('click', async () => {
      const newMovies = await movies.addPopular();
      MovieCardList.render(newMovies);
    });
  },
};

export default LoadMoreButton;
