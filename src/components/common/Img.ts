import { setAttributes } from '../../utils/domUtils';

interface Props {
  img: {
    src: string;
    alt: string;
    loading?: 'auto' | 'lazy' | 'eager';
    class?: string;
  };
}

export default function Img({ img }: Props) {
  const $img = document.createElement('img');
  setAttributes($img, img);

  return $img;
}
