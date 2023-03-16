import { $, Event } from '../utils/index';
import {
  usePopularMovie,
  plusPage,
  getPageStatus,
  useSearchedMovie,
  getRecentKeyword,
} from '../data/useMovie';
import { renderMoreSkeletonList, renderSkeletonList } from './MovieList';

export function ViewMoreButton() {
  Event.addEvent('click', '.view-more-button', async () => {
    plusPage();

    renderMoreSkeletonList();
  });

  return `
        <button class="btn primary full-width view-more-button">더 보기</button>
      `;
}
