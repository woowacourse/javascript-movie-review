// TODO: CustomEvent 구현 이유?

import { $ } from '../../utils/dom';
import { showAlert } from '../Alert/Alert';

const handleSearchClick = (event: MouseEvent | KeyboardEvent) => {
  const input = $('#search-text') as HTMLInputElement;

  event.target?.dispatchEvent(
    new CustomEvent('search', {
      bubbles: true,
      detail: input.value,
    }),
  );
};

const SearchBox = () => {
  const searchBox = document.createElement('div');
  // TODO: input은 항상 label과 같이?
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchButton.classList.add('search-button');

  searchInput.setAttribute('id', 'search-text');
  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  searchButton.addEventListener('click', (event) => {
    handleSearchClick(event);
    searchInput.value = '';
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' && ($('#search-text') as HTMLInputElement).value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }

    if (event.key === 'Enter' && !event.isComposing) {
      handleSearchClick(event);
      searchInput.value = '';
    }
  });

  return searchBox;
};

export default SearchBox;
