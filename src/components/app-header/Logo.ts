import IMG_SRC from '../../constants/imgSrc';
import { appendChildren } from '../../utils/domUtils';
import Anchor from '../common/Anchor';
import Img from '../common/Img';
import TextBox from '../common/TextBox';

export default function Logo() {
  const $h1 = TextBox({ type: 'h1' });
  const $anchor = Anchor({ anchor: { href: 'https://vi-wolhwa.github.io/javascript-movie-review/dist/' } });
  const $img = Img({ img: { src: IMG_SRC.logo, alt: 'MovieList 로고' } });

  appendChildren([$h1, $anchor], [$img]);

  return $h1;
}
