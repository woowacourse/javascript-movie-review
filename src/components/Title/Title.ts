import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { POPULER_TITLE, SEARCH_RESULT_TITLE } from '../../consts/message';

import { getEndpoint, getUrlParams } from '../../utils/queryString';

class Title {
  itemViewBox = document.querySelector('.item-view')!;
  titleBox = document.createElement('h2');

  constructor() {
    this.itemViewBox.prepend(this.titleBox);
    this.titleBox.id = 'list-title';
  }

  renderTitle() {
    const endpoint = getEndpoint();

    switch (endpoint) {
      case END_POINT.SEARCH:
        const query = getUrlParams(QUERY_STRING_KEYS.QUERY) || '';
        this.titleBox.textContent = SEARCH_RESULT_TITLE(query);
        break;

      default:
        this.titleBox.textContent = POPULER_TITLE;
    }
  }
}

export default Title;
