import { store } from '../store';
import { PAGE_TITLE } from '../constants/constants';

export function PageTitle() {
  const { isPopular, keyword } = store.state;

  return `
        <h2 class="page-title">${
          isPopular ? PAGE_TITLE.POPULAR_NOW : PAGE_TITLE.showSearchResult(keyword)
        }</h2>
    `;
}
