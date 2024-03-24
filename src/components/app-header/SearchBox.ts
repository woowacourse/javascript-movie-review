import MovieListController from '../../controllers/MovieListController';
import { $, appendChildren } from '../../utils/domUtils';
import Button from '../common/Button';
import Form from '../common/Form';
import Input from '../common/Input';

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const query = (event.target as HTMLFormElement).querySelector('input')?.value.trim();
  if (query) MovieListController.search(query);

  const $input = $('input', event.target as HTMLFormElement) as HTMLInputElement;
  $input.blur();
};

export default function SearchBox() {
  const $form = Form({ form: { class: 'search-box', submit: handleFormSubmit } });
  const $input = Input({ input: { type: 'search', placeholder: '검색' } });
  const $button = Button({ button: { type: 'submit', text: '검색', class: 'search-button' } });

  appendChildren($form, [$input, $button]);

  return $form;
}
