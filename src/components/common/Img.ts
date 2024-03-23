import { setAttributes } from '../../utils/domUtils';

interface Props {
  img: {
    src: string;
    alt: string;
  };
}

export default function Img({ img }: Props) {
  const $img = document.createElement('img');
  setAttributes($img, img);

  return $img;
}
