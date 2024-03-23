import { TITLE } from '../../consts/message';
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
      case 'search':
        const query = getUrlParams('query') || '';
        titleBox.textContent = TITLE.SEARCH_RESULT(query);
        break;

      default:
        titleBox.textContent = TITLE.POPULER;
    }

    console.log('titleBox', titleBox);
    if (!this.itemViewBox) return;
    this.itemViewBox.append(titleBox);
  }
}

export default Title;
