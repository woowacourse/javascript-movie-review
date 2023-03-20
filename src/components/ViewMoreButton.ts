import { Event } from '../utils/index';
import PageData from '../data/PageData';
import { showMovieList } from '../showMovieList';

export function ViewMoreButton() {
  Event.addEvent('click', '#more-movie-btn', async () => {
    PageData.plusPage();
    showMovieList('more', null);
  });

  return `
        <button type="button" class="btn primary full-width view-more-button" id="more-movie-btn">더 보기</button>
      `;
}
