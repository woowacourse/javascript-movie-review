import { setAttributes } from '../../utils/domUtils';

interface Props {
  button: {
    type?: string;
    text?: string;
    class?: string;
    click?: EventListener;
    name?: string;
    value?: string;
  };
}

export default function Button({ button }: Props) {
  const $button = document.createElement('button');
  if (button) setAttributes($button, button);

  return $button;
}
