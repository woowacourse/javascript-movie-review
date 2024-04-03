import { clickedHeaderView, noneClickedHeaderView } from '../components/header/header';
import { Dom } from './Dom';

let throttle: NodeJS.Timeout | null;

export function setResizeEvent() {
  window.addEventListener('resize', handleResize);
}

function handleResize() {
  if (!throttle) {
    throttle = setTimeout(() => {
      throttle = null;
      resizeHeader();
    }, 100);
  }
}

function resizeHeader() {
  const width = window.innerWidth;
  if (width >= 768) {
    Dom.getElement(document, '.close-input').classList.remove('clicked-close-input');
    noneClickedHeaderView();
  }
  if (width < 768 && (Dom.getElement(document, 'header .search-box > input') as HTMLInputElement)?.value !== '') {
    clickedHeaderView();
    Dom.getElement(document, '.close-input').classList.add('clicked-close-input');
  }
}
