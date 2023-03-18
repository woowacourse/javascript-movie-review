import { $, Event } from '../utils/index';
import { statusController } from '../data/PageData';
import { showMovieList } from './MovieList';

export function ViewMoreButton() {
  Event.addEvent('click', '.view-more-button', async () => {
    statusController.plusPage();
    showMovieList('more', null);
  });

  return `
        <button class="btn primary full-width view-more-button">더 보기</button>
      `;
}
