import { configureElement } from '../../utils/domUtils';

interface Props {
  type: 'ul';
  attrs?: {
    class?: string;
  };
}

export default function List({ type, attrs = {} }: Props) {
  const $list = document.createElement(type);
  configureElement($list, attrs);

  return $list;
}
