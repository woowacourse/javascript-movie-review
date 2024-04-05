import { INFO_MESSAGE, MAX_PAGE_PER_REQUEST } from '../constant/setting';
import { $, createElement } from './dom';
import ScrollUtility from './infiniteScroll';

export const pagination = {
  paginate(
    dataLength: number,
    scrollTrigger: HTMLElement,
    onIntersect: () => void,
  ) {
    if (dataLength === MAX_PAGE_PER_REQUEST) {
      ScrollUtility.infiniteScroll(scrollTrigger, () => onIntersect());
      return;
    }
    ScrollUtility.disconnectObserver();
    pagination.displayMaxPageInfo();
  },

  createMaxPageInfo() {
    const maxPageInfoElement = createElement('p', {
      class: 'max-page-info',
    });
    maxPageInfoElement.textContent = INFO_MESSAGE.MAX_PAGE;

    return maxPageInfoElement;
  },

  displayMaxPageInfo() {
    const maxPageInfo = pagination.createMaxPageInfo();

    $('.item-view')?.appendChild(maxPageInfo);
  },
};
