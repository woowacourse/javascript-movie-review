import { appendChildren } from '../../utils/domUtils';
import Button from '../common/Button';
import Form from '../common/Form';
import Input from '../common/Input';

export default function SearchBox() {
  const $form = Form({ form: { class: 'search-box' } });
  const $input = Input({ input: { type: 'search', placeholder: '검색' } });
  const $button = Button({ button: { type: 'submit', text: '검색', class: 'search-button' } });

  appendChildren($form, [$input, $button]);

  return $form;
}
