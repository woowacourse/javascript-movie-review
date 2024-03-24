import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { POPULER_TITLE, SEARCH_RESULT_TITLE } from '../../consts/message';

import { getEndpoint, getUrlParams } from '../../utils/queryString';

class Title {
  itemViewBox = document.querySelector('.item-view');

  rerenderTitle() {
    const existedTitle = document.querySelector('#list-title');
    if (!existedTitle) return;
    existedTitle.remove();

    this.renderTitle();
  }

  renderTitle() {
    const endpoint = getEndpoint();

    const titleBox = document.createElement('h2');
    titleBox.id = 'list-title';

    switch (endpoint) {
      case END_POINT.SEARCH:
        const query = getUrlParams(QUERY_STRING_KEYS.QUERY) || '';
        titleBox.textContent = SEARCH_RESULT_TITLE(query);
        break;

      default:
        titleBox.textContent = POPULER_TITLE;
    }

    if (!this.itemViewBox) return;
    this.itemViewBox.append(titleBox);
  }
}

export default Title;
