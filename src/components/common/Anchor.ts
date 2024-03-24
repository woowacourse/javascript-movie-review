import { setAttributes } from '../../utils/domUtils';

interface Props {
  anchor: {
    href: string;
  };
}

export default function Anchor({ anchor }: Props) {
  const $anchor = document.createElement('a');
  setAttributes($anchor, anchor);

  return $anchor;
}
