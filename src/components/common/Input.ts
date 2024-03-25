import { setAttributes } from '../../utils/domUtils';

interface Props {
  input: {
    type: string;
    placeholder?: string;
  };
}

export default function Input({ input }: Props) {
  const $input = document.createElement('input');
  setAttributes($input, input);

  return $input;
}
