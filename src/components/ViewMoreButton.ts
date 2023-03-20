import { $, Event } from '../utils/index';
import { statusController } from '../data/PageData';
import { showMovieList } from '../showMovieList';

export function ViewMoreButton() {
  Event.addEvent('click', '#more-movie-btn', async () => {
    statusController.plusPage();
    showMovieList('more', null);
  });

  return `
        <button type="button" class="btn primary full-width view-more-button" id="more-movie-btn">더 보기</button>
      `;
}
