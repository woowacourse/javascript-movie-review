import { appendChildren } from '../../utils/domUtils';
import Wrapper from '../common/Wrapper';
import Logo from './Logo';
import SearchBox from './SearchBox';

export default function AppHeader() {
  const $header = Wrapper({ type: 'header' });
  const $logo = Logo();
  const $searchBox = SearchBox();

  appendChildren($header, [$logo, $searchBox]);

  return $header;
}
