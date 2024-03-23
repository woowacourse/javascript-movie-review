import Button from '../common/Button';
import Wrapper from '../common/Wrapper';
import Text from '../common/Text';
import { appendChildren } from '../../utils/domUtils';

export default function MovieListSection() {
  const $section = Wrapper({ type: 'section', attrs: { class: 'item-view' } });
  const $title = Text({ type: 'h2', attrs: { text: '지금 인기 있는 영화' } });
  const $movieList = Wrapper({ type: 'ul', attrs: { class: 'item-list' } });
  const $moreButton = Button({ button: { type: 'button', text: '더 보기', class: 'btn primary full-width' } });

  appendChildren($section, [$title, $movieList, $moreButton]);

  return $section;
}
