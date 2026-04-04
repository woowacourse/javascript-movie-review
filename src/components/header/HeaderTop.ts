import { Logo } from './Logo.ts';
import { SearchForm } from './SearchForm.ts';

export const HeaderTop = (): HTMLElement => {
  const $headerTop = document.createElement('div');
  $headerTop.className = 'header-top';

  const $layout = document.createElement('div');

  $headerTop.append(Logo(), SearchForm(), $layout);
  return $headerTop;
};
