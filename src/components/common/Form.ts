import { configureElement } from '../../utils/domUtils';

interface Props {
  form?: {
    class?: string;
    submit?: EventListener;
  };
}

export default function Form({ form = {} }: Props) {
  const $form = document.createElement('form');
  configureElement($form, form);

  return $form;
}
