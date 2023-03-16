import { $, Event } from '../utils/index';
import {
  usePopularMovie,
  plusPage,
  getPageStatus,
  useSearchedMovie,
  getRecentKeyword,
} from '../data/useMovie';

export function ViewMoreButton() {
  Event.addEvent('click', '.view-more-button', async () => {
    plusPage();

    if (getPageStatus() === 'popular') {
      const {
        handlers: { handleMoreMovieList },
      } = await usePopularMovie();
      handleMoreMovieList();
    } else {
      const {
        handlers: { handleMoreMovieList },
      } = await useSearchedMovie(getRecentKeyword());
      handleMoreMovieList();
    }
  });

  return `
        <button class="btn primary full-width view-more-button">더 보기</button>
      `;
}
