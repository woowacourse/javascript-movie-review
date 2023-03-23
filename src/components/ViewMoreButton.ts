import { store } from '../store';

export function ViewMoreButton() {
  const { isContentEnd } = store.state;
  return `
        <button class="btn primary full-width view-more-button">${
          isContentEnd ? '' : '더보기'
        }</button>
      `;
}
