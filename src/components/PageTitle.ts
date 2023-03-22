import { publisher } from '../store/publisher';
import { PAGE_TITLE } from '../constants/constants';

export function PageTitle() {
  const { isPopular, keyword } = publisher.state;

  return `
        <h2 class="page-title">${
          isPopular ? PAGE_TITLE.POPULAR_NOW : PAGE_TITLE.showSearchResult(keyword)
        }</h2>
    `;
}
