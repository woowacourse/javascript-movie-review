import { setAttributes } from '../../utils/domUtils';

interface Props {
  button: {
    type?: string;
    text?: string;
    class?: string;
    click?: () => void;
  };
}

export default function Button({ button }: Props) {
  const $button = document.createElement('button');
  setAttributes($button, button);

  return $button;
}
