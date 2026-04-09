import { $ } from '../../utils/dom';

export const SearchForm = (onSubmit: (query: string) => void) => {
  const $form = document.createElement('form');
  $form.className = 'search-form';

  $form.innerHTML = `
    <div class="search-wrap">
      <label for="search-input"></label>
      <input id="search-input" name="q" placeholder="검색어를 입력하세요" />
      <button class="search-button" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="#aaa" stroke-width="2" fill="none"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#aaa" stroke-width="2"/>
        </svg>
      </button>
    </div>
  `;

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const $input = $<HTMLInputElement>($form, '#search-input');
    const query = $input.value;
    onSubmit(query);
    $input.value = '';
  });
  return $form;
};
