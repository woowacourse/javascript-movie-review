import { setAttributes } from '../../utils/domUtils';

interface Props {
  dialog: {
    id?: string;
    class?: string;
  };
}

export default function Dialog({ dialog }: Props) {
  const $dialog = document.createElement('dialog');
  setAttributes($dialog, dialog);

  return $dialog;
}
