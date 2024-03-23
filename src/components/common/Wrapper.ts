import { setAttributes } from '../../utils/domUtils';

interface Props {
  type: 'header' | 'main' | 'section' | 'div' | 'ul';
  attrs?: {
    class?: string;
  };
}

export default function Wrapper({ type, attrs = {} }: Props) {
  const $wrapper = document.createElement(type);
  setAttributes($wrapper, attrs);

  return $wrapper;
}
