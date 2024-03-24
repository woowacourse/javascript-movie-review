import { setAttributes } from '../../utils/domUtils';

interface Props {
  form?: {
    class?: string;
    submit?: EventListener;
  };
}

export default function Form({ form = {} }: Props) {
  const $form = document.createElement('form');
  setAttributes($form, form);

  return $form;
}
