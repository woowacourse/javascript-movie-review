import { $ } from '../utils/index';

export function ViewMoreButton() {
  return `
        <button class="btn primary full-width view-more-button">더 보기</button>
      `;
}

export function renderViewMoreButton(isContentEnd: boolean) {
  if (isContentEnd) {
    const $viewMoreButton = $('.view-more-button') as HTMLElement;
    $viewMoreButton.style.display = 'none';
  }
}
