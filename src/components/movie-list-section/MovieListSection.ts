import Wrapper from '../common/Wrapper';
import TextBox from '../common/TextBox';
import { appendChildren } from '../../utils/domUtils';
import List from '../common/List';
import MovieListSkeleton from './MovieListSkeleton';

export default function MovieListSection() {
  const $section = Wrapper({ type: 'section', attrs: { class: 'item-view' } });
  const $title = TextBox({ type: 'h2', attrs: { text: '지금 인기 있는 영화' } });
  const $movieList = List({ type: 'ul', attrs: { class: 'item-list' } });
  const $movieListSkeleton = MovieListSkeleton();

  appendChildren($section, [$title, $movieList, $movieListSkeleton]);

  return $section;
}
