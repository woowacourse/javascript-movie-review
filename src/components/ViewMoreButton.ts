import { publisher } from '../store/publisher';
import { Event } from '../utils/index';

import { renderMoreSkeletonList } from './MovieList';

export function ViewMoreButton(state: publisher) {
  Event.addEvent('click', '.view-more-button', async () => {
    renderMoreSkeletonList(state);

    const { page } = state;
    state.change({ page: page + 1 });
  });

  return `
        <button class="btn primary full-width view-more-button">더 보기</button>
      `;
}
