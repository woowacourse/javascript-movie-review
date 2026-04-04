export const SearchForm = () => {
  const $form = document.createElement('form');
  $form.className = 'search-form';

  const $wrap = document.createElement('div');
  $wrap.className = 'search-wrap';

  const $label = document.createElement('label');
  $label.htmlFor = 'search-input';

  const $input = document.createElement('input');
  $input.id = 'search-input';
  $input.placeholder = '검색어를 입력하세요';

  const $button = document.createElement('button');
  $button.className = 'search-button';
  $button.type = 'submit';
  $button.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" stroke="#aaa" stroke-width="2" fill="none"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#aaa" stroke-width="2"/>
  </svg>
`;

  $wrap.append($input, $button);
  $form.append($label, $wrap);

  return $form;
};
