import { $ } from '../utils';

import { PAGE_TITLE } from '../constants/constants';

export function renderPageTitle(keyword: string, isPopular: boolean) {
  const $pageTitle = $('.page-title') as HTMLElement;
  if (!isPopular && keyword) {
    $pageTitle.innerText = PAGE_TITLE.showSearchResult(keyword);
    return;
  }

  $pageTitle.innerText = PAGE_TITLE.POPULAR_NOW;
}

export function PageTitle() {
  return `
        <h2 class="page-title">지금 인기 있는 영화</h2>
    `;
}
