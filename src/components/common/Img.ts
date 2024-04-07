import { configureElement } from '../../utils/domUtils';

interface Props {
  img?: {
    src?: string;
    alt?: string;
    loading?: 'auto' | 'lazy' | 'eager';
    class?: string;
  };
}

export default function Img({ img }: Props) {
  const $img = document.createElement('img');

  if (img) configureElement($img, img);

  return $img;
}
