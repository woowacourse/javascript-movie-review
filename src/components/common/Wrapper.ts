import { configureElement } from '../../utils/domUtils';

interface Props {
  type: 'header' | 'main' | 'section' | 'div';
  attrs?: {
    id?: string;
    class?: string;
    click?: EventListener;
  };
}

export default function Wrapper({ type, attrs = {} }: Props) {
  const $wrapper = document.createElement(type);
  configureElement($wrapper, attrs);

  return $wrapper;
}
