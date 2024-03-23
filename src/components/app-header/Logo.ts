import IMG_SRC from '../../constants/imgSrc';
import Img from '../common/Img';
import TextBox from '../common/TextBox';

export default function Logo() {
  const $h1 = TextBox({ type: 'h1' });
  const $img = Img({ img: { src: IMG_SRC.logo, alt: 'MovieList 로고' } });

  $h1.appendChild($img);

  return $h1;
}
