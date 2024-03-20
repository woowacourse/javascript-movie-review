import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import uiFeedBackManager from '../../services/UIFeedBackManager';
import { createMovieItems } from '../MovieContainer/render';

let value = 2;

const MAX_PAGE_NUMBER = 10;

const removeShowMoreButton = (targetElement: Element | null) => {
  if (targetElement && targetElement.parentNode) targetElement.parentNode.removeChild(targetElement);
  return;
};

const checkMaxPage = (pageNumber: number, eventTarget: EventTarget) => {
  if (pageNumber > MAX_PAGE_NUMBER && eventTarget instanceof Element) {
    const targetElement = eventTarget.closest('.btn');
    removeShowMoreButton(targetElement);
  }
};

const fetchNextPage = async (event: Event) => {
  let pageNumber = (value += 1);
  const data = await uiFeedBackManager.fetchData(API_ENDPOINT.POPULAR(pageNumber), 'GET', null, API_OPTION.headers);
  const { results } = data;
  createMovieItems(results);
  if (!event.target) return;
  checkMaxPage(pageNumber, event.target);
};

const showMoreButtonEventHandler = () => {
  const showMoreButton = document.querySelector('.btn');

  if (!showMoreButton) return;

  showMoreButton.addEventListener('click', (event) => fetchNextPage(event));
};

export default showMoreButtonEventHandler;
