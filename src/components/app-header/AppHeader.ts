import { appendChildren } from '../../utils/domUtils';
import Logo from './Logo';
import SearchBox from './SearchBox';

export default function AppHeader() {
  const $header = document.createElement('header');
  const $logo = Logo();
  const $searchBox = SearchBox();

  appendChildren($header, [$logo, $searchBox]);

  return $header;
}
