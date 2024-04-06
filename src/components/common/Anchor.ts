import { configureElement } from '../../utils/domUtils';

interface Props {
  anchor: {
    href: string;
  };
}

export default function Anchor({ anchor }: Props) {
  const $anchor = document.createElement('a');
  configureElement($anchor, anchor);

  return $anchor;
}
