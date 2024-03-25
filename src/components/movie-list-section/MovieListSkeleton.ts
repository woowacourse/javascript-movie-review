import { appendChildren } from '../../utils/domUtils';
import List from '../common/List';
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

const movieListSkeleton = (() => {
  const $movieList = List({ type: 'ul', attrs: { class: 'item-list skeleton hidden' } });
  appendChildren(
    $movieList,
    Array.from({ length: 20 }).map(() => movieItemSkeleton.cloneNode(true) as HTMLLIElement)
  );

  return $movieList;
})();

export default function MovieListSkeleton() {
  return movieListSkeleton.cloneNode(true) as HTMLUListElement;
}
