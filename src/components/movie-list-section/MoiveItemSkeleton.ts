import { appendChildren } from '../../utils/domUtils';
import ListItem from '../common/ListItem';
import Wrapper from '../common/Wrapper';

const movieItemSkeleton = (() => {
  const $listItem = ListItem();
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'item-card' } });
  const $poster = Wrapper({ type: 'div', attrs: { class: 'item-thumbnail skeleton' } });
  const $title = Wrapper({ type: 'div', attrs: { class: 'item-title skeleton' } });
  const $score = Wrapper({ type: 'div', attrs: { class: 'item-score skeleton' } });

  appendChildren([$listItem, $wrapper], [$poster, $title, $score]);

  return $listItem;
})();

export default function MovieItemSkeleton() {
  return movieItemSkeleton.cloneNode(true);
}
