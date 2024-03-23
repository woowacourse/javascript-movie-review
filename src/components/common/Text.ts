import { setAttributes } from '../../utils/domUtils';

interface Props {
  type: 'p' | 'h1' | 'h2';
  attrs?: {
    text?: string;
    class?: string;
  };
}

export default function Text({ type, attrs = {} }: Props): HTMLElement {
  const element = document.createElement(type);
  setAttributes(element, attrs);

  return element;
}
