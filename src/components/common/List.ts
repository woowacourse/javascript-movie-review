import { setAttributes } from '../../utils/domUtils';

interface Props {
  type: 'ul';
  attrs?: {
    class?: string;
  };
}

export default function List({ type, attrs = {} }: Props) {
  const $list = document.createElement(type);
  setAttributes($list, attrs);

  return $list;
}
