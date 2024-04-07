import { configureElement } from '../../utils/domUtils';

interface Props {
  input: {
    type: string;
    class?: string;
    placeholder?: string;
    name?: string;
    value?: string;
  };
}

export default function Input({ input }: Props) {
  const $input = document.createElement('input');
  configureElement($input, input);

  return $input;
}
